import { DirectiveOptions } from '../types';

const focusDirective: DirectiveOptions<'vFocus'> = {
  name: 'focus',
  directive: {
    mounted: (el: HTMLInputElement) => el.focus(),
  },
};

export default focusDirective;
