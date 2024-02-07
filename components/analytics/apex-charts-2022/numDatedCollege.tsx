import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const NumDatedCollege = () => {
    const series = [
        {
            name: 'Median',
            data: [1.5, 1, 1, 1, 1, 1, 1],
            color: '#bae6fd',
        },
        {
            name: 'Mean',
            data: [1.82, 1.62, 1.82, 1.27, 1.33, 1.31, 1.51],
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
            theme: 'dark',

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

export default NumDatedCollege;
