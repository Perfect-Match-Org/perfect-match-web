import useSWR from 'swr';
import { fetcher, analysisURL } from '@/utils/fetch';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const DescribeSelfLive = () => {
    const { data: describeselfCount, error, isLoading } = useSWR(`${analysisURL}/describeself`, fetcher);
    if (isLoading || error) return null;

    const series = [
        {
            data: [
                {
                    x: Object.keys(describeselfCount)[0],
                    y: Object.values(describeselfCount)[0],
                },
                {
                    x: Object.keys(describeselfCount)[1],
                    y: Object.values(describeselfCount)[1],
                },
                {
                    x: Object.keys(describeselfCount)[2],
                    y: Object.values(describeselfCount)[2],
                },
                {
                    x: Object.keys(describeselfCount)[3],
                    y: Object.values(describeselfCount)[3],
                },
                {
                    x: Object.keys(describeselfCount)[4],
                    y: Object.values(describeselfCount)[4],
                },
                {
                    x: Object.keys(describeselfCount)[5],
                    y: Object.values(describeselfCount)[5],
                },
                {
                    x: Object.keys(describeselfCount)[6],
                    y: Object.values(describeselfCount)[6],
                },
                {
                    x: Object.keys(describeselfCount)[7],
                    y: Object.values(describeselfCount)[7],
                },
                {
                    x: Object.keys(describeselfCount)[8],
                    y: Object.values(describeselfCount)[8],
                },
                {
                    x: Object.keys(describeselfCount)[9],
                    y: Object.values(describeselfCount)[9],
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
            '#fb7185',
            '#fe7f90',
            '#ff8e9b',
            '#ff9da7',
            '#ffabb3',
            '#ffbac0',
            '#ffc8cc',
            '#ffd5d8',
            '#ffe3e5',
            '#fff1f2',
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

export default DescribeSelfLive;
