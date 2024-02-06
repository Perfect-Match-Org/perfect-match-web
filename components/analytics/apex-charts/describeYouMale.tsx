import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const DescribeYouMale = () => {
    const series = [
        {
            data: [
                {
                    x: 'Funny',
                    y: 28.9,
                },
                {
                    x: 'Smart',
                    y: 11.1,
                },
                {
                    x: 'Thoughtful',
                    y: 10,
                },
                {
                    x: 'Caring',
                    y: 8.1,
                },
                {
                    x: 'Adventurous',
                    y: 7.5,
                },
                {
                    x: 'Charming',
                    y: 7,
                },
                {
                    x: 'Kind',
                    y: 6.7,
                },
                {
                    x: 'Witty',
                    y: 6.2,
                },
                {
                    x: 'Chill',
                    y: 5.8,
                },
                {
                    x: 'Passionate',
                    y: 4.9,
                },
                {
                    x: 'Outgoing',
                    y: 4.7,
                },
                {
                    x: 'Loyal',
                    y: 4.3,
                },
                {
                    x: 'Goofy',
                    y: 4.2,
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
            '#0ea5e9',
            '#38bdf8',
            '#4bc3f9',
            '#71d0fa',
            '#84d6fb',
            '#97dcfb',
            '#aae3fc',
            '#bde9fd',
            '#d0effd',
            '#e3f6fe',
            '#e3f4fe',
            '#f5fcff',
            '#ffffff',
        ],
        plotOptions: {
            treemap: {
                distributed: true,
                enableShades: false,
            },
        },
        tooltip: {
            theme: 'dark',

            y: {
                formatter: function (value: any) {
                    return value + '%';
                },
            },
        },
    };

    return <ReactApexChart type="treemap" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default DescribeYouMale;
