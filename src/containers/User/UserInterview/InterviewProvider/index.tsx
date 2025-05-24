import { createContext, PropsWithChildren, useState } from "react";

type InterviewContextType = {
  question: string;
  setQuestion: (question: string) => void;

  jdText: string;
  setJDText: (jdText: string) => void;

  evaluate: string;
  setEvaluate: (evaluate: string) => void;
};

export const InterviewContext = createContext<InterviewContextType>({
  question: "",
  setQuestion: () => {},

  jdText: "",
  setJDText: () => {},

  evaluate: "",
  setEvaluate: () => {},
});

export const InterviewProvider = ({ children }: PropsWithChildren) => {
  const [question, setQuestion] = useState<string>("");
  const [jdText, setJDText] = useState<string>("");
  const [evaluate, setEvaluate] = useState<string>("");

  return (
    <InterviewContext.Provider
      value={{
        question,
        setQuestion,
        jdText,
        setJDText,
        evaluate,
        setEvaluate,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};
