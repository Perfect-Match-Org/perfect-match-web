import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const DateWear = () => {
    const series = [
        {
            name: '',
            data: [1468, 1016, 889, 538],
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
        colors: ['#fcd34d', '#fde68a', '#fef3c7', '#fffbeb'],
        xaxis: {
            categories: ['A. Cornell Hockey Jersey with some residual fish guts from the Cornell-Harvard game.',
                'B. David Gries 73 Years of Programming Experience T-Shirt.',
                'C. Patagonia Vest from their past internship.',
                'D. Scarsdale High School T-Shirt.'],
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

export default DateWear;
