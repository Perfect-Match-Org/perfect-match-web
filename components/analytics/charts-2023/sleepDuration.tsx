import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const SleepDuration = () => {
    const series = [
        {
            name: 'Average sleep duration',
            data: [6.96, 7.66, 7.83, 7.84, 7.84, 7.86, 7.91, 8.06, 8.13, 8.28, 8.77],
            color: '#4ade80',
        },
    ];
    const options = {
        chart: {
            type: 'bar',
            height: 430,
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
                dataLabels: {
                    position: 'top',
                },
            },
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '14px',
                colors: ['#6b7280'],
            },
            offsetX: -8,
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff'],
        },
        tooltip: {
            theme: 'dark',
            enabled: true,
            shared: true,
            intersect: false,
            y: {
                formatter: function (value: any) {
                    return value + ' hours';
                },
            },
        },
        xaxis: {
            categories: [
                'Architecture',
                'ECE',
                'CS',
                'MechE',
                'BioSci',
                'InfoSci',
                'AEM',
                'ILR',
                'Econ',
                'Hotel',
                'Comm',
            ],
            labels: {
                style: {
                    colors: '#6b7280',
                    fontSize: '14px',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '14px',
                    colors: '#6b7280',
                },
            },
            min: 6.7,
            max: 8.7,
        },
        responsive: [
            {
                breakpoint: 640,
                options: {
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '10px',
                            },
                        },
                    },
                    dataLabels: {
                        style: {
                            fontSize: '10px',
                            fontWeight: 600,
                        },
                    },
                    yaxis: {
                        labels: {
                            style: {
                                fontSize: '12px',
                                colors: '#6b7280',
                            },
                        },
                        min: 6.7,
                        max: 8.7,
                    },
                },
            },
        ],
    };

    return <ReactApexChart type="bar" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default SleepDuration;
