import React from 'react';
import type { Chart, GroupsChart, RankedChart, VersusChart } from './types';

// Two-series palette, checked for colour-blind separation and contrast on the panel surface.
const SERIES = ['#3558b5', '#f30020'];

const people = (n: number, of: number) => `${n.toLocaleString('en-US')} of ${of.toLocaleString('en-US')} people`;

const ROW = 'group relative rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-pmblue-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[#FBE7F3]';

const Tip = ({ children }: { children: React.ReactNode }) => (
    <span className="pointer-events-none absolute right-0 -top-1 -translate-y-full whitespace-nowrap rounded-md bg-pmblue2-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 z-10">
        {children}
    </span>
);

const BarLine = ({ pct, max, color, thin = false }: { pct: number; max: number; color: string; thin?: boolean }) => (
    <div className="flex items-center gap-2">
        <div
            className={`${thin ? 'h-2.5' : 'h-3.5'} rounded-r transition-opacity group-hover:opacity-80`}
            style={{ width: `calc((100% - 3rem) * ${pct / max})`, minWidth: 2, backgroundColor: color }}
        />
        <span className="text-sm font-semibold tabular-nums text-pmblue2-800">{pct}%</span>
    </div>
);

const RankedBars = ({ chart }: { chart: RankedChart }) => {
    const max = Math.max(...chart.bars.map((b) => b.pct));
    return (
        <ul className="space-y-3">
            {chart.bars.map((bar) => (
                <li key={bar.label} tabIndex={0} className={ROW}>
                    <div className="mb-1 text-sm text-pmblue-500">{bar.label}</div>
                    <BarLine pct={bar.pct} max={max} color={SERIES[bar.label === chart.highlight ? 1 : 0]} />
                    <Tip>
                        <strong>{people(bar.n, bar.of)}</strong>
                    </Tip>
                </li>
            ))}
        </ul>
    );
};

const VersusBars = ({ chart }: { chart: VersusChart }) => (
    <ul className="space-y-5">
        {chart.rows.map(({ a, b }) => (
            <li key={a.label} tabIndex={0} className={ROW}>
                <div className="mb-1 flex items-baseline justify-between gap-4 text-sm text-pmblue-500">
                    <span>
                        <strong className="text-pmblue2-800 tabular-nums">{a.pct}%</strong> {a.label}
                    </span>
                    <span className="text-right">
                        {b.label} <strong className="text-pmblue2-800 tabular-nums">{b.pct}%</strong>
                    </span>
                </div>
                <div className="flex h-4 gap-0.5 transition-opacity group-hover:opacity-80">
                    <div className="rounded-l" style={{ width: `${a.pct}%`, backgroundColor: SERIES[0] }} />
                    <div className="flex-1 rounded-r" style={{ backgroundColor: SERIES[1] }} />
                </div>
                <Tip>
                    <strong>{a.n.toLocaleString('en-US')}</strong> {a.label}, <strong>{b.n.toLocaleString('en-US')}</strong> {b.label}
                </Tip>
            </li>
        ))}
    </ul>
);

const GroupBars = ({ chart }: { chart: GroupsChart }) => {
    const max = Math.max(...chart.rows.flatMap((r) => r.pcts));
    return (
        <>
            <div className="mb-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-pmblue-500">
                {chart.groups.map((group, i) => (
                    <span key={group.name} className="inline-flex items-center gap-2">
                        <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: SERIES[i] }} />
                        {group.name}
                    </span>
                ))}
            </div>
            <ul className="space-y-3">
                {chart.rows.map((row) => (
                    <li key={row.label} tabIndex={0} className={ROW}>
                        <div className="mb-1 text-sm text-pmblue-500">{row.label}</div>
                        <div className="space-y-0.5">
                            {row.pcts.map((pct, i) => (
                                <BarLine key={chart.groups[i].name} pct={pct} max={max} color={SERIES[i]} thin />
                            ))}
                        </div>
                        <Tip>
                            {chart.groups.map((group, i) => (
                                <span key={group.name} className="block">
                                    {group.name}: <strong>{people(row.ns[i], group.base)}</strong>
                                </span>
                            ))}
                        </Tip>
                    </li>
                ))}
            </ul>
        </>
    );
};

export const ChartPanel = ({ chart }: { chart: Chart }) => (
    <figure className="rounded-2xl bg-[#FBE7F3] p-5 sm:p-7">
        <figcaption className="mb-5 font-dm-sans font-bold text-pmblue2-800">{chart.title}</figcaption>
        {chart.kind === 'ranked' ? <RankedBars chart={chart} /> : chart.kind === 'versus' ? <VersusBars chart={chart} /> : <GroupBars chart={chart} />}
        {chart.kind !== 'versus' && chart.note && <p className="mt-5 text-xs text-pmblue-500">{chart.note}</p>}
    </figure>
);
