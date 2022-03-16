import React, { MouseEventHandler, ReactNode } from "react";

type Props = {
  onClickFn?: MouseEventHandler<HTMLButtonElement>;
  disable?: boolean;
  children: ReactNode | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  classname?: string;
  secondery?: boolean;
};

export default function Button({
  onClickFn,
  disable,
  children,
  type,
  classname,
  secondery = false,
}: Props): JSX.Element {
  return (
    <button
      onClick={onClickFn}
      className={`bg-gray-900 disabled:bg-gray-100 focus:outline-none focus:bg-slate-600 hover:bg-slate-600  rounded-lg font-medium text-white px-5 py-2 ${
        secondery && "bg-indigo-600"
      } capitalize ${classname}`}
      disabled={disable}
      type={type}
    >
      {children}
    </button>
  );
}
