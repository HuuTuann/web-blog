import { UserOption, UserParams } from "@/constants";
import { useDebounce } from "@/hooks";
import { Input, Select, SelectItem } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import UserHelpers from "../helpers";

const UserSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get(UserParams.SEARCH) || "",
  );
  const debouncedSearch = useDebounce(search, 500);

  const handleChangeParam = (key: string, value: string) => {
    const param = new URLSearchParams(searchParams.toString());
    if (value) {
      param.set(key, value);
    } else {
      param.delete(key);
    }

    router.replace(`?${param.toString()}`);
  };

  useEffect(() => {
    handleChangeParam(UserParams.SEARCH, debouncedSearch);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  useEffect(() => {
    const currentOption = searchParams.get(UserParams.OPTION);

    if (!currentOption) {
      router.push(`?${UserParams.OPTION}=${UserOption.BLOG}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full gap-2">
      <Input
        label="Search"
        labelPlacement="outside"
        placeholder="Search..."
        variant="bordered"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        classNames={{
          label: "text-2xl font-bold",
        }}
      />
      <Select
        aria-label="select user option"
        defaultSelectedKeys={[
          searchParams.get(UserParams.OPTION) || UserOption.BLOG,
        ]}
        variant="bordered"
        className="w-36"
        disallowEmptySelection
        onSelectionChange={(selection) => {
          const selectedOption = Array.from(selection)?.[0] as string;
          handleChangeParam(UserParams.OPTION, selectedOption);
        }}
      >
        {UserHelpers.options.map(({ label, value }) => (
          <SelectItem key={value}>{label}</SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default UserSearch;
