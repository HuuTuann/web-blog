import { useContext } from "react";
import { InterviewContext } from "../InterviewProvider";

const ViewQuestion = () => {
  const { question } = useContext(InterviewContext);

  if (!question) {
    return null;
  }

  return (
    <div className="prose" dangerouslySetInnerHTML={{ __html: question }} />
  );
};

export default ViewQuestion;
