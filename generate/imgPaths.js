import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const prefix_path = '\\src\\assets\\imgs';

const imgBasePaths = [];

function readDir(dir) {
  const files = fs.readdirSync(dir);
  for (let i = 0; i < files.length; i++) {
    const newPath = path.join(dir, files[i]);
    const stat = fs.statSync(newPath);
    if (stat.isDirectory()) {
      readDir(newPath); //判断是否是文件夹，如果是文件夹就递归下去
    } else {
      imgBasePaths.push(
        newPath
          .substring(newPath.indexOf(prefix_path) + prefix_path.length + 1)
          .replace(/\\/g, '/')
      );
    }
  }
}

function writeFile() {
  fs.writeFile(
    path.resolve(__dirname, './index.ts'),
    `export const imgBasePaths = ${JSON.stringify(imgBasePaths)
      .replace(/"/g, "'")
      .replace(/,/g, ', ')} as const;\n`,
    'utf-8',
    (err) => {
      if (err) {
        console.log('图片路径生成失败...');
      }
    }
  );
}

readDir(path.resolve(__dirname, '../src/assets/imgs'));

if (imgBasePaths.length > 0) {
  writeFile();
}
