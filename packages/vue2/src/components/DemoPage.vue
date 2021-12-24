<template>
  <main class="demo-page">
    <section id="section-1">Section 1</section>
    <section id="section-2">Section 2</section>
    <section id="section-3">Section 3</section>
    <section id="section-4">Section 4</section>
  </main>
</template>

<script>
  export default {
    name: "WalkthroughDemoPage",
  }
</script>

<style>
  .demo-page {
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .demo-page section {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
