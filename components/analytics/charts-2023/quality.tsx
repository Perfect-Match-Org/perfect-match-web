import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const Quality = () => {
    const series = [1847, 1043, 821, 200];
    const options = {
        tooltip: {
            enabled: true,
            theme: 'dark',
        },
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
        labels: ['Thoughtfulness', 'Reliability', 'Humor', 'Independence'],
        colors: ['#fb7185', '#4ade80', '#facc15', '#38bdf8'],
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -3,
                },
                donut: {
                    size: '40%',
                },
            },
        },
        dataLabels: {
            formatter(val: string, opts: any) {
                const name = opts.w.globals.labels[opts.seriesIndex];
                return [name, parseInt(val).toFixed(0) + '%'];
            },
            style: {
                fontSize: '13px',
            },
        },
        legend: {
            show: false,
        },
    };

    return <ReactApexChart type="donut" series={series} options={options as unknown as ApexCharts.ApexOptions} />;
};

export default Quality;
