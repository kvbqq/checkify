import { ReactNode } from "react";

export default function BigButton({
  icon,
  text,
  style,
  onClick,
}: {
  icon: ReactNode;
  text: string;
  style: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`w-42 h-42 flex flex-col justify-center gap-2 items-center rounded-xl text-white-bg ${style}`}
      onClick={onClick}
    >
      {icon}
      <p>{text}</p>
    </button>
  );
}
