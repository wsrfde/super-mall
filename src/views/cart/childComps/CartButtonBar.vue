<template>
  <div class="button-bar">
    <div class="left-bar">
      <check-button :isCheck="isSelectAll" @click.native="checkAll"/>
      <span>全选</span>
    </div>
    <div class="center-bar">
      合计:{{totalPrice}}
    </div>
    <div class="right-bar" @click="checkShop">
      去结算({{totalCount}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'
  export default {
    name: "CartButtonBar",

    components:{
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return '￥' + this.cartList.filter( item =>{
          return item.checked;
        }).reduce( (preValue,item) =>{
          return preValue+item.price*item.count;
        },0).toFixed(2)
      },
      totalCount(){
        return this.cartList.filter( item =>{
          return item.checked
        }).length
      },
      isSelectAll(){
        // if(this.cartList.length === 0) return false;

        // return !this.cartList.find( item =>{
        //     return !item.checked
        //   })
        // return this.cartList.every( item =>{
        //   return item.checked;
        // })
        return !!(this.cartList.length && this.cartList.every( item => item.checked ))
      }
    },
    methods:{
      checkAll(){
        //由于之前已经计算过全选状态，直接if判断即可
        if(this.isSelectAll){
          this.cartList.forEach(item => item.checked = false)
        }else{
          this.cartList.forEach(item => item.checked = true)
        }
      },
      checkShop(){
        if(!this.isSelectAll){
          this.$toast.show('你没有选择商品',2000)
        }
      }
    }
  }
</script>

<style scoped>
  .button-bar{
    position: absolute;
    bottom: 49px;
    display:flex;
    align-items: center;


    width: 100%;
    height: 44px;

    background: #cccccc59;
  }
  .left-bar{
    flex: 1;
    padding-left: 5px;
    display: flex;
  }
  .left-bar>:first-child{
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  .left-bar>:last-child{
    line-height: 20px;
    padding-left: 5px;
  }
  .center-bar{
    flex:2;
  }
  .right-bar{
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    background: #ff8198;
    padding: 10px 5px;
    margin-right: 3px;
    color: #fff;
    border-radius: 4px;

  }
</style>
