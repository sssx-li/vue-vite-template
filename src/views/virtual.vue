<template>
  <!-- 虚拟列表 -->
  <div
    class="virtual-list"
    ref="warpContainerRef"
    @scroll.passive="getScroll($event)"
  >
    <div
      :style="{ height: ITEM_HEIGHT * options.length + 'px', width: '100%' }"
    >
      <div
        class="virtual-item"
        v-for="(item, index) in viewData"
        :key="index"
        :style="{ top: `${ITEM_HEIGHT * item.label}px` }"
      >
        {{ item.value }}:{{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 每项的高度
const ITEM_HEIGHT = 40;
// 滚动条滚动到距离最小的数据条数(用于控制加载可视区域数据)
const MIN_OVER_ITEM = 2;

const warpContainerRef = ref<HTMLElement | null>(null);
// 可视区域展示数据总数
const viewCount = computed(() =>
  Math.ceil((warpContainerRef.value?.offsetHeight || 0) / ITEM_HEIGHT)
);

// 当前索引(用于计算视口渲染数据的开始及结束的索引)
const index = ref(2);

// 原始数据
const options = ref<Array<{ label: number; value: string }>>(
  Array.from({ length: 100000 }).map((_, idx) => ({
    value: `Option ${idx + 1}`,
    label: idx,
  }))
);
// 视口渲染数据(计算截取当前视口需要渲染的数据)
const viewData = computed(() =>
  options.value.slice(index.value - 2, index.value + viewCount.value)
);

// 滚动(动态)计算当前视图里的数据
const getScroll = (event: any) => {
  const scrollTop = event.target.scrollTop;
  // 当滚动距离大于 MIN_OVER_ITEM 条数据的高度时开始动态计算
  if (scrollTop > ITEM_HEIGHT * MIN_OVER_ITEM) {
    index.value = Math.ceil(scrollTop / ITEM_HEIGHT);
  } else {
    index.value = MIN_OVER_ITEM;
  }
};
</script>

<style lang="scss" scoped>
.virtual-list {
  position: relative;
  width: 300px;
  height: 200px;
  overflow: auto;

  .virtual-item {
    position: absolute;
    width: 100%;
    height: #{v-bind("ITEM_HEIGHT")}px;
    line-height: #{v-bind("ITEM_HEIGHT")}px;
  }
}
</style>
