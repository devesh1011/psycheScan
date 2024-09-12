import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain, ArrowRight } from "lucide-react";
import Link from "next/link";

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-blue-800">PsycheScan</h1>
          </div>
          <p className="text-xl text-gray-600">
            Assess Your Mental Wellbeing with DASS 42
          </p>
        </header>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Welcome to PsycheScan</CardTitle>
            <CardDescription>
              Take our comprehensive mental health assessment based on the DASS
              42 model
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              The Depression Anxiety Stress Scales (DASS) is a 42-item
              self-report instrument designed to measure the three related
              negative emotional states of depression, anxiety and
              tension/stress.
            </p>
            <p className="mb-4">
              This assessment will help you understand your current mental state
              and provide insights into potential areas of concern.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>42 questions covering depression, anxiety, and stress</li>
              <li>Takes approximately 10-15 minutes to complete</li>
              <li>Receive immediate results and interpretations</li>
            </ul>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/assessment">
                Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-12 text-center text-gray-600">
          <p className="mb-2">
            Remember, this assessment is not a substitute for professional
            medical advice.
          </p>
          <p>
            {/* If you're experiencing severe symptoms, please consult with a mental
            health professional. */}
          </p>
        </div>
      </div>
    </div>
  );
}
