import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const Height = () => {
    const series = [
        {
            name: 'Female',
            color: '#fda4af',
            data: [1, 2, 5, 17, 64, 97, 191, 257, 289, 257, 242, 187, 130, 82, 39, 29, 7, 5, 1, 0, 0, 0],
        },
        {
            name: 'Male',
            color: '#7dd3fc',
            data: [1, 0, 0, 0, 0, 0, 2, 9, 17, 16, 49, 131, 168, 180, 237, 152, 187, 102, 74, 49, 21, 6],
        },
    ];
    const options = {
        chart: {
            type: 'area',
            toolbar: {
                show: false,
                tools: {
                    download: false,
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            categories: ['56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77'],
            labels: {
                style: {
                    fontSize: '12px',
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
            title: {
                text: 'Number of Participants',
                style: {
                    color: '#6b7280',
                    fontSize: '12px',
                },
            },
        },
        legend: {
            fontSize: '13px',
            labels: {
                colors: '#6b7280',
            },
        },
    };

    return <ReactApexChart type="area" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default Height;
