import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const DescribePartner = () => {
    const series = [
        {
            data: [
                {
                    x: 'Funny',
                    y: 1775,
                },
                {
                    x: 'Smart',
                    y: 750,
                },
                {
                    x: 'Kind',
                    y: 704,
                },
                {
                    x: 'Caring',
                    y: 512,
                },
                {
                    x: 'Thoughtful',
                    y: 456,
                },
                {
                    x: 'Outgoing',
                    y: 247,
                },
                {
                    x: 'Adventurous',
                    y: 230,
                },
                {
                    x: 'Loyal',
                    y: 228,
                },
                {
                    x: 'Honest',
                    y: 199,
                },
                {
                    x: 'Charming',
                    y: 193,
                },
                {
                    x: 'Chill',
                    y: 179,
                },
                {
                    x: 'Intelligent',
                    y: 167,
                },
                {
                    x: 'Ambitious',
                    y: 162,
                },
                {
                    x: 'Passionate',
                    y: 156,
                },
            ],
        },
    ];
    const options = {
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
            '#fc848c',
            '#fc8495',
            '#fc979e',
            '#fc97a6',
            '#fdaab6',
            '#fdbdc7',
            '#fdbdc1',
            '#fed0d7',
            '#fee3e7',
            '#fee3e5',
            '#fff7f8',
            '#fff7f7',
            '#ffffff',
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

export default DescribePartner;
