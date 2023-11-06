import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const CompleteTask = () => {
    const series = [
        {
            name: '',
            data: [2319, 867, 539, 186],
        }
    ];
    const options = {
        chart: {
            type: 'bar',
            height: 380,
            toolbar: {
                show: false,
                tools: {
                    download: false,
                },
            },
        },
        plotOptions: {
            bar: {
                barHeight: '100%',
                horizontal: true,
                distributed: true,
                dataLabels: {
                    position: 'bottom'
                }
            },
        },
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                fontSize: '15px',
                colors: ['#6b7280']
            },
            formatter: function (val: any, opt: any) {
                return opt.w.globals.labels[opt.dataPointIndex]
            },
            offsetX: 0
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff'],
        },
        tooltip: {
            y: {
                formatter: function (value: any) {
                    const percent = parseInt(value) / 3911 * 100
                    return percent.toFixed(0) + '%'
                }
            },
            x: {
                show: false
            }
        },
        colors: ['#f9a8d4', '#fbcfe8', '#fce7f3', '#fdf2f8'],
        xaxis: {
            categories: ['A. Kiss on the suspension bridge at midnight.',
                'B. Make the library into your bedroom and have sex in the stacks.',
                'C. Hook up with your T.A.',
                'D. Flirt with your professor.'],
            labels: {
                style: {
                    colors: '#6b7280',
                },
            },
        },
        yaxis: {
            labels: {
                show: false
            }
        },
        legend: {
            show: false
        }
    };

    return <ReactApexChart type="bar" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default CompleteTask;
