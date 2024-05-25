<script>
  import { onMount, onDestroy } from 'svelte';
  import * as d3 from 'd3';
  import 'd3-scale-chromatic';
  export let index;
  export let currentYear = 1880;
  let width = 900;
  let height = 450;
  let timer;
  let dataTime = new Map();
  let svg;
  let topo;
  let colorScale;
  let path;

  async function fetchData() {
    const responses = await Promise.all([
      fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
      fetch("https://raw.githubusercontent.com/anananan116/interactive_temperature_map/main/html/winter.json")
    ]);
    const [topoData, winterData] = await Promise.all(responses.map(res => res.json()));
    winterData.forEach(data => {
      dataTime.set(data.year, data.values);
    });
    topo = topoData;
  }
  function resize() {
    width = svg.node().getBoundingClientRect().width;
    height = width / 2; // Maintain the aspect ratio

    // Set the SVG viewbox
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    // Update projection parameters
    const scale = width / 7;  // Adjust based on your map's needs
    const projection = d3.geoMercator()
        .scale(scale)
        .center([0, 20])
        .translate([width / 2, height / 2]);

    path = d3.geoPath().projection(projection);
    update(currentYear);

    // Set the slider width dynamically
    const slider = document.getElementById('year-slider');
    if (slider) {
        slider.style.width = `${width - 70}px`;
    }
  }

  onMount(async () => {
    svg = d3.select("#my_dataviz");
    const projection = d3.geoMercator().scale(130).center([0, 20]).translate([width / 2, height / 2]);
    path = d3.geoPath().projection(projection);
    colorScale = d3.scaleLinear()
    .domain([-0.5, -0.25, 0, 0.5, 1, 1.5])
    .range([
        "rgb(51, 160, 255)",  // Corresponds to index 0
        "rgb(153, 222, 255)", // Corresponds to index 0.32
        "rgb(240, 240, 240)", // White transition at index 0.325
        "rgb(255, 208, 51)",  // Yellow at index 0.33
        "orange",             // Orange at index 0.66
        "red"                 // Red at index 1
    ])
    .interpolate(d3.interpolateRgb); // Use RGB interpolation for smooth color transitions
    await fetchData();
    update(currentYear);
    window.addEventListener('resize', resize);
    resize();
  });

  onDestroy(() => {
    window.removeEventListener('resize', resize);
    if (timer) {
      clearInterval(timer);
    }
  });

  $: if (index === 1) {
    isVisible = true;
    clearInterval(timer);
    timer = setInterval(() => {
      if (currentYear >= 2013) {
        currentYear = 1880;
      } else {
        currentYear += 1;
      }
      update(currentYear);
    }, 50);
  } else {
    clearInterval(timer);
    isVisible = false;
  }

  function update(year) {
    currentYear = year;
    if (!svg || !topo) return;
    svg.selectAll(".country")
      .data(topo.features)
      .join("path")
      .attr("class", "country")
      .attr("d", path)
      .attr("fill", d => {
        const value = dataTime.get(currentYear)?.[d.id] || 0;
        return colorScale(value);
      });
  }
  let isVisible = false;
</script>

<h2>Average Temperature Change Compared to the Year of 1910</h2>
<svg id="my_dataviz" style="width: 100%; display: {isVisible ? 'block' : 'none'};"></svg>

<div id="slider-container">
  <input type="range" id="year-slider" min="1880" max="2012" step="1" bind:value={currentYear} on:input={e => update(+e.target.value)} style="width: 600pt;">
  <span>{currentYear}</span>
</div>
