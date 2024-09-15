"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";

// DASS-42 questions
const dassQuestions = [
  "I was aware of dryness of my mouth",
  "I couldn't seem to experience any positive feeling at all",
  "I experienced breathing difficulty (eg, excessively rapid breathing, breathlessness in the absence of physical exertion).",
  "I tended to over-react to situations.",
  "I found it difficult to relax.",
  "I felt that I had nothing to look forward to.",
  "I felt that I was using a lot of nervous energy.",
  "I felt I wasn&#39;t worth much as a person.",
  "I felt that I was rather touchy.",
  "I felt scared without any good reason.",
  "I found it hard to wind down.",
  "I was aware of the action of my heart in the absence of physical exertion (eg, sense of heart rate increase, heart missing a beat).",
  "I felt down-hearted and blue.",
  "I felt I was close to panic.",
  "I was unable to become enthusiastic about anything.",
  "I was intolerant of anything that kept me from getting on with what I was doing.",
  "I felt that life was meaningless.",
  "I found myself getting agitated.",
  "I was worried about situations in which I might panic and make a fool of myself.",
  "I experienced trembling.",
  "I found it difficult to work up the initiative to do things.",
];

const dassOptions = [
  { value: 0, label: "Did not apply to me at all" },
  { value: 1, label: "Applied to me to some degree, or some of the time" },
  {
    value: 2,
    label: "Applied to me to a considerable degree, or a good part of time",
  },
  { value: 3, label: "Applied to me very much, or most of the time" },
];

// TIPI questions
const tipiQuestions = [
  "I see myself as: Extraverted, enthusiastic",
  "I see myself as: Critical, quarrelsome",
  "I see myself as: Dependable, self-disciplined",
  "I see myself as: Anxious, easily upset",
  "I see myself as: Open to new experiences, complex",
  "I see myself as: Reserved, quiet",
  "I see myself as: Sympathetic, warm",
  "I see myself as: Disorganized, careless",
  "I see myself as: Calm, emotionally stable",
  "I see myself as: Conventional, uncreative",
];

const tipiOptions = [
  { value: "1", label: "Disagree strongly" },
  { value: "2", label: "Disagree moderately" },
  { value: "3", label: "Disagree a little" },
  { value: "4", label: "Neither agree nor disagree" },
  { value: "5", label: "Agree a little" },
  { value: "6", label: "Agree moderately" },
  { value: "7", label: "Agree strongly" },
];

