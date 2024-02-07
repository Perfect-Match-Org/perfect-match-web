import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const NumDatedGender = () => {
    const series = [
        {
            name: 'Male',
            data: [-29.5, -30.7, -21.5, -11.3, -2.8, -2.0, -1.4, -0.0],
            color: '#bae6fd',
        },
        {
            name: 'Female',
            data: [37.1, 27.7, 19.5, 10.7, 2.5, 1.4, 0.8, 0.5],
            color: '#fecdd3',
        },
    ];
    const options = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
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
                barHeight: '80%',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 1,
            colors: ['#fff'],
        },
        grid: {
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            min: -40,
            max: 40,
            labels: {
                style: {
                    fontSize: '12px',
                    colors: '#6b7280',
                },
            },
        },
        tooltip: {
            theme: 'dark',

            shared: false,
            y: {
                formatter: function (val: any) {
                    return Math.abs(val) + '%';
                },
            },
        },
        xaxis: {
            categories: [
                '0 person',
                '1 person',
                '2 people',
                '3 people',
                '4 people',
                '5 people',
                '6-10 people',
                '10+ people',
            ],
            labels: {
                formatter: function (val: any) {
                    return Math.abs(Math.round(val)) + '%';
                },
                style: {
                    fontSize: '12px',
                    colors: '#6b7280',
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

    return <ReactApexChart type="bar" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default NumDatedGender;
