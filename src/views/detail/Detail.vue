<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @jumpTop="jumpTop" ref="navBar"/>
    <scroll class="content"
            ref="scroll"
            @scroll="getPosition"
            :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart="addToCart"/>
    <toast></toast>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
  import {debounce} from "common/debounceUtils";
  import {itemListenerMixin,backTOPListenerMixin} from "common/mixin";
  import {mapActions} from 'vuex'

  import Toast from "components/common/toast/Toast";

  export default {
    name: "Detail",
    mixins:[itemListenerMixin,backTOPListenerMixin],
    data(){
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommend:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
      }
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      Scroll,
      Toast
    },
    created() {
      //获取iid
      this.iid = this.$route.query.iid;
      //获取详情
      getDetail(this.iid).then( res =>{
        //获取数据
        const data = res.result;
        //获取图片数据
        this.topImages =  data.itemInfo.topImages;
        //获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
        //获取店铺信息
        this.shop = new Shop(data.shopInfo);
        //获取商品详情页面
        this.detailInfo = data.detailInfo;
        //获取商品参数
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
        //获取评论数据
        if(data.rate.list){
          this.commentInfo = data.rate.list[0];
        }
      });
      //获取商品推荐
      getRecommend().then(res =>{
        this.recommend = res.data.list;
      });
      //防抖函数获取主题高度
      this.getThemeTopY = debounce(()=>{
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
      },200)
    },
    mounted() {

    },
    destroyed(){
      this.$bus.$off('itemImgLoad', this.imgLoadListener);
    },
    methods:{
      ...mapActions(['addCartList']),
      imgLoad(){
        //解决详情刷新主页刷新的问题，把变量保存为data，指向函数然后调用
        this.refresh();
        //使用防抖函数获取高度
        this.getThemeTopY();
      },
      jumpTop(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],400)
      },
      getPosition(position){
        let positionY = -position.y;

        let length = this.themeTopYs.length;
        for(let i=0;i<length-1;i++){
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex =i;
            this.$refs.navBar.currentIndex = this.currentIndex;
          }
        };
        this.backTopFun(position);
      },
      addToCart(){
        const cartData = {};
        cartData.title = this.goods.title;
        cartData.desc = this.goods.desc;
        cartData.price = this.goods.realPrice;
        cartData.image = this.topImages[0];
        cartData.iid = this.iid;

        this.addCartList(cartData).then(res =>{
          this.$toast.show(res,2000)
        }).catch(rej =>{
          this.$toast.show(rej,2000)
        })

        // this.$store.dispatch('addCartList',cartData).then(res =>{
        //   console.log(res);
        // }).catch(err =>{
        //   console.log(err);
        // })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background: #ffffff;
    height: 100vh;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .detail-nav-bar{
    position: relative;
    z-index: 10;
    background: #ffffff;
  }
</style>
