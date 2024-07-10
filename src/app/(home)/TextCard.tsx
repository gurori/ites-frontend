import { FC, ReactNode } from "react";

const TextCard: FC<{
  title: string;
  description: string;
  children: ReactNode;
}> = ({ title, description, children }) => {
  return (
    <>
      <b className="text-purple">{title}</b>
      {children}
      <p className="py-4">{description}</p>
    </>
  );
};

export default TextCard;
