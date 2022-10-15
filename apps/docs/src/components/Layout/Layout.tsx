import React from "react";
import { Header } from "src/components/Header";

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex min-h-screen min-w-full flex-col px-8 font-mono text-white">
      <div className="mb-2 flex w-full">
        <Header />
      </div>
      {children}
    </div>
  );
};