export function AssessmentForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [dassAnswers, setDassAnswers] = useState<number[]>(
    new Array(42).fill(null)
  );
  const [tipiAnswers, setTipiAnswers] = useState<string[]>(
    new Array(10).fill("")
  );
  const [assessmentStage, setAssessmentStage] = useState<
    "dass" | "tipi" | "results"
  >("dass");

  const handleDassAnswer = (value: number) => {
    const newAnswers = [...dassAnswers];
    newAnswers[currentQuestion] = value;
    setDassAnswers(newAnswers);
  };

  const handleTipiAnswer = (value: string) => {
    const newAnswers = [...tipiAnswers];
    newAnswers[currentQuestion] = value;
    setTipiAnswers(newAnswers);
  };

  const handleNext = () => {
    if (assessmentStage === "dass") {
      if (currentQuestion < dassQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setAssessmentStage("tipi");
        setCurrentQuestion(0);
      }
    } else if (assessmentStage === "tipi") {
      if (currentQuestion < tipiQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setAssessmentStage("results");
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (assessmentStage === "tipi") {
      setAssessmentStage("dass");
      setCurrentQuestion(dassQuestions.length - 1);
    }
  };

  const calculateDassResults = () => {
    const depressionScores = [
      3, 5, 10, 13, 16, 17, 21, 24, 26, 31, 34, 37, 38, 42,
    ];
    const anxietyScores = [2, 4, 7, 9, 15, 19, 20, 23, 25, 28, 30, 36, 40, 41];
    const stressScores = [1, 6, 8, 11, 12, 14, 18, 22, 27, 29, 32, 33, 35, 39];

    const calculateScore = (indices: number[]) =>
      indices.reduce((sum, index) => sum + (dassAnswers[index - 1] || 0), 0);

    return {
      depression: calculateScore(depressionScores),
      anxiety: calculateScore(anxietyScores),
      stress: calculateScore(stressScores),
    };
  };

  const calculateTipiResults = () => {
    // This is a simplified calculation. In a real application, you'd need to reverse score some items and pair them correctly.
    return {
      extraversion: (Number(tipiAnswers[0]) + Number(tipiAnswers[5])) / 2,
      agreeableness: (Number(tipiAnswers[1]) + Number(tipiAnswers[6])) / 2,
      conscientiousness: (Number(tipiAnswers[2]) + Number(tipiAnswers[7])) / 2,
      emotionalStability: (Number(tipiAnswers[3]) + Number(tipiAnswers[8])) / 2,
      openness: (Number(tipiAnswers[4]) + Number(tipiAnswers[9])) / 2,
    };
  };

  const renderQuestion = () => {
    const questions =
      assessmentStage === "dass" ? dassQuestions : tipiQuestions;
    const options = assessmentStage === "dass" ? dassOptions : tipiOptions;
    const answers = assessmentStage === "dass" ? dassAnswers : tipiAnswers;
    const handleAnswer =
      assessmentStage === "dass" ? handleDassAnswer : handleTipiAnswer;

    return (
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-6xl">
          <CardHeader className="space-y-2 px-6 py-8">
            <CardTitle className="text-3xl font-bold">
              {assessmentStage === "dass"
                ? "DASS-42 Assessment"
                : "TIPI Assessment"}
            </CardTitle>
            <CardDescription className="text-xl">
              Question {currentQuestion + 1} of {questions.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6">
            <p className="mb-4 text-xl">{questions[currentQuestion]}</p>
            <RadioGroup
              onValueChange={(value: string) =>
                handleAnswer(assessmentStage === "dass" ? Number(value) : value)
              }
              // Ensure that the value correctly reflects the selected answer for the current question
              value={answers[currentQuestion]?.toString() || ""}
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.value.toString()}
                    id={`option-${option.value}`}
                  />
                  <Label htmlFor={`option-${option.value}`}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0 && assessmentStage === "dass"}
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                answers[currentQuestion] === null ||
                answers[currentQuestion] === ""
              }
            >
              {currentQuestion === questions.length - 1 &&
              assessmentStage === "tipi"
                ? "Finish"
                : "Next"}{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
          <CardFooter>
            <Progress
              value={((currentQuestion + 1) / questions.length) * 100}
              className="w-full"
            />
          </CardFooter>
        </Card>
      </div>
    );
  };

  const renderResults = () => {
    const dassResults = calculateDassResults();
    const tipiResults = calculateTipiResults();

    return (
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-2xl w-full">
          <CardHeader>
            <CardTitle>Assessment Results</CardTitle>
            <CardDescription>
              Here are your DASS-42 and TIPI results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">DASS-42 Results:</h3>
            <ul className="list-disc list-inside mb-4">
              <li>Depression: {dassResults.depression}</li>
              <li>Anxiety: {dassResults.anxiety}</li>
              <li>Stress: {dassResults.stress}</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2">TIPI Results:</h3>
            <ul className="list-disc list-inside">
              <li>Extraversion: {tipiResults.extraversion.toFixed(2)}</li>
              <li>Agreeableness: {tipiResults.agreeableness.toFixed(2)}</li>
              <li>
                Conscientiousness: {tipiResults.conscientiousness.toFixed(2)}
              </li>
              <li>
                Emotional Stability: {tipiResults.emotionalStability.toFixed(2)}
              </li>
              <li>
                Openness to Experiences: {tipiResults.openness.toFixed(2)}
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">
              Remember, these assessments are not diagnostic tools. If you have
              concerns about your mental health or personality, please consult
              with a qualified mental health professional.
            </p>
          </CardFooter>
        </Card>
      </div>
    );
  };

  if (assessmentStage === "results") {
    return renderResults();
  }

  return renderQuestion();
}
