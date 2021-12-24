<script>
import { createPopper } from '@popperjs/core';
import { patientQuerySelector } from '@lib/strongdom';

export default {
  name: 'WalkthroughStep',
  props: {
    target: {
      type: String,
      required: false,
    },
    placement: {
      type: String,
      default: 'bottom',
    },
    offset: {
      type: Array,
      default: () => [0, 20],
    },
  },
  inject: [
    'progress',
    'nextStep',
    'prevStep',
    'gotoStep',
    'endSteps',
    'telescopic',
  ],
  async mounted() {
    if (!this.target) return;
    const targetEl = await this.highlightTarget();
    this.openPopoverFor(targetEl);
  },
  beforeDestroy() {
    if (!this.target) return;
    this.telescopic.unfocus();
  },
  methods: {
    async highlightTarget() {
      const target = await patientQuerySelector(this.target);
      return this.telescopic.focus(target);
    },
    async openPopoverFor(targetEl) {
      const tooltip = await patientQuerySelector(this.$refs.content);
      this.popper = createPopper(targetEl, tooltip, {
        placement: this.placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: this.offset,
            },
          },
        ],
      });
      tooltip.classList.add('walkthrough-tooltip-visible');
    },
    refresh() {
      if (this.telescopic) this.telescopic.refresh();
      if (this.popper) this.popper.update();
    },
  },
  render(h) {
    if (!this.$scopedSlots.default) return null;

    return h(
      'div',
      {
        class: 'walkthrough-tooltip',
        ref: 'content',
      },
      [
        this.$scopedSlots.default({
          progress: this.progress,
          nextStep: this.nextStep,
          prevStep: this.prevStep,
          gotoStep: this.gotoStep,
          endSteps: this.endSteps,
          refreshStep: this.refresh,
        }),
        h('div', {
          attrs: {
            class: 'walkthrough-popper-arrow',
            'data-popper-arrow': '',
          },
        }),
      ],
    );
  },
};
</script>

<style lang="scss">
$walkthrough-popper-arrow-size: 15px;

.walkthrough-tooltip {
  transition: opacity .75s .25s ease-in-out;
  z-index: 1000002 !important;
  background: white;
  padding: 20px;
  border-radius: 4px;
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.walkthrough-tooltip.walkthrough-tooltip-visible {
  opacity: 1;
}
.walkthrough-popper-arrow,
.walkthrough-popper-arrow::before {
  position: absolute;
  width: $walkthrough-popper-arrow-size;
  height: $walkthrough-popper-arrow-size;
  background: inherit;
  border-radius: 2px;
}
.walkthrough-popper-arrow {
  visibility: hidden;
}
.walkthrough-popper-arrow::before {
  visibility: visible;
  content: '';
  transform: rotate(45deg);
}
.walkthrough-tooltip[data-popper-placement^='top'] > .walkthrough-popper-arrow {
  bottom: -4px;
}
.walkthrough-tooltip[data-popper-placement^='bottom'] > .walkthrough-popper-arrow {
  top: -4px;
}
.walkthrough-tooltip[data-popper-placement^='left'] > .walkthrough-popper-arrow {
  right: -4px;
}
.walkthrough-tooltip[data-popper-placement^='right'] > .walkthrough-popper-arrow {
  left: -4px;
}
</style>
