<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType: {
        type:Number,
        default:0
      },
      pullUpLoad: {
        type:Boolean,
        default: false
      },
      data:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    data(){
      return {
        bscroll:null
      }
    },
    mounted() {
      this.bscroll = new BScroll(this.$refs.wrapper,{
        pullUpLoad:this.pullUpLoad,
        probeType:this.probeType,
        click:true,
      });
      this.bscroll.on('scroll',position =>{
        this.$emit('scroll',position)
      });
      this.bscroll.on('pullingUp',() =>{
        this.$emit('pullingUp')
      })
    },
    methods:{
      //this.bscroll && 是用来解决组件组件还有没有创建就获取的问题
      scrollTo(x,y,time=500){
        this.bscroll && this.bscroll.scrollTo(x,y,time);
      },
      refresh(){
        this.bscroll && this.bscroll.refresh();
      },
      finishPullUp(){
        this.bscroll &&  this.bscroll.finishPullUp();
      },
      getScrollY(){
        return  this.bscroll ? this.bscroll.y : 0;
      }
    },
    watch:{
      data(){
        setTimeout(this.refresh,20);
      }
    }
  }
</script>

<style scoped>

</style>
