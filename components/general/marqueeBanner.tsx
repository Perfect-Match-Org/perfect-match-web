interface MarqueeBannerProps {
    text: string;
    separator?: string;
    repeatCount?: number;
    /** Speed in pixels per second */
    speed?: number;
}

const MarqueeBanner = ({
    text,
    separator = '❤︎',
    repeatCount = 10,
    speed = 70, // pixels per second
}: MarqueeBannerProps) => {
    // Calculate duration based on text length for consistent speed
    // Approximate character width ~16px, plus separator ~20px, plus margin ~8px
    const itemWidth = (text.length * 16) + 20 + 8;
    const totalWidth = itemWidth * repeatCount;
    const duration = totalWidth / speed;

    return (
        <div className="bg-pmred-500 overflow-hidden whitespace-nowrap py-2">
            <div
                className="animate-marquee inline-flex"
                style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
            >
                {Array(2).fill(0).map((_, i) => (
                    Array(repeatCount).fill(0).map((_, j) => (
                        <span key={`${i}-${j}`} className="inline-flex items-center text-white font-dm-sans font-bold text-3xl ml-2">
                            <span>{text}</span>
                            <span className="text-white font-bold text-sm ml-2">{separator}</span>
                        </span>
                    ))
                ))}
            </div>
        </div>
    );
};

export default MarqueeBanner;
