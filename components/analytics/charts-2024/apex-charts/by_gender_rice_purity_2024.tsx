import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const ByGenderRicePurity2024 = () => {
    const series = [
        {
            name: "Female",
            color: "#fb7185",
            data: [3.2, 16.1, 23.3, 23.5, 33.9],
        },
        {
            name: "Male",
            color: "#38bdf8",
            data: [4.3, 18.3, 25.8, 23.7, 27.9],
        },
    ];
    const options = {
        chart: {
            type: "area",
            fontFamily: "Work Sans, sans-serif", // Change font family
            toolbar: {
                show: false,
                tools: {
                    download: false,
                },
            },
        },
        zoom: {
            enabled: false,
            allowMouseWheelZoom: false,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "straight", // Disable smoothing curves
        },
        xaxis: {
            categories: ["0-20", "21-40", "41-60", "61-80", "81-100"],
            labels: {
                style: {
                    fontSize: "15px",
                    colors: "#24438d",
                    fontFamily: "Work Sans, sans-serif", // Change font family
                },
            },
        },
        yaxis: {
            min: 0,
            max: 40,
            tickAmount: 4,
            labels: {
                style: {
                    fontSize: "15px",
                    colors: "#24438d",
                    fontFamily: "Work Sans, sans-serif", // Change font family
                },
                formatter: function (value: number) {
                    return value + "%";
                },
            },
            title: {
                text: "Percentage of Participants",
                style: {
                    color: "#24438d",
                    fontSize: "15px",
                    fontWeight: 400,
                    fontFamily: "Work Sans, sans-serif",
                },
            },
        },
        legend: {
            fontSize: "16px",
            labels: {
                colors: "#24438d",
                fontFamily: "Work Sans, sans-serif", // Change font family
            },
        },
        tooltip: {
            theme: "dark",
            style: {
                fontFamily: "Work Sans, sans-serif", // Change font family
            },
            y: {
                formatter: function (value: any) {
                    return value + "%";
                },
            },
        },
        responsive: [
            {
                breakpoint: 640,
                options: {
                    xaxis: {
                        labels: {
                            rotate: -90,
                            style: {
                                fontSize: "11px",
                                fontFamily: "Work Sans, sans-serif",
                            },
                        },
                    },
                    dataLabels: {
                        style: {
                            fontSize: "11px",
                        },
                    },
                    yaxis: {
                        title: {
                            show: false,
                        },
                        labels: {
                            show: false,
                        },
                    },
                    legend: {
                        fontSize: "14px",
                    },
                },
            },
        ],
    };

    return <ReactApexChart type="area" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default ByGenderRicePurity2024;
