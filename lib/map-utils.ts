import { Children, ReactNode } from "react";

interface MapUtilsInterface<T> {
  of: T[];
  render: (item: T, index: number) => JSX.Element;
}

export const MapUtils = <T>({ of, render }: MapUtilsInterface<T>): ReactNode =>
  Children.toArray(of.map((item, index) => render(item, index)));
