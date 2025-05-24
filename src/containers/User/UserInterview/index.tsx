"use client";

import AnswerForm from "./AnswerForm";
import ViewQuestion from "./ViewQuestion";
import GenerateQuestionForm from "./GenerateQuestionForm";
import { InterviewProvider } from "./InterviewProvider";
import ViewEvaluate from "./ViewEvaluate";
import { ScrollShadow } from "@heroui/react";

export const UserInterview = () => {
  return (
    <div className="flex w-full flex-1 justify-center gap-4 p-4">
      <ScrollShadow className="max-h-full overflow-y-auto">
        <div className="flex w-[1280px] flex-col gap-5">
          <InterviewProvider>
            <GenerateQuestionForm />
            <ViewQuestion />
            <AnswerForm />
            <ViewEvaluate />
          </InterviewProvider>
        </div>
      </ScrollShadow>
    </div>
  );
};
