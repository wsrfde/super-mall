<template>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" >
      </div>

      <div slot="center" class="title">
        <div
          v-for="(item,index) in title"
          class="title-item"
          @click="titleClick(index)"
          :class="{active:index === currentIndex}">
          {{item}}
        </div>
      </div>

    </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    data(){
      return{
        title:['商品','参数','评论','推荐'],
        currentIndex:0,
      }
    },
    components:{
      NavBar
    },
    methods:{
      titleClick(index){
        this.currentIndex = index;
        this.$emit('jumpTop',index)
      },
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 14px;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color:var(--color-high-text);
  }
  .back img{
    vertical-align: middle;
  }
</style>
