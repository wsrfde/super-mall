<template>
  <div>
    <scroll class="tab-menu">
      <div class="menu-list">
        <div class="menu-list-item"
             v-for="(item,index) in categories"
             :key="index"
             :class="{active:index === currentIndex}"
             @click="itemClick(index)"
        >
          {{item.title}}
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  export default {
    name: "TabMenu",
    data(){
      return {
        currentIndex:0
      }
    },
    props:{
      categories:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      Scroll
    },
    methods:{
      itemClick(index){
        this.currentIndex = index;
        this.$emit('selectItem',index)
      }
    }
  }
</script>

<style scoped>
  .tab-menu{
    position: absolute;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
    background: #f6f6f6;
  }
  .menu-list{
    text-align: center;
  }
  .menu-list-item{
    padding: 15px 20px;
    font-size: 14px;
    color: var(--color-text);
  }
  .active{
    background: #ffffff;
    border-left: 3px solid var(--color-high-text);
    color:var(--color-high-text);
    font-weight: 700;
  }
</style>
