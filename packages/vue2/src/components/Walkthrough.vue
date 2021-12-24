<script>
import Telescopic from '@lib/telescopic';

function validSlots() {
  // Ignore whitespace / text node slots
  return (this.$slots.default || []).filter(s => s.tag);
}

export default {
  name: 'Walkthrough',
  props: {
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      progress: {
        active: 1,
        total: validSlots.apply(this).length,
      },
    };
  },
  methods: {
    nextStep() {
      this.progress.active += 1;
    },
    prevStep() {
      if (this.progress.active === 1) return;
      this.progress.active -= 1;
    },
    gotoStep(step) {
      this.progress.active = step;
    },
    endSteps() {
      this.progress.active = null;
    },
    refresh() {
      this.telescopic.refresh();
    },
  },
  computed: {
    ended() {
      const { active, total } = this.progress;
      return (!active || active > total);
    },
    telescopic() {
      return new Telescopic();
    },
    validSlots,
  },
  provide() {
    return {
      progress: this.progress,
      nextStep: this.nextStep,
      prevStep: this.prevStep,
      gotoStep: this.gotoStep,
      endSteps: this.endSteps,
      telescopic: this.telescopic,
    };
  },
  mounted() {
    this.telescopic.addBackdrop();
    window.addEventListener('resize', this.refresh);
  },
  destroyed() {
    window.removeEventListener('resize', this.refresh);
  },
  render(h) {
    if (!this.enabled || this.ended) {
      this.telescopic.removeBackdrop();
      return null;
    }

    return this.validSlots.map((vnode, index) => {
      return h(
        'div',
        {
          class: `walkthrough-step`,
          key: index,
        },
        [vnode],
      );
    })[this.progress.active - 1];
  },
};
</script>
