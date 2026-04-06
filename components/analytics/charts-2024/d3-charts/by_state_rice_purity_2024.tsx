import React, { useEffect } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

// Define types for the data
interface StateData {
	state_code: string;
	state_name: string;
	score_mode: string;
}

interface DistributionData {
	state_name: string;
	score_range1: number;
	score_range2: number;
	score_range3: number;
	score_range4: number;
	score_range5: number;
}

interface PieData {
	range: string;
	value: number;
}

const ByStateRicePurity2024: React.FC = () => {
	useEffect(() => {
		const rpChoropleth = d3.select<SVGSVGElement, unknown>("#rice-purity-choropleth");
		const width = +rpChoropleth.attr("width");
		const height = +rpChoropleth.attr("height");
		const margin = { top: 0, right: 20, bottom: 0, left: 0 };
		const mapWidth = width - margin.left - margin.right;
		const mapHeight = height - margin.top - margin.bottom;

		const map = rpChoropleth.append("g").attr("transform", `translate(${margin.left},${margin.top})`).style("background", "none");

		const requestData = async () => {
			// Load TopoJSON and CSV data
			const us: TopoJSON.Topology = (await d3.json("/data-for-viz-2024/us-smaller.json")) as TopoJSON.Topology;
			const aggregateData: StateData[] = await d3.csv<StateData>("/data-for-viz-2024/by_state_rice_purity_mode.csv", (d) => ({
				state_code: d.state_code,
				state_name: d.state_name,
				score_mode: d.score_mode,
			}));

			const distributionData: DistributionData[] = await d3.csv<DistributionData>(
				"/data-for-viz-2024/by_state_rice_purity_distribution.csv",
				(d) => ({
					state_name: d.state_name,
					score_range1: +d.score_range1,
					score_range2: +d.score_range2,
					score_range3: +d.score_range3,
					score_range4: +d.score_range4,
					score_range5: +d.score_range5,
				}),
			);

			// Choropleth map
			const states = topojson.feature(us, us.objects.states as TopoJSON.GeometryCollection);
			const statesMesh = topojson.mesh(us, us.objects.states as TopoJSON.GeometryCollection);
			const projection = d3.geoAlbersUsa().fitSize([mapWidth, mapHeight], states);
			const rppath = d3.geoPath().projection(projection);

			const RPStatePaths = map
				.selectAll<SVGPathElement, GeoJSON.Feature>("path.rp-state")
				.data(states.features)
				.join("path")
				.attr("class", "rp-state")
				.attr("fill", "lightgrey")
				.attr("d", rppath)
				.style("transition", "fill 1.2s ease-in-out")
				.style("pointer-events", "visible")
				.style("stroke", "none");

			map.append("path")
				.datum(statesMesh)
				.attr("class", "rp-outline")
				.attr("d", rppath)
				.style("fill", "none")
				.style("stroke", "white")
				.style("stroke-width", "1px");

			// Create a dictionary for state data
			const stateDict: { [key: string]: StateData } = {};
			aggregateData.forEach((d: StateData) => {
				stateDict[d.state_code] = d;
			});

			// Define categories and colors
			const categories = ["Suppressed", "0-20", "21-40", "41-60", "61-80", "81-100"];
			const colors = ["#e9e9e9", "#fff1f2", "#fecdd3", "#fb7185", "#e11d48", "#9f1239"];

			const colorScale = d3.scaleOrdinal<string, string>().domain(categories).range(colors);

			// Fill states with colors based on data
			RPStatePaths.style("fill", (d) => {
				const stateData = stateDict[d.id as string];
				return stateData ? colorScale(stateData.score_mode) : "#e9e9e9"; // Default to grey if no data
			});

			// Tooltip setup
			const tooltip = map.append("g").attr("class", "tooltip").attr("pointer-events", "none").attr("visibility", "hidden");

			tooltip.append("rect").attr("fill", "white").attr("stroke", "#24438d").attr("rx", 5).attr("ry", 5).attr("opacity", 0.9);

			const txt = tooltip
				.append("text")
				.attr("text-anchor", "middle")
				.style("font-size", "14px")
				.style("fill", "#24438d")
				.style("font-weight", "bold");

			const txt2 = tooltip.append("text").attr("text-anchor", "middle").style("fill", "#24438d").style("font-size", "13px");

			// Mouse hover events
			RPStatePaths.on("mouseenter", (event, d) => {
				tooltip.style("visibility", "visible");

				const stateID = d.id as string;
				const stateDat = stateDict[stateID];

				txt.text(stateDat.state_name);

				if (stateDat.score_mode === "Suppressed") {
					txt2.text("Data not displayed due to small sample size.");
				} else {
					txt2.text(`Mode: ${stateDat.score_mode}`);
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

				const [xPos, yPos] = rppath.centroid(d);
				tooltip.attr("transform", `translate(${xPos},${yPos - textHeight - 15})`).style("visibility", "visible");

				if (stateDat.score_mode !== "Suppressed") {
					drawPies([stateDat.state_name]);
				} else {
					drawPies(defaultStates);
				}
			}).on("mouseleave", () => {
				tooltip.style("visibility", "hidden");
				pieSvg.selectAll("*").remove();
				drawPies(defaultStates);
			});

			// Pie chart setup
			const stateData2: { [key: string]: PieData[] } = {};
			distributionData.forEach((d: DistributionData) => {
				stateData2[d.state_name] = [
					{ range: "0-20", value: d.score_range1 },
					{ range: "21-40", value: d.score_range2 },
					{ range: "41-60", value: d.score_range3 },
					{ range: "61-80", value: d.score_range4 },
					{ range: "81-100", value: d.score_range5 },
				];
			});

			const defaultStates = ["New York", "Colorado", "Florida"];
			const pieRadius = 68;
			const pieHeight = 168;
			const pieSvg = d3.select<SVGSVGElement, unknown>("#pies");

			const pie = d3
				.pie<PieData>()
				.value((d) => d.value)
				.sort(null);
			const arc = d3.arc<d3.PieArcDatum<PieData>>().innerRadius(0).outerRadius(pieRadius);

			const drawPies = (states: string[]) => {
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
						.attr("fill", (d) => colorScale(d.data.range))
						.attr("stroke", "white");

					// Add percentage labels
					group
						.selectAll("text.percentage")
						.data(pie(ranges))
						.enter()
						.append("text")
						.attr("class", "percentage")
						.attr("class", "main")
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
						.attr("class", "main")
						.style("font-size", "15px")
						.style("fill", "#24438d")
						.text(stateName);
				});
			};

			drawPies(defaultStates);

			// Legend
			const legendWidth = 720;
			const legendHeight = 55;

			const legendSvg = d3
				.select<SVGSVGElement, unknown>("#legendsvg")
				.append("svg")
				.attr("id", "legend")
				.attr("width", legendWidth)
				.attr("height", legendHeight);

			const legendScale = d3.scaleBand<string>().domain(categories.slice(1)).range([0, legendWidth]).padding(0.15);

			legendSvg
				.selectAll<SVGRectElement, string>("rect")
				.data(categories.slice(1))
				.enter()
				.append("rect")
				.attr("x", (d) => legendScale(d) || 0)
				.attr("y", 10)
				.attr("width", legendScale.bandwidth())
				.attr("height", 18)
				.attr("stroke", "grey")
				.attr("rx", 3)
				.attr("ry", 3)
				.attr("fill", (d, i) => colors.slice(1)[i]);

			legendSvg
				.selectAll<SVGTextElement, string>("text")
				.data(categories.slice(1))
				.enter()
				.append("text")
				.attr("x", (d) => (legendScale(d) || 0) + legendScale.bandwidth() / 2)
				.attr("y", 48)
				.attr("text-anchor", "middle")
				.style("font-size", "15px")
				.style("fill", "#24438d")
				.attr("class", "main")
				.text((d) => d);
		};

		requestData();
	}, []);

	return (
		<div style={{ textAlign: "center" }} className="text-pmblue-500">
			<p style={{ fontSize: "16px", marginBottom: "0px", fontFamily: "Work Sans" }}>
				The lower your score, the more &apos;corrupt&apos; or rebellious you are; the higher the number, the purer you are.
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
				<svg id="legendsvg" width="720" height="64" style={{ display: "block", margin: "0", marginTop: "5px" }}></svg>

				<div style={{ display: "flex", alignItems: "flex-start", position: "relative" }}>
					{/* Choropleth */}
					<div style={{ textAlign: "center", marginRight: "40px" }}>
						<div>
							<h4 style={{ fontSize: "18px", marginTop: "0px", fontFamily: "Dela Gothic One" }}>
								Most Chosen Option by State
							</h4>
							<p style={{ fontSize: "15px", marginBottom: "0px", fontFamily: "Work Sans" }}>
								Hover over a state to explore its distribution!
							</p>
						</div>
						<svg
							id="rice-purity-choropleth"
							height="480"
							width="720"
							style={{
								margin: "-10px -10px -30px 0",
								outline: "none",
								border: "none",
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
						<svg id="pies" width="200" height="510"></svg>
					</div>
				</div>
			</div>

			<p style={{ marginTop: "0px", fontSize: "14px", marginBottom: "0px", fontFamily: "Work Sans" }}>
				Data for regions, including those outside the U.S., has been omitted if the sample size is too small to be representative.
			</p>
		</div>
	);
};

export default ByStateRicePurity2024;
