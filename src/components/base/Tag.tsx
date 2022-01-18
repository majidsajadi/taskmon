import classNames from "classnames";

type TagProps = {
  status: string;
};

export function Tag({ status }: TagProps) {
  let color: string;
  switch (status) {
    case "Active":
      color = "bg-blue-500";
      break;
    case "Failed":
      color = "bg-red-500";
      break;
    case "Completed":
      color = "bg-emerald-500";
      break;
    case "Waiting":
      color = "bg-yellow-300";
      break;
    case "Delayed":
      color = "bg-green-500";
      break;
    case "Paused":
      color = "bg-violet-500";
      break;
    default:
      color = "";
      break;
  }

  const wrapperCLS = classNames(
    "border rounded p-1 flex items-center space-x-2 justify-center text-sm font-semibold"
  );
  const dotCLS = classNames("w-2 h-2 rounded-full", color);

  return (
    <div className={wrapperCLS}>
      <div className={dotCLS} />
      <span>{status}</span>
    </div>
  );
}
