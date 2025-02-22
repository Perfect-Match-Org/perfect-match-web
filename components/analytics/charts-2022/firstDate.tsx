import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const FirstDate = () => {
    const series = [1024, 960, 838, 564, 175, 61, 55];
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
        labels: [
            'Restaurant in the Commons',
            'Bubble tea',
            'CTB',
            'Coffee on campus',
            'Starbucks',
            'Dining Hall',
            'Frat annex',
        ],
        colors: ['#fb7185', '#fb923c', '#facc15', '#4ade80', '#38bdf8', '#c4b5fd', '#f0abfc'],
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

export default FirstDate;
