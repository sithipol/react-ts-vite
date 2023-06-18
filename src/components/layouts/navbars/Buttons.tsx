import React from "react";
// import { ButtonType } from "./Button";

type Props = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void;
  name: string;
};

export default function Buttons({ handleClick, name }: Props) {
  //   console.log(button);
  return (
    <button
      onClick={(event) => handleClick(event, 1)}
      className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded-md md:ml-8 hover:bg-indigo-400 duration-500"
    >
      {name}
    </button>
  );
}
