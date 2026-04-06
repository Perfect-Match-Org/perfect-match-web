import React, { useEffect } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

interface StateDataPolitics {
    state_code: string;
    state_name: string;
    politics_mean: number; // 0 represents suppressed data
}

interface DistributionDataPolitics {
    state_name: string;
    politics1: number;
    politics2: number;
    politics3: number;
    politics4: number;
    politics5: number;
    politics6: number;
    politics7: number;
    politics8: number;
    politics9: number;
    politics10: number;
}

interface PieDataPolitics {
    range: string;
    value: number;
}

const ByStatePolitics2024: React.FC = () => {
    useEffect(() => {
        const politicsChoropleth = d3.select<SVGSVGElement, unknown>("#politics-choropleth");
        const width = +politicsChoropleth.attr("width");
        const height = +politicsChoropleth.attr("height");
        const margin = { top: 0, right: 20, bottom: 0, left: 0 };
        const mapWidth = width - margin.left - margin.right;
        const mapHeight = height - margin.top - margin.bottom;

        const map = politicsChoropleth.append("g").attr("transform", `translate(${margin.left},${margin.top})`).style("background", "none");

        const requestData = async () => {
            // Load TopoJSON and CSV data
            const politicsUS: TopoJSON.Topology = (await d3.json("/data-for-viz-2024/us-smaller.json")) as TopoJSON.Topology;
            const aggregateDataPolitics: StateDataPolitics[] = await d3.csv<StateDataPolitics>(
                "/data-for-viz-2024/by_state_politics_mean.csv",
                (d) => ({
                    state_code: d.state_code,
                    state_name: d.state_name,
                    politics_mean: +d.politics_mean,
                }),
            );

            const distributionDataPolitics: DistributionDataPolitics[] = await d3.csv<DistributionDataPolitics>(
                "/data-for-viz-2024/by_state_politics_distribution.csv",
                (d) => ({
                    state_name: d.state_name,
                    politics1: +d.politics1,
                    politics2: +d.politics2,
                    politics3: +d.politics3,
                    politics4: +d.politics4,
                    politics5: +d.politics5,
                    politics6: +d.politics6,
                    politics7: +d.politics7,
                    politics8: +d.politics8,
                    politics9: +d.politics9,
                    politics10: +d.politics10,
                }),
            );

            // Choropleth map
            const states = topojson.feature(politicsUS, politicsUS.objects.states as TopoJSON.GeometryCollection);
            const statesMesh = topojson.mesh(politicsUS, politicsUS.objects.states as TopoJSON.GeometryCollection);
            const projection = d3.geoAlbersUsa().fitSize([mapWidth, mapHeight], states);
            const politicsPath = d3.geoPath().projection(projection);

            const blue_to_red = [
                "#0369a1",
                "#0ea5e9",
                "#38bdf8",
                "#bae6fd",
                "#e0f2fe",
                "#fee2e2",
                "#fecaca",
                "#fca5a5",
                "#f87171",
                "#dc2626",
            ];

            // Define continuous color scale for politics_mean
            const politicsColorScale = d3.scaleLinear<string>().domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).range(blue_to_red);

            const politicsStatePaths = map
                .selectAll<SVGPathElement, GeoJSON.Feature>("path.politics-state")
                .data(states.features)
                .join("path")
                .attr("class", "politics-state")
                .attr("fill", "lightgrey") // Default color for suppressed data
                .attr("d", politicsPath)
                .style("transition", "fill 1.2s ease-in-out")
                .style("pointer-events", "visible")
                .style("stroke", "none");

            map.append("path")
                .datum(statesMesh)
                .attr("class", "politics-outline")
                .attr("d", politicsPath)
                .style("fill", "none")
                .style("stroke", "white")
                .style("stroke-width", "1px");

            // Create a dictionary for state data
            const stateDict: { [key: string]: StateDataPolitics } = {};
            aggregateDataPolitics.forEach((d: StateDataPolitics) => {
                stateDict[d.state_code] = d;
            });

            // Fill states with colors based on data
            politicsStatePaths.style("fill", (d) => {
                const stateData = stateDict[d.id as string];
                if (!stateData || stateData.politics_mean === 0) {
                    return "#e9e9e9"; // Light grey for suppressed data
                }
                return politicsColorScale(stateData.politics_mean);
            });

            // Tooltip setup
            const tooltip = map.append("g").attr("class", "tooltip").attr("pointer-events", "none").attr("visibility", "hidden");

            tooltip.append("rect").attr("fill", "white").attr("stroke", "#24438d").attr("rx", 5).attr("ry", 5).attr("opacity", 0.9);

            const txt = tooltip
                .append("text")
                .style("fill", "#24438d")
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .style("font-weight", "bold");

            const txt2 = tooltip.append("text").style("fill", "#24438d").attr("text-anchor", "middle").style("font-size", "13px");

            // Mouse hover events
            politicsStatePaths
                .on("mouseenter", (event, d) => {
                    tooltip.style("visibility", "visible");

                    const stateID = d.id as string;
                    const stateDat = stateDict[stateID];

                    txt.text(stateDat.state_name);

                    if (stateDat.politics_mean === 0) {
                        txt2.text("Data not displayed due to small sample size.");
                    } else {
                        txt2.text(`Average leaning: ${stateDat.politics_mean.toFixed(2)}`);
                    }

                    // Position tooltip
                    const padding = 10;
                    const txtBox = (txt.node() as SVGTextElement).getBBox();
                    const txt2Box = (txt2.node() as SVGTextElement).getBBox();
                    const textWidth = Math.max(txtBox.width, txt2Box.width);
                    const textHeight = txtBox.height + txt2Box.height;

                    txt.attr("x", 0).attr("y", -textHeight / 2 + txtBox.height - 5);
                    txt2.attr("x", 0).attr("y", textHeight / 2 - 3);

                    tooltip
                        .select("rect")
                        .attr("x", -textWidth / 2 - padding)
                        .attr("y", -textHeight / 2 - padding)
                        .attr("width", textWidth + padding * 2)
                        .attr("height", textHeight + padding * 2);

                    const [xPos, yPos] = politicsPath.centroid(d);
                    tooltip.attr("transform", `translate(${xPos},${yPos - textHeight - 15})`).style("visibility", "visible");
                })
                .on("mouseleave", () => {
                    tooltip.style("visibility", "hidden");
                });

            // Pie chart setup
            const stateData2: { [key: string]: PieDataPolitics[] } = {};
            distributionDataPolitics.forEach((d: DistributionDataPolitics) => {
                stateData2[d.state_name] = [
                    { range: "1", value: d.politics1 },
                    { range: "2", value: d.politics2 },
                    { range: "3", value: d.politics3 },
                    { range: "4", value: d.politics4 },
                    { range: "5", value: d.politics5 },
                    { range: "6", value: d.politics6 },
                    { range: "7", value: d.politics7 },
                    { range: "8", value: d.politics8 },
                    { range: "9", value: d.politics9 },
                    { range: "10", value: d.politics10 },
                ];
            });

            const defaultStatesPolitics = ["California", "Connecticut", "Texas"];
            const pieRadius = 68;
            const pieHeight = 168;
            const pieSvg = d3.select<SVGSVGElement, unknown>("#pies_politics");

            const pie = d3
                .pie<PieDataPolitics>()
                .value((d) => d.value)
                .sort(null);
            const arc = d3.arc<d3.PieArcDatum<PieDataPolitics>>().innerRadius(0).outerRadius(pieRadius);

            // Define categorical color scale for pie charts
            const pieColorScalePolitics = d3
                .scaleOrdinal<string>()
                .domain(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"])
                .range(blue_to_red);

            const drawPiesPolitics = (states: string[]) => {
                pieSvg.selectAll("*").remove();
                states.forEach((stateName, i) => {
                    const ranges = stateData2[stateName];

                    const group = pieSvg.append("g").attr("transform", `translate(${pieRadius + 10}, ${i * pieHeight + pieRadius + 30})`);

                    // Draw pie slices
                    group
                        .selectAll("path")
                        .data(pie(ranges))
                        .enter()
                        .append("path")
                        .attr("d", arc)
                        .attr("fill", (d) => pieColorScalePolitics(d.data.range))
                        .attr("stroke", "white");

                    // Add percentage labels
                    group
                        .selectAll("text.percentage")
                        .data(pie(ranges))
                        .enter()
                        .append("text")
                        .attr("class", "percentage")
                        .attr("transform", (d) => {
                            const [x, y] = arc.centroid(d);
                            const offset = 1.3;
                            return `translate(${x * offset}, ${y * offset})`;
                        })
                        .attr("text-anchor", "middle")
                        .style("font-size", "12px")
                        .style("fill", "white")
                        .text((d) => {
                            const percentage = parseFloat(d.data.value.toFixed(1));
                            return percentage > 12 ? `${percentage}%` : "";
                        });

                    // Add state label
                    group
                        .append("text")
                        .attr("text-anchor", "middle")
                        .attr("y", -pieRadius - 10)
                        .style("font-size", "15px")
                        .style("fill", "#24438d")
                        .text(stateName);
                });
            };

            drawPiesPolitics(defaultStatesPolitics);

            // Legend
            const legendWidth = 700;
            const legendHeight = 55;
            const legendPadding = 35;

            // Select legend SVG
            const legendSvg = d3
                .select<SVGSVGElement, unknown>("#legendsvg_politics")
                .append("svg")
                .attr("id", "politics-legend")
                .attr("width", legendWidth + legendPadding * 2)
                .attr("height", legendHeight);

            // Define gradient
            const legendGradient = legendSvg
                .append("defs")
                .append("linearGradient")
                .attr("id", "politics-legend-gradient")
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "100%")
                .attr("y2", "0%");

            // Add color stops for gradient
            legendGradient
                .selectAll("stop")
                .data(d3.range(0, 1.1, 0.1))
                .enter()
                .append("stop")
                .attr("offset", (d) => `${d * 100}%`)
                .attr("stop-color", (d) => politicsColorScale(1 + d * 9));

            // Append rectangle with gradient
            legendSvg
                .append("rect")
                .attr("x", legendPadding)
                .attr("y", 5)
                .attr("rx", 10)
                .attr("ry", 10)
                .attr("width", legendWidth)
                .attr("height", 15)
                .style("fill", "url(#politics-legend-gradient)")
                .attr("stroke", "grey");

            // Add labels for 1 to 10
            const legendScale = d3
                .scaleLinear()
                .domain([1, 10])
                .range([legendPadding, legendPadding + legendWidth]);

            legendSvg
                .selectAll("text")
                .data(d3.range(1, 11)) // Numbers 1 to 10
                .enter()
                .append("text")
                .attr("x", (d) => legendScale(d))
                .attr("y", 35)
                .attr("text-anchor", "middle")
                .style("font-size", "15px")
                .style("fill", "#24438d")
                .text((d) => d.toString());
        };

        requestData();
    }, []);

    return (
        <div style={{ textAlign: "center" }} className="text-pmblue-500">
            <p style={{ fontSize: "16px", marginBottom: "0px", fontFamily: "Work Sans" }}>
                The lower the number, the more liberal; the higher the number, the more conservative.
            </p>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "calc(750px + 50px)",
                    margin: "0px auto",
                    position: "relative",
                }}
            >
                <svg id="legendsvg_politics" width="770" height="64" style={{ display: "block", margin: "0", marginTop: "5px" }}></svg>

                <div style={{ display: "flex", alignItems: "flex-start", position: "relative" }}>
                    {/* Choropleth */}
                    <div style={{ textAlign: "center", marginRight: "40px" }}>
                        <div>
                            <h4 style={{ fontSize: "18px", marginTop: "0px", fontFamily: "Dela Gothic One" }}>
                                Average Political Leaning Score
                            </h4>
                        </div>
                        <svg
                            id="politics-choropleth"
                            height="480"
                            width="720"
                            style={{
                                margin: "0px -10px -30px 0",
                                outline: "none",
                                border: "none",
                                background: "none",
                            }}
                        ></svg>
                    </div>

                    {/* Pie Chart */}
                    <div style={{ textAlign: "center", marginLeft: "0px" }}>
                        <h4
                            style={{
                                marginLeft: "-50px",
                                fontSize: "18px",
                                marginTop: "0px",
                                fontFamily: "Dela Gothic One",
                            }}
                        >
                            Distribution
                        </h4>
                        <svg id="pies_politics" width="200" height="510"></svg>
                    </div>
                </div>
            </div>

            <p style={{ marginTop: "0px", fontSize: "14px", marginBottom: "0px", fontFamily: "Work Sans" }}>
                Data for regions, including those outside the U.S., has been omitted if the sample size is too small to be representative.
            </p>
        </div>
    );
};

export default ByStatePolitics2024;
