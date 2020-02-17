<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
         class="tab-control-item"
         :class="{active:index === currentIndex}"
         @click="activeColor(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data(){
      return{
        currentIndex:0
      }
    },
    props:{
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      activeColor(index){
        this.currentIndex = index;
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 14px;
    height: 44px;
    line-height: 44px;
    background: #fff;
  }
  .tab-control-item{
    flex: 1;
  }
  .active span{
    padding: 4px;
    border-bottom: 2px solid var(--color-high-text);
    color: var(--color-high-text);
  }
</style>
