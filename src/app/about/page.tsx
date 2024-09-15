import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            About PsycheScan
          </CardTitle>
          <CardDescription className="text-center text-lg mt-2">
            Understanding Your Mental Health and Personality
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          <h2>Our Mission</h2>
          <p>
            PsycheScan is dedicated to promoting mental health awareness and
            providing accessible tools for self-assessment. Our goal is to help
            individuals gain insights into their mental well-being and
            personality traits, encouraging a proactive approach to mental
            health.
          </p>

          <h2>Our Assessments</h2>
          <h3>DASS-42 (Depression Anxiety Stress Scales)</h3>
          <p>
            The DASS-42 is a self-report instrument designed to measure the
            three related negative emotional states of depression, anxiety, and
            stress. This 42-item questionnaire provides a comprehensive overview
            of an individual current emotional state.
          </p>

          <h3>TIPI (Ten-Item Personality Inventory)</h3>
          <p>
            The TIPI is a brief measure of the Big Five personality dimensions:
            Extraversion, Agreeableness, Conscientiousness, Emotional Stability,
            and Openness to Experience. This concise inventory offers a quick
            snapshot of an individual personality traits.
          </p>

          <h2>Importance of Mental Health</h2>
          <p>
            Mental health is an essential component of overall well-being. It
            affects how we think, feel, and act, and influences our ability to
            handle stress, relate to others, and make choices. By providing
            these assessment tools, we aim to encourage regular mental health
            check-ins and promote early intervention when needed.
          </p>

          <h2>Disclaimer</h2>
          <p>
            While PsycheScan provides valuable insights, it is not a substitute
            for professional medical advice, diagnosis, or treatment. Always
            seek the advice of your physician or other qualified health provider
            with any questions you may have regarding a medical condition.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
