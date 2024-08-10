import ThereIsNothingMessage from "./ui/ThereIsNothingMessage";

export default function Favorites({
    index,
  }: Readonly<{ index: number }>) {
    return (
        <>
            <ThereIsNothingMessage index={index} />
        </>
    )
}