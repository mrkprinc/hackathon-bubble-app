import * as d3 from "d3";
import styles from "./forceGraph.module.css";

export function runForceGraph(container, linksData, nodesData) {
  const links = linksData.map((d) => Object.assign({}, d));
  const nodes = nodesData.map((d) => Object.assign({}, d));

  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;
  const imageSize = 50;

  const name = (d) => {
    return d.name;
  };

  const image = (d) => {
    return d.image;
  };

  const extraBubbleMembers = (d) => {
    return d.extraBubbleMembers;
  };

  const getClass = (d) => {
    return d.isRoot === true ? styles.rootUser : styles.bubbleUser;
  };

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

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3.forceLink(links).id((d) => d.id)
    )
    .force("center", d3.forceCenter())
    .force("charge", d3.forceManyBody().strength(-2000))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .call(
      d3.zoom().on("zoom", () => svg.attr("transform", d3.event.transform))
    );

  const defs = svg.append("defs");

  const link = svg
    .append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.4)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", (d) => Math.sqrt(d.value));

  // Declare the nodes
  const node = svg
    .append("g")
    // .attr("stroke", "#fff")
    // .attr("stroke-width", 2)
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", (d) => (d.isRoot ? 23 : 15))
    .attr("fill", (d) => `url(#${d.id})`)
    .style("filter", `url(#drop-shadow)`)
    .call(drag(simulation));

  defs
    .selectAll(".image-pattern")
    .data(nodes)
    .enter()
    .append("pattern")
    .attr("class", "image-pattern")
    .attr("id", (d) => d.id)
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUnits", "objectBoundingBox")
    .append("image")
    .attr("height", 1)
    .attr("width", 1)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", (d) => image(d));

  var filter = defs
    .append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "250%")
    .attr("width", "250%");

  filter
    .append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 1)
    .attr("result", "blur");

  filter
    .append("feOffset")
    .attr("in", "blur")
    .attr("dx", 1.5)
    .attr("dy", 1.5)
    .attr("result", "offsetBlur");

  var feMerge = filter.append("feMerge");

  feMerge.append("feMergeNode").attr("in", "offsetBlur");
  feMerge.append("feMergeNode").attr("in", "SourceGraphic");

  const label = svg
    .append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", (d) =>
      d.isRoot ? "text-before-edge" : "central"
    )
    .attr("class", (d) => getClass(d))
    .text((d) => {
      return name(d);
    });

  const externalOrgImage = svg
    .append("g")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("image")
    .attr("xlink:href", (d) => (d.externalOrg ? "/briefcase.png" : ""))
    .attr("x", (d) => (d.isRoot ? "-25px" : "0px"))
    .attr("y", (d) => (d.isRoot ? "-44px" : "100px"))
    .join("circle")
    .attr("width", "13px")
    .attr("height", "13px")
    .call(drag(simulation));

  const extBubMembersNumber = svg
    .append("g")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("text")
    .attr("text-anchor", "start")
    .attr("class", styles.extraBubbleNumber)
    .text((d) => (extraBubbleMembers(d) ? `+${extraBubbleMembers(d)}` : ""));

  simulation.on("tick", () => {
    //update link positions
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    // update node positions
    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

    // update label positions
    node
      .attr("x", (d) => {
        return d.x - imageSize / 2;
      })
      .attr("y", (d) => {
        return d.y - imageSize / 2;
      });

    // externalOrgImage
    externalOrgImage
      .attr("x", (d) => {
        return d.isRoot ? d.x + 28 : d.x + 20;
      })
      .attr("y", (d) => {
        return d.isRoot ? d.y - 15 : d.y - 17;
      });

    // update label positions
    label
      .attr("x", (d) => {
        return d.x;
      })
      .attr("y", (d) => {
        return d.y + imageSize / 2;
      });

    // update extBubMembersNumber positions
    extBubMembersNumber
      .attr("x", (d) => {
        return d.isRoot ? d.x + 28 : d.x + 18;
        // return d.x + 10;
      })
      .attr("y", (d) => {
        return d.isRoot ? d.y + imageSize / 2 - 15 : d.y + imageSize / 2 - 18;
      });
  });

  return {
    destroy: () => {
      simulation.stop();
      svg.remove();
    },
    nodes: () => {
      return svg.node();
    },
  };
}
