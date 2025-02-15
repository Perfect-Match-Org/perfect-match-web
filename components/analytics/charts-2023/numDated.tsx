import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const NumDatedGender = () => {
    const series = [
        {
            name: 'Male',
            data: [-29.2, -30.1, -23.2, -9.7, -3.5, -1.9, -1.5, -0.8],
            color: '#38bdf8',
        },
        {
            name: 'Female',
            data: [38.7, 28.5, 19.7, 8.5, 2.7, 1.0, 0.7, 0.2],
            color: '#fb7185',
        },
    ];
    const options = {
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
                show: false,
                tools: {
                    download: false,
                },
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '80%',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 1,
            colors: ['#fff'],
        },
        grid: {
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            min: -40,
            max: 40,
            labels: {
                style: {
                    fontSize: '15px',
                    colors: '#6b7280',
                },
            },
        },
        tooltip: {
            theme: 'dark',

            shared: false,
            y: {
                formatter: function (val: any) {
                    return Math.abs(val) + '%';
                },
            },
        },
        xaxis: {
            categories: [
                '0 person',
                '1 person',
                '2 people',
                '3 people',
                '4 people',
                '5 people',
                '6-10 people',
                '10+ people',
            ],
            labels: {
                formatter: function (val: any) {
                    return Math.abs(Math.round(val)) + '%';
                },
                style: {
                    fontSize: '15px',
                    colors: '#6b7280',
                },
            },
        },
        legend: {
            fontSize: '16px',
            labels: {
                colors: '#6b7280',
            },
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
                            offsetY: -5,
                        },
                    },
                    yaxis: {
                        labels: {
                            style: {
                                fontSize: '11px',
                                colors: '#6b7280',
                            },
                        },
                    },
                    legend: {
                        fontSize: '12px',
                    },
                },
            },
        ],
    };

    return <ReactApexChart type="bar" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default NumDatedGender;
