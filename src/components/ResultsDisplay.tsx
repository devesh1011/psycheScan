import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ResultsProps {
  results: {
    depression: number;
    anxiety: number;
    stress: number;
  };
}

const getInterpretation = (
  score: number,
  type: "depression" | "anxiety" | "stress"
): string => {
  const ranges = {
    depression: [
      { max: 9, level: "Normal" },
      { max: 13, level: "Mild" },
      { max: 20, level: "Moderate" },
      { max: 27, level: "Severe" },
      { max: Infinity, level: "Extremely Severe" },
    ],
    anxiety: [
      { max: 7, level: "Normal" },
      { max: 9, level: "Mild" },
      { max: 14, level: "Moderate" },
      { max: 19, level: "Severe" },
      { max: Infinity, level: "Extremely Severe" },
    ],
    stress: [
      { max: 14, level: "Normal" },
      { max: 18, level: "Mild" },
      { max: 25, level: "Moderate" },
      { max: 33, level: "Severe" },
      { max: Infinity, level: "Extremely Severe" },
    ],
  };

  return ranges[type].find((range) => score <= range.max)?.level || "Unknown";
};

export function ResultsDisplay({ results }: ResultsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle>Your DASS 42 Results</CardTitle>
          <CardDescription>
            {/* Here's an interpretation of your scores */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">
                Depression: {results.depression}
              </h3>
              <p>
                Level: {getInterpretation(results.depression, "depression")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Anxiety: {results.anxiety}</h3>
              <p>Level: {getInterpretation(results.anxiety, "anxiety")}</p>
            </div>
            <div>
              <h3 className="font-semibold">Stress: {results.stress}</h3>
              <p>Level: {getInterpretation(results.stress, "stress")}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            {/* Remember, this assessment is not a diagnosis. If you're concerned */}
            about your mental health, please consult with a qualified mental
            health professional.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
