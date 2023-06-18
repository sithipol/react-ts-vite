// import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";

type Props = {
  navitem: Navbar;
};

export default function NavItems({ navitem }: Props) {
  return (
    <li className="inline-block">
      <Link className="text-white hover:text-gray-400" to={navitem.to}>
        {navitem.name}
      </Link>
    </li>
  );
}
