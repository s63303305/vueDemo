<template>
  <div id="videoui">
  	<div class='v-video' :class='{"maxScreen" : maxScreen , "mid-video": midScreen }'  ref="xVideo" @mousemove="toogleMenu" >
  		<div class="x-title" ref="xTitle">
	      <p>{{ name }}</p>
	    </div>
	    <div class='t-video'>
	    	<video 
	    		ref="video"
		  		width="100%"
		  		@click='playVideo'
		  		@seeked="seeked"
		  		@canplay='canplay'
		  		@waiting="waiting"
		  		src='http://devtest.qiniudn.com/%E8%8B%A5%E8%83%BD%E7%BB%BD%E6%94%BE%E5%85%89%E8%8A%92.mp4'>
		  	</video>
		  	<i  class="iconfont max-pause fade-in"  @click='playVideo' :class="{'icon-v-pause': play, 'icon-v-play': !play}"></i>
	      <!-- 加载动画 -->
	      <div class="x-loading" v-show="watting">
	        <i class="iconfont icon-v-loading"></i>
	        <p>加载中..</p>
	      </div>
	    </div>
	  	<div class="c-video" ref="xControl">
      <div class="play c-item" >
        <i class="iconfont" :class="{'icon-v-pause': play, 'icon-v-play': !play}" @click="playVideo"></i>
      </div>
      <div class="line" ref="bar"  @click="jump()" @mousemove="goTime($event)" >
        <span class="go-time"></span>
        <span class="line-to line-bg"></span>
        <span class="line-to line-load" :style="{'width': (loadLength / 1) * 100 + '%'}"></span>
        <span class="line-to line-now" :style="{'width': (nowTime / allTime) * 100 + '%'}" ref="lineIn"></span>
        <i class="line-point" :style="{'left': (nowTime / allTime) * 100 + '%'}" @mousedown="drap($event)" @touchstart="drap($event)"></i>
      </div>
      <div class="show-time">
        <p>{{ reslutTime }}</p>
      </div>
      <div class="right-c">
        <div class="v-volume c-item" :class='{active :　setVolume}' @mouseleave="setVolume = false ; leave2 ()">
          <i class="iconfont" :class="volumeIcon" @click='setVolume = !setVolume' ></i>
          <div class='volumeLine'  v-show='setVolume'>
          	<div class="volumeBox" ref='volumeLine'>
          		<i class='line-point' ref='volumeLine2' :style="{'top':(100-volume)+'%'}" @mousedown="drap2($event)" @touchstart="drap2($event)" ></i>
          	</div>
          </div>
        </div>
        <div class="v-definition c-item " @click='definitionFun = !definitionFun ;' :class='{active :　definitionFun}' @mouseleave="definitionFun = false">
        		<p class='definitionNow'>{{definitionNow}}</p>
          	<ul>
          		<li v-for = 'item in definition' @click='definitionNow = item'>{{ item }}</li>
          	</ul>
        </div>
        <div class="c-dan c-item" @click="changeBarrage" :data-msg="danMsg">
          <i class="iconfont" :class="{'icon-open-dan': barrage,'icon-close-dan':!barrage}"></i>
        </div>
        <div class="m-screen c-item" :data-msg="midScreenMsg" @click="midScreen = !midScreen">
          <i class="iconfont icon-mid-screen"></i>
        </div>
        <div class="f-screen c-item" :data-msg="maxScreenMsg" @click="toMax">
          <i class="iconfont icon-max-screen" ></i>
        </div>
      </div>
    </div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'videoUI',
  data(){
  	return{
  		nowTime: 0,						//视频播放时长
      allTime: 0,						//视频总时长
      goNowTime:0,					//点击视频时间轴跳转到的时间
      ready:false,					//视频是否准备完成
  		play:false,						//是否播放
  		barrage:false,				//弹幕
      midScreen: false,			//网页全屏
      maxScreen:false,			//整体全屏
  		getTimes:'',					//时间计算定时器
  		setMenu:'',						//鼠标移动隐藏/显示菜单
  		setting: '',					//加载缓存定时器
  		menuTime:1,						//设置鼠标多久不动就隐藏
  		oldX:0,								//控制视频时长的X
  		nowX:0,
  		oldY:0,								//控制视频音量的Y
  		nowY:0,
  		volume:100,						//初始音量
  		setVolume:false,			//设置音量  
  		watting:false,
  		definition:['超清','高清','普通'],	
  		definitionFun:false,
  		definitionNow:'超清',
  		loadLength:0,					
  		leaveTime:0,
  		name:'名称',
  		screenX:0
  	}
  },
  computed:{
  	reslutTime(){	// 获取总时长和播放进行时长
    	return this.getTime(this.nowTime) + ' / ' + this.getTime(this.allTime) ;
   	},
   	danMsg(){
   		return this.barrage ? '关闭弹幕' : '打开弹幕'
   	},
   	midScreenMsg () {
      return this.midScreen ? '小屏模式' : '宽屏模式'
    },
    maxScreenMsg () {
      return this.maxScreen ? '退出全屏' : '全屏'
    },
    volumeIcon () {
      if (this.volume === 100) {
        return 'icon-v-v3'
      } else if (this.volume >= 50) {
        return 'icon-v-v2'
      } else if (this.volume > 0) {
        return 'icon-v-v1'
      } else {
        return 'icon-v-v0'
      }
    }
  },
  methods:{
  	playVideo () { // 播放和暂停视频
  			if(this.ready){
      		this.play = !this.play;
  			}
  			if (this.loadLength < 1) {
	        this.buffered() ;
	      }
    },
    start(){
    	this.getTimes = setInterval(() => {
      	this.nowTime = this.$refs.video.currentTime;
      },500)
    },
    pause(){
    	clearInterval(this.getTimes);
    },
    canplay(){	// 可播放时关闭等待
    	this.ready = true;
    	this.watting = false ;
    	this.allTime = this.$refs.video.duration;
    },
    waiting () {	// 加载时进行等待动画
      this.watting = true;
    },
    getTime(date){  //计算时间
      var m = ~~(date / 60);
      var s = ~~(date % 60);
      m = m > 9 ? m : '0' + m;
      s = s > 9 ? s : '0' + s;
      return m + ':' + s;
    },
		toMax () {// 全屏
      var elem = this.$refs.xVideo;
      if (!this.maxScreen) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        }	else if (elem.msRequestFullscreen) {
				  elem.msRequestFullscreen();
				}
      } else {
        // 取消全屏
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }	else if (document.msRequestFullscreen) {
				  document.msRequestFullscreen();
				}
      }
      this.maxScreen = !this.maxScreen;
    },
    keyboard (e) { // 键盘事件
      switch (e.code) {
        case 'Escape':
          if (this.midScreen) {
            this.midScreen = false;
            this.maxScreen = false;
            clearInterval(this.getTimes);
            this.$refs.xTitle.style.transform = 'translate3d(0, 0, 0)';
            this.$refs.xControl.style.transform = 'translate3d(0, 0, 0)';
          }
          break
        case 'F11':	
          if (this.maxScreen) {
            this.maxScreen = false;
            clearInterval(this.getTimes);
            this.$refs.xTitle.style.transform = 'translate3d(0, 0, 0)';
            this.$refs.xControl.style.transform = 'translate3d(0, 0, 0)';
          }
          break
        case 'Space':
          this.playVideo();
          break
        default:
          break
      }
    },
    // 弹幕开关
    changeBarrage () {
      this.barrage = !this.barrage;
    },
    toogleMenu(e){
      this.screenX = this.screenX === 0 ? e.screenX : this.screenX;
//    每次移动先清除定时器 然后设置定时器menuTimes后关闭菜单
      if (Math.abs((this.screenX - e.screenX)) === 1) {
        this.screenX = e.screenX;
        let title = this.$refs.xTitle;
        let control = this.$refs.xControl;
        clearInterval(this.setMenu);
        if (this.maxScreen || this.midScreen) {
          title.style.transform = 'translate3d(0, 0, 0)';
          control.style.transform = 'translate3d(0, 0, 0)';
          if (this.play) {
            this.setMenu = setTimeout(() => {
              title.style.transform = 'translate3d(0, -100%, 0)';
              control.style.transform = 'translate3d(0, 100%, 0)';
            }, this.menuTime * 1000);
          }
      	}
      } else {
        this.screenX = e.screenX ;
        return false ;
      }
    },
    buffered () {		// 读取加载进度
      clearInterval(this.setting) ;
      var buffer = this.$refs.video.buffered ;
      if (buffer.length >= 1) {
        this.setting = setInterval(() => {
          buffer = this.$refs.video.buffered ;
          if (buffer.end(buffer.length - 1) < this.allTime) {
            this.loadLength = (buffer.end(buffer.length - 1) / this.allTime);
          } else {
            this.loadLength = 1;
            clearInterval(this.setting);
          }
        }, 1000)
      }
    },
    seeked(){
    	if (this.play === false) {
        this.play = true;
      }
      this.watting = false;
    },
    goTime(){		//点击或移动视频时间轴
    	var go = 0 ;
      var all = window.getComputedStyle(this.$refs.bar).width;
      all = all.replace('px', '');
      if (event.target.nodeName !== 'I') {
        go = event.offsetX ;
      } else {	
        go = event.offsetX + (this.nowTime / this.allTime) * all ;
      }
      var time = ((go / all) * this.allTime).toFixed(3);
			this.goNowTime = time;
   	},
    jump () {		// 点击完成后时间条
    	this.$refs.video.currentTime = this.goNowTime ;
      this.nowTime = this.$refs.video.currentTime ;
    },
		drap (e) {		// 拖拽
		  this.pause();
      this.oldX = e.clientX ? e.clientX : e.touches[0].clientX;
      this.nowLine = window.getComputedStyle(this.$refs.lineIn).width;
      this.nowLine = this.nowLine.replace('px', '');
		  e.preventDefault();
		  window.addEventListener('mousemove', this.move);
      window.addEventListener('touchmove', this.move);
      window.addEventListener('mouseup', this.leave);
      window.addEventListener('touchend', this.leave);
		},
		move (e) {
      // 得到当前
      var all = window.getComputedStyle(this.$refs.bar).width;
      all = all.replace('px', '');
      this.nowX = e.clientX ? e.clientX : e.touches[0].clientX;
      var end = Number(this.nowX - this.oldX) + Number(this.nowLine);
      end = end > all ? all : end < 0 ? 0 : end;
      this.nowTime = Number(((end / all) * this.allTime).toFixed(2));
   	},
		leave () {		 // 结束拖拽
			window.removeEventListener('mousemove',this.move);
		  window.removeEventListener('touchmove',this.move);
		  this.jump();
		},
   	drap2 (e) {		// 拖拽音量
			let top = Math.abs(parseInt(window.getComputedStyle(this.$refs.volumeLine2).marginTop));
			this.oldY = e.clientY - (this.$refs.volumeLine2.offsetTop + top);

			window.addEventListener('mousemove', this.move2);
      window.addEventListener('touchmove', this.move);
      window.addEventListener('mouseup', this.leave2);
      window.addEventListener('touchend', this.leave2);
		},
		move2 (e) {
			var all = window.getComputedStyle(this.$refs.volumeLine).height;
      all = all.replace('px', '');
   		this.nowY = e.clientY ? e.clientY : e.touches[0].clientY;
   		let end = Number(this.nowY - this.oldY);
   		end = end > all ? all > 100 ? 100 :all : end < 0 ?  0 : end;
   		this.volume = (100 - end) ; 
		},
		leave2 () {		 // 结束拖拽
			window.removeEventListener('mousemove',this.move2);
		  window.removeEventListener('touchmove',this.move2);
		},
  },
  watch: {
  	nowTime(){
  		if(this.nowTime == this.allTime){
  			clearInterval(this.getTimes);
  			this.nowTime = 0 ;
  			this.play = false;
				return
  		}
  	},
  	volume(){
  		this.$refs.video.volume = this.volume / 100;
  	},
    play () {
    	this.play ? (this.$refs.video.play(), this.start()) : (this.$refs.video.pause(), this.pause());
    },
    maxScreen () {
      if (!this.maxScreen) {
        clearInterval(this.setMenu);
        this.$refs.xTitle.style.transform = 'translate3d(0, 0, 0)';
        this.$refs.xControl.style.transform = 'translate3d(0, 0, 0)';
      }
    },
    midScreen () {
      if (!this.midScreen) {
        clearInterval(this.setMenu);
        this.$refs.xTitle.style.transform = 'translate3d(0, 0, 0)';
        this.$refs.xControl.style.transform = 'translate3d(0, 0, 0)';
      }
    }
  },
  mounted(){
  	let self = this;
  	
    // 加载缓冲进度
    if (self.cache) {
      self.buffered();
    }
    
    //初始化音量
		this.$refs.video.volume = self.volume / 100; 
		
    // 监听键盘
    window.addEventListener('keyup', this.keyboard);
    
    //退出全屏
    document.addEventListener('webkitfullscreenchange', function (event) {
      if (!(document.webkitFullscreenElement === self.$refs.xVideo)) {
        self.maxScreen = false ;
      }
    })
  },
  destroyed () {
    this.pause();
    clearInterval(this.setting);
  }
}

