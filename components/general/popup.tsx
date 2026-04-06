import React, { useEffect, useRef } from "react";
import { useFloating, offset, arrow, FloatingArrow, useTransitionStyles, shift, autoUpdate } from "@floating-ui/react";

interface PopupProps {
    triggerRef: React.RefObject<HTMLElement>;
    children: React.ReactNode;
    open: boolean;
    placement?: "top" | "bottom" | "left" | "right";
    arrowWidth?: number;
    arrowHeight?: number;
}

const Popup: React.FC<PopupProps> = ({ triggerRef, children, open, placement = "bottom", arrowWidth = 20, arrowHeight = 16 }) => {
    const arrowRef = useRef(null);

    const {
        x,
        y,
        strategy,
        update,
        context,
        middlewareData,
        floatingStyles,
        refs: { floating, setReference, setFloating },
    } = useFloating({
        placement,
        open: open,
        middleware: [offset(arrowHeight), shift(), arrow({ element: arrowRef })],
    });

    const arrowX = middlewareData.arrow?.x ?? 0;
    const arrowY = middlewareData.arrow?.y ?? 0;
    const transformX = arrowX + arrowWidth / 2;
    const transformY = arrowY + arrowHeight;

    useEffect(() => {
        if (triggerRef.current) {
            setReference(triggerRef.current);
        }
    }, [triggerRef, setReference]);

    useEffect(() => {
        if (open && triggerRef.current && floating.current) {
            return autoUpdate(triggerRef.current, floating.current, update);
        }
    }, [open, triggerRef, floating, update]);

    const { isMounted, styles } = useTransitionStyles(context, {
        initial: {
            transform: "scale(0)",
        },
        common: ({ side }) => ({
            transformOrigin: {
                top: `${transformX}px calc(100% + ${arrowHeight}px)`,
                bottom: `${transformX}px ${-arrowHeight}px`,
                left: `calc(100% + ${arrowHeight}px) ${transformY}px`,
                right: `${-arrowHeight}px ${transformY}px`,
            }[side],
        }),
    });

    return (
        <>
            {isMounted && (
                <div ref={setFloating} style={floatingStyles}>
                    <div style={styles}>
                        <FloatingArrow ref={arrowRef} context={context} width={arrowWidth} height={arrowHeight} fill="#24438d" />
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Popup;
