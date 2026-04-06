import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});

const ByCollegeRicePurity2024 = () => {
	const series = [
		{
			name: "CALS",
			color: "#ef4444",
			data: [3.6, 20.2, 24.7, 22.5, 29.1],
		},
		{
			name: "AAP",
			color: "#f97316",
			data: [4.8, 16.9, 21.7, 25.3, 31.3],
		},
		{
			name: "CAS",
			color: "#eab308",
			data: [3.8, 17.4, 22.2, 25.1, 31.6],
		},
		{
			name: "Dyson",
			color: "#84cc16",
			data: [3.8, 22.8, 26.1, 20.1, 27.2],
		},
		{
			name: "Engineering",
			color: "#34d399",
			data: [2.8, 11.1, 22.7, 23.1, 40.4],
		},
		{
			name: "Hotel",
			color: "#38bdf8",
			data: [5.4, 28.3, 28.3, 23.9, 14.1],
		},
		{
			name: "Human Ecology",
			color: "#c084fc",
			data: [3.2, 16.6, 27.3, 24.8, 28.1],
		},
		{
			name: "ILR",
			color: "#f472b6",
			data: [4.6, 21.1, 29.4, 22.0, 22.9],
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
			categories: ["0-20", "21-40", "41-60", "61-80", "81-100"],
			labels: {
				style: {
					fontSize: "15px",
					colors: "#24438d",
				},
			},
			title: {
				text: "Rice Purity Score",
				style: {
					color: "#24438d",
					fontSize: "15px",
					fontWeight: 400,
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

export default ByCollegeRicePurity2024;
