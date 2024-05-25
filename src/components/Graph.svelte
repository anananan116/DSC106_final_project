<script>
  import { fly, draw } from "svelte/transition";
  import { tweened } from "svelte/motion";
  import { cubicOut, cubicInOut } from "svelte/easing";
  import { cities } from "../data/cities";
  import { troops } from "../data/troops";

  export let index, width, height, projection;

  const tweenOptions = {
    delay: 0,
    duration: 1000,
    easing: cubicOut,
  };

  const tweenedX = tweened(
    cities.features.map((city) => projection(city.geometry.coordinates)[0]),
    tweenOptions
  );

  const tweenedY = tweened(
    cities.features.map((city) => projection(city.geometry.coordinates)[1]),
    tweenOptions
  );

  $: tweenedData = cities.features.map((city, i) => ({
    x: $tweenedX[i],
    y: $tweenedY[i],
    properties: city.properties,
  }));

  $: {
    if (index === 1) {
      tweenedX.set(cities.features.map((city) => width / 2));
      tweenedY.set(cities.features.map((city, i) => height / 2 + i * 20));
    }

    if (index > 1) {
      tweenedX.set(
        cities.features.map((city) => projection(city.geometry.coordinates)[0])
      );
      tweenedY.set(
        cities.features.map((city) => projection(city.geometry.coordinates)[1])
      );
    }
  }
  // Define your filter condition
  const filter_troopsAttack1 = (feature) => {
    return (
      feature.properties.direction === "A" && feature.properties.group === 1
    );
  };

  // Filter the features
  const troopsAttack1 = troops.features.filter(filter_troopsAttack1);

  // Create the string of coordinates
  $: pointsStringA1 = troopsAttack1
    .map((feature) => {
      const transformedCoordinates = projection(feature.geometry.coordinates);
      return transformedCoordinates.join(",");
    })
    .join(" ");

    const filter_troopsAttack2 = (feature) => {
    return (
      feature.properties.direction === "A" && feature.properties.group === 2
    );
  };

  // Filter the features
  const troopsAttack2 = troops.features.filter(filter_troopsAttack2);

  // Create the string of coordinates
  $: pointsStringA2 = troopsAttack2
    .map((feature) => {
      const transformedCoordinates = projection(feature.geometry.coordinates);
      return transformedCoordinates.join(",");
    })
    .join(" ");

    const filter_troopsAttack3 = (feature) => {
    return (
      feature.properties.direction === "A" && feature.properties.group === 3
    );
  };

  // Filter the features
  const troopsAttack3 = troops.features.filter(filter_troopsAttack3);

  // Create the string of coordinates
  $: pointsStringA3 = troopsAttack3
    .map((feature) => {
      const transformedCoordinates = projection(feature.geometry.coordinates);
      return transformedCoordinates.join(",");
    })
    .join(" ");



    // Define your filter condition
  const filter_troopsRetreat1 = (feature) => {
    return (
      feature.properties.direction === "R" && feature.properties.group === 1
    );
  };

  // Filter the features
  const troopsRetreat1 = troops.features.filter(filter_troopsRetreat1);

  // Create the string of coordinates
  $: pointsStringR1 = troopsRetreat1
    .map((feature) => {
      const transformedCoordinates = projection(feature.geometry.coordinates);
      return transformedCoordinates.join(",");
    })
    .join(" ");

    const filter_troopsRetreat2 = (feature) => {
    return (
      feature.properties.direction === "R" && feature.properties.group === 2
    );
  };

  // Filter the features
  const troopsRetreat2 = troops.features.filter(filter_troopsRetreat2);

  // Create the string of coordinates
  $: pointsStringR2 = troopsRetreat2
    .map((feature) => {
      const transformedCoordinates = projection(feature.geometry.coordinates);
      return transformedCoordinates.join(",");
    })
    .join(" ");

    const filter_troopsRetreat3 = (feature) => {
    return (
      feature.properties.direction === "R" && feature.properties.group === 3
    );
  };

  // Filter the features
  const troopsRetreat3 = troops.features.filter(filter_troopsRetreat3);

  // Create the string of coordinates
  $: pointsStringR3 = troopsRetreat3
    .map((feature) => {
      const transformedCoordinates = projection(feature.geometry.coordinates);
      return transformedCoordinates.join(",");
    })
    .join(" ");
  let strokeWidth = tweened(1, { duration: 5000, easing: cubicOut });

  // Reactive statement to update stroke-width when condition changes
  $: {
    if (index > 4) {
      strokeWidth.set(10); // Set stroke-width to 10 when condition is true
    }

    if (index <= 4) {
      strokeWidth.set(0); // Set stroke-width to 1 when condition is false
    }
  }


    

</script>

