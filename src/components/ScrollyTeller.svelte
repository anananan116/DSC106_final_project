<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import Map from "./Map.svelte";
  import { geoMercator } from "d3-geo";

  let count, index, offset, progress;
  let width, height;
  let currentYear = 1880;

  let geoJsonToFit = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [1, 0],
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [0, 1],
        },
      },
    ],
  };
</script>


<Scroller
  top={0.0}
  bottom={1}
  threshold={0.5}
  bind:count
  bind:index
  bind:offset
  bind:progress
>
  
<div
    class="background"
    slot="background"
    bind:clientWidth={width}
    bind:clientHeight={height}
  >
    <Map {index} {currentYear} />
  <div class="progress-bars">
    <p>current section: <strong>{index + 1}/{count}</strong></p>
    <progress value={count ? (index + 1) / count : 0} />

    <p>offset in current section</p>
    <progress value={offset || 0} />

    <p>total progress</p>
    <progress value={progress || 0} />
  </div>
</div>

<div class="foreground" slot="foreground">
  <section>This is the first section.</section>
  <section>This is the second section.</section>
  <section>This is the third section.</section>
  <section>This is the fourth section.</section>
  <section>This is the fifth section.</section>
  <section>This is the sixth section.</section>
</div>
</Scroller>



<style>
  .background {
    width: 70%;
    margin-left: auto;
    margin-right: 0;
    height: 100vh;
    position: relative;
    outline: green solid 3px;
  }

  .foreground {
    width: 30%;
    margin-left: 0;
    margin-right: auto;
    height: auto;
    position: relative;
    outline: red solid 3px;
  }

  .progress-bars {
    position: absolute;
    background: rgba(170, 51, 120, 0.2) /*  40% opaque */;
    visibility: visible;
  }

  section {
    height: 80vh;
    background-color: rgba(0, 0, 0, 0.2); /* 20% opaque */
    /* color: white; */
    outline: magenta solid 3px;
    text-align: center;
    /* max-width: 750px; */
    color: black;
    padding: 1em;
    margin: 0 0 2em 0;
  }
</style>
