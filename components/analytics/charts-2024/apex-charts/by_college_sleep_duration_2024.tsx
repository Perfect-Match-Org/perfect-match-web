import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});

const ByCollegeSleepDuration2024 = () => {
	const series = [
		{
			name: "CALS",
			color: "#ef4444",
			data: [0.5, 2.2, 4.9, 18.9, 39.0, 25.3, 6.6, 1.9, 0.5],
		},
		{
			name: "AAP",
			color: "#f97316",
			data: [0, 3.6, 12.1, 20.5, 36.1, 19.3, 6.0, 1.2, 0],
		},
		{
			name: "CAS",
			color: "#eab308",
			data: [0.2, 2.6, 5.2, 22.3, 40.0, 22.5, 5.5, 0.8, 0.3],
		},
		{
			name: "Dyson",
			color: "#84cc16",
			data: [1.1, 1.6, 8.7, 17.9, 37.0, 23.9, 7.6, 1.6, 0],
		},
		{
			name: "Engineering",
			color: "#34d399",
			data: [0.2, 1.3, 6.5, 23.7, 41.8, 21.8, 3.7, 0.4, 0.3],
		},
		{
			name: "Hotel",
			color: "#38bdf8",
			data: [0, 1.1, 4.4, 8.7, 37.5, 36.4, 12.0, 0, 0],
		},
		{
			name: "Human Ecology",
			color: "#c084fc",
			data: [0.4, 1.8, 6.5, 18.7, 38.1, 24.5, 9.0, 0.7, 0],
		},
		{
			name: "ILR",
			color: "#f472b6",
			data: [0, 0.5, 3.2, 21.1, 35.3, 24.8, 11.5, 3.2, 0.5],
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
			categories: ["4", "5", "6", "7", "8", "9", "10", "11", "12"],
			labels: {
				style: {
					fontSize: "15px",
					colors: "#24438d",
				},
			},
			title: {
				text: "Daily Sleep Duration (in Hours)",
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
			x: {
				formatter: function (value: any) {
					return parseInt(value) + 3 + " hours";
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

export default ByCollegeSleepDuration2024;
