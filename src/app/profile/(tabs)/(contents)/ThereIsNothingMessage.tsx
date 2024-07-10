type ThereIsNothingMessageProps = {
  children: string;
  emoji?: string;
};

export default function ThereIsNothingMessage({
  emoji,
  children,
}: ThereIsNothingMessageProps) {
  return (
    <div className="center gap-2 h-full text-white">
      <p>{children}</p>
      <p className="whitespace-nowrap">{emoji}</p>
    </div>
  );
}
