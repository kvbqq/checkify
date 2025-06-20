export default function Counter({
  value,
  title,
  style,
}: {
  value: number;
  title: string;
  style: string;
}) {
  return (
    <div
      className={`w-42 h-42 flex flex-col justify-end rounded-xl text-white-bg ${style}`}
    >
      <h1 className="w-full h-full flex items-center justify-center text-6xl font-bold">
        {value.toString().padStart(2, "0")}
      </h1>
      <p className="w-full p-2 text-center bg-white/20">{title}</p>
    </div>
  );
}
