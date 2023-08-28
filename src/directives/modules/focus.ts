import { IDirective } from '..';

const focusDirective: IDirective = {
  name: 'focus',
  directive: {
    mounted: (el: HTMLInputElement) => el.focus(),
  },
};

export default focusDirective;
