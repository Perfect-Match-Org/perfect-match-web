export interface Bar {
    label: string;
    pct: number;
    n: number;
    of: number;
}

export interface RankedChart {
    kind: 'ranked';
    title: string;
    note?: string;
    highlight: string;
    bars: Bar[];
}

export interface VersusChart {
    kind: 'versus';
    title: string;
    rows: { a: Bar; b: Bar }[];
}

export interface GroupsChart {
    kind: 'groups';
    title: string;
    note?: string;
    groups: { name: string; base: number }[];
    rows: { label: string; pcts: number[]; ns: number[] }[];
}

export type Chart = RankedChart | VersusChart | GroupsChart;

export interface Story {
    headline: string;
    blurb?: string;
    chart: Chart;
}

export interface YearStats {
    year: number;
    respondents: number;
    tiles: { value: string; label: string }[];
    stories: Story[];
}
