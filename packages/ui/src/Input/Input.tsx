import React from "react";
import c from "clsx";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <input
        className={c(
          "rounded-md bg-white px-4 py-2 text-base text-black outline-none",
          "font-mono",
          className
        )}
        ref={ref}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";
