const { setCache } = useLocalCache();

const themes = {
  defaultTheme: {
    '--sy-primary-bg-color': '#fff',
    '--sy-primary-title-color': '#000',
  },
  customTheme: {
    '--sy-primary-bg-color': '#000',
    '--sy-primary-title-color': '#fff',
  },
};

type TTheme = typeof themes;
export type TThemeTypes = keyof TTheme;
export type TCssVarTypes = keyof TTheme['defaultTheme'];

export function useTheme(
  el: HTMLElement | Ref<HTMLElement | null | undefined>,
  type: Ref<TThemeTypes> = ref('defaultTheme')
) {
  const colors: Record<TCssVarTypes | string, Ref<any>> = {};

  const switchTheme = () => {
    Object.keys(themes[type.value]).forEach((item) => {
      colors[item].value = themes[type.value][item as TCssVarTypes];
    });
    setCache('theme', type.value);
  };

  onMounted(() => {
    Object.keys(themes.defaultTheme).forEach((item) => {
      colors[item] = useCssVar(item, el);
    });
    switchTheme();
  });

  return {
    switchTheme,
  };
}
