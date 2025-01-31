

    const svg = d3.select("#choropleth");
      const width = svg.attr("width");
      const height = svg.attr("height");
      const margin = { top: 0, right: 20, bottom: 0, left: 0};
      const mapWidth = width - margin.left - margin.right;
      const mapHeight = height - margin.top - margin.bottom;
      const map = svg.append("g")
                    .attr("transform","translate("+margin.left+","+margin.top+")");
                    
    const requestData = async function() {
    
      const us = await d3.json("us-smaller.json");
      const aggregateData = await d3.csv("by_state_rice_purity_mode.csv", d3.autoType);
      const distributionData = await d3.csv("by_state_rice_purity_distribution.csv", d3.autoType);
    
      // choropleth
      var states = topojson.feature(us, us.objects.states);  
      var statesMesh = topojson.mesh(us, us.objects.states);  
      var projection = d3.geoAlbersUsa().fitSize([mapWidth, mapHeight], states);
      var path = d3.geoPath().projection(projection);
   
      let statePaths = map.selectAll("path.state").data(states.features)
                       .join("path")
                       .attr("class", "state")
                       .attr("d", path);
    
      map.append("path").datum(statesMesh)
         .attr("class","outline")
         .attr("d", path)
    
      var stateDict = {}
      aggregateData.forEach( d => {
        stateDict[d.state_code] = d;
      });

      const categories = ['Suppressed', '0-20', '21-40', '41-60', '61-80', '81-100'];
      const colors = ['#e9e9e9', '#fff1f2', '#fecdd3', '#fb7185', '#e11d48', '#9f1239'];
  
      const colorScale = d3.scaleOrdinal()
        .domain(categories) 
        .range(colors);
        //.range(['#e9e9e9', '#facc15', '#a3e635', '#fda4af', '#7dd3fc', '#c084fc'])
    
      map.selectAll(".state")
        .style("fill", d => {
        const stateData = stateDict[d.id];
        return stateData ? colorScale(stateData.score_mode) : '#e9e9e9'; // Default to grey if no data
      });
      
      // tooltip
      let tooltipWidth = 120;
      let tooltipHeight = 50;
      
      let tooltip = map.append("g")
        .attr("class", "tooltip")
        .attr("visibility", "hidden");
      
      tooltip.append("rect")
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("opacity", 0.9);

      let txt = tooltip.append("text")
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .attr("class", "main")
        .style("font-weight", "bold");

      let txt2 = tooltip.append("text")
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("class", "main")
        .style("font-size", "14px");

      // debounce function to delay execution
      function debounce(func, delay) {
          let timeout;
          return function (...args) {
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(this, args), delay);
        };
      }

      // mouse hover events
      const delayedMouseEnter = debounce(function () {
        tooltip.style("visibility","visible")
    
        let state = d3.select(this);
        let stateID = state.datum().id;
        let stateDat = stateDict[stateID];

        txt.text(stateDat.state_name);

        if (stateDat.score_mode === "Suppressed") {
          txt2.text("Data not displayed due to small sample size.");
        } else {
          txt2.text(`Mode: ${stateDat.score_mode}`);
        }
        
        // display tooltip
        const padding = 10;
        const txtBox = txt.node().getBBox();
        const txt2Box = txt2.node().getBBox();
        const textWidth = Math.max(txtBox.width, txt2Box.width);
        const textHeight = txtBox.height + txt2Box.height;

        txt.attr("x", 0).attr("y", -textHeight / 2 + txtBox.height - 5);
        txt2.attr("x", 0).attr("y", textHeight / 2 - 3);

        tooltip.select("rect")
          .attr("x", -textWidth / 2 - padding)
          .attr("y", -textHeight / 2 - padding)
          .attr("width", textWidth + padding * 2)
          .attr("height", textHeight + padding * 2);

        let [xPos, yPos] = path.centroid(state.datum());
        tooltip.attr("transform", `translate(${xPos},${yPos - textHeight - 15})`)
          .style("visibility", "visible");
        
        if (stateDat.score_mode !== "Suppressed"){
          drawPies([stateDat.state_name]);
        } else{
          drawPies(defaultStates);
        }

      }, 130);
    
      const delayedMouseLeave = debounce(function () {

       tooltip.style("visibility","hidden");
    
       let state = d3.select(this);
      
       pieSvg.selectAll("*").remove();
       drawPies(defaultStates);
    
      }, 130);

      statePaths.on("mouseover", delayedMouseEnter);
      statePaths.on("mouseout", delayedMouseLeave);

      // legend
      const legendWidth = 1000;  
      const legendHeight = 80;

      const legendSvg = d3.select("#legendsvg")
        .append("svg")
        .attr("id", "legend")
        .attr("width", legendWidth)
        .attr("height", legendHeight);

      const legendScale = d3.scaleBand()
        .domain(categories)
        .range([0, legendWidth])
        .padding(0.15);

      legendSvg.selectAll("rect")
        .data(categories)
        .enter()
        .append("rect")
        .attr("x", (d) => legendScale(d))
        .attr("y", 10)
        .attr("width", legendScale.bandwidth())
        .attr("height", 25)
        .attr("stroke", "grey")
        .attr("fill", (d, i) => colors[i]);

      legendSvg.selectAll("text")
        .data(categories)
        .enter()
        .append("text")
        .attr("x", (d) => legendScale(d) + legendScale.bandwidth() / 2)
        .attr("y", 55)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .attr("class", "main")
        .text((d) => d);


      // pie charts
      const stateData2 = {};
      distributionData.forEach((d) => {
        stateData2[d.state_name] = [
          { range: "0-20", value: d.score_range1 },
          { range: "21-40", value: d.score_range2 },
          { range: "41-60", value: d.score_range3 },
          { range: "61-80", value: d.score_range4 },
          { range: "81-100", value: d.score_range5 },
        ];
      });

      const defaultStates = ["New York", "Colorado", "Florida"];

      const pieRadius = 100;
      const pieHeight = 250;
      const pieSvg = d3.select("#pies");

      const pie = d3.pie().value((d) => d.value).sort(null);
      const arc = d3.arc().innerRadius(0).outerRadius(pieRadius);

      function drawPies(states) {
        pieSvg.selectAll("*").remove();
        states.forEach((stateName, i) => {
          const ranges = stateData2[stateName];

          const group = pieSvg
              .append("g")
              .attr(
                "transform",
                `translate(${pieRadius + 10}, ${
                  i * pieHeight + pieRadius + 30
                })`
              );
        
          // draw pie slices
          group
            .selectAll("path")
            .data(pie(ranges))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (d) => colorScale(d.data.range))
            .attr("stroke", "white");

          // add percentage labels for slices > 15%
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
              .style("font-size", "14px")
              .style("fill", "white")
              .text((d) => {
                const percentage = d.data.value.toFixed(1);
                return percentage > 15 ? `${percentage}%` : "";
              });

            // add state label
            group
              .append("text")
              .attr("text-anchor", "middle")
              .attr("y", -pieRadius - 10)
              .style("font-size", "18px")
              .style("font-weight", "bold")
              .attr("class", "main")
              .text(stateName);
        
    
      });
    };
    
    drawPies(defaultStates);

    };

    requestData();
