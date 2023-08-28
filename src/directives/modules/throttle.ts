import { DirectiveOptions } from '../types';

let fn;
const focusDirective: DirectiveOptions<'vThrottle'> = {
  name: 'throttle',
  directive: {
    mounted: (el: HTMLInputElement, { value }, vnode) => {
      const { type = 'input', delay, callback } = value;
      fn = useThrottleFn(callback.bind(vnode), delay ?? 300);
      // 默认监听input事件
      el.addEventListener(type, fn);
    },
    unmounted: (el: HTMLInputElement, { value }) => {
      el.removeEventListener(value.type || 'input', fn!);
    },
  },
};

export default focusDirective;
