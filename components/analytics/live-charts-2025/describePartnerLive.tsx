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
            data: Object.entries(describepartnerCount || {}).slice(0, 10).map(([key, value]) => ({
                x: key,
                y: value as number,
            })),
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
