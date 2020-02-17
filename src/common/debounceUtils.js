export function debounce(fun,delay){
  //防抖函数
  let timer = null;
  return function (...args) {
    if(timer) clearTimeout(timer);
    timer = setTimeout(()=>{
      fun.apply(this,args);
    },delay)
  }
}
