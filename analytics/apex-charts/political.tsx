import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Political = () => {
  const series = [412, 685, 1078, 566, 496, 182, 140, 81, 21, 16];
  const options = {
    chart: {
      type: 'pie',
      toolbar: {
        show: false,
        tools: {
          download: false
        }
      }
    },
    colors: ['#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd', '#e0f2fe', '#fff1f2', '#ffe4e6', '#fecdd3', '#fda4af', '#f43f5e'],
    legend: {
      show: false
    },
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        donut:{
          size: '0%'
        },
        dataLabels: {
          minAngleToShowLabel: 10,
        }
      }
    },
    grid: {
      padding: {
        bottom: -100
      }
    },
    dataLabels: {
      formatter(val: any, opts: any) {
        const name = opts.w.globals.labels[opts.seriesIndex]
        return [name, parseInt(val).toFixed(1) + '%']
      },
      style: {
        fontSize: '14px'
      }
    },
  };

  return (
    <ReactApexChart
      type="pie"
      series={series}
      options={options as unknown as ApexCharts.ApexOptions}
    />
  );
};

export default Political;
