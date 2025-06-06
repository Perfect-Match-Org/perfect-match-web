import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const BestAlternative = () => {
    const series = [1360, 884, 781, 565, 321];
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
            animations: {
                speed: 1400,
                animateGradually: {
                    delay: 250,
                },
                dynamicAnimation: {
                    speed: 450,
                },
            },
        },
        labels: [
            'Enjoy studying in the Olin Basement',
            'Live in the Gothics',
            'Eat at Okenshields everyday',
            'Drunk texted their ex last night',
            'Matched with your roommate on Hinge',
        ],
        colors: ['#fb7185', '#fb923c', '#facc15', '#4ade80', '#38bdf8'],
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
                return [name, parseInt(val).toFixed(1) + '%'];
            },
            style: {
                fontSize: '15px',
                fontWeight: 'bold',
            },
        },
        legend: {
            show: false,
        },
        tooltip: {
            theme: 'dark',

            enabled: false,
        },
        responsive: [
            {
                breakpoint: 640,
                options: {
                    dataLabels: {
                        style: {
                            fontSize: '12px',
                        },
                    },
                },
            },
        ],
    };

    return <ReactApexChart type="donut" series={series} options={options as unknown as ApexCharts.ApexOptions} />;
};

export default BestAlternative;
