import useSWR from 'swr';
import { fetcher, analysisURL } from '@/utils/fetch';
import dynamic from 'next/dynamic';
import { SurveyModel } from 'survey-react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const RelationshipTypeLive = () => {
    const { data: typeCount, error, isLoading } = useSWR(`${analysisURL}/relationshiptype`, fetcher);
    if (isLoading || error) return null;

    const series = Object.values(typeCount || {});
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
        labels: Object.keys(typeCount || {}),
        colors: ['#fda4af', '#fde047', '#86efac', '#7dd3fc'],
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
                fontSize: '16px',
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

export default RelationshipTypeLive;
