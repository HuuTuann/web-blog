import { Icons } from "@/assets";
import { Button, View } from "@/components";
import { formatDate, formatValueOrNull } from "@/lib";
import { useGetBusinessUserDetail } from "@/queries";
import { Image, ScrollShadow } from "@heroui/react";
import { ArrowLeft, Dot } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export const DetailBusiness = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { businessDetail } = useGetBusinessUserDetail({
    params: { businessId: +id },
  });

  const {
    businessName,
    businessDes,
    businessSlogan,
    benefit,
    image,
    address,
    businessSize,
    contact,
    industryDes,
    website,
    createdDate,
    createdBy,
    modifiedBy,
    modifiedDate,
  } = businessDetail || {};

  return (
    <div className="flex flex-1 flex-col gap-5 p-5">
      <div className="flex items-center gap-2">
        <Button isIconOnly variant="ioBordered" onPress={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h3 className="text-lg font-semibold">{businessName}</h3>
      </div>
      <div className="flex justify-center">
        {image ? (
          <Image src={image} alt="Blog Image" className="w-full" />
        ) : (
          <Icons.NoImage size={128} />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 rounded-lg border p-5 shadow-md">
        <View label="Slogan" value={businessSlogan} />
        <View label="Size" value={businessSize} />
        <View label="Industry" value={industryDes} />
        <div className="flex items-start gap-2">
          <p className="text-sm font-semibold text-slate-700">Description:</p>
          <ScrollShadow className="max-h-40">
            <p className="text-sm text-slate-500">{businessDes}</p>
          </ScrollShadow>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700">Benefit:</p>
          <ScrollShadow className="max-h-80">
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
        <View label="Contact" value={formatValueOrNull(contact)} />
        <View label="Address" value={address} />
        <View label="Website" value={formatValueOrNull(website)} />
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
