import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const ByGenderLoveLanguage2024 = () => {
    const series = [
        {
            name: 'Female',
            data: [17.3, 1.9, 48.8, 17.4, 11.6, 3.0],
            color: '#fb7185',
        },
        {
            name: 'Male',
            data: [7.8, 0.7, 48.9, 29.0, 7.2, 6.4],
            color: '#38bdf8',
        },
    ];
    const options = {
        chart: {
            type: 'bar',
            height: 500,
            toolbar: {
                show: false,
                tools: {
                    download: false,
                },
            },
            fontFamily: 'Work Sans, sans-serif',
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'top'
                },
            },
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '14px',
                colors: ['#24438d'],
                fontWeight: 400,
            },
            formatter: function (val: any) {
                return Math.abs(Math.round(val)) + '%';
            },
            offsetX: 20
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
            y: {
                formatter: function (val: any) {
                    return Math.abs(val) + '%';
                },
            }
        },
        xaxis: {
            categories: [
                'Acts of service',
                'Receiving gifts',
                'Quality time',
                'Physical touch',
                'Words of affirmation',
                'Not sure'
            ],
            labels: {
                style: {
                    fontSize: '15px',
                    colors: '#24438d',
                },
                formatter: function (val: any) {
                    return Math.abs(Math.round(val)) + '%';
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '15px',
                    colors: '#24438d',
                },
                maxWidth: 250
            }
        },
        legend: {
            fontSize: '16px',
            labels: {
                colors: '#24438d',
            }
        }
    };

    return <ReactApexChart type="bar" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default ByGenderLoveLanguage2024;