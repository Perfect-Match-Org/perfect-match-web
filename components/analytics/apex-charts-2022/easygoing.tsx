import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const Easygoing = () => {
    const series = [
        {
            name: "Doesn't matter",
            data: [58, 141, 365, 342, 316, 263, 198, 71, 17, 6],
        },
        {
            name: 'More',
            data: [27, 70, 171, 144, 97, 92, 36, 13, 3, 1],
        },
        {
            name: 'Same',
            data: [36, 105, 181, 169, 162, 103, 115, 44, 10, 4],
        },
        {
            name: 'Less',
            data: [3, 9, 16, 32, 34, 47, 90, 69, 11, 6],
        },
    ];
    const options = {
        chart: {
            height: 300,
            type: 'heatmap',
            toolbar: {
                show: false,
                tools: {
                    download: false,
                },
            },
        },
        xaxis: {
            type: 'category',
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            labels: {
                style: {
                    fontSize: '12px',
                    colors: '#6b7280',
                },
            },
            title: {
                text: 'Easygoing to Assertive',
                style: {
                    fontSize: '12px',
                    color: '#6b7280',
                },
            },
        },
        yaxis: {
            title: {
                text: 'Prefer Partner to be (...) Assertive',
                style: {
                    fontSize: '12px',
                    color: '#6b7280',
                },
            },
            labels: {
                style: {
                    fontSize: '12px',
                    colors: '#6b7280',
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['#38bdf8'],
    };

    return <ReactApexChart type="heatmap" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default Easygoing;
