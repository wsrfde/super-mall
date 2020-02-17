<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  }
</script>

<style scoped>
  .back-top{
    z-index: 10;
    position: fixed;
    bottom: 55px;
    right: -40px;
  }
  .back-top img{
    width: 47%;
    height: 47%;
  }
</style>
