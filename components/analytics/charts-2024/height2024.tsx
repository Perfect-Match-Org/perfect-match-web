import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const Height2024 = () => {
    const series = [
        {
            name: 'Female',
            color: '#fda4af',
            data: [0.2,
                0.7,
                3.4,
                4.5,
                11.4,
                13.7,
                15.9,
                14.1,
                11.8,
                9.3,
                5.8,
                4.9,
                2.7,
                0.8,
                0.6,
                0.1,
                0.2,
                0.1,
                0,
                0,
                0
            ],
        },
        {
            name: 'Male',
            color: '#7dd3fc',
            data: [0,
                0,
                0,
                0,
                0.3,
                0.4,
                1.0,
                1.9,
                4.1,
                7.8,
                9.9,
                14.6,
                16.0,
                11.5,
                11.3,
                8.1,
                5.8,
                4.0,
                2.0,
                0.7,
                0.4],
        },
    ];
    const options = {
        chart: {
            type: 'area',
            toolbar: {
                show: false,
                tools: {
                    download: false,
                },
            },
        },
        zoom: {
            enabled: false,
            allowMouseWheelZoom: false
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            categories: [
                '58',
                '59',
                '60',
                '61',
                '62',
                '63',
                '64',
                '65',
                '66',
                '67',
                '68',
                '69',
                '70',
                '71',
                '72',
                '73',
                '74',
                '75',
                '76',
                '77',
                '78',
            ],
            labels: {
                style: {
                    fontSize: '14px',
                    colors: '#6b7280',
                },
            },
        },
        yaxis: {
            min: 0,
            max: 18,
            tickAmount: 6,
            labels: {
                style: {
                    fontSize: '12px',
                    colors: '#6b7280',
                },
                formatter: function (value: number) {
                    return value + '%';
                }
            },
            title: {
                text: 'Percentage of Participants',
                style: {
                    color: '#6b7280',
                    fontSize: '14px',
                    fontWeight: 400,
                },
            },
        },
        legend: {
            fontSize: '16px',
            labels: {
                colors: '#6b7280',
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
        responsive: [
            {
                breakpoint: 640,
                options: {
                    xaxis: {
                        labels: {
                            rotate: -90,
                            style: {
                                fontSize: '11px',
                            },
                        },
                    },
                    dataLabels: {
                        style: {
                            fontSize: '11px',
                        },
                    },
                    yaxis: {
                        title: {
                            show: false,
                        },
                        labels: {
                            show: false,
                        },
                    },
                    legend: {
                        fontSize: '13px',
                    },
                },
            },
        ],
    };

    return <ReactApexChart type="area" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default Height2024;
