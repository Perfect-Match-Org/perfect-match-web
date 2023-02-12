import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const FridayNight = () => {
  const series = [1305, 652, 519, 518, 443, 240];
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
    labels: ["Netflix & PJ's", "Mixer or date night", "Frat party", "Bar hopping", "Netflix & chill", "Studying"],
    colors: ['#fda4af', '#fdba74', '#fde047', '#86efac', '#7dd3fc', '#c4b5fd'],
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

export default FridayNight;
