/* eslint-disable react/no-unescaped-entities */
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
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";

// DASS-42 questions
const dassQuestions = [
  "I was aware of dryness of my mouth",
  "I couldn't seem to experience any positive feeling at all",
  "I experienced breathing difficulty (eg, excessively rapid breathing, breathlessness in the absence of physical exertion).",
  "I tended to over-react to situations.",
  "I found it difficult to relax.",
  "I felt that I had nothing to look forward to.",
  "I felt that I was using a lot of nervous energy.",
  "I felt I wasn't worth much as a person.",
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

// Explicitly typing the result data
interface ResultData {
  depression: string;
  anxiety: string;
  stress: string;
}

export function AssessmentForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Explicitly typing the states for answers
  const [dassAnswers, setDassAnswers] = useState<(number | null)[]>(
    new Array(21).fill(null)
  );
  const [tipiAnswers, setTipiAnswers] = useState<(string | null)[]>(
    new Array(10).fill(null)
  );

  const [assessmentStage, setAssessmentStage] = useState<
    "dass" | "tipi" | "loading" | "results"
  >("dass");

  const [resultData, setResultData] = useState<ResultData | null>(null);

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
        setAssessmentStage("loading");
        calculateResults();
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

  // Mapping of severity levels based on the response
  const severityMapping = (score: number) => {
    switch (score) {
      case 0:
        return "Normal";
      case 1:
        return "Mild";
      case 2:
        return "Moderate";
      case 3:
        return "Severe";
      case 4:
        return "Extremely Severe";
      default:
        return "Unknown";
    }
  };

  const calculateResults = async () => {
    try {
      const numericTipiAnswers = tipiAnswers.map((answer) => Number(answer));
      const inputFeatures = [...dassAnswers, ...numericTipiAnswers];

      const response = await axios.post(
        "https://psychescan-backend.onrender.com/predict/",
        {
          features: inputFeatures,
        }
      );

      const { depression, anxiety, stress } = response.data;

      setResultData({
        depression: severityMapping(depression),
        anxiety: severityMapping(anxiety),
        stress: severityMapping(stress),
      });

      setAssessmentStage("results");
    } catch (error) {
      console.error("Error making prediction request:", error);
      // Handle error state here
      setAssessmentStage("results"); // or set to an error state
    }
  };

  const renderQuestion = () => {
    const questions =
      assessmentStage === "dass" ? dassQuestions : tipiQuestions;
    const options = assessmentStage === "dass" ? dassOptions : tipiOptions;
    const answers = assessmentStage === "dass" ? dassAnswers : tipiAnswers;

    return (
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-2xl">
          <CardHeader className="space-y-2 px-6 py-8">
            <CardTitle className="text-3xl font-bold">
              {assessmentStage === "dass"
                ? "DASS-21 Assessment"
                : "TIPI Assessment"}
            </CardTitle>
            <CardDescription className="text-xl">
              Question {currentQuestion + 1} of {questions.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 h-60 overflow-auto">
            <p className="mb-4 text-xl break-words">
              {questions[currentQuestion]}
            </p>
            <RadioGroup
              onValueChange={(value) => {
                if (assessmentStage === "dass") {
                  handleDassAnswer(Number(value));
                } else {
                  handleTipiAnswer(value);
                }
              }}
              value={answers[currentQuestion]?.toString() || ""}
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    id={`option-${option.value}`}
                    value={option.value.toString()}
                  />
                  <Label htmlFor={`option-${option.value}`}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between px-6 py-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={handlePrevious}
              disabled={currentQuestion === 0 && assessmentStage === "dass"}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
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
          <Progress
            value={(100 * (currentQuestion + 1)) / questions.length}
            className="h-2 w-full"
          />
        </Card>
      </div>
    );
  };

  const renderLoading = () => (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
          <p className="mt-4 text-lg font-medium">Processing your results...</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderResults = () => (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-6xl">
        <CardHeader className="px-6 py-8">
          <CardTitle className="text-3xl font-bold">
            Assessment Results
          </CardTitle>
          <CardDescription className="text-xl">
            Here are your results based on your responses.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6">
          <p className="text-xl">Depression: {resultData?.depression}</p>
          <p className="text-xl">Anxiety: {resultData?.anxiety}</p>
          <p className="text-xl">Stress: {resultData?.stress}</p>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Remember, this assessment is not a diagnosis. If you're concerned
            about your mental health, please consult with a qualified mental
            health professional.
          </p>
        </CardFooter>
      </Card>
    </div>
  );

  return (
    <div>
      {assessmentStage === "loading"
        ? renderLoading()
        : assessmentStage === "results"
        ? renderResults()
        : renderQuestion()}
    </div>
  );
}
