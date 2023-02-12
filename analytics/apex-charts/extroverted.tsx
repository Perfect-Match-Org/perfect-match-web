import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Extroverted = () => {
  const series = [
    {
      name: "Doesn't matter",
      data: [6, 27, 153, 260, 190, 249, 325, 259, 74, 40]
    },
    { 
      name: 'More',
      data: [7, 43, 175, 239, 201, 211, 147, 48, 4, 8]
    },
    {
      name: 'Same',
      data: [2, 15, 62, 75, 68, 103, 228, 205, 62, 30]
    },
    {
      name: 'Less',
      data: [0, 5, 8, 9, 11, 25, 30, 45, 22, 6]
    },
  ];
  const options = {
    chart: {
      height: 300,
      type: 'heatmap',
      toolbar: {
        show: false,
        tools: {
          download: false
        }
      }
    },
    xaxis: {
      type: 'category',
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      labels:{
        style:{
          fontSize: '12px',
          colors: '#6b7280'
        }
      },
      title: {
        text: "Extroverted to Introverted",
          style:{
              fontSize: '12px',
              color: '#6b7280'
            }
      },
    },
    yaxis: {
      title: {
        text: "Prefer Partner to be (...) Extroverted",
          style:{
              fontSize: '12px',
              color: '#6b7280'
            }
      },
      labels:{
        style:{
          fontSize: '12px',
          colors: '#6b7280'
        }
      },
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#fb7185"],
  };

  return (
    <ReactApexChart
      type="heatmap"
      series={series}
      options={options as ApexCharts.ApexOptions}
    />
  );
};

export default Extroverted;
