import * as d3 from "d3"
import styles from "./forceGraph.module.css"

export function runForceGraph(
  container,
  linksData,
  nodesData,
  nodeHoverTooltip
) {
  const links = linksData.map((d) => Object.assign({}, d));
  const nodes = nodesData.map((d) => Object.assign({}, d));

  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;

  const name = (d) => {
    return d.name;
  }

  const image = (d) => {
    return d.image;
  }

  // TODO: we can change the styles using this if we want to apply different styles for each layer of connecitons
  // const getClass = (d) => {
  //   return d.gender === "male" ? styles.male : styles.female;
  // };

  const drag = (simulation) => {
    const dragstarted = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragged = (d) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };

    const dragended = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };

  // Add the tooltip element to the graph
  const tooltip = document.querySelector("#graph-tooltip");
  if (!tooltip) {
    const tooltipDiv = document.createElement("div");
    tooltipDiv.classList.add(styles.tooltip);
    tooltipDiv.style.opacity = "0";
    tooltipDiv.id = "graph-tooltip";
    document.body.appendChild(tooltipDiv);
  }
  const div = d3.select("#graph-tooltip");

  const addTooltip = (hoverTooltip, d, x, y) => {
    console.log('d', d)
    div
      .transition()
      .duration(200)
      .style("opacity", 0.9)
      .style("background-image", image(d));
    div
      .html(hoverTooltip(d))
      .style("left", `${x}px`)
      .style("top", `${y - 28}px`);
  };

  const removeTooltip = () => {
    div
      .transition()
      .duration(200)
      .style("opacity", 0);
  };

  const simulation = d3
    .forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-150))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .call(d3.zoom().on("zoom", function () {
      svg.attr("transform", d3.event.transform);
    }));

  const link = svg
    .append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", d => Math.sqrt(d.value));

  // Declare the nodes
  const node = svg
    .append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 2)
    .selectAll("circle")
    .data(nodes)

//  Enter the nodes.
 var nodeEnter = node.enter().append("g")
  .attr("class", "node")

  const images =nodeEnter.append("image")
    .attr("xlink:href", function(d) { return d.image; })
    .join("circle")
    .attr("width", "24px")
    .attr("height", "24px")
    .call(drag(simulation))

  const label = svg.append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    // .attr("class", d => `fa ${getClass(d)}`)
    .text(d => {return name(d);})
    .call(drag(simulation));

  label.on("mouseover", (d) => {
    addTooltip(nodeHoverTooltip, d, d3.event.pageX, d3.event.pageY);
  })
    .on("mouseout", () => {
      removeTooltip();
    });

  simulation.on("tick", () => {
    //update link positions
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    // update node positions
    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    // update label positions
    images
      .attr("x", d => { return d.x; })
      .attr("y", d => { return d.y; })

    // update label positions
    label
      .attr("x", d => { return d.x; })
      .attr("y", d => { return d.y; })

  });

  return {
    destroy: () => {
      simulation.stop();
    },
    nodes: () => {
      return svg.node();
    }
  };
}