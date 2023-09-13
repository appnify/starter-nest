const { join } = require('path');

module.exports = function main(/** @type { import('plop').NodePlopAPI } */ plop) {
  plop.setHelper('fileName', function fileName(name) {
    return name.split('/').pop();
  });

  plop.setHelper('upcaseName', function upcaseName(name) {
    const filename = plop.getHelper('fileName')(name);
    return filename.charAt(0).toUpperCase() + filename.slice(1);
  });

  plop.setHelper('lowcaseName', (name) => {
    const filename = plop.getHelper('fileName')(name);
    return filename.charAt(0).toLowerCase() + filename.slice(1);
  });

  plop.setGenerator('module', {
    description: '创建一个新的模块',
    prompts: [
      {
        name: 'name',
        type: 'input',
        message: '请输入模块名称(支持嵌套，如: x/y)',
        validate: (input) => {
          if (/^(\w+\/)*(\w+)$/.test(input)) {
            return true;
          }
          return '请输入 <moduleName> 或 <dirName>/<moduleName> 格式, 且不包含中文的名称';
        },
      },
      {
        name: 'cnName',
        type: 'input',
        message: '请输入模块中文名称',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: join(process.cwd(), 'src/{{name}}'),
        base: 'module',
        templateFiles: 'module/**/*.hbs',
      },
    ],
  });
};
