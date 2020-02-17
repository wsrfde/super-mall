import {ADD_TO_CART,ADD_COUNTER} from "./mutations-type";

export default {
  addCartList(context,payload){
    return new Promise((resolve, reject) => {
      //1. 查找数组中是否有该商品
      let oldGoods =  context.state.cartList.find( item => payload.iid === item.iid);
      //2. 判断oldGoods
      if(oldGoods){
        context.commit(ADD_COUNTER,oldGoods);
        resolve('当前商品数量+1')
      }else{
        context.commit(ADD_TO_CART,payload)
        reject('添加了新的商品')
      }
    })

  }
}
