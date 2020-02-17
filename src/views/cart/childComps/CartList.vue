<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item,index) in cartList"
        :item-info="item"
        :key="index"
      />
    </scroll>
    <cart-button-bar/>
  </div>
</template>

<script>
  import CartListItem from "./CartListItem";
  import CartButtonBar from "./CartButtonBar";
  import Scroll from "components/common/scroll/Scroll";
  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    computed:{
      ...mapGetters(['cartList'])
    },
    components:{
      CartListItem,
      CartButtonBar,
      Scroll
    },
    activated(){
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  .cart-list{
    width: 100vh;
  }
  .content{
    position:absolute;
    top: 44px;
    bottom: 93px;
    width: 100%;
    overflow: hidden;
  }

</style>
