import { Button } from "@/components";
import { formatDate, formatValueOrNull } from "@/lib";
import { useGetBlogsUser } from "@/queries";
import { Image, Pagination, ScrollShadow, Spinner } from "@heroui/react";
import { useEffect } from "react";

type Props = {
  searchParams: string;
};
export const BodyBlog = ({ searchParams }: Props) => {
  const {
    blogs,
    blogsParams,
    totalPagesBlogs,
    isLoadingBlogs,
    setBlogsParams,
  } = useGetBlogsUser();

  useEffect(() => {
    setBlogsParams((prev) => ({
      ...prev,
      ...(!!searchParams ? { search: searchParams } : {}),
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handlePageNoChange = (pageNo: number) => {
    setBlogsParams((prev) => ({
      ...prev,
      pageNo,
    }));
  };

  if (isLoadingBlogs) return <Spinner size="lg" />;

  return (
    <div className="flex w-full flex-col items-center gap-5">
      {blogs.map((blog) => {
        const {
          blogId,
          content,
          title,
          createdAt,
          createdBy,
          modifiedBy,
          modifiedAt,
          image,
        } = blog;

        return (
          <div
            key={blogId}
            className="flex w-full items-start gap-5 rounded-lg border p-5 shadow-sm hover:shadow-md"
          >
            <div className="flex">
              <Image src={image} alt="Blog Image" className="w-32" />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <h3 className="text-lg font-semibold">{title}</h3>
              <ScrollShadow className="max-h-40">
                <p className="text-sm text-slate-500">{content}</p>
              </ScrollShadow>
              <div className="flex w-full items-center justify-between">
                <div className="text-bold text-small text-slate-400">
                  <p>{`Create By: ${formatValueOrNull(createdBy)} - ${formatValueOrNull(formatDate(createdAt))}`}</p>
                  <p>{`Modify By: ${formatValueOrNull(modifiedBy)} - ${formatValueOrNull(formatDate(modifiedAt))}`}</p>
                </div>
                <Button variant="ioSolid">View Detail</Button>
              </div>
            </div>
          </div>
        );
      })}
      <Pagination
        key={`pagination-${totalPagesBlogs}-${blogsParams?.pageNo}`}
        aria-label="page-no"
        showControls
        initialPage={blogsParams?.pageNo}
        total={totalPagesBlogs}
        onChange={handlePageNoChange}
      />
    </div>
  );
};
