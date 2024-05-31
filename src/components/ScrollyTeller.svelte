<script>
  import Scroller from "./Scroller.svelte";
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

<div class="foreground" slot="foreground">
  <section>The world was a very different place tens of thousands of years ago. Sabertooth tigers, woolly mammoths, all able to survive due to the harsh artic climate. Once the temperatures rose it led to an extinction event, wiping out nearly all the species that thrived in that ecosystem. We are now facing that same extinction threatening force, and it is accelerating towards us at unprecedented rates due to human influenced climate change. The graph on the right visualizes the temperature change between the ice age and now. Keep in mind the scale of time. While the change in temperature is dramatic, soon you will see a similar temperature increase in an incomparably shorter time.
</section>
  <section>And now we introduce human intervention. At the beginning climate change occurred slowly. Industrialization did not occur overnight, and it took years to get industrialization at the scale we have now. Even still, the jump in climate change is immediately apparent. Feel free to hover over your home country and see information on how your community has been affected.</section>
  <section>Over just the past 65 years we have caused a degree increase in average global climate, with the bulk of that increase occurring over the most recent 30 years. Last year was not only the hottest year on record, but also the largest one year increase in global temperature. This is indicative of the larger trend of climate change occurring at an increasingly fast rate, leaving scientists worried we may never stop this snowball once it's rolling.</section>
  <section>Present the map full screen</section>
  
</div>

<div
    class="background"
    slot="background"
    bind:clientWidth={width}
    bind:clientHeight={height}
  >
    <Map {index} {currentYear} />
</div>
</Scroller>

<section>Action must be taken to prevent climate change before it is too late. Attached is a variety of sources from groups much more informed than we are, sorted into categories depending on what you are looking for.<br>
<br>
Individual impact:<br>
<a href="https://www.un.org/en/actnow/ten-actions">www.un.org/</a><br>
<a href="https://www.epa.gov/climate-change/what-you-can-do-about-climate-change">www.epa.gov/</a><br>
<br>
Global Trends:<br>
<a href="https://www.climate.gov/news-features/understanding-climate/climate-change-global-temperature">www.climate.gov/</a><br>
<a href="https://climate.nasa.gov/vital-signs/global-temperature/?intent=121">climate.nasa.gov/</a><br>
<br>
The Effects of Climate Change:<br>
<a href="https://www.nrdc.org/stories/what-are-effects-climate-change">www.nrdc.org/</a><br>
<a href="https://www.worldwildlife.org/threats/effects-of-climate-change">www.worldwildlife.org/</a><br>
<br>
</section>


<style>
  .background {
    width: 70%;
    margin-left: auto;
    margin-right: 0;
    height: 100vh;
    position: relative;
    z-index: 2; /* Higher z-index to ensure it is above the foreground */
  }

  .foreground {
    padding: 500px 0;
    margin-left: 0;
    margin-right: auto;
    height: auto;
    position: relative;
    font-family: 'Verdana';
    line-height: 1.8;
    font-size: 20px;
    pointer-events: none; /* Foreground does not block mouse events */
    z-index: 1; /* Lower z-index to ensure it is below the background */
  }

  .progress-bars {
    position: absolute;
    background: rgba(170, 51, 120, 0.2) /*  40% opaque */;
    visibility: visible;
  }

  section {
    height: 80vh;
    background-color: rgba(0, 0, 0, 0); /* 20% opaque */
    /* color: white; */
    text-align: center;
    /* max-width: 750px; */
    color: black;
    padding: 1em;
    margin: 0 0 2em 0;
  }

  big-section {
    height: 80vh;
    background-color: rgba(0, 0, 0, 0); /* 20% opaque */
    /* color: white; */
    text-align: center;
    /* max-width: 750px; */
    color: black;
    padding: 1em;
    margin: 0 0 2em 0;
  }
</style>
