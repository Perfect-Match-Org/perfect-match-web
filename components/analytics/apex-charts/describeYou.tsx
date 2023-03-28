import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const DescribeYou = () => {
  const series = [
    {
      data: [
        {
          x: "Funny",
          y: 1170,
        },
        {
          x: "Smart",
          y: 523,
        },
        {
          x: "Caring",
          y: 467,
        },
        {
          x: "Kind",
          y: 441,
        },
        {
          x: "Thoughtful",
          y: 423,
        },
        {
          x: "Outgoing",
          y: 283,
        },
        {
          x: "Adventurous",
          y: 229,
        },
        {
          x: "Creative",
          y: 220,
        },
        {
          x: "Chill",
          y: 208,
        },
        {
          x: "Witty",
          y: 202,
        },
        {
          x: "Passionate",
          y: 183,
        },
        {
          x: "Charming",
          y: 169,
        },
        {
          x: "Ambitious",
          y: 155,
        },
        {
          x: "Spontaneous",
          y: 152,
        },
      ],
    },
  ];
  const options = {
    legend: {
      show: false,
    },
    chart: {
      height: 350,
      type: "treemap",
      toolbar: {
        show: false,
        tools: {
          download: false
        }
      }
    },
    dataLabels: {
      style: {
        fontSize: "20px",
        colors: ["#6b7280"],
      },
    },
    colors: [
      "#25b7f7",
      "#38bdf8",
      "#4bc3f9",
      "#5ecaf9",
      "#71d0fa",
      "#84d6fb",
      "#97dcfb",
      "#aae3fc",
      "#bde9fd",
      "#d0effd",
      "#e3f6fe",
      "#f5fcff",
      "#e3f4fe",
      "#f6fbff",
      "#ffffff",
    ],
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
      },
    },
  };

  return (
    <ReactApexChart
      type="treemap"
      series={series}
      options={options as ApexCharts.ApexOptions}
    />
  );
};

export default DescribeYou;
