import React from 'react';

const YEAR = 2027;
const MONTH = 1;
const VALENTINES_DAY = 14;
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const ReturnCalendar: React.FC = () => {
    const firstDay = new Date(YEAR, MONTH, 1);
    const monthName = firstDay.toLocaleString('en-US', { month: 'long' });
    const daysInMonth = new Date(YEAR, MONTH + 1, 0).getDate();
    const cells: (number | null)[] = [
        ...Array(firstDay.getDay()).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    return (
        <div
            className="relative z-10 w-full max-w-[17rem] sm:max-w-[21rem] -rotate-2"
            role="img"
            aria-label={`${monthName} ${YEAR} calendar with Valentine's Day marked`}
        >
            <div className="absolute -top-4 left-0 w-full flex justify-center space-x-24 z-20">
                <div className="w-4 h-9 bg-retropink-500 border-2 border-blue-900 rounded-xl" />
                <div className="w-4 h-9 bg-retropink-500 border-2 border-blue-900 rounded-xl" />
            </div>
            <div className="bg-[#FBE7F3] rounded-3xl p-4 sm:p-5 border-blue-900 border-4">
                <div className="bg-[#00162F] rounded-lg pt-7 pb-5 text-center font-press-start">
                    <div className="text-white text-lg sm:text-2xl">{monthName}</div>
                    <div className="text-retropink-200 text-xs sm:text-sm mt-3">{YEAR}</div>
                </div>
                <div className="grid grid-cols-7 gap-y-3 sm:gap-y-4 mt-5 mb-1 text-center font-press-start text-[10px] sm:text-xs text-pmblue-500">
                    {WEEKDAYS.map((day, i) => (
                        <span key={`weekday-${i}`} className="text-retropink-500">{day}</span>
                    ))}
                    {cells.map((day, i) =>
                        day === VALENTINES_DAY ? (
                            <span key={i} className="relative flex items-center justify-center text-white">
                                <svg
                                    className="absolute w-9 sm:w-11 text-pmred-500"
                                    viewBox="0 0 7 6"
                                    shapeRendering="crispEdges"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M1 0h2v1H1zM4 0h2v1H4zM0 1h7v2H0zM1 3h5v1H1zM2 4h3v1H2zM3 5h1v1H3z" />
                                </svg>
                                <span className="relative -top-0.5">{day}</span>
                            </span>
                        ) : (
                            <span key={i}>{day}</span>
                        )
                    )}
                </div>
            </div>
            <div className="bg-retropink-500 w-full h-full -z-20 absolute top-[4%] left-[3%] rounded-3xl" />
        </div>
    );
};

export default ReturnCalendar;
