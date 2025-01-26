import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const ricePurity2024 = () => {
    const series = [
        {
            name: 'Female',
            color: '#fda4af',
            data: [3.2, 16.1, 23.3, 23.5, 33.9]
        },
        {
            name: 'Male',
            color: '#7dd3fc',
            data: [4.3, 18.3, 25.8, 23.7, 27.9],
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
                '0-20',
                '21-40',
                '41-60',
                '61-80',
                '81-100'
            ],
            labels: {
                style: {
                    fontSize: '16px',
                    colors: '#6b7280',
                },
            },
        },
        yaxis: {
            min: 0,
            max: 40,
            tickAmount: 8,
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

export default ricePurity2024;
