import type { YearStats } from './types';

// Anonymous aggregates of completed 2026 surveys. Every figure covers at least 10 people.
const stats2026: YearStats = {
    year: 2026,
    respondents: 3458,
    tiles: [
        { value: '3,458', label: 'surveys completed' },
        { value: '10,120', label: 'matches made' },
        { value: '14', label: 'mutual crushes' },
        { value: '2,408', label: 'pokes sent to matches' },
    ],
    stories: [
        {
            headline: '53% of you say the biggest red flag is someone who sees you in public and pretends not to.',
            chart: {
                kind: 'ranked',
                title: 'Biggest red flag?',
                highlight: 'Sees you in public and pretends not to',
                bars: [
                    { label: 'Sees you in public and pretends not to', pct: 53, n: 1846, of: 3458 },
                    { label: 'Mentions their ex on the first date', pct: 18, n: 615, of: 3458 },
                    { label: 'Forgets to introduce you to friends', pct: 11, n: 382, of: 3458 },
                    { label: 'Only texts after 11 PM', pct: 11, n: 365, of: 3458 },
                    { label: 'Disappears during prelim week', pct: 7, n: 250, of: 3458 },
                ],
            },
        },
        {
            headline: '51% of you get the ick from "I don\'t really believe in labels."',
            chart: {
                kind: 'ranked',
                title: 'Which sentence would give you the ick immediately?',
                highlight: "I don't really believe in labels",
                bars: [
                    { label: "I don't really believe in labels", pct: 51, n: 1759, of: 3458 },
                    { label: "Let's move our date, I have a coffee chat", pct: 30, n: 1050, of: 3458 },
                    { label: "I can't wait to get out of here", pct: 12, n: 399, of: 3458 },
                    { label: "I'm just really busy this week with prelims", pct: 7, n: 250, of: 3458 },
                ],
            },
        },
        {
            headline: '44% of you say performance clubs are the biggest green flag.',
            blurb: '44% of project team members picked project teams. 23% of everyone else did.',
            chart: {
                kind: 'ranked',
                title: 'What club is the biggest green flag?',
                highlight: 'Performance club (dance, a cappella)',
                bars: [
                    { label: 'Performance club (dance, a cappella)', pct: 44, n: 1513, of: 3458 },
                    { label: 'Engineering project team', pct: 28, n: 976, of: 3458 },
                    { label: 'Business club or frat', pct: 15, n: 527, of: 3458 },
                    { label: 'Greek life', pct: 7, n: 259, of: 3458 },
                    { label: 'Perfect Match team', pct: 5, n: 183, of: 3458 },
                ],
            },
        },
        {
            headline: '45% of you say political differences are a deal breaker.',
            chart: {
                kind: 'ranked',
                title: 'What is a deal breaker for you?',
                note: 'Participants could choose more than one.',
                highlight: 'Difference in political views',
                bars: [
                    { label: 'Difference in political views', pct: 45, n: 1568, of: 3458 },
                    { label: 'Long distance', pct: 27, n: 937, of: 3458 },
                    { label: 'Watches porn', pct: 25, n: 850, of: 3458 },
                    { label: 'Number of intimate partners', pct: 24, n: 846, of: 3458 },
                    { label: 'Height', pct: 22, n: 775, of: 3458 },
                    { label: 'Being financially broke', pct: 22, n: 755, of: 3458 },
                    { label: 'Fitness level', pct: 22, n: 747, of: 3458 },
                    { label: 'Difference in religious views', pct: 16, n: 567, of: 3458 },
                    { label: 'Difference in social habits', pct: 15, n: 526, of: 3458 },
                    { label: 'None of these', pct: 14, n: 470, of: 3458 },
                ],
            },
        },
        {
            headline: '68% of men say they pay on the first date.',
            blurb: '53% of women say their date does.',
            chart: {
                kind: 'groups',
                title: 'Who pays on the first date?',
                groups: [
                    { name: 'Men', base: 1345 },
                    { name: 'Women', base: 2037 },
                ],
                rows: [
                    { label: 'I do', pcts: [68, 3], ns: [910, 51] },
                    { label: 'My date does', pcts: [2, 53], ns: [21, 1088] },
                    { label: 'We split', pcts: [10, 23], ns: [133, 466] },
                    { label: "It doesn't matter", pcts: [21, 21], ns: [281, 432] },
                ],
            },
        },
        {
            headline: '27% of you show affection through acts of service.',
            blurb: 'Only 14% like to receive it that way.',
            chart: {
                kind: 'groups',
                title: 'How do you like to receive affection, and how do you show it?',
                note: '46% gave the same answer to both questions.',
                groups: [
                    { name: 'Receive', base: 3458 },
                    { name: 'Show', base: 3458 },
                ],
                rows: [
                    { label: 'Quality time', pcts: [51, 44], ns: [1758, 1506] },
                    { label: 'Physical touch', pcts: [18, 16], ns: [634, 536] },
                    { label: 'Acts of service', pcts: [14, 27], ns: [491, 932] },
                    { label: 'Words of affirmation', pcts: [9, 7], ns: [305, 236] },
                    { label: 'Receiving gifts', pcts: [2, 3], ns: [73, 101] },
                ],
            },
        },
        {
            headline: '35% of you say enemies to lovers is your favorite romance trope.',
            chart: {
                kind: 'ranked',
                title: "What's your favorite romance trope?",
                highlight: 'Enemies to lovers',
                bars: [
                    { label: 'Enemies to lovers', pct: 35, n: 1214, of: 3458 },
                    { label: 'Childhood friends to lovers', pct: 33, n: 1133, of: 3458 },
                    { label: 'Vanilla romance', pct: 15, n: 508, of: 3458 },
                    { label: 'Fake dating', pct: 13, n: 450, of: 3458 },
                    { label: 'Love triangle', pct: 3, n: 110, of: 3458 },
                    { label: 'Step siblings', pct: 1, n: 43, of: 3458 },
                ],
            },
        },
        {
            headline: '35% of you have never dated.',
            chart: {
                kind: 'ranked',
                title: 'How did your last relationship go?',
                highlight: "I've never dated",
                bars: [
                    { label: 'We broke up because of long-term incompatibility', pct: 35, n: 1207, of: 3458 },
                    { label: "I've never dated", pct: 35, n: 1204, of: 3458 },
                    { label: "It wasn't that deep", pct: 26, n: 911, of: 3458 },
                    { label: 'We hate each other', pct: 4, n: 136, of: 3458 },
                ],
            },
        },
    ],
};

export default stats2026;
