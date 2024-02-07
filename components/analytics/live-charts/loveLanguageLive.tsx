import useSWR from 'swr';
import { fetcher, analysisURL } from '@/utils/fetch';
import dynamic from 'next/dynamic';
import { SurveyModel } from 'survey-react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const LoveLanguageLive = () => {
    const { data: Count, error, isLoading } = useSWR(`${analysisURL}/lovelanguage`, fetcher);
    if (isLoading || error) return null;

    const series = Object.values(Count || {});
    const options = {
        chart: {
            toolbar: {
                show: false,
                tools: {
                    download: false,
                },
            },
            width: '100%',
            type: 'donut',
            animations: {
                speed: 1400,
                animateGradually: {
                    delay: 250,
                },
                dynamicAnimation: {
                    speed: 450,
                },
            },
        },
        labels: Object.keys(Count || {}),
        colors: ['#fda4af', '#86efac', '#fde047', '#7dd3fc', '#fdba74', '#c4b5fd', '#f0abfc'],
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -3,
                },
                donut: {
                    size: '40%',
                },
            },
        },
        dataLabels: {
            formatter(val: string, opts: any) {
                const name = opts.w.globals.labels[opts.seriesIndex];
                return [name, parseInt(val) + '%'];
            },
            style: {
                fontSize: '15px',
            },
        },
        legend: {
            show: false,
        },
        responsive: [
            {
                breakpoint: 780,
                options: {
                    dataLabels: {
                        style: {
                            fontSize: '12px',
                        },
                    },
                },
            },
            {
                breakpoint: 1200,
                options: {
                    dataLabels: {
                        style: {
                            fontSize: '14px',
                        },
                    },
                },
            },
        ],
    };

    return (
        <ReactApexChart
            type="donut"
            series={series as ApexAxisChartSeries}
            options={options as unknown as ApexCharts.ApexOptions}
        />
    );
};

export default LoveLanguageLive;
