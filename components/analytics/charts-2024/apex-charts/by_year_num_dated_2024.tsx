import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});

const ByYearNumDated2024 = () => {
	const series = [
		{
			name: "Freshman",
			data: [45.1, 29.1, 16.8, 5.8, 3.2],
			color: "#fb7185",
		},
		{
			name: "Sophomore",
			data: [40.2, 30.6, 17.0, 8.5, 3.4],
			color: "#fb923c",
		},
		{
			name: "Junior",
			data: [34.1, 31.5, 19.9, 9.2, 5.3],
			color: "#facc15",
		},
		{
			name: "Senior",
			data: [28.0, 32.6, 23.8, 11.7, 4],
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
			categories: ["0", "1", "2", "3", "4+"],
			labels: {
				style: {
					fontSize: "15px",
					colors: "#24438d",
				},
			},
			title: {
				text: "Number of People Dated",
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

export default ByYearNumDated2024;
