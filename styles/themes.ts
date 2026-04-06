export const theme = {
    colors: {
        // Current Perfect Match Brand Colors (from Tailwind config)
        primary: "#FF328F", // retropink-500 - main brand pink
        primaryLight: "#FFC8E3", // pmpink2-500, retropink-200 - light pink
        primaryForeground: "#ffffff",

        // Perfect Match Color Palette
        pmred: "#f30020", // pmred-500 - brand red
        pmblue: "#24438d", // pmblue-500 - brand blue
        pmblue2: "#C5E1EF", // pmblue2-500 - light blue
        pmblue2Dark: "#07154b", // pmblue2-800 - dark blue
        pmorange: "#FF7E55", // pmorange-500 - brand orange

        // Backgrounds
        background: "#ffffff",
        backgroundDim: "#f3f3f3",
        backgroundDimLight: "#f9f9f9",
        backgroundWhitesmoke: "whitesmoke",

        // Foreground / Text
        foreground: "#161616",
        textLight: "#ffffff",
        textDark: "#000000",

        // Updated Banner Theme with current colors
        banner: {
            gradientStart: "#07154b", // pmblue2-800
            gradientMid: "#24438d", // pmblue-500
            gradientEnd: "#FF328F", // primary pink
            subheadline: "#FFC8E3", // light pink
            highlight: "#FF7E55", // pmorange
            staggerText: "#FFC8E3", // light pink
            ctaText: "#07154b", // dark blue
            ctaBackground: "rgba(255, 255, 255, 0.95)",
            ctaHoverBackground: "#ffffff",
            irbText: "rgba(255, 255, 255, 0.8)",
        },

        // Updated Hearts/Matches Theme
        hearts: {
            layer1: "#FFC8E3", // light pink
            layer2: "#FF328F", // primary pink
            layer3: "#f30020", // red
            layer4: "#07154b", // dark blue
        },

        // Misc
        ticker: "#FF7E55", // orange
        tooltip: "#24438d", // blue
    },

    fonts: {
        // Typography
        body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        main: "'Work Sans', sans-serif",
        heading: "'Dela Gothic One', sans-serif",
        sans: "'DM Sans', sans-serif",
        pixel: "'Press Start 2P', cursive",
        mono: "'Lucida Sans Typewriter', 'Lucida Console', monaco, 'Bitstream Vera Sans Mono', monospace",
    },

    spacing: {
        baseUnit: "8px", // --base-unit
    },

    shadows: {
        banner: "0px 4px 8px 0px rgba(0, 0, 0, 0.25), 18px 12px 0px 0px #5A1A35",
        ctaButton: "0 4px 15px rgba(0, 0, 0, 0.2)",
        ctaButtonHover: "0 6px 20px rgba(0, 0, 0, 0.3)",
        heartLayer:
            "0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072)",
        textShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
    },

    gradients: {
        bannerBackground: "linear-gradient(135deg, #5A1A35 0%, #8B2D52 50%, #C44569 100%)",
    },

    animations: {
        float: "float 8s ease-in-out infinite",
        floatReverse: "float 10s ease-in-out infinite reverse",
        pulse: "pulse 3s ease-in-out infinite",
        slideIn: "slideIn 0.8s ease-out",
        wiggle: "wiggle 2s ease-in-out infinite",
        heartbeat: "hbeat 1.5s linear 10",
        heartbeatFade: "hbeat2 2s 1 linear forwards",
    },
} as const;

export type Theme = typeof theme;
