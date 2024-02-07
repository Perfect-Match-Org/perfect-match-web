import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const Year = () => {
    const series = [
        {
            name: 'Percent in total',
            data: [954, 1095, 835, 803, 117, 61, 40, 6]
        },
    ];
    const options = {
        tooltip: {
            enabled: true,
            theme: 'dark',
        },
        colors: ['#fda4af', '#fdba74', '#fde047', '#86efac', '#7dd3fc', '#c4b5fd'],
        chart: {
            height: 350,
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
                borderRadius: 10,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
                distributed: true,
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val: any) {
                return val;
            },
            offsetY: -22,
            style: {
                fontSize: '14px',
                colors: ['#6b7280'],
            },
        },
        xaxis: {
            categories: ["Freshman", "Sophomore", "Junior", "Senior", "Masters", "PhD", "Alumni", "Faculty"],
            position: 'bottom',
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            tooltip: {
                theme: 'dark',

                enabled: true,
            },
            labels: {
                style: {
                    colors: '#6b7280',
                    fontSize: '14px',
                },
            },
        },
        yaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val: any) {
                    var percent = (val / 3911) * 100;
                    return percent.toFixed(1) + '%';
                },
            },
        },
        legend: {
            show: false,
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
                },
            },
        ],
    };

    return (
        <ReactApexChart type="bar" series={series as ApexAxisChartSeries} options={options as ApexCharts.ApexOptions} />
    );
};

export default Year;
