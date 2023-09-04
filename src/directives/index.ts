import type { App } from 'vue';
import type { DirectiveOptions, Keys } from './types';

export default async function directives(app: App) {
  const files = import.meta.glob('./modules/*.ts');
  for (const key in files) {
    const file: any = await files[key]();
    if (file) {
      const direct = file.default as DirectiveOptions<Keys>;
      app.directive(direct.name, direct.directive);
    }
  }
}
