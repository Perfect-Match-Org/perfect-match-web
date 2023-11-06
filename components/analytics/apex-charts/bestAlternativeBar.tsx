import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const BestAlternativeBar = () => {
    const series = [
        {
            name: '',
            data: [1360, 884, 781, 565, 321],
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
        colors: ['#a3e635', '#bef264', '#d9f99d', '#ecfccb', '#f7fee7'],
        xaxis: {
            categories: ['A. Enjoy studying in the Olin Basement.',
                'B. Live in the Gothics.',
                'C. Eats at Okenshields everyday.',
                'D. Drunk texted their ex last night.',
                'E. Matched with your roommate on Hinge.'],
            labels: {
                style: {
                    colors: '#6b7280',
                    fontSize: '14px'
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
        },
        responsive: [{
            breakpoint: 640,
            options: {
                xaxis: {
                    labels: {
                        style: {
                            fontSize: '11px'
                        }
                    }
                },
                dataLabels: {
                    style: {
                        fontSize: '11px',
                        fontWeight: 600
                    },
                }
            },
        }]
    };

    return <ReactApexChart type="bar" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default BestAlternativeBar;
