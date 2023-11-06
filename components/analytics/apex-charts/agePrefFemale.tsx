import dynamic from 'next/dynamic';
import { ValidatorResult } from 'survey-react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const AgePrefFemale = () => {
    const series = [
        {
            name: "18 and under",
            data: [15, 97.1, 98.7, 86.1, 52.2, 24.9, 9.2, 5.5, 3.9, 2.1, 1.3, 1.3, 1.0, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8],
        },
        {
            name: '19',
            data: [1.9, 53, 96.2, 96.8, 86.1, 55.3, 26.9, 13.5, 7.6, 2.1, 1.8, 1.6, 1.3, 1.3, 0.8, 0.8, 0.8, 0.8, 0.8],
        },
        {
            name: '20',
            data: [0.6, 12.8, 63.7, 97.2, 96.4, 86.8, 59.2, 27.6, 14.1, 5.5, 3.4, 2.8, 2.4, 2.1, 1.1, 1.1, 1.1, 1.1, 1.1],
        },
        {
            name: '21',
            data: [0.4, 4.8, 25.7, 78.8, 97.9, 98.1, 85.5, 59.5, 36.3, 15.6, 8.3, 6.0, 3.1, 2.5, 1.2, 1.0, 1.0, 1.0, 1.0],
        },
        {
            name: '22',
            data: [1, 3.7, 10.5, 45, 86.9, 97.4, 95.8, 85.3, 61.3, 37.2, 22, 14.1, 8.4, 5.2, 2.1, 2.1, 1.6, 1.6, 1.6],
        },
        {
            name: '23 and over',
            data: [0, 2.2, 4.3, 8.6, 32.3, 50.5, 71, 79.6, 84.9, 80.6, 74.2, 63.4, 48.4, 46.2, 34.4, 33.3, 28, 24.7, 21.5],
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
            categories: ['17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'],
            labels: {
                style: {
                    fontSize: '14px',
                    colors: '#6b7280'
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
        colors: ['#fb7185'],
        tooltip: {
            y: {
                formatter: function (value: any, { series, seriesIndex, dataPointIndex, w }: any) {
                    var ageParticipant = seriesIndex + 18
                    if (ageParticipant == 18) {
                        ageParticipant = ageParticipant + ' and under'
                    } else if (ageParticipant == 23) {
                        ageParticipant = ageParticipant + ' and over'
                    }
                    return value + '% of women aged ' + ageParticipant + ' would date someone aged ' + (dataPointIndex + 17) + '.'
                },
                title: {
                    formatter: function (value: any) {
                        return ''
                    }
                }
            },
            style: {
                fontSize: '13px'
            },
        }
    };

    return <ReactApexChart type="heatmap" series={series} options={options as ApexCharts.ApexOptions} />;
};

export default AgePrefFemale;
