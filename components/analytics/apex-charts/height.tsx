import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const Height = () => {
    const series = [
        {
            name: 'Female',
            color: '#fda4af',
            data: [0.1, 0.3, 1.0, 3.4, 5.0, 10.5, 13.3, 15.3, 13.5, 12.4, 10.4, 5.8, 4.1, 2.8, 1.2, 0.5, 0.1, 0.2, 0.1, 0.1, 0, 0],
        },
        {
            name: 'Male',
            color: '#7dd3fc',
            data: [0, 0, 0, 0.2, 0, 0.2, 0.3, 1.4, 1.2, 4, 6.8, 11.8, 12.6, 14.4, 12.4, 13.3, 8.2, 6.4, 3.5, 2.2, 0.7, 0.4],
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
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            categories: [
                '57',
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
                '78'
            ],
            labels: {
                style: {
                    fontSize: '14px',
                    colors: '#6b7280',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '12px',
                    colors: '#6b7280',
                },
            },
            title: {
                text: 'Percentage of Participants',
                style: {
                    color: '#6b7280',
                    fontSize: '14px',
                    fontWeight: 400
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
            y: {
                formatter: function (value: any) {
                    return value + '%'
                }
            }
        },
        responsive: [{
            breakpoint: 640,
            options: {
                xaxis: {
                    labels: {
                        rotate: -90,
                        style: {
                            fontSize: '11px'
                        }
                    }
                },
                dataLabels: {
                    style: {
                        fontSize: '11px',
                    },
                },
                yaxis: {
                    title: {
                        show: false
                    },
                    labels: {
                        show: false
                    }
                },
                legend: {
                    fontSize: '13px',
                }
            },
        }]
    };

    return <ReactApexChart type="area" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default Height;
