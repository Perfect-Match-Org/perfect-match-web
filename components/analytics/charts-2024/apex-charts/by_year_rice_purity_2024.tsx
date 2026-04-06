import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});

const ByYearRicePurity2024 = () => {
	const series = [
		{
			name: "Freshman",
			data: [1.9, 9.2, 16.9, 27.2, 44.8],
			color: "#fb7185",
		},
		{
			name: "Sophomore",
			data: [2.4, 16.9, 24.0, 24.7, 32.1],
			color: "#fb923c",
		},
		{
			name: "Junior",
			data: [5.0, 18.8, 26.6, 21.8, 27.7],
			color: "#facc15",
		},
		{
			name: "Senior",
			data: [5.1, 24.7, 29.3, 20.5, 20.4],
			color: "#4ade80",
		},
	];
	const options = {
		chart: {
			type: "bar",
			height: 500,
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
				horizontal: false,
				dataLabels: {
					position: "top",
				},
			},
		},
		dataLabels: {
			enabled: true,
			style: {
				fontSize: "12px",
				colors: ["#24438d"],
				fontWeight: 400,
			},
			formatter: function (val: any) {
				return Math.abs(Math.round(val)) + "%";
			},
			offsetY: -15,
			offsetX: 2,
		},
		stroke: {
			show: true,
			width: 1,
			colors: ["#fff"],
		},
		tooltip: {
			theme: "dark",
			shared: true,
			intersect: false,
			y: {
				formatter: function (val: any) {
					return Math.abs(val) + "%";
				},
			},
		},
		xaxis: {
			categories: ["0-20", "21-40", "41-60", "61-80", "81-100"],
			labels: {
				style: {
					fontSize: "15px",
					colors: "#24438d",
				},
			},
			title: {
				text: "Rice Purity Score (Higher = More Innocent)",
				style: {
					fontSize: "15px",
					color: "#24438d",
					fontWeight: 400,
				},
			},
		},
		yaxis: {
			max: 45,
			labels: {
				formatter: function (value: any) {
					return value + "%";
				},
				style: {
					fontSize: "15px",
					colors: "#24438d",
				},
			},
		},
		legend: {
			position: "top",
			fontSize: "16px",
			labels: {
				colors: "#24438d",
			},
		},
	};

	return <ReactApexChart type="bar" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default ByYearRicePurity2024;
