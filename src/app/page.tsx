import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-grow bg-gradient-to-b from-blue-100 to-white">
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-bold text-center text-gray-900 mb-8">
          <div className="flex fle-grow align-items justify-center">
          </div>
          Welcome to PsycheScan
        </h1>
        <p className="text-lg sm:text-xl text-center text-gray-600 mb-8">
        PsycheScan is a user-friendly online platform that utilizes advanced machine learning algorithms to provide a comprehensive evaluation of your mental health and personality. By combining the DASS-21 and TIPI assessments, PsycheScan offers a detailed understanding of your emotional well-being and individual traits.
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
