import type { DirectiveOptions, ELType } from '../types';

const focusDirective: DirectiveOptions<'vThrottle'> = {
  name: 'throttle',
  directive: {
    mounted: (el: ELType, { value }, vnode) => {
      const { type = 'input', delay, callback } = value;
      el.__fn__ = useThrottleFn(callback.bind(vnode), delay ?? 300);
      // 默认监听input事件
      el.addEventListener(type, el.__fn__);
    },
    unmounted: (el: ELType, { value }) => {
      el.removeEventListener(value.type || 'input', el.__fn__);
    },
  },
};

export default focusDirective;
