import { Button, View } from "@/components";
import { formatDate, formatValueOrNull } from "@/lib";
import { useGetJobUserDetail } from "@/queries";
import { ArrowLeft, CheckCheck, Dot } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ApplyForm from "../UserBody/Job/ApplyForm";
import { useDialog } from "@/hooks";
import { getCookie } from "@/services";

export const DetailJob = () => {
  const router = useRouter();
  const { showDialog } = useDialog();
  const { id } = useParams<{ id: string }>();
  const { jobDetail } = useGetJobUserDetail({
    params: { jobPostId: +id },
  });

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
    priceDes,
    userCV,
    deadline,
    recruitmentProg,
    createdDate,
    createdBy,
    modifiedBy,
    modifiedDate,
  } = jobDetail || {};

  const handleApplyNow = (id: number) => {
    const isLoggedIn = !!getCookie();

    if (!isLoggedIn) {
      router.push("/login");
    } else
      showDialog({
        title: "Apply Now",
        content: <ApplyForm id={id} />,
        options: {
          hideActions: true,
        },
      });
  };

  return (
    <div className="flex flex-1 flex-col gap-5 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button isIconOnly variant="ioBordered" onPress={() => router.back()}>
            <ArrowLeft />
          </Button>
          <h3 className="text-lg font-semibold">{jobPostTitle}</h3>
        </div>
        <div>
          {!!userCV ? (
            <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm text-green-600">
              <CheckCheck />
              <p className="font-semibold">Applied</p>
            </div>
          ) : (
            <Button
              variant="ioSolid"
              onPress={() => handleApplyNow(jobPostId as number)}
            >
              Apply Now
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 rounded-lg border p-5 shadow-md">
        <div>
          <p className="text-sm font-semibold text-slate-700">
            Job Post Description:
          </p>
          <>
            {jobPostDes?.split(";")?.map((j, i) => {
              return (
                <div key={i} className="flex items-center gap-2">
                  <Dot />
                  <p className="text-sm text-slate-500">{j}</p>
                </div>
              );
            })}
          </>
        </div>
        <View label="Quantity Opening" value={quantityOpening} />
        <View label="Year Experience" value={yearExp} />
        <View label="Type" value={jobType} />
        <View label="Contract Type" value={contractType} />
        <View label="Level Des" value={levelDes} />
        <View label="Tech Stack Des" value={techStackDes} />
        <View label="Price Des" value={priceDes} />
        <View label="Deadline" value={formatValueOrNull(deadline)} />
        <View
          label="Recruitment Prog"
          value={formatValueOrNull(recruitmentProg)}
        />
        <View
          label="Create By"
          value={`${formatValueOrNull(createdBy)} - ${formatValueOrNull(formatDate(createdDate as string))}`}
        />
        <View
          label="Modify By"
          value={`${formatValueOrNull(modifiedBy)} - ${formatValueOrNull(formatDate(modifiedDate as string))}`}
        />
      </div>
    </div>
  );
};
