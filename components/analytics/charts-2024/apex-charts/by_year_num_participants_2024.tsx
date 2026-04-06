import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});

const ByYearNumParticipants2024 = () => {
	const series = [
		{
			name: "Percent in total",
			data: [915, 1097, 1003, 824, 69, 52, 21, 2],
		},
	];
	const options = {
		tooltip: {
			enabled: true,
			theme: "dark",
		},
		colors: ["#fb7185", "#fb923c", "#facc15", "#4ade80", "#38bdf8", "#c4b5fd"],
		chart: {
			height: 100,
			type: "bar",
			toolbar: {
				show: false,
				tools: {
					download: false,
				},
			},
			fontFamily: "Work Sans, sans-serif",
		},
		plotOptions: {
			bar: {
				borderRadius: 10,
				dataLabels: {
					position: "top", // top, center, bottom
				},
				distributed: true,
			},
		},
		dataLabels: {
			enabled: true,
			formatter: function (val: any) {
				return val;
			},
			offsetY: -22,
			style: {
				fontSize: "16px",
				colors: ["#24438d"],
				fontWeight: 400,
			},
		},
		xaxis: {
			categories: ["Freshman", "Sophomore", "Junior", "Senior", "Masters", "PhD", "Alumni", "Faculty"],
			position: "bottom",
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
			tooltip: {
				theme: "dark",
				enabled: true,
			},
			labels: {
				style: {
					colors: "#24438d",
					fontSize: "15px",
				},
			},
		},
		yaxis: {
			max: 1200,
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
			labels: {
				show: false,
				formatter: function (val: any) {
					var percent = (val / 3983) * 100;
					return percent.toFixed(1) + "%";
				},
			},
		},
		legend: {
			show: false,
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
						offsetY: -16,
					},
				},
			},
		],
	};

	return <ReactApexChart type="bar" series={series as ApexAxisChartSeries} options={options as ApexCharts.ApexOptions} />;
};

export default ByYearNumParticipants2024;
