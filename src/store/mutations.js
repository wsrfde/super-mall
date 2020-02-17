import {ADD_TO_CART,ADD_COUNTER} from "./mutations-type";

export default {
  [ADD_COUNTER](state,oldGoods){
    oldGoods.count += 1;
  },
  [ADD_TO_CART](state,payload){
    payload.count = 1;
    payload.checked = true;
    state.cartList.push(payload);
  }
}
