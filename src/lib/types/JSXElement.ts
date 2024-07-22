import { type JSXElementConstructor, type ReactElement } from "react";

export type JSXElement = ReactElement<any, string | JSXElementConstructor<any>>;