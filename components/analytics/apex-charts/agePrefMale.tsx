import dynamic from 'next/dynamic';
import { ValidatorResult } from 'survey-react';
import styles from '../../../styles/Statistics.module.css';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const AgePrefMale = () => {
    const series = [
        {
            name: "18",
            data: [99.6, 98.8, 74.1, 45, 26.3, 10, 8, 6.8, 3.6, 3.6, 3.2, 3.2, 2.8, 2.4, 2.4, 2.4, 2.4, 2.4],
        },
        {
            name: '19',
            data: [87.6, 98.6, 92, 72.3, 48.1, 21.4, 14, 10.4, 6.9, 6, 6, 5.5, 4.9, 3.3, 3.0, 3.0, 3.0, 3.0],
        },
        {
            name: '20',
            data: [55.3, 95.4, 98.6, 93.2, 70.4, 37.6, 23.6, 15.7, 10, 7.1, 6.6, 5.4, 5.4, 3.1, 3.1, 3.1, 3.1, 3.1],
        },
        {
            name: '21',
            data: [32.7, 75.7, 97.4, 98.7, 94.5, 63.1, 31.1, 20.4, 8.7, 6.5, 6.1, 4.9, 4.2, 3.2, 3.2, 2.9, 2.9, 2.9],
        },
        {
            name: '22',
            data: [26.5, 60, 90.3, 98.1, 98.7, 84.5, 59.4, 38.7, 16.8, 12.3, 10.3, 9, 7.7, 4.5, 4.5, 4.5, 4.5, 4.5],
        },
        {
            name: '23 and over',
            data: [20.7, 29.8, 53.7, 77.7, 89.3, 90.1, 87.6, 87.6, 77.7, 62.8, 53.7, 40.5, 33.1, 14.9, 14.9, 10.7, 9.9, 8.3],
        },
    ];
    const options = {
        chart: {
            height: 300,
            type: 'heatmap',
            toolbar: {
                show: false,
                tools: {
                    download: false,
                },
            },
            animations: {
                enabled: false
            }
        },
        xaxis: {
            type: 'category',
            categories: ['18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'],
            labels: {
                style: {
                    fontSize: '14px',
                    colors: '#6b7280',
                },
            },
            title: {
                text: 'Age Range Preferences for Matches',
                offSetY: -10,
                style: {
                    fontSize: '15px',
                    color: '#6b7280',
                    fontWeight: 400
                },
            },
        },
        yaxis: {
            title: {
                text: 'Age of Participants',
                style: {
                    fontSize: '15px',
                    color: '#6b7280',
                    fontWeight: 400
                },
            },
            labels: {
                style: {
                    fontSize: '14px',
                    colors: '#6b7280',
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['#38bdf8'],
        tooltip: {
            y: {
                formatter: function (value: any, { series, seriesIndex, dataPointIndex, w }: any) {
                    var ageParticipant = seriesIndex + 18
                    if (ageParticipant == 23) {
                        ageParticipant = ageParticipant + ' and over'
                    }
                    return (
                        '<div className="text-orange-500">' +
                        value +
                        "% of men aged " +
                        ageParticipant +
                        " would date someone aged " +
                        (dataPointIndex + 17) +
                        ".</div>"
                    );
                },
                title: {
                    formatter: function (value: any) {
                        return ''
                    }
                }
            },
            style: {
                fontSize: '13px'
            }

        },
        responsive: [{
            breakpoint: 640,
            options: {
                xaxis: {
                    labels: {
                        rotate: -90,
                        style: {
                            fontSize: '11px'
                        },
                        offsetY: -5
                    },
                    title: {
                        style: {
                            fontSize: '12px'
                        }
                    }
                },
                dataLabels: {
                    style: {
                        fontSize: '11px',
                    },
                    offsetY: -16
                },
                yaxis: {
                    title: {
                        text: 'Age of Participants',
                        style: {
                            fontSize: '11px',
                            color: '#6b7280',
                            fontWeight: 400
                        },
                    },
                    labels: {
                        style: {
                            fontSize: '11px',
                            colors: '#6b7280',
                        },
                    }
                }
            },
        }]
    };

    return <ReactApexChart type="heatmap" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default AgePrefMale;