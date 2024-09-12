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
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ResultsDisplay } from "@/components/ResultsDisplay";

const questions = [
  "I found myself getting upset by quite trivial things",
  "I was aware of dryness of my mouth",
  "I couldn't seem to experience any positive feeling at all",
  // ... Add all 42 DASS questions here
];

const options = [
  { value: 0, label: "Did not apply to me at all" },
  { value: 1, label: "Applied to me to some degree, or some of the time" },
  {
    value: 2,
    label: "Applied to me to a considerable degree, or a good part of time",
  },
  { value: 3, label: "Applied to me very much, or most of the time" },
];

export function AssessmentForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(42).fill(null));
  const [results, setResults] = useState<{
    depression: number;
    anxiety: number;
    stress: number;
  } | null>(null);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const depressionScores = [
      3, 5, 10, 13, 16, 17, 21, 24, 26, 31, 34, 37, 38, 42,
    ];
    const anxietyScores = [2, 4, 7, 9, 15, 19, 20, 23, 25, 28, 30, 36, 40, 41];
    const stressScores = [1, 6, 8, 11, 12, 14, 18, 22, 27, 29, 32, 33, 35, 39];

    const calculateScore = (indices: number[]) =>
      indices.reduce((sum, index) => sum + (answers[index - 1] || 0), 0);

    const depression = calculateScore(depressionScores);
    const anxiety = calculateScore(anxietyScores);
    const stress = calculateScore(stressScores);

    setResults({ depression, anxiety, stress });
  };

  if (results) {
    return <ResultsDisplay results={results} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle>
            Question {currentQuestion + 1} of {questions.length}
          </CardTitle>
          <CardDescription>{questions[currentQuestion]}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            onValueChange={(value) => handleAnswer(Number(value))}
            value={answers[currentQuestion]?.toString()}
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value.toString()}
                  id={`option-${option.value}`}
                />
                <Label htmlFor={`option-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={answers[currentQuestion] === null}
          >
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}{" "}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
