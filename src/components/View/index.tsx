import { formatValueOrNull } from "@/lib";

type Props = {
  label: string;
  value?: string | number | boolean | null | undefined;
  children?: React.ReactNode;
};

export const View = ({ label, value, children }: Props) => {
  return (
    <div className="flex gap-1 text-sm">
      <p className="font-semibold text-slate-700">{`${label}:`}</p>
      {!!value ? (
        <p className="text-slate-500">{formatValueOrNull(value)}</p>
      ) : (
        children
      )}
    </div>
  );
};
