import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const DescribeYouFemale = () => {
    const series = [
        {
            data: [
                {
                    x: 'Funny',
                    y: 26.8
                },
                {
                    x: 'Caring',
                    y: 11.5
                },
                {
                    x: 'Kind',
                    y: 10.3
                },
                {
                    x: 'Outgoing',
                    y: 8.6
                },
                {
                    x: 'Thoughtful',
                    y: 8.4
                },
                {
                    x: 'Adventurous',
                    y: 8.0
                },
                {
                    x: 'Creative',
                    y: 6.8
                },
                {
                    x: 'Loyal',
                    y: 6.6
                },
                {
                    x: 'Smart',
                    y: 6.5
                },
                {
                    x: 'Witty',
                    y: 5.5
                },
                {
                    x: 'Fun',
                    y: 5.2
                },
                {
                    x: 'Passionate',
                    y: 5.2
                },
                {
                    x: 'Bubbly',
                    y: 5.1
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
            '#ff8b98',
            '#ff9fa8',
            '#ffafb6',
            '#ffbdc2',
            '#ffc8cc',
            '#ffd1d4',
            '#ffd9db',
            '#ffe0e2',
            '#ffe8e9',
            '#fff0f0',
            '#fff7f8',
            '#ffffff'
        ],
        plotOptions: {
            treemap: {
                distributed: true,
                enableShades: false,
            },
        },
        tooltip: {
            y: {
                formatter: function (value: any) {
                    return value + "%"
                }
            }
        }
    };

    return <ReactApexChart type="treemap" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default DescribeYouFemale;
