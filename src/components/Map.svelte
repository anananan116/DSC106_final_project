<script>
  import { onMount, onDestroy } from 'svelte';
  import * as d3 from 'd3';
  import 'd3-scale-chromatic';
  import { writable } from 'svelte/store';
  export let index;
  export let currentYear = 1880;
  let width = 900;
  let height = 450;
  const timer = writable(null);
  let dataTime;
  let dataTime_winter = new Map();
  let dataTime_summer = new Map();
  let season = 'winter';
  let svg;
  let topo;
  let colorScale;
  let path;
  let start_year = 1880;
  let end_year = 2013;
  let season_bool;
  let isPlaying = true;

  async function fetchData() {
    const responses = await Promise.all([
      fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
      fetch("https://raw.githubusercontent.com/anananan116/interactive_temperature_map/main/data/winter.json"),
      fetch("https://raw.githubusercontent.com/anananan116/interactive_temperature_map/main/data/summer.json"),
    ]);
    const [topoData, winterData, summerData] = await Promise.all(responses.map(res => res.json()));
    winterData.forEach(data => {
      dataTime_winter.set(data.year, data.values);
    });
    summerData.forEach(data => {
      dataTime_summer.set(data.year, data.values);
    });
    topo = topoData;
    dataTime = dataTime_winter;
  }
  function resize() {
    width = svg.node().getBoundingClientRect().width;
    height = width / 2; // Maintain the aspect ratio

    // Set the SVG viewbox
    svg.attr('viewBox', `0 0 ${width} ${height}`);

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
        slider.style.width = `${width - 180}px`;
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
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resize);
      resize();
    }
    resize();
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', resize);
    }
    if (timer) {
      clearInterval(timer);
    }
  });

  function togglePlay() {
    if (isPlaying) {
      stop_timer();
      isPlaying = false;
    } else {
      create_timer();
      isPlaying = true;
    }
  }

  function create_timer() {
    timer.set(setInterval(() => {
      if (currentYear >= end_year) {
        currentYear = start_year;
      } else {
        currentYear += 1;
      }
      update(currentYear);
    }, 50));
  }

function stop_timer() {
  timer.update(t => {
    clearInterval(t);
    return null;
  });
}
  function switch_season() {
    console.log(season);
    if (season === 'winter') {
      dataTime = dataTime_winter;
    } else {
      dataTime = dataTime_summer;
    }
    update(currentYear);
  }
  create_timer();

  $: if (index === 0) {
    isVisible = true;
    clearInterval(timer);
    start_year = 1800;
    end_year = 1880;
    currentYear = start_year;
  } else if (index === 1) {
    isVisible = true;
    clearInterval(timer);
    start_year = 1880;
    end_year = 1960;
    currentYear = start_year;
  } else if (index === 2) {
    isVisible = true;
    clearInterval(timer);
    start_year = 1960;
    end_year = 2013;
    currentYear = start_year;
  } else if (index === 3) {
    isVisible = true;
    clearInterval(timer);
    start_year = 1800;
    end_year = 2013;
    currentYear = start_year;
  } else {
    if (timer){
      clearInterval(timer);
    }
    isVisible = false;
  }

  $: season, switch_season();
  
  
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
  <button on:click={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
  <input type="range" id="year-slider" min="1880" max="2012" step="1" bind:value={currentYear} on:input={e => update(+e.target.value)} style="width: 600pt;">
  <span>{currentYear}</span>
  <label class="switch">
    <input type="checkbox" bind:checked={season_bool} on:change={() => season = season === 'winter' ? 'summer' : 'winter'}>
    <span class={season === 'winter' ? 'slider winter' : 'slider summer'}></span>
  </label>
</div>




<style>
  .switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #2196F3;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3; /* Blue for Winter */
}

input:checked + .slider.winter {
  background-color: #2196F4; /* Lighter blue for Winter */
}

input:checked + .slider.summer {
  background-color: #FF6347; /* Tomato red for Summer */
}

input:checked + .slider:before {
  transform: translateX(22px);
}

</style>