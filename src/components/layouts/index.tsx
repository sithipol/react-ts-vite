import React from "react";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export default function index({ children }: Props) {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        {/* {children} */}
        <div className="md">{children}</div>
      </div>
    </div>
  );
}
