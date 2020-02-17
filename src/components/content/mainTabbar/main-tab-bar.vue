<template>
  <tab-bar>
    <tab-ber-item path="/home" activeColor = "deepPink">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-ber-item>
    <tab-ber-item path="/category" activeColor = "deepPink">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-ber-item>
    <tab-ber-item path="/cart" activeColor = "deepPink">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-ber-item>
    <tab-ber-item path="/profile" activeColor = "deepPink">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-ber-item>
  </tab-bar>
</template>

<script>
  import TabBar from "components/common/tabbar/TabBar";
  import TabBerItem from "components/common/tabbar/TabBerItem";

  export default {
    name: "main-tab-bar",
    components:{
      TabBar,
      TabBerItem
    }
  }
</script>

<style scoped>

</style>
