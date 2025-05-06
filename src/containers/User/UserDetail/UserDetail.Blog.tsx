import { Icons } from "@/assets";
import { Button, View } from "@/components";
import { formatDate, formatValueOrNull } from "@/lib";
import { useGetBlogUserDetail } from "@/queries";
import { Image, ScrollShadow } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export const DetailBlog = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { blogDetail } = useGetBlogUserDetail({
    params: { blogId: +id },
  });

  const {
    content,
    title,
    createdAt,
    createdBy,
    modifiedBy,
    modifiedAt,
    image,
  } = blogDetail || {};
  return (
    <div className="flex flex-1 flex-col gap-5 p-5">
      <div className="flex items-center gap-2">
        <Button isIconOnly variant="ioBordered" onPress={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="flex justify-center">
        {image ? (
          <Image src={image} alt="Blog Image" className="w-full" />
        ) : (
          <Icons.NoImage size={128} />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 rounded-lg border p-5 shadow-md">
        <div>
          <p className="text-sm font-semibold text-slate-700">Content:</p>
          <ScrollShadow className="max-h-80">
            <p className="text-sm text-slate-500">{content}</p>
          </ScrollShadow>
        </div>
        <View
          label="Create By"
          value={`${formatValueOrNull(createdBy)} - ${formatValueOrNull(formatDate(createdAt as string))}`}
        />
        <View
          label="Modify By"
          value={`${formatValueOrNull(modifiedBy)} - ${formatValueOrNull(formatDate(modifiedAt as string))}`}
        />
      </div>
    </div>
  );
};
