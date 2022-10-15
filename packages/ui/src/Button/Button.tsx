import React from "react";
import c from "clsx";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children, className, ...rest } = props;
    return (
      <button
        ref={ref}
        className={c("rounded-md bg-white px-4 py-1 text-black", "font-mono")}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
