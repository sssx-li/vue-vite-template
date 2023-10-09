<template>
  <div class="icon-select-container relative">
    <button
      class="cursor-pointer"
      ref="referenceElementRef"
      @click="changeVisible"
    >
      <svg-icon :name="selectValue" />
      <span class="ml-4px">{{ selectValue || '点击选择图标' }}</span>
    </button>
    <div
      class="sy-tooltip bg-#fff px-14px py-10px"
      ref="popperElementRef"
      v-if="visible"
      id="tooltip"
      :style="{ width }"
    >
      <input
        v-model="searchValue"
        placeholder="输入名称搜索图标"
        class="mb-14px w-100%"
      />
      <ul
        class="icon-list m-0 pl-10px w-100%"
        :style="{ maxHeight: scrollbarHeight, overflow: 'auto' }"
      >
        <template v-for="icon in filterIcons" :key="icon">
          <el-tooltip effect="dark" :content="icon" placement="top">
            <li
              class="icon-item px-10px py-5px mr-6px mb-10px w-10% cursor-pointer"
              @click="selectIcon(icon)"
            >
              <svg-icon :name="icon" />
            </li>
          </el-tooltip>
        </template>
      </ul>
      <div id="arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RefrenceElement } from '@/hooks/usePopper';

defineOptions({
  name: 'iconSelect',
});

const prop = withDefaults(
  defineProps<{
    modelValue: string;
    width?: string; // 容器宽度
    scrollbarHeight?: string; // 滚动高度
  }>(),
  {
    width: '100%',
    scrollbarHeight: '250px',
  }
);

const emit = defineEmits(['update:modelValue']);
const selectValue = useVModel(prop, 'modelValue', emit);
const searchValue = ref('');

const visible = ref(false);
const referenceElementRef = ref<RefrenceElement>();
const popperElementRef = ref<HTMLElement>();

usePopper(referenceElementRef, popperElementRef, {
  placement: 'right',
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 8],
      },
    },
  ],
});

// 点击其它区域隐藏 popover 弹窗
onClickOutside(
  referenceElementRef as Ref<HTMLElement>,
  () => (visible.value = false),
  {
    ignore: [popperElementRef],
  }
);

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

function changeVisible() {
  visible.value = !visible.value;
}
// 选则图标
function selectIcon(icon: string) {
  selectValue.value = icon;
  searchValue.value = '';
  visible.value = false;
}
</script>

<style lang="scss" scoped>
.sy-tooltip {
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 50%);
}

/* 图标盒子样式 */
.icon-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;

  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    font-size: 14px;
    border: 1px solid #ccc;

    &:hover {
      color: #409eff;
      border-color: #409eff;
      transition: all 0.2s;
      transform: scaleX(1.1);
    }
  }
}

/* popper弹窗样式 */
#arrow,
#arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
}

#arrow {
  visibility: hidden;
}

#arrow::before {
  visibility: visible;
  content: '';
  transform: rotate(45deg);
}

#tooltip[data-popper-placement^='top'] > #arrow {
  bottom: -4px;
}

#tooltip[data-popper-placement^='bottom'] > #arrow {
  top: -4px;
}

#tooltip[data-popper-placement^='left'] > #arrow {
  right: -4px;
}

#tooltip[data-popper-placement^='right'] > #arrow {
  left: -4px;
}
</style>
