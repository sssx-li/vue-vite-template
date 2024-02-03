<template>
  <svg aria-hidden="true" :class="className">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  prefix?: string;
  name: string;
}
const props = withDefaults(defineProps<Props>(), {
  prefix: "icon",
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
const className = computed(() => `svg-icon ${props.name}`);
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  outline: medium;
  fill: currentcolor;
}
</style>
