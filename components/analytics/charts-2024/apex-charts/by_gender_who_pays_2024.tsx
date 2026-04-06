import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const ByGenderWhoPays2024 = () => {
    const series = [
        {
            name: "Female",
            data: [-55.2, -17.7, -0.9, -26.3],
            color: "#fb7185",
        },
        {
            name: "Male",
            data: [2.1, 17.6, 41.8, 38.6],
            color: "#38bdf8",
        },
    ];
    const options = {
        chart: {
            type: "bar",
            stacked: true,
            fontFamily: "Work Sans, sans-serif",
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
                barHeight: "80%",
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 1,
            colors: ["#fff"],
        },
        grid: {
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            min: -60,
            max: 60,
            labels: {
                style: {
                    fontSize: "15px",
                    colors: "#24438d",
                    fontFamily: "Work Sans, sans-serif",
                },
            },
        },
        tooltip: {
            theme: "dark",
            style: {
                fontFamily: "Work Sans, sans-serif",
            },
            shared: false,
            y: {
                formatter: function (val: any) {
                    return Math.abs(val) + "%";
                },
            },
        },
        xaxis: {
            categories: ["Pays", "Splits", "Lets you pay", "Doesn't matter"],
            labels: {
                formatter: function (val: any) {
                    return Math.abs(Math.round(val)) + "%";
                },
                style: {
                    fontSize: "15px",
                    colors: "#24438d",
                    fontFamily: "Work Sans, sans-serif",
                },
            },
        },
        legend: {
            fontSize: "16px",
            labels: {
                colors: "#24438d",
                fontFamily: "Work Sans, sans-serif",
            },
        },
        responsive: [
            {
                breakpoint: 640,
                options: {
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: "14px",
                                fontFamily: "Work Sans, sans-serif",
                            },
                            offsetY: -5,
                        },
                        title: {
                            style: {
                                fontSize: "14px",
                            },
                        },
                    },
                    yaxis: {
                        labels: {
                            style: {
                                fontSize: "14px",
                                colors: "#24438d",
                                fontFamily: "Work Sans, sans-serif",
                            },
                        },
                        title: {
                            style: {
                                fontSize: "14px",
                            },
                        },
                    },
                    legend: {
                        fontSize: "14px",
                    },
                },
            },
        ],
    };

    return <ReactApexChart type="bar" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default ByGenderWhoPays2024;
