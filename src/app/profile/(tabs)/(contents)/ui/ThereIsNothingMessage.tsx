export default function ThereIsNothingMessage({
  index,
}: Readonly<{ index: number }>) {
  const { message, emoji } = {
    0: { message: "Тут ничего нету.", emoji: "¯\\_(ツ)_/¯" },
    1: { message: "И тут... Ничего нету.", emoji: "(*μ_μ)" },
    2: { message: "Удивительно, но тут ничего нету.", emoji: "(° -°)" },
    3: { message: "Однако, тут ничего нету.", emoji: "(:\\/)" },
    4: { message: "Тут правда ничего нету?", emoji: "(＃￣ω￣)" },
  }[index]!;
  return (
    <div className="center gap-2 h-full text-white pb-40">
      <p>{message}</p>
      <p className="whitespace-nowrap">{emoji}</p>
    </div>
  );
}
