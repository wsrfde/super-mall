import {debounce} from 'common/debounceUtils';

import BackTop from "components/content/backTop/BackTop";
import {TOP_DISTANCE,POP,NEW,SELL} from "./const";

export let itemListenerMixin = {
  data(){
    return{
      imgLoadListener:null,
      refresh:null,
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh,50);
    this.imgLoadListener = ()=> {this.refresh()};
    this.$bus.$on('itemImgLoad', this.imgLoadListener);
  },
};

export const backTOPListenerMixin = {
  components:{
    BackTop
  },
  data(){
    return{
      isShowBackTop:false,
    }
  },
  methods:{
    backTop(){
      //调用scroll的函数，可传入返回顶部的x，y，time。time已默认设置500ms
      this.$refs.scroll.scrollTo(0,0)
    },
    backTopFun(position){
      this.isShowBackTop = (-position.y) > TOP_DISTANCE;
    },
  }
};

export const tabControlMixin = {
  data(){
    return{
      currentType:POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP;
          break;
        case 1:
          this.currentType = NEW;
          break;
        case 2:
          this.currentType = SELL;
          break
      }
    }
  }
}
