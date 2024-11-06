import { defineConfig } from 'dumi';
import { readdirSync } from 'fs';
import path, { join } from 'path';

const headPkgList: string | string[] = [];

const pkgList = readdirSync(join(__dirname, '/packages')).filter(
  (pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg),
);
const alias = pkgList.reduce((pre, pkg) => {
  pre[`@tz/${pkg}`] = join(__dirname, '/packages', pkg, 'src');
  return {
    ...pre,
  };
}, {});
export default defineConfig({
  outputPath: 'docs-dist',
  alias,
  resolve: {
    docDirs: ['docs'],
    atomDirs: pkgList.map((i) => ({
      type: `${i}${i[i.length - 1] === 's' ? '' : 's'}`,
      dir: `/packages/${i}/src`,
    })),
    entryFile: './config/api.tsx',
  },
  themeConfig: {
    name: '探真组件库',
    nav: [
      { title: '指南', link: '/guide' },
      { title: 'Antd', link: '/antds' },
      { title: '工具函数', link: '/utils' },
      { title: '翻译模块', link: '/translates' },
      { title: '自定义组件', link: '/components' },
    ],
  },
  // 开启 apiParser
  apiParser: {},
});
