<script lang="ts">
  import {Router} from "svelte-router-spa";
  import Home from "@/lib/pages/Home.svelte";
  import History from "@/lib/pages/History.svelte";

  const routes = [
    {
      name: '/',
      component: Home
    },
    {
      name: 'history',
      component: History
    }
  ]
</script>

<Router
  {routes}
/>
