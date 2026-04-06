import React from "react";

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    bgColor?: "bg-pmred-500" | "bg-red-500" | "bg-blue-500" | "bg-white" | string;
    textColor?: "text-white" | "text-black" | "text-red" | "text-pmred-500" | string;
    px?: number;
    py?: number;
    mt?: number;
    border?: number;
    shadowWidth?: number;
    bold?: boolean;
    className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children = "",
            onClick,
            bgColor = "bg-white",
            textColor = "text-pmred-500",
            px = 6,
            py = 2,
            mt = 6,
            border = 4,
            shadowWidth = 6,
            bold = true,
            className = "",
        },
        ref,
    ) => {
        return (
            <button
                ref={ref}
                onClick={onClick}
                className={`
                    mt-${mt}
                    px-${px}
                    py-${py}
                    rounded-full
                    ${bgColor}
                    ${textColor}
                    border-${border}
                    border-pmblue-500 
                    ${bold ? "font-bold" : "font-medium"}
                    shadow-[${shadowWidth}px_${shadowWidth}px_0px_0px_rgba(36,67,141,1)]
                    transition-all
                    hover:translate-x-[4px]
                    hover:translate-y-[4px]
                    hover:shadow-[${shadowWidth - 4}px_${shadowWidth - 4}px_0px_0px_rgba(36,67,141,1)]
                    active:translate-x-[6px]
                    active:translate-y-[6px] 
                    active:shadow-none 
                    ${className}
                `}
            >
                {children}
            </button>
        );
    },
);

Button.displayName = "Button";

export default Button;