<svg class="graph">
  {#if index > 0}
    {#if index > 2}
      <polyline
        points={pointsStringA1}
        fill="none"
        stroke="#FFCCBC"
        stroke-width="3"
        transition:draw={{ duration: 5000, easing: cubicInOut }}
      />
      <polyline
        points={pointsStringA2}
        fill="none"
        stroke="#FFCCBC"
        stroke-width="3"
        transition:draw={{ duration: 5000, easing: cubicInOut }}
      />
      <polyline
        points={pointsStringA3}
        fill="none"
        stroke="#FFCCBC"
        stroke-width="3"
        transition:draw={{ duration: 5000, easing: cubicInOut }}
      />
    {/if}
    {#if index > 3}
      <polyline
        points={pointsStringR1}
        fill="none"
        stroke="#000000"
        stroke-width="3"
        transition:draw={{ duration: 5000, easing: cubicInOut }}
      />
      <polyline
        points={pointsStringR2}
        fill="none"
        stroke="#000000"
        stroke-width="3"
        transition:draw={{ duration: 5000, easing: cubicInOut }}
      />
      <polyline
        points={pointsStringR3}
        fill="none"
        stroke="#000000"
        stroke-width="3"
        transition:draw={{ duration: 5000, easing: cubicInOut }}
      />
    {/if}
    {#if index > 3}
      {#each troopsAttack1 as troop, i}
        {#if i > 0}
          <line
            x1={projection(troopsAttack1[i - 1].geometry.coordinates)[0]}
            y1={projection(troopsAttack1[i - 1].geometry.coordinates)[1]}
            x2={projection(troopsAttack1[i].geometry.coordinates)[0]}
            y2={projection(troopsAttack1[i].geometry.coordinates)[1]}
            stroke="#FFCCBC"
            stroke-width={$strokeWidth *
              (troopsAttack1[i].properties.survivors / 50000)}
          />
        {/if}
      {/each}
      {#each troopsAttack2 as troop, i}
        {#if i > 0}
          <line
            x1={projection(troopsAttack2[i - 1].geometry.coordinates)[0]}
            y1={projection(troopsAttack2[i - 1].geometry.coordinates)[1]}
            x2={projection(troopsAttack2[i].geometry.coordinates)[0]}
            y2={projection(troopsAttack2[i].geometry.coordinates)[1]}
            stroke="#FFCCBC"
            stroke-width={$strokeWidth *
              (troopsAttack2[i].properties.survivors / 50000)}
          />
        {/if}
      {/each}
      {#each troopsAttack3 as troop, i}
        {#if i > 0}
          <line
            x1={projection(troopsAttack3[i - 1].geometry.coordinates)[0]}
            y1={projection(troopsAttack3[i - 1].geometry.coordinates)[1]}
            x2={projection(troopsAttack3[i].geometry.coordinates)[0]}
            y2={projection(troopsAttack3[i].geometry.coordinates)[1]}
            stroke="#FFCCBC"
            stroke-width={$strokeWidth *
              (troopsAttack3[i].properties.survivors / 50000)}
          />
        {/if}
      {/each}

      {#each troopsRetreat1 as troop, i}
        {#if i > 0}
          <line
            x1={projection(troopsRetreat1[i - 1].geometry.coordinates)[0]}
            y1={projection(troopsRetreat1[i - 1].geometry.coordinates)[1]}
            x2={projection(troopsRetreat1[i].geometry.coordinates)[0]}
            y2={projection(troopsRetreat1[i].geometry.coordinates)[1]}
            stroke="#000000"
            stroke-width={$strokeWidth *
              (troopsRetreat1[i].properties.survivors / 50000)}
          />
        {/if}
      {/each}
      {#each troopsRetreat2 as troop, i}
        {#if i > 0}
          <line
            x1={projection(troopsRetreat2[i - 1].geometry.coordinates)[0]}
            y1={projection(troopsRetreat2[i - 1].geometry.coordinates)[1]}
            x2={projection(troopsRetreat2[i].geometry.coordinates)[0]}
            y2={projection(troopsRetreat2[i].geometry.coordinates)[1]}
            stroke="#000000"
            stroke-width={$strokeWidth *
              (troopsRetreat2[i].properties.survivors / 50000)}
          />
        {/if}
      {/each}
      {#each troopsRetreat3 as troop, i}
        {#if i > 0}
          <line
            x1={projection(troopsRetreat3[i - 1].geometry.coordinates)[0]}
            y1={projection(troopsRetreat3[i - 1].geometry.coordinates)[1]}
            x2={projection(troopsRetreat3[i].geometry.coordinates)[0]}
            y2={projection(troopsRetreat3[i].geometry.coordinates)[1]}
            stroke="#000000"
            stroke-width={$strokeWidth *
              (troopsRetreat3[i].properties.survivors / 50000)}
          />
        {/if}
      {/each}
    {/if}

    {#each tweenedData as city, i}
      {#if city.x && city.y}
        <text
          x={city.x}
          y={city.y}
          id={city.properties.name}
          in:fly={{ x: -300, duration: 200 * i }}
          out:fly={{ x: -300, duration: 200 * i }}
          >{city.properties.city}
        </text>
      {/if}
    {/each}
  {/if}
</svg>

<style>
    .graph {
      width: 100%;
      height: 100vh; /* check problem when setting width */
      position: absolute;
      outline: red solid 7px;
    }
  </style>