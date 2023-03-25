const focusDirective = {
  name: 'focus',
  directive: {
    mounted: (el: HTMLInputElement) => el.focus(),
  },
};

export default focusDirective;
