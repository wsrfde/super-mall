//3.导入Toast组件
import Toast from "./Toast";
//1.创建index文件，封装对象并导出
const obj = {};
//2.当使用Vue.use时自动执行install，并且会把Vue传递进去
obj.install = function (Vue) {
  //4.创建组件构造器
  const toastConstructor = Vue.extend(Toast);
  //5.通过new的方式，根据组件构造器可以创建出来一个组件对象
  const toast = new toastConstructor();
  //6.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'));
  //7.这里toast.$el对应的就是div
  document.body.appendChild(toast.$el);
  //8.把toast挂载到vue原型上，通过vue的$toast方法来调用toast对象
  Vue.prototype.$toast = toast;
};

export default obj
