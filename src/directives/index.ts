import type { App } from 'vue';
import type { DirectiveOptions, Keys } from './types';

export default async function directives(app: App) {
  const files = import.meta.glob('./modules/*.ts');
  for (const key in files) {
    const file: DirectiveOptions<Keys> = ((await files[key]()) as any).default;
    app.directive(file.name, file.directive);
  }
}
