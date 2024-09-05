import { IDirectiveOptions } from '../types';

const focusDirective: IDirectiveOptions<'vFocus'> = {
  name: 'focus',
  directive: {
    mounted: (el: HTMLInputElement) => el.focus(),
  },
};

export default focusDirective;
