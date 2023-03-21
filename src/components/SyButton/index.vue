<template>
  <div class="sy-button inline-block p10px text-center rd-4px">
    <slot>{{ title }}</slot>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ title: string }>(), {
  title: '按钮',
});
</script>

<style lang="scss" scoped>
.sy-button {
  border: 1px solid #ccc;
}
</style>
