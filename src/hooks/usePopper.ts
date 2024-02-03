import { createPopper } from "@popperjs/core";
import type { Options, VirtualElement, Instance } from "@popperjs/core";

export type ElementType = HTMLElement | undefined;
export type RefrenceElement = ElementType | VirtualElement;
export type PartialOptions = Partial<Options>;

export function usePopper(
  referenceElementRef: Ref<RefrenceElement>,
  popperElementRef: Ref<ElementType>,
  opts: Ref<PartialOptions> | PartialOptions = {} as PartialOptions
) {
  const instanceRef = shallowRef<Instance | undefined>();
  // 拓展选项
  const options = computed<Options>(() => {
    const { onFirstUpdate, placement, strategy, modifiers } = unref(opts);
    return {
      onFirstUpdate,
      placement: placement || "bottom",
      strategy: strategy || "absolute",
      modifiers: [...(modifiers || [])],
    };
  });

  // 销毁实例
  function destroy() {
    if (!instanceRef.value) return;
    instanceRef.value.destroy();
    instanceRef.value = undefined;
  }
  // 实例注册
  watch(
    [referenceElementRef, popperElementRef],
    ([referenceElement, popperElement]) => {
      destroy();
      if (!referenceElement || !popperElement) return;
      instanceRef.value = createPopper(
        referenceElement,
        popperElement,
        unref(options)
      );
    }
  );

  onBeforeUnmount(() => {
    destroy();
  });
  return {
    instanceRef,
    destroy,
  };
}
