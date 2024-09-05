<template>
  <svg aria-hidden="true" :class="className">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
const { prefix = 'icon', name } = defineProps<{
  prefix?: string;
  name: string;
}>();
const symbolId = computed(() => `#${prefix}-${name}`);
const className = computed(() => `svg-icon ${name}`);
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
