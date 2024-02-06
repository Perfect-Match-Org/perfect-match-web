import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const FirstDate = () => {
    const series = [1175, 1124, 704, 631, 108, 86, 83];
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
        labels: [
            'Restaurant in the Commons',
            'Bubble tea',
            'CTB',
            'Coffee on campus',
            'Frat annex',
            'Dining Hall',
            'Starbucks',
        ],
        colors: ['#fda4af', '#86efac', '#fde047', '#7dd3fc', '#fdba74', '#c4b5fd', '#f0abfc'],
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

export default FirstDate;
