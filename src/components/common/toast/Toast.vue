<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data(){
      return{
        isShow:false,
        message:''
      }
    },
    methods:{
      show(mes,delay=1500){
        this.isShow = true;
        this.message = mes;
        setTimeout(()=>{
          this.isShow = false;
          this.message = '';
        },delay)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: absolute;
    bottom: 10%;
    left: 50%;
    background: rgba(0,0,0,.7);
    color: #ffffff;
    z-index: 999;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    padding: 6px 15px;
    border-radius: 3px;
  }
</style>
