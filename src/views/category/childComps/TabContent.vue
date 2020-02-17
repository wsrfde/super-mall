<template>
  <div class="tab-content">
    <div class="tab-item" v-for="(item,index) in subcategories.list" :key="index">
      <a :href="item.link">
        <img class="item-img" :src="item.image" alt="">
        <div class="item-text">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabContent",
    props:{
      subcategories:{
        type:Object,
        default(){
          return{}
        }
      }
    },
  }
</script>

<style scoped>

  .tab-content{
    width: 100%;
    margin-bottom: 10px;
  }
  .tab-item {
    text-align: center;
    font-size: 12px;
    width: 40%;
    display: inline-block;
    margin: 12px;
  }
  .item-img{
    width: 80%;
  }
  .item-text{
    margin-top: 15px;
  }
</style>
