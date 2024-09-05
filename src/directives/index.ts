import type { App } from 'vue';
import type { IDirectiveOptions, TKeys } from './types';

export default async function directives(app: App) {
  const files = import.meta.glob('./modules/*.ts');
  for (const key in files) {
    const file: any = await files[key]();
    if (file) {
      const direct = file.default as IDirectiveOptions<TKeys>;
      app.directive(direct.name, direct.directive);
    }
  }
}
