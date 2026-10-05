import type { YearStats } from './types';

// Anonymous aggregates of completed 2025 surveys. Every figure covers at least 10 people.
const stats2025: YearStats = {
    year: 2025,
    respondents: 3860,
    tiles: [
        { value: '3,860', label: 'surveys completed' },
        { value: '10,699', label: 'matches made' },
        { value: '20', label: 'mutual crushes' },
        { value: '48%', label: 'go to bed at 1 AM or later' },
    ],
    stories: [
        {
            headline: '82% of you would rather walk than take the bus.',
            chart: {
                kind: 'versus',
                title: 'This or that?',
                rows: [
                    {
                        a: { label: 'Olin', pct: 53, n: 2059, of: 3860 },
                        b: { label: 'Uris', pct: 47, n: 1801, of: 3860 },
                    },
                    {
                        a: { label: 'North', pct: 53, n: 2043, of: 3860 },
                        b: { label: 'West', pct: 47, n: 1817, of: 3860 },
                    },
                    {
                        a: { label: 'Trillium', pct: 58, n: 2250, of: 3860 },
                        b: { label: 'Terrace', pct: 42, n: 1610, of: 3860 },
                    },
                    {
                        a: { label: 'Fall', pct: 53, n: 2040, of: 3860 },
                        b: { label: 'Spring', pct: 47, n: 1820, of: 3860 },
                    },
                    {
                        a: { label: 'Walk', pct: 82, n: 3158, of: 3860 },
                        b: { label: 'Bus', pct: 18, n: 702, of: 3860 },
                    },
                ],
            },
        },
        {
            headline: '79% of freshmen picked North.',
            blurb: 'Only 34% of juniors did.',
            chart: {
                kind: 'ranked',
                title: 'North or West?',
                note: 'Share who picked North, by class year.',
                highlight: 'Freshmen',
                bars: [
                    { label: 'Freshmen', pct: 79, n: 855, of: 1085 },
                    { label: 'Sophomores', pct: 49, n: 475, of: 979 },
                    { label: 'Juniors', pct: 34, n: 254, of: 737 },
                    { label: 'Seniors', pct: 44, n: 357, of: 819 },
                    { label: 'Grad students', pct: 43, n: 63, of: 148 },
                ],
            },
        },
        {
            headline: '12% of Greek life members say Greek life is the biggest red flag.',
            blurb: '36% of everyone else does.',
            chart: {
                kind: 'ranked',
                title: 'What club is the biggest red flag?',
                note: 'The chart shows answers from all participants.',
                highlight: 'Greek life',
                bars: [
                    { label: 'Business club or frat', pct: 33, n: 1286, of: 3860 },
                    { label: 'Greek life', pct: 31, n: 1190, of: 3860 },
                    { label: 'Perfect Match team', pct: 12, n: 482, of: 3860 },
                    { label: 'Engineering project team', pct: 12, n: 451, of: 3860 },
                    { label: 'Performance club (dance, a cappella)', pct: 12, n: 451, of: 3860 },
                ],
            },
        },
        {
            headline: '46% of you say the worst place for a first kiss is the Okenshields wok line.',
            chart: {
                kind: 'ranked',
                title: 'Worst place to have your first kiss?',
                highlight: 'Okenshields wok line',
                bars: [
                    { label: 'Okenshields wok line', pct: 46, n: 1789, of: 3860 },
                    { label: 'Uris G01 in a full lecture', pct: 20, n: 775, of: 3860 },
                    { label: 'Barton Hall during career fair', pct: 16, n: 629, of: 3860 },
                    { label: 'Duffield during project team fest', pct: 9, n: 360, of: 3860 },
                    { label: '7-Eleven after Level B', pct: 8, n: 307, of: 3860 },
                ],
            },
        },
        {
            headline: '33% of you say the biggest ick is owning spiritual crystals.',
            chart: {
                kind: 'ranked',
                title: "What's your biggest ick in a relationship?",
                highlight: 'Owns spiritual crystals',
                bars: [
                    { label: 'Owns spiritual crystals', pct: 33, n: 1277, of: 3859 },
                    { label: 'Bad tipper', pct: 28, n: 1077, of: 3859 },
                    { label: 'Claps when the plane lands', pct: 20, n: 759, of: 3859 },
                    { label: "Calls their favorite sports team 'we'", pct: 11, n: 428, of: 3859 },
                    { label: 'From Westchester', pct: 8, n: 318, of: 3859 },
                ],
            },
        },
        {
            headline: '54% of men and 47% of women say quality time is their most important love language.',
            chart: {
                kind: 'groups',
                title: "What's your most important love language?",
                groups: [
                    { name: 'Men', base: 1432 },
                    { name: 'Women', base: 2315 },
                ],
                rows: [
                    { label: 'Quality time', pcts: [54, 47], ns: [778, 1081] },
                    { label: 'Physical touch', pcts: [27, 16], ns: [381, 381] },
                    { label: 'Acts of service', pcts: [7, 21], ns: [98, 475] },
                    { label: 'Words of affirmation', pcts: [6, 10], ns: [84, 242] },
                    { label: 'Receiving gifts', pcts: [1, 2], ns: [12, 48] },
                ],
            },
        },
        {
            headline: '42% of introverts want a partner who is more extroverted than they are.',
            blurb: 'Only 7% of extroverts want one who is less extroverted.',
            chart: {
                kind: 'groups',
                title: 'I prefer my partner to be...',
                note: 'Introverts rated themselves 1 to 5 on a 10-point scale, and extroverts 6 to 10.',
                groups: [
                    { name: 'Introverts', base: 1483 },
                    { name: 'Extroverts', base: 2377 },
                ],
                rows: [
                    { label: 'More extroverted than me', pcts: [42, 18], ns: [630, 438] },
                    { label: 'The same as me', pcts: [12, 26], ns: [177, 622] },
                    { label: 'Less extroverted than me', pcts: [2, 7], ns: [32, 165] },
                    { label: "It doesn't matter", pcts: [43, 48], ns: [644, 1152] },
                ],
            },
        },
        {
            headline: '44% of freshmen have a Rice Purity score of 81 or higher.',
            blurb: '24% of seniors do.',
            chart: {
                kind: 'ranked',
                title: 'What is your Rice Purity Score?',
                note: 'Share who scored 81 to 100, by class year, among participants who shared a score.',
                highlight: 'Freshmen',
                bars: [
                    { label: 'Freshmen', pct: 44, n: 447, of: 1006 },
                    { label: 'Sophomores', pct: 43, n: 395, of: 912 },
                    { label: 'Juniors', pct: 31, n: 206, of: 671 },
                    { label: 'Seniors', pct: 24, n: 183, of: 757 },
                    { label: 'Grad students', pct: 26, n: 34, of: 129 },
                ],
            },
        },
    ],
};

export default stats2025;
