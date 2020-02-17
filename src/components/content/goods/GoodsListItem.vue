<template>
  <div class="goods-list" @click="itemClick">
      <img v-lazy="showImg" alt="" @load="getImgLoad">
      <div class="goods-init">
        <p>{{goodsItem.title}}</p>
        <span>{{goodsItem.price}}</span>
        <span>{{goodsItem.cfav}}</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      showImg(){
        return this.goodsItem.img ||this.goodsItem.image || this.goodsItem.show.img;
      }
    },
    methods:{
      getImgLoad(){
        this.$bus.$emit('itemImgLoad');
      },
      itemClick(){
        const iid = this.goodsItem.iid;
        this.$router.push({path:'/detail',query:{iid}})
      }
    }
  }
</script>

<style scoped>
  .goods-list{
    width: 48%;
    border: 6px;

    font-size: 14px;
    text-align: center;
    position: relative;
    padding-bottom: 40px;
  }
  .goods-list img{
    width: 100%;
    padding: 2px;
    border-radius: 6px;
  }
  .goods-init{
    position: absolute;
    bottom: 6px;
    overflow: hidden;
    width: -webkit-fill-available;
  }
  .goods-init p{
    white-space: nowrap;
    /*width: 10em;*/
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 2px;
  }
  .goods-init span:first-of-type{
    color: var(--color-high-text);
  }
  .goods-init span:first-of-type::after{
    display: inline-block;
    width: 14px;
    height: 14px;
    content: " ";
    background:url("~assets/img/common/collect.svg")  0 0/14px 14px;
    vertical-align: top;
    margin-left: 4px;
  }
</style>
