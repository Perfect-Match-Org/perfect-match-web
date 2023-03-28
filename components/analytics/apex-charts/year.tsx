import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Year = () => {
  const series = [
    {
      name: 'Percent in total',
      data: [690, 877, 971, 882, 130, 81, 41, 5],
    },
  ];
  const options = {
    colors: ['#fda4af', '#fdba74', '#fde047', '#86efac', '#7dd3fc', '#c4b5fd'],
    chart: {
      height: 350,
      type: 'bar',
      toolbar: {
        show: false,
        tools: {
          download: false
        }
      }
    },
    plotOptions: {
        bar: {
            borderRadius: 10,
            dataLabels: {
                position: 'top', // top, center, bottom
            },
            distributed: true,
        }
    },
    dataLabels: {
        enabled: true,
        formatter: function (val: any) {
            return val;
        },
        offsetY: -20,
        style: {
            fontSize: '12px',
            colors: ['#6b7280']
        }
    },
    xaxis: {
        categories: ["Freshman", "Sophomore", "Junior", "Senior", "Masters", "PhD", "Alumni", "Faculty"],
        position: 'bottom',
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
        tooltip: {
            enabled: true,
        },
        labels:{
            style: {
                colors: '#6b7280',
                fontSize: '12px',
            }
        }
    },
    yaxis: {
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false,
        },
        labels: {
            show: false,
            formatter: function (val: any) {
                var percent = (val/3677) * 100;
                return percent.toFixed(1) + '%';
            }
        }
    },
    legend: {
        show: false
    }
}

  return (
    <ReactApexChart
      type="bar"
      series={series}
      options={options as ApexCharts.ApexOptions}
    />
  );
};

export default Year;