</script>

<style  lang='scss' scoped>
	
	.v-video {
		
		&.maxScreen,&.mid-video{
			position: fixed;
			width: 100%;
			height:100%;
			top:0;
			left:0;
			z-index: 9999;
			
			.x-title,.c-video{
				  position: absolute;
			    top: 0;
			    left: 0;
			    z-index: 9;
			    width: 100%;
			}
			.c-video{
			    top: initial;
					bottom: 0;
			}
			
			.t-video{
				height:100%;
				
				video{
					width:100%;
					height:100%;
				}
			}
		}
		
		.x-title {
	    width: 100%;
	    text-align: center;
	    background-color: #353535;
	    color: #e5e9ef;
	    vertical-align: middle;
	    -webkit-transition: -webkit-transform 0.5s ease-out;
	    transition: -webkit-transform 0.5s ease-out;
	    transition: transform 0.5s ease-out;
	    transition: transform 0.5s ease-out, -webkit-transform 0.5s ease-out;
	    
	    p{
	    	line-height: 40px;
	    	color:#fff;
	    	font-size: 16px;
	    	letter-spacing: 3px;
	    }
    }
    
    .t-video {
      position: relative;
      width: 100%;
      background-color: black;
      
      video {
      	padding: 10px;
      	width: 100%;
      	-webkit-box-sizing: border-box;
      					box-sizing: border-box;
				vertical-align: top;
      }

      .max-pause {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 45px;
        height: 60px;
        width: 60px;
        color: #99a2aa;
        border: 1px solid #99a2aa;
        border-radius: 100%;
				margin: -30px 0 0 -30px;
				
				&:before {
          position: absolute;
          padding-top: 7px;
        }
        
				&.icon-v-play{
        	transition: .5s  ease-out;

        	&:before{
        		padding-left: 12px;
        	}
        }

        &.icon-v-pause{
        	transition: .3s  ease-out;
        	opacity:0; 
        	
        	&:before{
        		padding-left: 7px;
        	}
        }
      }
    }

    .danmu {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
    }

    .x-loading {
      position: absolute;
      top: 0;
      left:0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.95);
      z-index: 10;

      p {
        position: absolute;
        width: 100%;
        text-align: center;
        color: #99a2aa;
        top: 50%;
      }

      i {
        position: absolute;
        font-size: 60px;
        width: 100px;
        height: 100px;
        top: 50%;
        left: 50%;
        margin-left: -50px;
        margin-top: -100px;
        color: #99a2aa;
        animation: turn 1s linear infinite;
          &:before {
            position: absolute;
            top: 18px;
            padding-left: 20.5px;
          }
      }
    }

    .c-video {
      height: 40px;
      border: 1px solid #e5e9ef;
      user-select: none;
      color: #6d757a;
      background-color: white;
      transition: transform 0.5s ease-out;
      .play {
        float: left;
        height: 100%;
        color: #99a2aa;
        i {
          font-size: 28px;
          cursor: pointer;
          
          &.icon-v-play{
          	margin-top: 1px;
          	display: inline-block;
          }
        }

        &:before {
          left: -10px!important;
        }

        &:hover {
          background-color: #e5e9ef;

          i {
            color: #6d757a;
          }
        }
      }

      .line {
        position: relative;
        float: left;
        height: 100%;
        width: calc(100% - 350px);
        cursor: pointer;
        user-select: none;

        .go-time {
        	display: none;
          position: absolute;
          top: -26px;
          background-color: #a3a3a3;
          padding: 2px 4px;
          border-radius: 5px;
          font-size: 14px;
          z-index: 5;
          margin-left: -15px;
          color: white;
        }

        .line-to {
          position: absolute;
          width: 0;
          height: 6px;
          top: 18px;
          border-radius: 10px;
          background-color: #e7e7e7;
          transition: all 0.05s linear;
        }

        .line-bg {
          width: 100%;
          z-index: 1;
        }

        .line-load {
          z-index: 2;
          background-color: #8adceb;
        }

        .line-now {
          z-index: 3;
          background-color: #00aed6;
        }

        @at-root.line-point {
          position: absolute;
          top: 14px;
          margin-left: -6px;
          width: 12px;
          height: 12px;
          background-color: white;
          border-radius: 10px;
          border: 1px solid #8adceb;
          z-index: 4;
          transition: all 0.05s linear;
          cursor: pointer;
        }
      }

      .show-time {
        float: left;
        width: 100px;
        font-size: 14px;
        padding-left: 8px;
        line-height: 40px;
        text-align: center;
      }

      .right-c {
        float: right;
        width: 200px;

        .c-item {
          width: 20%;
        }
      }

      .c-item {
        position: relative;
        float: left;
        width: 40px;
        padding: 0;
        text-align: center;
        font-size: 13px;
        line-height: 40px;
        cursor: pointer;
        overflow: hidden;

        i {
          font-size: 20px;
        }

        &:before {
          display: none;
          position: absolute;
          top: -33px;
          left: -20px;
          width: 60px;
          padding: 0 6px;
          line-height: 30px;
          text-align: center;
          color: #d9d9d9;
          border-radius: 5px;
          background-color: rgba(0, 0, 0, 0.8);
          content: attr(data-msg);
          animation: fadeIn 0.2s ease-out 1;
        }
			
				.definitionNow{
					position: relative;
					z-index: 9;
					background: #fff;
				}
        .definitionNow:hover,li:hover {
          background-color: #e5e9ef;
          &:before {
            display: block;
          }
        }
        
        ul{
        	position: absolute;
        	background: #fff;
        	width: 100%;
        	top:40px;
        	left:0;
					

        	li{
        		line-height: 40px;
        	}
        }
        
        &.active{
        	overflow: initial;
        	ul{
						top:initial;
						bottom:40px;
        	}
        }
      }

      .v-volume {
        i:before {
          margin-top: 3px;
          margin-left: 3px;
        }
        
        &.active{
        	overflow: initial;
        }
        .volumeLine{
        	width: 4px;
        	padding: 0 18px;
        	height: 130px;
        	position: absolute;
        	left:0;
        	bottom:42px;
        	background: #fff;
        	text-align: center;
        	
        	.volumeBox{
        		width: 4px;
        		position: absolute;
        		top:20px;
        		bottom:10px;
						background: rgba(0,0,0,.7);
						
						.line-point{
							margin:-6px 0 0 -7px;
							border: 1px solid #555;
						}
        	}
        }
      }
      .c-dan {
        i {
          font-size: 22px;
        }
      }

      .f-screen {
        &:before {
          left: -30px;
        }
      }
    }
	}
	
	.fade-in {
    animation: scaleIn 0.3s ease-out 1;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes scaleIn {
    0% {
      opacity: 0;
      transform: scale3d(2, 2, 2);
    }
    100% {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
  }

  @keyframes turn {
    0% {
      transform: rotate3d(0, 0, 0, 180deg);
    }
    100% {
      transform: rotate3d(0, 0,  4, 180deg);
    }
  }

  @media screen and (max-width: 1200px) {
    .v-video {
      .c-video {
        .line {
        }
        .show-time {
        }
      }
    }
  }

  @media screen and (max-width: 700px) {
    .v-video {
      .x-loading {
        i, p{
          top: 70%;
        }
      }
    }
  }
</style>
