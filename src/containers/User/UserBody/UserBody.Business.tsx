import { useGetBusinessesUser } from "@/queries";
import { useEffect } from "react";

type Props = {
  searchParams: string;
};

export const BodyBusiness = ({ searchParams }: Props) => {
  const { setBusinessesParams } = useGetBusinessesUser();

  useEffect(() => {
    setBusinessesParams((prev) => ({
      ...prev,
      ...(!!searchParams ? { search: searchParams } : {}),
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return <div>Business</div>;
};
