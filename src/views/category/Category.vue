<template>
  <div class="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>

    <div  class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem"/>
      <scroll ref="scroll"
              :data="categoryData"
              id="tab-content">
        <div>
          <tab-content :subcategories="showSubcategory"/>
          <tab-control @tabClick="tabClick"
                      :titles="['综合','新品','销量']"/>
          <goods-list :goods="showCategoryDetail"/>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabMenu from "./childComps/TabMenu";
  import TabContent from "./childComps/TabContent";

  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";

  import {getCategory,getCategoryDetail, getSubcategory} from "network/category";
  import {POP,NEW,SELL} from "common/const";
  import {tabControlMixin} from "common/mixin";


  export default {
    name: "Cotegory",
    data(){
      return{
        categories:[],
        categoryData:{},
        currentIndex:-1
      }
    },
    mixins:[tabControlMixin],
    components:{
      NavBar,
      TabMenu,
      TabContent,
      Scroll,
      TabControl,
      GoodsList
    },
    created() {
      //1.请求分类数据
      this._getCategory();
      //2.监听图片加载完成
      this.$bus.$on('itemImgLoad',() =>{
        this.$refs.scroll.refresh();
      })
    },
    computed:{
      showSubcategory(){
        if(this.currentIndex === -1) return {};
        return this.categoryData[this.currentIndex].subcategories;
      },
      showCategoryDetail(){
        if(this.currentIndex === -1 )return [];
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods:{
      _getCategory(){
        getCategory().then(res =>{
          //1.获取分类数据
          this.categories = res.data.category.list;
          //2.初始化每个类别的子数据
          for(let i=0;i<this.categories.length;i++){
            this.categoryData[i] = {
              subcategories:{},
              categoryDetail:{
                'pop':[],
                'new':[],
                'sell':[]
              }
            }
          }
          //3.请求第一个分类的数据
          this._getSubcategories(0);
        })
      },
      _getSubcategories(index){
        this.currentIndex = index;
        const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res=>{
          this.categoryData[index].subcategories = res.data;
          this.categoryData = {...this.categoryData};

          this._getCategoryDetail(POP);
          this._getCategoryDetail(NEW);
          this._getCategoryDetail(SELL);
        })
      },
      _getCategoryDetail(type){
        //1.获取请求的miniWallKey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        //2.发送请求，传入miniWallKey和type
        getCategoryDetail(miniWallkey,type).then(res =>{
          //3.将获取的数据保存下来
          this.categoryData[this.currentIndex].categoryDetail[type] = res;
          this.categoryData = {...this.categoryData};
        })
      },
      //事件相应方法
      selectItem(index){
        this._getSubcategories(index);
      }
    }
  }
</script>

<style scoped>
  .nav-bar{
    background: var(--color-tint);
    color: #ffffff;
  }
  .content{
    display: flex;
  }
  .tab-menu{
    flex: 1;
    background: #ccc;
  }
  #tab-content{
    flex: 2;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 100px;
    overflow: hidden;
  }
</style>
