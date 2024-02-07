import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const completeTask = () => {
    const series = [
        {
            name: '',
            data: [1221, 1095, 1042, 553],
        },
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
                    position: 'bottom',
                },
            },
        },
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                fontSize: '15px',
                colors: ['#6b7280'],
            },
            formatter: function (val: any, opt: any) {
                return opt.w.globals.labels[opt.dataPointIndex];
            },
            offsetX: 0,
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff'],
        },
        tooltip: {
            theme: 'dark',

            y: {
                formatter: function (value: any) {
                    const percent = (parseInt(value) / 3911) * 100;
                    return percent.toFixed(0) + '%';
                },
            },
            x: {
                show: false,
            },
        },
        colors: ['#c4b5fd', '#ddd6fe', '#ede9fe', '#f5f3ff'],
        xaxis: {
            categories: [
                'A. Stress-free Dyson pupil, but claims to have a "genuine interest" in Discounted Cash Flow model.',
                'B. Philosophy major that can’t pay the bills but declares their love to you in a timeless sonnet.',
                'C. Pre-med who spends all their time complaining about CHEM 2070 on Sidechat.',
                'D. Near the top of the class for engineering talent, near the bottom for shower frequency.',
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
                show: false,
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
                            style: {
                                fontSize: '11px',
                            },
                        },
                    },
                    dataLabels: {
                        style: {
                            fontSize: '7px',
                            fontWeight: 600,
                        },
                    },
                },
            },
            {
                breakpoint: 1024,
                options: {
                    dataLabels: {
                        style: {
                            fontSize: '12px',
                            fontWeight: 600,
                        },
                    },
                },
            },
        ],
    };

    return <ReactApexChart type="bar" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default completeTask;
