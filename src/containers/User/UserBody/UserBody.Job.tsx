import { Icons } from "@/assets";
import { Button, View } from "@/components";
import { formatDate, formatValueOrNull } from "@/lib";
import { useGetJobsUser } from "@/queries";
import { Pagination, ScrollShadow, Spinner } from "@heroui/react";
import { Dot } from "lucide-react";
import { useEffect } from "react";

type Props = {
  searchParams: string;
};

export const BodyJob = ({ searchParams }: Props) => {
  const { jobs, jobsParams, totalPagesJobs, isLoadingJobs, setJobsParams } =
    useGetJobsUser();

  useEffect(() => {
    setJobsParams((prev) => ({
      ...prev,
      ...(!!searchParams ? { search: searchParams } : {}),
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handlePageNoChange = (pageNo: number) => {
    setJobsParams((prev) => ({
      ...prev,
      pageNo,
    }));
  };

  if (isLoadingJobs) return <Spinner size="lg" />;

  if (!jobs || jobs.length === 0) {
    return <Icons.NoData size={320} />;
  }

  return (
    <div className="flex w-full flex-col items-center gap-5">
      {jobs.map((job) => {
        const {
          jobPostId,
          jobPostTitle,
          jobPostDes,
          quantityOpening,
          yearExp,
          jobType,
          contractType,
          levelDes,
          techStackDes,
          priceDesc,
          createdDate,
          createdBy,
          modifiedBy,
          modifiedDate,
        } = job;

        return (
          <div
            key={jobPostId}
            className="flex w-full items-start gap-5 rounded-lg border p-5 shadow-sm hover:shadow-md"
          >
            <div className="flex flex-1 flex-col gap-1">
              <h3 className="text-lg font-semibold">{jobPostTitle}</h3>
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Job Post Description:
                </p>
                <ScrollShadow className="max-h-40">
                  {jobPostDes?.split(";")?.map((j, i) => {
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <Dot />
                        <p className="text-sm text-slate-500">{j}</p>
                      </div>
                    );
                  })}
                </ScrollShadow>
              </div>
              <div className="flex gap-5 text-sm text-slate-500">
                <View label="Quantity Opening" value={quantityOpening} />
                <View label="Year Experience" value={yearExp} />
                <View label="Type" value={jobType} />
                <View label="Contract Type" value={contractType} />
              </div>
              <View label="Level Des" value={levelDes} />
              <View label="Tech Stack Des" value={techStackDes} />
              <View label="Price Des" value={priceDesc} />
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
                <div className="flex items-center gap-2">
                  <Button variant="ioSolid">Apply Now</Button>
                  <Button variant="ioSolid">View Detail</Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <Pagination
        key={`pagination-${totalPagesJobs}-${jobsParams?.pageNo}`}
        aria-label="page-no"
        showControls
        initialPage={jobsParams?.pageNo}
        total={totalPagesJobs}
        onChange={handlePageNoChange}
      />
    </div>
  );
};
