import ThereIsNothingMessage from "./ui/ThereIsNothingMessage";

export default function Achievements({
    index,
  }: Readonly<{ index: number }>) {
    return (
        <>
            <ThereIsNothingMessage index={index} />
        </>
    )
}