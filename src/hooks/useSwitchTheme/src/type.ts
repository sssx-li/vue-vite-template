import { UnionToObj } from '@/typing';

// css变量
export type CssVarUnion = '--sy-primary-title-color' | '--sy-primary-bg-color';
export type TCssVar = Partial<UnionToObj<CssVarUnion>>;

// 主题
export type ThemeUnion = 'defaultTheme' | 'customTheme';
export type TTheme = UnionToObj<ThemeUnion, TCssVar>;
