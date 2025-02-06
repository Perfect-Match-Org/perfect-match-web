import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const LongestRelationship = () => {
    const series = [
        {
            name: 'Median longest relationship duration',
            data: [5, 4, 4, 4, 5, 3, 6, 6, 13],
            color: '#fb923c',
        },
    ];
    const options = {
        chart: {
            type: 'bar',
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
            offsetX: -6,
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff'],
        },
        tooltip: {
            theme: 'dark',

            shared: true,
            intersect: false,
            y: {
                formatter: function (value: any) {
                    return value + ' months';
                },
            },
        },
        xaxis: {
            categories: ['AAP', 'CAS', 'CALS', 'CHE', 'Dyson', 'Engineering', 'Hotel', 'ILR', 'Grad'],
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
                    },
                },
            },
        ],
    };

    return <ReactApexChart type="bar" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default LongestRelationship;
