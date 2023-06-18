import React from "react";

type Props = {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Inputs({ value, handleChange }: Props) {
  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
}
