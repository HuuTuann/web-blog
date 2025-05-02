import { useGetJobsUser } from "@/queries";
import { useEffect } from "react";

type Props = {
  searchParams: string;
};

export const BodyJob = ({ searchParams }: Props) => {
  const { setJobsParams } = useGetJobsUser();

  useEffect(() => {
    setJobsParams((prev) => ({
      ...prev,
      ...(!!searchParams ? { search: searchParams } : {}),
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return <div>Job</div>;
};
