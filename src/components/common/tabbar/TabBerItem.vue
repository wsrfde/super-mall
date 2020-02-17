<template>

  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>

</template>

<script>
  export default {
    name: "TabBerItem",
    data(){
      return {
        //替换为计算属性
        // isActive: true
      }
    },
    computed:{
      isActive(){
        // return this.$route.path == this.path;
        return this.$route.path.indexOf(this.path) !== -1;
      },
      activeStyle(){
        return this.isActive ? {color:this.activeColor} : {}
      }
    },
    props:{
      path:{
        type:String
      },
      activeColor:{
        type:String,
        default:'red'
      }
    },
    methods:{
      itemClick(){
        if(this.$route.path != this.path){
          this.$router.push(this.path)
        }
      },
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    height: 49px;
    text-align: center;
    align-items: center;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

</style>
