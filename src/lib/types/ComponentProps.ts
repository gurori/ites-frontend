import { Key, ForwardedRef } from "react";

export type ComponentProps = {
  children?: string;
  className?: string;
  onClick?: () => void;
  ref?: ForwardedRef<HTMLButtonElement>;
  key?: Key;
};
