import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const RelationshipType = () => {
    const series = [2226, 1375, 310];
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
        labels: ['Romantic', 'Casual', 'Platonic'],
        colors: ['#fb7185', '#4ade80', '#facc15'],
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

export default RelationshipType;
