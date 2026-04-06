import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const ByCollegeSleepTime2024 = () => {
    const series = [
        {
            name: "CALS",
            color: "#ef4444",
            data: [3.9, 18.3, 35.0, 26.9, 12.0, 3.2, 0.1],
        },
        {
            name: "AAP",
            color: "#f97316",
            data: [2.4, 12.1, 21.7, 38.6, 19.3, 3.6, 1.2],
        },
        {
            name: "CAS",
            color: "#eab308",
            data: [2.6, 12.0, 31.5, 30.9, 17.2, 4.4, 0.4],
        },
        {
            name: "Dyson",
            color: "#84cc16",
            data: [2.7, 10.3, 29.9, 33.2, 16.9, 5.4, 1.1],
        },
        {
            name: "Engineering",
            color: "#34d399",
            data: [2.9, 12.9, 32.4, 30.7, 16.0, 4.1, 0.1],
        },
        {
            name: "Hotel",
            color: "#38bdf8",
            data: [2.7, 23.4, 41.9, 24.5, 6.5, 1.1, 0.0],
        },
        {
            name: "Human Ecology",
            color: "#c084fc",
            data: [2.5, 9.7, 37.4, 34.9, 9.7, 4.7, 0.0],
        },
        {
            name: "ILR",
            color: "#f472b6",
            data: [3.7, 14.7, 30.7, 35.8, 11.0, 3.2, 0.9],
        },
    ];
    const options = {
        chart: {
            type: "area",
            toolbar: {
                show: false,
                tools: {
                    download: false,
                },
            },
            fontFamily: "Work Sans, sans-serif",
        },
        zoom: {
            enabled: false,
            allowMouseWheelZoom: false,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "straight",
        },
        xaxis: {
            categories: ["10pm", "11pm", "12am", "1am", "2am", "3am", "4am"],
            labels: {
                style: {
                    fontSize: "15px",
                    colors: "#24438d",
                },
            },
        },
        yaxis: {
            min: 0,
            max: 45,
            tickAmount: 9,
            labels: {
                style: {
                    fontSize: "15px",
                    colors: "#24438d",
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
                },
            },
        },
        legend: {
            fontSize: "16px",
            labels: {
                colors: "#24438d",
            },
            position: "top",
        },
        tooltip: {
            theme: "dark",

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
                        fontSize: "13px",
                    },
                },
            },
        ],
    };

    return <ReactApexChart type="area" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default ByCollegeSleepTime2024;
