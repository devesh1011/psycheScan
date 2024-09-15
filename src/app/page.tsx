import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-grow bg-gradient-to-b from-blue-100 to-white">
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-bold text-center text-gray-900 mb-8">
          Welcome to PsycheScan
        </h1>
        <p className="text-lg sm:text-xl text-center text-gray-600 mb-8">
          PsycheScan is a comprehensive psychological assessment tool that
          combines the DASS-42 and TIPI assessments to provide insights into
          your mental health and personality traits.
        </p>
        <Link href="/assessment">
          <Button size="lg" className="text-lg px-8 py-3">
            Start Assessment
          </Button>
        </Link>
      </div>
    </div>
  );
}
