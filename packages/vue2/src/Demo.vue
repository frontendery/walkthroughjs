<template>
  <div>
    <DemoPage />
    <Walkthrough>
      <WalkthroughStep target="#section-1" v-slot="{ nextStep, endSteps }">
        Step 1
        <button @click="nextStep">Next</button>
        <button @click="endSteps">End</button>
      </WalkthroughStep>
      <WalkthroughStep target="#section-2" v-slot="{ nextStep }">
        Step 2
        <button @click="nextStep">Next</button>
      </WalkthroughStep>
      <WalkthroughStep target="#section-3" v-slot="{ nextStep }">
        Step 3
        <button @click="nextStep">Next</button>
      </WalkthroughStep>
    </Walkthrough>
  </div>
</template>

<script>
import DemoPage from './components/DemoPage.vue';
import { Walkthrough, WalkthroughStep } from '../index';

export default {
  name: "WalkthroughDemo",
  components: {
    DemoPage,
    Walkthrough,
    WalkthroughStep,
  },
}
</script>
