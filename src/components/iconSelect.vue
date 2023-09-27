<template>
  <div class="icon-select-container relative" :style="{ width }">
    <el-input
      v-if="type === 'input'"
      v-model="selectValue"
      placeholder="点击选择图标"
      v-click-outside="clickOutside"
      readonly
      ref="selectRef"
    >
      <template #prepend>
        <svg-icon :name="selectValue" />
      </template>
    </el-input>
    <el-button v-else v-click-outside="clickOutside" ref="selectRef">
      <svg-icon :name="selectValue" />
      <span class="ml-4px">{{ selectValue || '点击选择图标' }}</span>
    </el-button>
    <el-popover
      shadow="none"
      ref="popoverRef"
      :virtual-ref="selectRef"
      virtual-triggering
      placement="bottom-end"
      trigger="click"
      :teleported="false"
      :width="width"
    >
      <el-input v-model="searchValue" placeholder="输入名称搜索图标" />
      <el-divider border-style="dashed" />
      <el-scrollbar :height="scrollbarHeight">
        <ul class="icon-list m-0 pl-10px">
          <template v-for="icon in filterIcons" :key="icon">
            <el-tooltip effect="dark" :content="icon" placement="top">
              <li
                class="icon-item p-5px mr-10px mb-10px w-10% cursor-pointer"
                @click="selectIcon(icon)"
              >
                <svg-icon :name="icon" />
              </li>
            </el-tooltip>
          </template>
        </ul>
      </el-scrollbar>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ClickOutside as vClickOutside } from 'element-plus';

defineOptions({
  name: 'iconSelect',
});

const prop = withDefaults(
  defineProps<{
    modelValue: string;
    type?: 'input' | 'button'; // 选择元素类型
    width?: string; // 容器宽度
    scrollbarHeight?: string; // 滚动高度
  }>(),
  {
    type: 'input',
    width: '100%',
    scrollbarHeight: '200px',
  }
);
const emit = defineEmits(['update:modelValue']);

const selectValue = useVModel(prop, 'modelValue', emit);
const selectRef = ref();
const searchValue = ref('');
const popoverRef = ref();

// 点击其它区域隐藏 popover 弹窗
function clickOutside() {
  unref(popoverRef).popperRef?.delayHide?.();
}

// 加载所有svg图标
const icons: string[] = [];
function loadIcons() {
  const svgs = import.meta.glob('../assets/svgs/*.svg');
  for (const icon in svgs) {
    const iconName = icon.split('assets/svgs/')[1].split('.svg')[0];
    icons.push(iconName);
  }
}
loadIcons();

const filterIcons = computed(() =>
  icons.filter((item) => item.includes(searchValue.value))
);
// 选则图标
function selectIcon(icon: string) {
  selectValue.value = icon;
  popoverRef.value?.hide();
  searchValue.value = '';
}
</script>

<style lang="scss" scoped>
.icon-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;

  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    border: 1px solid #ccc;

    &:hover {
      color: var(--el-color-primary);
      border-color: var(--el-color-primary);
      transition: all 0.2s;
      transform: scaleX(1.1);
    }
  }
}
</style>
