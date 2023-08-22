import type { App } from 'vue';
export interface Directive {
  name: string;
  directive: any;
}

const directiveList: Array<Directive> = [];

export default async function directives(app: App) {
  const files = import.meta.glob('./modules/*.ts');
  for (const key in files) {
    const file: any = await files[key]();
    directiveList.push(file.default);
  }
  for (const direct of directiveList) {
    app.directive(direct.name, direct.directive);
  }
}
