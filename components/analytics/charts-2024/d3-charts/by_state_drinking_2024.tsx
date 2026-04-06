import React, { useEffect } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

interface DrinkStateData {
    state_code: string;
    state_name: string;
    often_percentage: number;
}

const ByStateDrinkOften2024: React.FC = () => {
    useEffect(() => {
        const drinkChoropleth = d3.select<SVGSVGElement, unknown>("#drink-choropleth");
        const width = +drinkChoropleth.attr("width");
        const height = +drinkChoropleth.attr("height");
        const margin = { top: 0, right: 20, bottom: 0, left: 0 };
        const drinkMapWidth = width - margin.left - margin.right;
        const drinkMapHeight = height - margin.top - margin.bottom;

        const drinkMap = drinkChoropleth.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const loadDrinkData = async () => {
            const drinkUS: TopoJSON.Topology = (await d3.json("/data-for-viz-2024/us-smaller.json")) as TopoJSON.Topology;
            const drinkAggregateData: DrinkStateData[] = await d3.csv<DrinkStateData>(
                "/data-for-viz-2024/by_state_drink_often.csv",
                (d) => ({
                    state_code: d.state_code,
                    state_name: d.state_name,
                    often_percentage: +d.often_percentage,
                }),
            );

            const drinkStates = topojson.feature(drinkUS, drinkUS.objects.states as TopoJSON.GeometryCollection);
            const drinkStatesMesh = topojson.mesh(drinkUS, drinkUS.objects.states as TopoJSON.GeometryCollection);
            const drinkProjection = d3.geoAlbersUsa().fitSize([drinkMapWidth, drinkMapHeight], drinkStates);
            const drinkPath = d3.geoPath().projection(drinkProjection);

            const drinkStatePaths = drinkMap
                .selectAll<SVGPathElement, GeoJSON.Feature>("path.drink-state")
                .data(drinkStates.features)
                .join("path")
                .attr("class", "drink-state")
                .attr("fill", "lightgrey")
                .attr("d", drinkPath)
                .style("transition", "fill 1.2s ease-in-out")
                .style("pointer-events", "visible")
                .style("stroke", "none");

            drinkMap
                .append("path")
                .datum(drinkStatesMesh)
                .attr("class", "drink-outline")
                .attr("d", drinkPath)
                .style("fill", "none")
                .style("stroke", "white")
                .style("stroke-width", "1px");

            const drinkStateDict: { [key: string]: DrinkStateData } = {};
            drinkAggregateData.forEach((d: DrinkStateData) => {
                drinkStateDict[d.state_code] = d;
            });

            const drinkColorScale = d3.scaleSequential(d3.interpolateRgb("#ffffff", "#eb5000")).domain([28, 72]);

            // Fill states with colors based on data
            drinkStatePaths.style("fill", (d) => {
                const drinkStateData = drinkStateDict[d.id as string];
                return drinkStateData && drinkStateData.often_percentage !== -1
                    ? drinkColorScale(drinkStateData.often_percentage)
                    : "#e9e9e9";
            });

            // Tooltip setup
            const drinkTooltip = drinkMap
                .append("g")
                .attr("class", "drink-tooltip")
                .attr("pointer-events", "none")
                .attr("visibility", "hidden");

            drinkTooltip.append("rect").attr("fill", "white").attr("stroke", "#24438d").attr("rx", 5).attr("ry", 5).attr("opacity", 0.9);

            const drinkTxt = drinkTooltip
                .append("text")
                .style("fill", "#24438d")
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .style("font-weight", "bold");

            const drinkTxt2 = drinkTooltip.append("text").style("fill", "#24438d").attr("text-anchor", "middle").style("font-size", "13px");

            // Mouse hover events
            drinkStatePaths
                .on("mouseenter", (event, d) => {
                    drinkTooltip.style("visibility", "visible");

                    const drinkStateID = d.id as string;
                    const drinkStateDat = drinkStateDict[drinkStateID];

                    drinkTxt.text(drinkStateDat?.state_name || "Unknown");

                    if (!drinkStateDat || drinkStateDat.often_percentage === -1) {
                        drinkTxt2.text("Data not displayed due to small sample size.");
                    } else {
                        drinkTxt2.text(`Drink often: ${drinkStateDat.often_percentage.toFixed(1)}%`);
                    }

                    // Position tooltip
                    const padding = 10;
                    const drinkTxtBox = (drinkTxt.node() as SVGTextElement).getBBox();
                    const drinkTxt2Box = (drinkTxt2.node() as SVGTextElement).getBBox();
                    const drinkTextWidth = Math.max(drinkTxtBox.width, drinkTxt2Box.width);
                    const drinkTextHeight = drinkTxtBox.height + drinkTxt2Box.height;

                    drinkTxt.attr("x", 0).attr("y", -drinkTextHeight / 2 + drinkTxtBox.height - 5);
                    drinkTxt2.attr("x", 0).attr("y", drinkTextHeight / 2 - 3);

                    drinkTooltip
                        .select("rect")
                        .attr("x", -drinkTextWidth / 2 - padding)
                        .attr("y", -drinkTextHeight / 2 - padding)
                        .attr("width", drinkTextWidth + padding * 2)
                        .attr("height", drinkTextHeight + padding * 2);

                    const [drinkXPos, drinkYPos] = drinkPath.centroid(d);
                    drinkTooltip
                        .attr("transform", `translate(${drinkXPos},${drinkYPos - drinkTextHeight - 15})`)
                        .style("visibility", "visible");
                })
                .on("mouseleave", () => {
                    drinkTooltip.style("visibility", "hidden");
                });

            // Legend
            const legendWidth = 700;
            const legendHeight = 60;
            const legendPadding = 35;

            const drinkLegendSvg = d3
                .select<SVGSVGElement, unknown>("#drink-legendsvg")
                .append("svg")
                .attr("id", "drink-legend")
                .attr("width", legendWidth + legendPadding * 2)
                .attr("height", legendHeight)
                .style("overflow", "visible");

            const drinkLegendScale = d3
                .scaleLinear()
                .domain([28, 72])
                .range([legendPadding, legendWidth - legendPadding]);

            const drinkLegendGradient = drinkLegendSvg
                .append("defs")
                .append("linearGradient")
                .attr("id", "drink-legend-gradient")
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "100%")
                .attr("y2", "0%");

            drinkLegendGradient
                .selectAll("stop")
                .data(d3.range(0, 1.1, 0.1))
                .enter()
                .append("stop")
                .attr("offset", (d) => `${d * 100}%`)
                .attr("stop-color", (d) => drinkColorScale(28 + d * (72 - 28)));

            drinkLegendSvg
                .append("rect")
                .attr("x", legendPadding)
                .attr("y", 5)
                .attr("width", legendWidth)
                .attr("height", 15)
                .style("fill", "url(#drink-legend-gradient)")
                .attr("rx", 10)
                .attr("ry", 10)
                .attr("stroke", "grey");

            const legendLabels = [30, 40, 50, 60, 70];

            drinkLegendSvg
                .selectAll("text")
                .data(legendLabels)
                .enter()
                .append("text")
                .attr("x", (d) => drinkLegendScale(d))
                .attr("y", 35)
                .attr("text-anchor", "middle")
                .style("font-size", "15px")
                .style("fill", "#24438d")
                .text((d) => `${d}%`);
        };

        loadDrinkData();
    }, []);

    return (
        <div
            className="text-pmblue-500"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "calc(750px + 300px)",
                margin: "10px auto",
                position: "relative",
            }}
        >
            <h4 style={{ fontSize: "18px", marginTop: "0px", fontFamily: "Dela Gothic One" }}>
                Percentage of Respondents Who Drink &apos;Often&apos;
            </h4>
            <svg id="drink-legendsvg" width="770" height="55" style={{ display: "block", margin: "0", marginTop: "10px" }}></svg>
            <svg
                id="drink-choropleth"
                height="480"
                width="720"
                style={{
                    margin: "-15px -10px 0px 0",
                }}
            ></svg>

            <p style={{ marginTop: "20px", fontSize: "14px", marginBottom: "0px", fontFamily: "Work Sans" }}>
                Data for regions, including those outside the U.S., has been omitted if the sample size is too small to be representative.
            </p>
        </div>
    );
};

export default ByStateDrinkOften2024;
