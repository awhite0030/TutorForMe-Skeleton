export type Lang = "en" | "ru";

export type SubjectId = "biology" | "chemistry" | "mathematics";

export type Text = {
  en: string;
  ru: string;
};

export type Step = {
  id: string;
  title: Text;
  body: Text;
  formula: string | null;
  example: Text | null;
};

export type Check = {
  prompt: Text;
  choices: Text[];
  answerIndex: number;
  why: Text;
};

export type Lesson = {
  id: string;
  subject: SubjectId;
  source: "guided" | "live";
  title: Text;
  stuckPoint: Text;
  minutes: number;
  steps: Step[];
  check: Check;
};

export type TutorPayload = {
  title: string;
  stuckPoint: string;
  steps: Array<{
    title: string;
    body: string;
    formula?: string | null;
    example?: string | null;
  }>;
  check: {
    prompt: string;
    choices: string[];
    answerIndex: number;
    why: string;
  };
};

export type ClarifyPayload = {
  title: string;
  body: string;
  formula?: string | null;
  example?: string | null;
};
