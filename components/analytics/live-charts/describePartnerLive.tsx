import useSWR from 'swr';
import { fetcher, analysisURL } from '@/utils/fetch';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const DescribePartnerLive = () => {
    const { data: describepartnerCount, error, isLoading } = useSWR(`${analysisURL}/describepartner`, fetcher);
    if (isLoading || error) return null;

    const series = [
        {
            data: [
                {
                    x: Object.keys(describepartnerCount)[0],

                    y: Object.values(describepartnerCount)[0],
                },
                {
                    x: Object.keys(describepartnerCount)[1],
                    y: Object.values(describepartnerCount)[1],
                },
                {
                    x: Object.keys(describepartnerCount)[2],
                    y: Object.values(describepartnerCount)[2],
                },
                {
                    x: Object.keys(describepartnerCount)[3],
                    y: Object.values(describepartnerCount)[3],
                },
                {
                    x: Object.keys(describepartnerCount)[4],
                    y: Object.values(describepartnerCount)[4],
                },
                {
                    x: Object.keys(describepartnerCount)[5],
                    y: Object.values(describepartnerCount)[5],
                },
                {
                    x: Object.keys(describepartnerCount)[6],
                    y: Object.values(describepartnerCount)[6],
                },
                {
                    x: Object.keys(describepartnerCount)[7],
                    y: Object.values(describepartnerCount)[7],
                },
                {
                    x: Object.keys(describepartnerCount)[8],
                    y: Object.values(describepartnerCount)[8],
                },
                {
                    x: Object.keys(describepartnerCount)[9],
                    y: Object.values(describepartnerCount)[9],
                },
            ],
        },
    ];
    const options = {
        tooltip: {
            enabled: true,
            theme: 'dark',
        },
        noData: {
            text: 'Loading...',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
                color: '#6b7280',
                fontSize: '14px',
            },
        },
        legend: {
            show: false,
        },
        chart: {
            height: 350,
            type: 'treemap',
            toolbar: {
                show: false,
                tools: {
                    download: false,
                },
            },
        },
        dataLabels: {
            style: {
                fontSize: '20px',
                colors: ['#6b7280'],
            },
        },
        colors: [
            '#f59f0a',
            '#f9a833',
            '#fdb24d',
            '#ffbb64',
            '#ffc47b',
            '#ffce91',
            '#ffd8a6',
            '#ffe1bc',
            '#ffebd2',
            '#fff5e9',
        ],
        plotOptions: {
            treemap: {
                distributed: true,
                enableShades: false,
            },
        },
    };

    return <ReactApexChart type="treemap" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default DescribePartnerLive;
