import { useContext } from "react";
import { InterviewContext } from "../InterviewProvider";
import { Divider } from "@heroui/react";
import { Button } from "@/components";
import { useRouter } from "next/navigation";
import { Paths } from "@/constants";

const ViewEvaluate = () => {
  const router = useRouter();
  const { evaluate, setJDText, setQuestion, setEvaluate } =
    useContext(InterviewContext);

  if (!evaluate) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <Divider />
      <h2 className="text-2xl font-semibold">Evaluation</h2>
      <div className="prose" dangerouslySetInnerHTML={{ __html: evaluate }} />
      <div className="flex w-full items-center justify-end gap-2">
        <Button
          variant="ioLight"
          onClick={() => {
            router.push(Paths.USER);
          }}
        >
          Back to Home
        </Button>
        <Button
          variant="ioSolid"
          onClick={() => {
            setJDText("");
            setQuestion("");
            setEvaluate("");
          }}
        >
          Interview Again
        </Button>
      </div>
    </div>
  );
};

export default ViewEvaluate;
