import useSWR from 'swr';
import { fetcher, analysisURL } from '@/utils/fetch';
import dynamic from 'next/dynamic';
import { SurveyModel } from 'survey-react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const BestAlternativeLive = () => {
    const { data: alternativeCount, error, isLoading } = useSWR(`${analysisURL}/alternative`, fetcher);
    if (isLoading || error) return null;

    const series = [
        {
            name: '',
            data: Object.values(alternativeCount || {}),
        },
    ];
    const options = {
        chart: {
            type: 'pie',
            height: 380,
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
        colors: ['#fda4af', '#86efac', '#fde047', '#7dd3fc', '#fdba74'],
        xaxis: {
            categories: Object.keys(alternativeCount || {}),
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
                                fontSize: '11px',
                            },
                        },
                    },
                    dataLabels: {
                        style: {
                            fontSize: '12px',
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

export default BestAlternativeLive;
