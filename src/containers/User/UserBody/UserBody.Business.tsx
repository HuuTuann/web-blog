import { Icons } from "@/assets";
import { Button, View } from "@/components";
import { formatDate, formatValueOrNull } from "@/lib";
import { useGetBusinessesUser } from "@/queries";
import { Image, Pagination, ScrollShadow, Spinner } from "@heroui/react";
import { Dot } from "lucide-react";
import { useEffect } from "react";

type Props = {
  searchParams: string;
};

export const BodyBusiness = ({ searchParams }: Props) => {
  const {
    businesses,
    businessesParams,
    totalPagesBusinesses,
    isLoadingBusinesses,
    setBusinessesParams,
  } = useGetBusinessesUser();

  useEffect(() => {
    setBusinessesParams((prev) => ({
      ...prev,
      ...(!!searchParams ? { search: searchParams } : {}),
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handlePageNoChange = (pageNo: number) => {
    setBusinessesParams((prev) => ({
      ...prev,
      pageNo,
    }));
  };

  if (isLoadingBusinesses) return <Spinner size="lg" />;

  if (!businesses || businesses.length === 0) {
    return <Icons.NoData size={320} />;
  }

  return (
    <div className="flex w-full flex-col items-center gap-5">
      {businesses.map((business) => {
        const {
          businessId,
          businessName,
          businessDes,
          businessSlogan,
          benefit,
          image,
          createdDate,
          createdBy,
          modifiedBy,
          modifiedDate,
        } = business;

        return (
          <div
            key={businessId}
            className="flex w-full items-start gap-5 rounded-lg border p-5 shadow-sm hover:shadow-md"
          >
            <div className="flex">
              {image ? (
                <Image src={image} alt="Blog Image" className="w-32" />
              ) : (
                <Icons.NoImage size={128} />
              )}
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <h3 className="text-lg font-semibold">{businessName}</h3>
              <View label="Slogan" value={businessSlogan} />
              <div className="flex items-start gap-2">
                <p className="text-sm font-semibold text-slate-700">
                  Description:
                </p>
                <ScrollShadow className="max-h-40">
                  <p className="text-sm text-slate-500">{businessDes}</p>
                </ScrollShadow>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">Benefit:</p>
                <ScrollShadow className="max-h-40">
                  {benefit?.split(";")?.map((b, i) => {
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <Dot />
                        <p className="text-sm text-slate-500">{b}</p>
                      </div>
                    );
                  })}
                </ScrollShadow>
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="text-bold text-small text-slate-400">
                  <View
                    label="Create By"
                    value={`${formatValueOrNull(createdBy)} - ${formatValueOrNull(formatDate(createdDate))}`}
                  />
                  <View
                    label="Modify By"
                    value={`${formatValueOrNull(modifiedBy)} - ${formatValueOrNull(formatDate(modifiedDate))}`}
                  />
                </div>
                <Button variant="ioSolid">View Detail</Button>
              </div>
            </div>
          </div>
        );
      })}
      <Pagination
        key={`pagination-${totalPagesBusinesses}-${businessesParams?.pageNo}`}
        aria-label="page-no"
        showControls
        initialPage={businessesParams?.pageNo}
        total={totalPagesBusinesses}
        onChange={handlePageNoChange}
      />
    </div>
  );
};
