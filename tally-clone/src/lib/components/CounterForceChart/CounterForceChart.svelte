<script lang="ts">
  import type { IRecord } from "@/@types/records";
  import * as d3 from "d3";
  import { onMount } from "svelte";

  export let data: Array<IRecord & d3.SimulationNodeDatum>;

  onMount(() => {
    var width = 200;
    var height = 200;

    var simulation = d3
      .forceSimulation(data)
      .force("charge", d3.forceManyBody().strength(300))
      .force("center", d3.forceCenter(100, 100))
      .force(
        "collision",
        d3.forceCollide().radius(function (d) {
          return 35;
        })
      )
      .on("tick", ticked);

    function ticked() {
      var u = d3
        .select("#content > svg")
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("r", function (d) {
          return 30;
        })
        .attr("cx", function (d) {
          return d.x;
        })
        .attr("cy", function (d) {
          return d.y;
        });
    }
  });
</script>

<div id="content">
  <svg width="200" height="200" class="mx-auto" />
</div>
