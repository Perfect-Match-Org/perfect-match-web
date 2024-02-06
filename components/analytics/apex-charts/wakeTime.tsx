import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const WakeTime = () => {
    const series = [
        {
            name: 'Time to wake up!',
            color: '#4ade80',
            data: [3, 5, 24, 127, 540, 1197, 1289, 558, 123, 31, 6, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            name: 'Time to go to bed!',
            color: '#facc15',
            data: [155, 36, 11, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 18, 99, 544, 1236, 1184, 618],
        },
    ];
    const options = {
        tooltip: {
            enabled: true,
            theme: 'dark',
        },
        chart: {
            type: 'area',
            toolbar: {
                show: false,
                tools: {
                    download: false,
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            categories: [
                '3AM',
                '4AM',
                '5AM',
                '6AM',
                '7AM',
                '8AM',
                '9AM',
                '10AM',
                '11AM',
                '12PM',
                '1PM',
                '2PM',
                '3PM',
                '4PM',
                '5PM',
                '6PM',
                '7PM',
                '8PM',
                '9PM',
                '10PM',
                '11PM',
                '12AM',
                '1AM',
                '2AM',
            ],
            labels: {
                style: {
                    fontSize: '12px',
                    colors: '#6b7280',
                },
                rotate: -45,
                rotateAlways: true,
            },
            tickPlacement: 'on',
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '12px',
                    colors: '#6b7280',
                },
            },
            title: {
                text: 'Number of Participants',
                style: {
                    color: '#6b7280',
                    fontSize: '14px',
                    fontWeight: 500,
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
                        offsetY: -16,
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
                        offsetY: -10,
                    },
                },
            },
        ],
    };

    return <ReactApexChart type="area" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default WakeTime;
