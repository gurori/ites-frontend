import ThereIsNothingMessage from "./ui/ThereIsNothingMessage";

export default function Completed({
    index,
  }: Readonly<{ index: number }>) {
    return (
        <>
            <ThereIsNothingMessage index={index} />
        </>
    )
}