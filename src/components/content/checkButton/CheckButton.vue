<template>
  <div class="check-button" :class="{check:isCheck}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButtom",
    props:{
      isCheck:{
        type:Boolean,
        default:false
      }
    }
  }
</script>

<style scoped>
  .check-button{

    border:2px solid #ccc;
    border-radius: 50%;
  }
  .check{
    background: #ff8198;
    border-color: #ff8198;
  }
</style>
