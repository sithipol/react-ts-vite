// import logo from "@/assets/react.svg";
import React from "react";
type Props = {
  children: React.ReactNode;
};

export default function LoginPage({ children }: Props) {
  return (
    <div>
      {/* LoginPage
      <img src={logo} alt="" /> */}
      {children}
    </div>
  );
}
