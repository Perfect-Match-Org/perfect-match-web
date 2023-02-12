import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const SimilarInterest = () => {
  const series = [1585, 2070, 22];
  const options = {
    chart: {
      toolbar: {
        show: false,
        tools: {
          download: false
        }
      },
      width: '100%',
      type: 'donut',
    },
    labels: ["Similar", "Either", "Different"],
    colors: ['#fda4af', '#86efac', '#fde047'],
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -3
        },
        donut:{
          size: '50%'
        },
      }
    },
    dataLabels: {
      formatter(val: string, opts: any) {
        const name = opts.w.globals.labels[opts.seriesIndex]
        return [name, parseInt(val).toFixed(1) + '%']
      }
    },
    legend: {
      show: false
    }
  };

  return (
    <ReactApexChart
      type="donut"
      series={series}
      options={options as unknown as ApexCharts.ApexOptions}
    />
  );
};

export default SimilarInterest;
