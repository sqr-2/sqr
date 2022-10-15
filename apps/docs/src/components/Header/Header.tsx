import React from "react";
import { Logo } from "src/components/Logo";

export const Header = () => {
  return (
    <div className="flex h-16 w-full items-center gap-4">
      <Logo />
      <span className="font-mono text-3xl"></span>
    </div>
  );
};
