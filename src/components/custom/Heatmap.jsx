import { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function Heatmap({
  data,
  minSpot,
  maxSpot,
  minVol,
  maxVol,
  width = 600,
  height = 400,
}) {
  const svgRef = useRef();

  useEffect(() => {
    if (!data.length) return;

    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Clear previous
    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Identify unique points
    const uniqueSpots = [...new Set(data.map((d) => d.spot))].sort(
      (a, b) => a - b
    );
    const uniqueVols = [...new Set(data.map((d) => d.vol))].sort(
      (a, b) => a - b
    );

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(uniqueSpots)
      .range([0, innerWidth])
      .padding(0);

    const yScale = d3
      .scaleBand()
      .domain(uniqueVols)
      .range([innerHeight, 0])
      .padding(0);

    // Cell sizes
    const cellWidth = xScale.bandwidth();
    const cellHeight = yScale.bandwidth();

    // Color scale
    const callPriceExtent = d3.extent(data, (d) => d.callPrice);
    const colorScale = d3
      .scaleSequential(d3.interpolateViridis)
      .domain(callPriceExtent);

    // Draw Cells
    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.spot))
      .attr("y", (d) => yScale(d.vol))
      .attr("width", cellWidth)
      .attr("height", cellHeight)
      .attr("fill", (d) => colorScale(d.callPrice));

    // After drawing all "rect" cells:
    g.selectAll(".cell-text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => xScale(d.spot) + cellWidth / 2)
      .attr("y", (d) => yScale(d.vol) + cellHeight / 2)
      .attr("dy", ".35em") // vertical offset so text is centered more nicely
      .attr("text-anchor", "middle") // horizontal alignment
      .text((d) => d.callPrice.toFixed(2)) // e.g. 2 decimal places
      .attr("font-size", "10px")
      .style("pointer-events", "none") // ensures text doesn't block mouseover
      .style("fill", (d) => {
        // 1) Get cell background color
        const bgColor = colorScale(d.callPrice);

        // 2) Parse it as a D3 color object
        const parsed = d3.color(bgColor);

        // 3) Calculate brightness (rough formula)
        //    Weighted for human eye sensitivity:
        //    0.299*R + 0.587*G + 0.114*B
        const brightness =
          0.299 * parsed.r + 0.587 * parsed.g + 0.114 * parsed.b;

        // 4) Choose black text if background is light,
        //    otherwise choose white
        return brightness > 128 ? "black" : "white";
      });

    // Axes
    const formatTwoDecimals = d3.format(".2f");
    const xAxis = d3.axisBottom(xScale).ticks(5).tickFormat(formatTwoDecimals);
    g.append("g").attr("transform", `translate(0, ${innerHeight})`).call(xAxis);

    // g.append("text")
    //   .attr("class", "axis-label heatmap-text")
    //   .attr("x", innerWidth / 2)
    //   .attr("y", innerHeight + 30)
    //   .attr("text-anchor", "middle")
    //   .text("Spot Price");

    const yAxis = d3.axisLeft(yScale).ticks(5).tickFormat(formatTwoDecimals);
    g.append("g").call(yAxis);

    // g.append("text")
    //   .attr("class", "axis-label heatmap-text")
    //   .attr("text-anchor", "middle")
    //   .attr("transform", `translate(${-40}, ${innerHeight / 2}) rotate(-90)`)
    //   .text("Volatility");
  }, [data, minSpot, maxSpot, minVol, maxVol, width, height]);

  return <svg ref={svgRef} />;
}
