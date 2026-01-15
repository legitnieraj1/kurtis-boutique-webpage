"use client";

import classNames from "classnames";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
    firstColor = "242, 0, 137",
    secondColor = "209, 0, 209",
    thirdColor = "161, 0, 242",
    fourthColor = "45, 0, 247",
    fifthColor = "242, 0, 137",
    pointerColor = "209, 0, 209",
    size = "80%",
    blendingValue = "hard-light",
    children,
    className,
    interactive = true,
    containerClassName,
}: {
    gradientBackgroundStart?: string;
    gradientBackgroundEnd?: string;
    firstColor?: string;
    secondColor?: string;
    thirdColor?: string;
    fourthColor?: string;
    fifthColor?: string;
    pointerColor?: string;
    size?: string;
    blendingValue?: string;
    children?: React.ReactNode;
    className?: string;
    interactive?: boolean;
    containerClassName?: string;
}) => {
    const interactiveRef = useRef<HTMLDivElement>(null);

    const curXRef = useRef(0);
    const curYRef = useRef(0);
    const tgXRef = useRef(0);
    const tgYRef = useRef(0);
    const animationFrameRef = useRef<number | null>(null);

    const [isSafari, setIsSafari] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Using simple logic instead of next-themes for now to avoid provider issues if not wrapped
    // Defaulting to light theme colors for this boutique
    const theme = "light";

    useEffect(() => {
        setMounted(true); // Hydration mismatch fix
    }, []);

    const gradientBackgroundStart = "rgb(255, 255, 255)"; // Light background
    const gradientBackgroundEnd = "rgb(253, 251, 247)";   // Ivory/Cream

    useEffect(() => {
        document.body.style.setProperty(
            "--gradient-background-start",
            gradientBackgroundStart
        );
        document.body.style.setProperty(
            "--gradient-background-end",
            gradientBackgroundEnd
        );
        // Adjusted colors for the boutique aesthetic (Gold/Rose/Beige instead of harsh purples)
        // Overriding props if not passed, or standardizing
        // Actually, sticking to prompts logic but maybe softening defaults? 
        // The user passed defaults in the component definition. I will respect them but local overrides might look better.
        // I'll stick to what was provided in the snippet to ensure it works as requested.
        document.body.style.setProperty("--first-color", firstColor);
        document.body.style.setProperty("--second-color", secondColor);
        document.body.style.setProperty("--third-color", thirdColor);
        document.body.style.setProperty("--fourth-color", fourthColor);
        document.body.style.setProperty("--fifth-color", fifthColor);
        document.body.style.setProperty("--pointer-color", pointerColor);
        document.body.style.setProperty("--size", size);
        document.body.style.setProperty("--blending-value", blendingValue);
    }, [
        gradientBackgroundStart,
        gradientBackgroundEnd,
        firstColor,
        secondColor,
        thirdColor,
        fourthColor,
        fifthColor,
        pointerColor,
        size,
        blendingValue,
    ]);

    useEffect(() => {
        setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
    }, []);

    useEffect(() => {
        if (!interactive) return;

        function animateMovement() {
            if (!interactiveRef.current) {
                animationFrameRef.current = requestAnimationFrame(animateMovement);
                return;
            }

            curXRef.current =
                curXRef.current + (tgXRef.current - curXRef.current) / 20;
            curYRef.current =
                curYRef.current + (tgYRef.current - curYRef.current) / 20;

            if (interactiveRef.current) {
                interactiveRef.current.style.transform = `translate(${Math.round(
                    curXRef.current
                )}px, ${Math.round(curYRef.current)}px)`;
            }

            animationFrameRef.current = requestAnimationFrame(animateMovement);
        }

        animateMovement();

        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [interactive]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!interactiveRef.current) return;

        const rect = interactiveRef.current.getBoundingClientRect();
        tgXRef.current = event.clientX - rect.left;
        tgYRef.current = event.clientY - rect.top;
    };

    if (!mounted) return null;

    return (
        <div
            className={classNames(
                "h-screen w-screen relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
                containerClassName
            )}
        >
            <svg className="hidden">
                <defs>
                    <filter id="blurMe">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="10"
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                            result="goo"
                        />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>
            <div className={classNames(className, "relative z-10")}>{children}</div>
            <div
                className={classNames(
                    "gradients-container h-full w-full blur-lg absolute inset-0 z-0",
                    isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
                )}
            >
                <div
                    className={classNames(
                        `absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.8)_0,_rgba(var(--first-color),_0)_50%)_no-repeat]`,
                        `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                        `[transform-origin:center_center]`,
                        `animate-first`,
                        `opacity-100`
                    )}
                ></div>
                <div
                    className={classNames(
                        `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
                        `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                        `[transform-origin:calc(50%-400px)]`,
                        `animate-second`,
                        `opacity-100`
                    )}
                ></div>
                <div
                    className={classNames(
                        `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
                        `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                        `[transform-origin:calc(50%+400px)]`,
                        `animate-third`,
                        `opacity-100`
                    )}
                ></div>
                <div
                    className={classNames(
                        `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
                        `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                        `[transform-origin:calc(50%-200px)]`,
                        `animate-fourth`,
                        `opacity-70`
                    )}
                ></div>
                <div
                    className={classNames(
                        `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
                        `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                        `[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
                        `animate-fifth`,
                        `opacity-100`
                    )}
                ></div>

                {interactive && (
                    <div
                        ref={interactiveRef}
                        onMouseMove={handleMouseMove}
                        className={classNames(
                            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
                            `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`,
                            `opacity-70`
                        )}
                    ></div>
                )}
            </div>
        </div>
    );
};
