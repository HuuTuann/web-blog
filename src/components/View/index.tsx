import { formatValueOrNull } from "@/lib";

type Props = {
  label: string;
  value: string | number | boolean | null | undefined;
};

export const View = ({ label, value }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-semibold">{label}</span>
      <span>{formatValueOrNull(value)}</span>
    </div>
  );
};
