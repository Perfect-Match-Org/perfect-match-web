'use client';
import ReactApexChart from 'react-apexcharts';

const TimeOrMoney = () => {
    const series = [2398, 843, 436];
    const options = {
        chart: {
            toolbar: {
                show: false,
                tools: {
                    download: false,
                },
            },
            width: '100%',
            type: 'donut',
        },
        labels: ['Time', 'Money', 'Influence'],
        colors: ['#fda4af', '#86efac', '#fde047'],
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -3,
                },
                donut: {
                    size: '50%',
                },
            },
        },
        dataLabels: {
            formatter(val: string, opts: any) {
                const name = opts.w.globals.labels[opts.seriesIndex];
                return [name, parseInt(val).toFixed(1) + '%'];
            },
        },
        legend: {
            show: false,
        },
    };

    return <ReactApexChart type="donut" series={series} options={options as unknown as ApexCharts.ApexOptions} />;
};

export default TimeOrMoney;
