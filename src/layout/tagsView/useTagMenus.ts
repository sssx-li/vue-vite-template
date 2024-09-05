import { SPACING, firstTag } from './useTags';

import type { ITag, TagView } from './useTags';
import type { ElScrollbar } from 'element-plus';
type MenuTypes = 'closeOthers' | 'closeRight' | 'close';

const MENU_WIDTH = 100;

export function useTagMenus(
  scrollTagsRef: Ref<InstanceType<typeof ElScrollbar> | undefined>,
  tagsView: TagView
) {
  const router = useRouter();
  const currentTag = ref<ITag>();
  const tagMenuRef = ref<HTMLUListElement>();
  const showMenu = ref(false);
  const menuList: Array<{ icon: string; title: string; type: MenuTypes }> = [
    { icon: 'close-others', title: '关闭其他', type: 'closeOthers' },
    { icon: 'close-right', title: '关闭右侧', type: 'closeRight' },
    { icon: 'close', title: '关闭所有', type: 'close' },
  ];
  const menuPosition = reactive<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });

  onClickOutside(tagMenuRef, () => (showMenu.value = false));

  // 右键菜单
  function openTagMenu(tag: ITag, e: MouseEvent) {
    currentTag.value = tag;
    const { left: wrapLeft, top: wrapTop } =
      scrollTagsRef.value!.wrapRef!.getBoundingClientRect();
    const wrapWidth = scrollTagsRef.value!.wrapRef!.offsetWidth;
    const maxLeft = wrapWidth - MENU_WIDTH - SPACING * 2;
    const left = e.clientX - wrapLeft + SPACING * 4;

    menuPosition.left = left > maxLeft ? maxLeft : left;
    menuPosition.top = e.clientY - wrapTop;
    showMenu.value = true;
  }

  function handleMenuClick(type: MenuTypes) {
    if (type === 'close') {
      tagsView.deleteAll();
      tagsView.addTag(firstTag);
      router.push(firstTag.path);
      showMenu.value = false;
      return;
    }
    if (type === 'closeOthers') {
      tagsView.deleteOtherTags(currentTag.value!);
    } else if (type === 'closeRight') {
      tagsView.deleteRightTags(currentTag.value!);
    }
    if (currentTag.value!.path !== router.currentRoute.value.path) {
      router.push(currentTag.value!.path);
    }
    showMenu.value = false;
  }

  return {
    tagMenuRef,
    MENU_WIDTH,
    showMenu,
    menuList,
    menuPosition,
    openTagMenu,
    handleMenuClick,
  };
}
