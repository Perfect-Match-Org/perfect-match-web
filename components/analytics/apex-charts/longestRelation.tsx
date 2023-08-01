import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const LongestRelation = () => {
    const series = [
        {
            name: 'Median',
            data: [6, 4, 5, 4, 5, 5, 6],
            color: '#bae6fd',
        },
        {
            name: 'Mean',
            data: [10.8, 9.2, 10.0, 9.1, 9.5, 8.8, 10.0],
            color: '#fecdd3',
        },
    ];
    const options = {
        chart: {
            type: 'bar',
            height: 430,
            toolbar: {
                show: false,
                tools: {
                    download: false,
                },
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'top',
                },
            },
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '12px',
                colors: ['#6b7280'],
            },
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff'],
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
        xaxis: {
            categories: ['AAP', 'CAS', 'CALS', 'Engineering', 'Hotel', 'CHE', 'ILR'],
            labels: {
                style: {
                    colors: '#6b7280',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '12px',
                    colors: '#6b7280',
                },
            },
        },
        legend: {
            fontSize: '12px',
            labels: {
                colors: '#6b7280',
            },
        },
    };

    return <ReactApexChart type="bar" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default LongestRelation;
