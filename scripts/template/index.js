const { join } = require('path');

module.exports = function main(/** @type { import('plop').NodePlopAPI } */ plop) {
  plop.setHelper('fileName', function fileName(name) {
    return name.split('/').pop();
  });

  plop.setHelper('upcaseName', function upcaseName(name) {
    const filename = plop.getHelper('fileName')(name);
    return filename.charAt(0).toUpperCase() + filename.slice(1);
  });

  plop.setGenerator('module', {
    prompts: [
      {
        name: 'name',
        message: '请输入模块名称',
        type: 'input',
      },
      {
        name: 'cnName',
        message: '请输入模块中文名称',
        type: 'input',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: join(process.cwd(), 'src/{{name}}'),
        base: 'module',
        templateFiles: 'module/**/*.ts',
      },
    ],
  });
};
