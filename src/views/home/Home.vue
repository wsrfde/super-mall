<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control ref="tabControl1"  @tabClick="tabClick" :titles="['流行','新款','精选']" v-show="isTabFixed" class="toFixed"/>
    <scroll class="content"
            ref="scroll"
            :probeType="3"
            @scroll="showBackTop"
            :pullUpLoad="true"
            @pullingUp="loadMore" >
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control ref="tabControl2"  @tabClick="tabClick" :titles="['流行','新款','精选']" />
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGoodsdata} from 'network/home';
  import {TOP_DISTANCE,POP,NEW,SELL} from "common/const";
  import {itemListenerMixin} from "common/mixin";

  export default {
    name: "Home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    mixins:[itemListenerMixin],
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:POP,
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        scrollY:0,
      }
    },
    created() {
      //请求多个数据
      this.getHomeMulti();
      //请求商品数据
      this.getHomeGoods(POP);
      this.getHomeGoods(NEW);
      this.getHomeGoods(SELL);
    },
    mounted() {
    },
    activated(){
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0,this.scrollY,0)
    },
    deactivated(){
      this.scrollY = this.$refs.scroll.getScrollY();
      //时间总线销毁
      this.$bus.$off('itemImgLoad',this.imgLoadListener);
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    methods:{
      /**
       * 返回顶部及显示隐藏
       */
      backTop(){
        //调用scroll的函数，可传入返回顶部的x，y，time。time已默认设置500ms
        this.$refs.scroll.scrollTo(0,0)
      },
      showBackTop(position){
        // this.backTopFun(position);
        this.isShowBackTop = (-position.y) > TOP_DISTANCE;
        this.isTabFixed = position.y <= -this.tabOffsetTop ;
      },

      /**
       *上拉加载更多
       */
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      /**
       *tab-control高度获取
       */
      swiperImgLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /**
      * 切换tab-control的类型
      */
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = POP;
            break;
          case 1:
            this.currentType = NEW;
            break;
          case 2:
            this.currentType = SELL;
            break;
        }
        //切换标签回到标签高度位置
        this.$refs.scroll.scrollTo(0,-(this.tabOffsetTop));
        //修复复制组件bug
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      /**
       * 网络请求封装
       */
      getHomeMulti(){
        getHomeMultidata().then(res =>{
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        //请求下页数据+1
        let page =  this.goods[type].page+1;
        getHomeGoodsdata(type,page).then(res =>{
          this.goods[type].list.push(...res.data.list);
          //push完成后把页面+1
          this.goods[type].page += 1;
          //标识页面加载完成
          this.$refs.scroll.finishPullUp();
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    height: 100vh;
  }
  .tab-control{
    background: #fff;
    height: 44px;
    width: 100%;
    position: relative;
    z-index: 9;
  }
  .home-nav{
    background: var(--color-tint);
    color: #ffffff;
    position: relative;
    z-index: 10;
  }

  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>
