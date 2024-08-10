import ThereIsNothingMessage from "./ui/ThereIsNothingMessage";

export default function MyWorks({
    index,
  }: Readonly<{ index: number }>) {
    return (
        <>
            <ThereIsNothingMessage index={index} />
        </>
    )
}