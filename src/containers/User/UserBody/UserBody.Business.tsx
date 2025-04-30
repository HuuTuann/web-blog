import { useGetBlogsUser } from "@/queries";
import { useEffect } from "react";

type Props = {
  searchParams: string;
};

export const BodyBusiness = ({ searchParams }: Props) => {
  const { setBlogsParams } = useGetBlogsUser();

  useEffect(() => {
    setBlogsParams((prev) => ({ ...prev, search: searchParams }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return <div>Business</div>;
};
