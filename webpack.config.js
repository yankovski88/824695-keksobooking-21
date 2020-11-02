// __dirname служебная переменная для получения пути в котором хранится файл webpack.config
// path построит правильный путь в необходимый нам коталог для этого его экспортируем
const path = require(`path`); // получили модуль path из npm
// чтобы понял webpck что нужно делать создаем модуль и прописываем туда настройки
module.exports = {
  entry: [ // откуда берем файлы отнительно файла webpack.config.js
    `/js/util.js`,
    `/js/backend.js`,
    `/js/form.js`,
    `/js/card.js`,
    `/js/pin.js`,
    `/js/main.js`,
    `/js/movePin.js`,
    `/js/filter.js`,
    `/js/startPins.js`,
  ],
  // свойство вывод т.е. куда сложить файлы
  output: {
    filename: "bundle.js", // название файла куда сложатся файлы
    path: path.resolve(__dirname),
    iife: true // означает что все файлы модули обернуться в iife т.е. в ананимную функцию
  },
  devtool: false, // настройка карты исходников, ее мы отключили
};
