import type { JSXElementConstructor, ReactElement } from "react";

export type JSXElement = ReactElement<any, string | JSXElementConstructor<any>>;