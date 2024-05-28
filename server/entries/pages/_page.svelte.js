import { c as create_ssr_component, b as add_attribute, e as escape, o as onDestroy, n as null_to_empty, v as validate_component } from "../../chunks/index2.js";
import * as d3 from "d3";
import { w as writable } from "../../chunks/index.js";
const Scroller_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "svelte-scroller-outer.svelte-1oyq8qh{display:block;position:relative;pointer-events:none}svelte-scroller-background-container.svelte-1oyq8qh{display:block;position:absolute;width:100%;max-width:100%;pointer-events:none}svelte-scroller-background.svelte-1oyq8qh{display:block;position:relative;width:100%;pointer-events:auto}svelte-scroller-foreground.svelte-1oyq8qh{display:block;position:relative;z-index:2;pointer-events:auto}svelte-scroller-foreground.svelte-1oyq8qh::after{content:' ';display:block;clear:both}",
  map: null
};
const handlers = [];
if (typeof window !== "undefined") {
  const run_all = () => handlers.forEach((fn) => fn());
  window.addEventListener("scroll", run_all);
  window.addEventListener("resize", run_all);
}
if (typeof IntersectionObserver !== "undefined") {
  const map = /* @__PURE__ */ new Map();
  new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        const update = map.get(entry.target);
        const index = handlers.indexOf(update);
        if (entry.isIntersecting) {
          if (index === -1)
            handlers.push(update);
        } else {
          update();
          if (index !== -1)
            handlers.splice(index, 1);
        }
      });
    },
    {
      rootMargin: "400px 0px"
      // TODO why 400?
    }
  );
}
const Scroller = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let style;
  let widthStyle;
  let { top = 0 } = $$props;
  let { bottom = 1 } = $$props;
  let { threshold = 0.5 } = $$props;
  let { query = "section" } = $$props;
  let { parallax = false } = $$props;
  let { index = 0 } = $$props;
  let { count = 0 } = $$props;
  let { offset = 0 } = $$props;
  let { progress = 0 } = $$props;
  let { visible = false } = $$props;
  let outer;
  let foreground;
  let background;
  let offset_top = 0;
  if ($$props.top === void 0 && $$bindings.top && top !== void 0)
    $$bindings.top(top);
  if ($$props.bottom === void 0 && $$bindings.bottom && bottom !== void 0)
    $$bindings.bottom(bottom);
  if ($$props.threshold === void 0 && $$bindings.threshold && threshold !== void 0)
    $$bindings.threshold(threshold);
  if ($$props.query === void 0 && $$bindings.query && query !== void 0)
    $$bindings.query(query);
  if ($$props.parallax === void 0 && $$bindings.parallax && parallax !== void 0)
    $$bindings.parallax(parallax);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.count === void 0 && $$bindings.count && count !== void 0)
    $$bindings.count(count);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
    $$bindings.offset(offset);
  if ($$props.progress === void 0 && $$bindings.progress && progress !== void 0)
    $$bindings.progress(progress);
  if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0)
    $$bindings.visible(visible);
  $$result.css.add(css$2);
  style = `
		position: ${"absolute"};
		top: 0;
		transform: translate(0, ${offset_top}px);
		z-index: ${1};
	`;
  widthStyle = "";
  return `

<svelte-scroller-outer class="svelte-1oyq8qh"${add_attribute("this", outer, 0)}><svelte-scroller-background-container class="background-container svelte-1oyq8qh" style="${escape(style, true) + escape(widthStyle, true)}"><svelte-scroller-background class="svelte-1oyq8qh"${add_attribute("this", background, 0)}>${slots.background ? slots.background({}) : ``}</svelte-scroller-background></svelte-scroller-background-container>

	<svelte-scroller-foreground style="width: 30%;" class="svelte-1oyq8qh"${add_attribute("this", foreground, 0)}>${slots.foreground ? slots.foreground({}) : ``}</svelte-scroller-foreground>
</svelte-scroller-outer>`;
});
const Map_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: '.switch.svelte-1ogx18l.svelte-1ogx18l{position:relative;display:inline-block;width:50px;height:28px}.switch.svelte-1ogx18l input.svelte-1ogx18l{opacity:0;width:0;height:0}.slider.svelte-1ogx18l.svelte-1ogx18l{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#2196F3;transition:.4s;border-radius:34px}.slider.svelte-1ogx18l.svelte-1ogx18l:before{position:absolute;content:"";height:20px;width:20px;left:4px;bottom:4px;background-color:white;transition:.4s;border-radius:50%}input.svelte-1ogx18l:checked+.slider.svelte-1ogx18l{background-color:#2196F3}input.svelte-1ogx18l:checked+.slider.winter.svelte-1ogx18l{background-color:#2196F4}input.svelte-1ogx18l:checked+.slider.summer.svelte-1ogx18l{background-color:#FF6347}input.svelte-1ogx18l:checked+.slider.svelte-1ogx18l:before{transform:translateX(22px)}',
  map: null
};
const Map_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { index } = $$props;
  let { currentYear: currentYear2 = 1880 } = $$props;
  let width = 900;
  let height = 450;
  const timer = writable(null);
  let season = "winter";
  let svg;
  let start_year = 1880;
  let end_year = 2013;
  let season_bool;
  function resize() {
    width = svg.node().getBoundingClientRect().width;
    height = width / 2;
    svg.attr("viewBox", `0 0 ${width} ${height}`);
    const scale = width / 7;
    const projection = d3.geoMercator().scale(scale).center([0, 20]).translate([width / 2, height / 2]);
    d3.geoPath().projection(projection);
    update(currentYear2);
    const slider = document.getElementById("year-slider");
    if (slider) {
      slider.style.width = `${width - 180}px`;
    }
  }
  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", resize);
    }
    if (timer) {
      clearInterval(timer);
    }
  });
  function create_timer() {
    timer.set(setInterval(
      () => {
        if (currentYear2 >= end_year) {
          currentYear2 = start_year;
        } else {
          currentYear2 += 1;
        }
        update(currentYear2);
      },
      50
    ));
  }
  function switch_season() {
    console.log(season);
    update(currentYear2);
  }
  create_timer();
  function update(year) {
    currentYear2 = year;
    return;
  }
  let isVisible = false;
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.currentYear === void 0 && $$bindings.currentYear && currentYear2 !== void 0)
    $$bindings.currentYear(currentYear2);
  $$result.css.add(css$1);
  {
    if (index === 0) {
      isVisible = true;
      clearInterval(timer);
      start_year = 1800;
      end_year = 1880;
      currentYear2 = start_year;
    } else if (index === 1) {
      isVisible = true;
      clearInterval(timer);
      start_year = 1880;
      end_year = 1960;
      currentYear2 = start_year;
    } else if (index === 2) {
      isVisible = true;
      clearInterval(timer);
      start_year = 1960;
      end_year = 2013;
      currentYear2 = start_year;
    } else if (index === 3) {
      isVisible = true;
      clearInterval(timer);
      start_year = 1800;
      end_year = 2013;
      currentYear2 = start_year;
    } else {
      if (timer) {
        clearInterval(timer);
      }
      isVisible = false;
    }
  }
  {
    switch_season();
  }
  return `<h2>Average Temperature Change Compared to the Year of 1910</h2>
<svg id="my_dataviz" style="${"width: 100%; display: " + escape(isVisible ? "block" : "none", true) + ";"}"></svg>

<div id="slider-container"><button>${escape("Pause")}</button>
  <input type="range" id="year-slider" min="1880" max="2012" step="1" style="width: 600pt;"${add_attribute("value", currentYear2, 0)}>
  <span>${escape(currentYear2)}</span>
  <label class="switch svelte-1ogx18l"><input type="checkbox" class="svelte-1ogx18l"${add_attribute("checked", season_bool, 1)}>
    <span class="${escape(null_to_empty("slider winter"), true) + " svelte-1ogx18l"}"></span></label>
</div>`;
});
const ScrollyTeller_svelte_svelte_type_style_lang = "";
const css = {
  code: ".background.svelte-16m9uzm{width:70%;margin-left:auto;margin-right:0;height:100vh;position:relative;outline:green solid 3px;z-index:2}.foreground.svelte-16m9uzm{margin-left:0;margin-right:auto;height:auto;position:relative;outline:red solid 3px;pointer-events:none;z-index:1}section.svelte-16m9uzm{height:80vh;background-color:rgba(0, 0, 0, 0.2);outline:magenta solid 3px;text-align:center;color:black;padding:1em;margin:0 0 2em 0}",
  map: null
};
let currentYear = 1880;
const ScrollyTeller = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let count, index, offset, progress;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Scroller, "Scroller").$$render(
      $$result,
      {
        top: 0,
        bottom: 1,
        threshold: 0.5,
        count,
        index,
        offset,
        progress
      },
      {
        count: ($$value) => {
          count = $$value;
          $$settled = false;
        },
        index: ($$value) => {
          index = $$value;
          $$settled = false;
        },
        offset: ($$value) => {
          offset = $$value;
          $$settled = false;
        },
        progress: ($$value) => {
          progress = $$value;
          $$settled = false;
        }
      },
      {
        background: () => {
          return `<div class="background svelte-16m9uzm" slot="background">${validate_component(Map_1, "Map").$$render($$result, { index, currentYear }, {}, {})}</div>`;
        },
        foreground: () => {
          return `<div class="foreground svelte-16m9uzm" slot="foreground"><section class="svelte-16m9uzm">The world was a very different place tens of thousands of years ago. Sabertooth tigers, woolly mammoths, all able to survive due to the harsh artic climate. Once the temperatures rose it led to an extinction event, wiping out nearly all the species that thrived in that ecosystem. We are now facing that same extinction threatening force, and it is accelerating towards us at unprecedented rates due to human influenced climate change. The graph on the right visualizes the temperature change between the ice age and now. Keep in mind the scale of time. While the change in temperature is dramatic, soon you will see a similar temperature increase in an incomparably shorter time.
</section>
  <section class="svelte-16m9uzm">And now we introduce human intervention. At the beginning climate change occurred slowly. Industrialization did not occur overnight, and it took years to get industrialization at the scale we have now. Even still, the jump in climate change is immediately apparent. Feel free to hover over your home country and see information on how your community has been affected.</section>
  <section class="svelte-16m9uzm">Over just the past 65 years we have caused a degree increase in average global climate, with the bulk of that increase occurring over the most recent 30 years. Last year was not only the hottest year on record, but also the largest one year increase in global temperature. This is indicative of the larger trend of climate change occurring at an increasingly fast rate, leaving scientists worried we may never stop this snowball once it&#39;s rolling.</section>
  <section class="svelte-16m9uzm">Present the full map</section>
  <section class="svelte-16m9uzm">Action must be taken to prevent climate change before it is too late. Attached is a variety of sources from groups much more informed than we are, sorted into categories depending on what you are looking for.<br>
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
<br></section>
  <section class="svelte-16m9uzm">This is the sixth section.</section></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main>${validate_component(ScrollyTeller, "ScrollyTeller").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};
