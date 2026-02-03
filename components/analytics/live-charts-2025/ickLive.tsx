import useSWR from 'swr';
import { fetcher, analysisURL } from '@/utils/fetch';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const IckLive = () => {
    const { data: ickCount, error, isLoading } = useSWR(`${analysisURL}/ick`, fetcher);
    if (isLoading || error) return null;

    const series = [
        {
            name: '',
            data: Object.values(ickCount || {}),
        },
    ];
    const options = {
        chart: {
            type: 'bar',
            toolbar: {
                show: false,
                tools: {
                    download: false,
                },
            },
        },
        plotOptions: {
            bar: {
                barHeight: '100%',
                horizontal: true,
                distributed: true,
                dataLabels: {
                    position: 'bottom',
                },
            },
        },
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                fontSize: '15px',
                colors: ['#6b7280'],
            },
            formatter: function (val: any, opt: any) {
                return opt.w.globals.labels[opt.dataPointIndex];
            },
            offsetX: 0,
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff'],
        },
        tooltip: {
            enabled: true,
            theme: 'dark',
            y: {
                formatter: function (value: any, opts: any) {
                    const sum = opts.series[0].reduce((a: any, b: any) => a + b, 0);
                    const percent = (value / sum) * 100;
                    return percent.toFixed(0) + '%';
                },
            },
            x: {
                show: false,
            },
        },
        colors: ['#fb7185', '#4ade80', '#facc15', '#38bdf8', '#fb923c'],
        xaxis: {
            categories: Object.keys(ickCount || {}),
            labels: {
                style: {
                    colors: '#6b7280',
                    fontSize: '14px',
                },
            },
        },
        yaxis: {
            labels: {
                show: false,
            },
        },
        legend: {
            show: false,
        },
        responsive: [
            {
                breakpoint: 640,
                options: {
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '12px',
                            },
                        },
                    },
                    dataLabels: {
                        style: {
                            fontSize: '11px',
                            fontWeight: 600,
                        },
                    },
                },
            },
        ],
    };

    return (
        <ReactApexChart type="bar" series={series as ApexAxisChartSeries} options={options as ApexCharts.ApexOptions} />
    );
};

export default IckLive;
