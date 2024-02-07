import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const Political = () => {
    const series = [379, 638, 1178, 599, 615, 252, 124, 85, 25, 16];
    const options = {
        tooltip: {
            enabled: true,
            theme: 'dark',
        },
        chart: {
            type: 'pie',
            toolbar: {
                show: false,
                tools: {
                    download: false,
                },
            },
        },
        colors: [
            '#0ea5e9',
            '#38bdf8',
            '#7dd3fc',
            '#bae6fd',
            '#e0f2fe',
            '#fff1f2',
            '#ffe4e6',
            '#fecdd3',
            '#fda4af',
            '#f43f5e',
        ],
        legend: {
            show: false,
        },
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 90,
                donut: {
                    size: '0%',
                },
                dataLabels: {
                    minAngleToShowLabel: 10,
                },
            },
        },
        grid: {
            padding: {
                bottom: -100,
            },
        },
        dataLabels: {
            formatter(val: any, opts: any) {
                const name = opts.w.globals.labels[opts.seriesIndex];
                return [name, parseInt(val) + '%'];
            },
            style: {
                fontSize: '16px',
            },
        },
        responsive: [
            {
                breakpoint: 640,
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

    return <ReactApexChart type="pie" series={series} options={options as unknown as ApexCharts.ApexOptions} />;
};

export default Political;
