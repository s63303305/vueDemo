<template>
  <div class="container">
		<leftMenu></leftMenu>
    <Loading :loading="loading"></Loading>
    <div class="content photo-c" v-show="!loading">
      <waterfall :line-gap="300" :watch="photos" id="showPhoto">
        <waterfall-slot v-for="(item, index) in photos" :width="item.width/50" :height="item.height/50" :order="index" :key="item.id">
	        <img :src="item.url" :data-max="item.url">
	      </waterfall-slot>
      </waterfall>
      <!--<Mloading :loading="mloading"></Mloading>-->
<!--      <p class="error">{{ this.error }}</p>-->
    </div>
    <div class="l-show" v-show="large"  @click="large = false">
      <a class="download btn" :href="downBack" target="_blank">超清原图</a>
      <img :src="this.minBack"> 
  		<div class="t-show" v-show="large" @click="large = false">
  			<img :src="this.maxBack">
    	</div>
    </div>
    <ViewPhoto :el="el"></ViewPhoto>
  </div>
</template>

<script>
import leftMenu from "../components/LeftMenu.vue"
import Loading from '../components/Loading'
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import ViewPhoto from '../components/ViewPhoto'
export default {
  data () {
    return {
      loading: true,
      mloading: false,
      url: 'https://api.unsplash.com/photos?client_id=80f66654628683dc7a20a3f2b44a93f8a9f0afaa41be7c7c392c5648dc6bb035&page=',
      photos:[
      	{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502772136308&di=587adb9ac2dda3db9eb35ce5e7c4794a&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F56%2Fd%2F118.jpg',width:1920,height:1200},
				{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502772186039&di=1c873626cf1bc8578b82749f7892cddb&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201505%2F23%2F20150523203539_w8SeG.jpeg',width:1440,height:1280},
      	{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502772265134&di=50fa00587dd11a16f6acee8d64f572d9&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fa1%2F53%2Fd%2F56.jpg',width:1440,height:900},
      	{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502772343247&di=8c448b00ab21f89dd25488792481f8c7&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F160918%2F103-16091Q0512S63.jpg',width:650,height:352},
      	{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502772359116&di=ed7cae66556f0ac699e037c1c8984faa&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2Fd%2Ffile%2F201702%2F28%2F200b01b76df922d833c8886a73e6efad.jpg',width:1920,height:1200},
      	{url:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=923589505,3323801463&fm=26&gp=0.jpg',width:1920,height:1080},
      	{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502772378871&di=cd5a882bf73f5020e23751a20229f37a&imgtype=0&src=http%3A%2F%2Fimg3.redocn.com%2F20121120%2FRedocn_2012111818073956.jpg',width:800,height:830},
      	{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502772400769&di=fef801f5d903df446cc7a855876895b6&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2F201612%2F29%2F557b6b4ec6e5104d4732c0b4dc42480e.jpg',width:800,height:1200},
      	{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502772418593&di=7eb9fa4fbae54552fd7f981e2e7c44b5&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2F201612%2F29%2Fc939c1fd26c040b8f48d65dc04283317.jpg',width:800,height:1280},
      	{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503367163&di=0cf903b0918dd6d84d2fea4f5fd43f46&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fwallpaper%2F1209%2F26%2Fc0%2F14139494_1348624365101.jpg',width:1440,height:900},
      	{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503367263&di=fb543bc7307232f21a9de1aeb911572b&imgtype=jpg&er=1&src=http%3A%2F%2Fwapfile.desktx.com%2Fpc%2F161208%2Fbigpic%2F5847d7e7af22b.jpg',width:1920,height:1200},
      	{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502772560169&di=2468739460bfee5f625bce2fbd3f314f&imgtype=0&src=http%3A%2F%2Fimg15.3lian.com%2F2015%2Fa1%2F13%2Fd%2F15.jpg',width:1920,height:1200},
      	{url:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1555219425,1189830740&fm=26&gp=0.jpg',width:800,height:1280},
      	{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502772596259&di=3475740451578c89f5ceaf12c98736f9&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fw22%2F96%2Fd%2F61.jpg',width:820,height:461},
      	{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502772609047&di=0360a95a8227e87a4b288b7ae0103fc8&imgtype=0&src=http%3A%2F%2Fimg3.3lian.com%2F2013%2Fs1%2F94%2Fd%2F73.jpg',width:800,height:500},
      	{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502772623449&di=176dcefcff6d81fde04443b3ae316785&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fupload%2Fimg_1_3267734555D928636664_23.jpg',width:400,height:300},
      	{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502772637207&di=cfc7e135e4abe69270862eebc41dfaa9&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F160411%2F14-16041115532E19.jpg',width:650,height:488},
      	{url:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1886537894,708345778&fm=26&gp=0.jpg',width:1920,height:1080},
      	{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502772665650&di=202c8afda5c22872eed169ca4f07ba46&imgtype=0&src=http%3A%2F%2Fpic26.photophoto.cn%2F20130330%2F0035035760754688_b.jpg',width:1024,height:643},
      	{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503367420&di=37b8891387fc0f7d22da80bdc7902dc3&imgtype=jpg&er=1&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F160118%2F14-16011Q41910V7.jpg',width:650,height:425},
      	{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503367474&di=efcf6c6882fe301415da08cfa4347d46&imgtype=jpg&er=1&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F160407%2F14-16040G60T2U0.jpg',width:650,height:340},
      	{url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503367505&di=12a798c5b085e8055fe88dbadcc3bf0a&imgtype=jpg&er=1&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201505%2F23%2F20150523203539_w8SeG.jpeg',width:1440,height:1280},
      	{url:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4138850978,2612460506&fm=26&gp=0.jpg',width:650,height:433}
      ],
      page: 1,
      first: true,
      error: '',
      large: false,
      minBack: '',
      maxBack: '',
      downBack: '',
      showTop: false,
      add: false,
      el: '#showPhoto'
    }
  },
  watch: {
    large () {
      var body = document.querySelector('body')
      if (this.large !== true) {
        this.minBack = '';
        this.maxBack = '';
        body.classList.remove('model-open');
        var top = body.style.top;
        top = top.replace('px', '');
        document.body.scrollTop = -top;
        body.style.top = 0;
      } else {
        body.style.top = -(document.body.scrollTop) + 'px';
        body.classList.add('model-open');
      }
    }
  },
  methods: {
    start () {
    	this.loading = false; 
    },
    createImg(){
//  	this.$http.get('url').then(function(response){
//  		
//  	})
    }
  },
  components: {leftMenu,Loading,Waterfall,WaterfallSlot,ViewPhoto},
  mounted(){
  	this.start();
  	let self = this;
  	window.onscroll= function  () {
        // 可视区高度
        var windowHeight = document.documentElement.clientHeight;
        //滚动条的高度    
        var srcollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var srcollH = document.body.scrollHeight;  
        if (srcollTop+windowHeight  >= srcollH-20) { 	//滑动到底部时,可以进行数据加载
					self.createImg();
        };
    }
  },
  destroyed () {
    document.querySelector('body').classList.remove('model-open');
  }
}
</script>

<style lang="scss" scoped>
  .vue-waterfall {
    width: 1500px;
    margin: auto;
  }

  .vue-waterfall .vue-waterfall-slot {
    padding: 2px;
  }

  .vue-waterfall-slot img {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .l-show {
    position: fixed;
    width: 100%;
    height: 100%;
    padding-left: 100px;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 100;
    cursor: zoom-out;
    background-position: center center;
    background-size: cover;

    .download {
      display: inline-block;
      position: absolute;
      width: 100px;
      margin-left: 0px;
      text-align: center;
      z-index: 999;
      left: 50%;
      top: 10px;
      color: white;
    }

    img {
      display: block;
      margin: auto;
      padding-top: 50px;
      max-width: 95%;
      height: 80%;
    }
  }

  .t-show {
    position: fixed;
    width: 100%;
    height: 100%;
    padding-left: 100px;
    top: 0;
    left: 0;
    z-index: 200;
    cursor: zoom-out;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;

    img {
      display: block;
      margin: auto;
      padding-top: 50px;
      max-width: 95%;
      height: 80%;
    }
  }

  @media screen and (max-width: 1670px) {
    .vue-waterfall {
      width: 1200px;
    }
  }

  @media screen and (max-width: 1470px) {
    .vue-waterfall {
      width: 900px;
    }
  }

  @media screen and (max-width: 1170px) {
    .vue-waterfall {
      width: 600px;
    }
  }


  @media screen and (max-width: 1000px) {
    .l-show {
      .download {
        margin-left: -50px;
        top: 60px;
      }
      padding: 0;

      img {
        padding-top: 100px;
      }
    }

    .t-show {
      padding: 0px;

      img {
        padding-top: 100px;
      }
    }
  }

  @media screen and (max-width: 600px) {
    .vue-waterfall {
      width: 100%;

      .vue-waterfall-slot {
        position: relative !important;
        top: 0!important;
        margin: 1px 0;
        width: 100%!important;
        height: auto!important;
      }
    }

    .l-show {

      img {
        width: 95%;
        height: auto;
      }
    }

    .t-show {
      img {
        width: 95%;
        height: auto;
      }
    }
  }
</style>
