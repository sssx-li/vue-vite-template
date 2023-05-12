<template>
  <div class="header-container h-100%">
    <el-icon
      :size="24"
      class="cursor-pointer"
      @click="emits('update:isCollapse', !isCollapse)"
    >
      <i-ep:fold v-if="!isCollapse" />
      <i-ep:expand v-else />
    </el-icon>
    <div class="fhc">
      <el-image
        :src="getImgUrl('avatar.png')"
        class="w-40px h-40px b-rd-50%"
      ></el-image>
      <span class="ml-14px">{{ userInfo.username }}</span>
    </div>
  </div>
</template>

<script setup lang="ts" name="header">
import { useStore } from '@/store';
import { getImgUrl } from '@/utils';

defineProps<{ isCollapse?: boolean }>();
const emits = defineEmits(['update:isCollapse']);

const { userInfo } = useStore().user;
</script>

<style lang="scss" scoped>
.header-container {
  @include flex(center, space-between);
}
</style>
