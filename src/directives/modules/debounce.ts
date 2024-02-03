import type { DirectiveOptions, ELType } from "../types";

const focusDirective: DirectiveOptions<"vDebounce"> = {
  name: "debounce",
  directive: {
    mounted: (el: ELType, { value }, vnode) => {
      const { type = "input", delay, callback } = value;
      el.__fn__ = useDebounceFn(callback.bind(vnode), delay ?? 300);
      el.addEventListener(type, el.__fn__);
    },
    beforeUnmount: (el: ELType, { value }) => {
      el.removeEventListener(value.type || "input", el.__fn__);
    },
  },
};

export default focusDirective;
