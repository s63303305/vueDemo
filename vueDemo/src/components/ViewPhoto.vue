<template>
  <div class="view-photo" :class="{'bg-show': open, 'bg-hidden': !open}" v-if="first">
    <div class="x-show" >
      <div class="view-loading" v-show="loading">
					<Loading></Loading>
      </div>
      <img
        v-show="!loading"
        class="show-img"
        :src="now.url"
        :alt="now.text"
        :style="{
          'margin-left': -left + 'px',
          'margin-top': -top + 'px',
          'opacity': opacity
          }"
         ref="showImg" />
       <div class="view-close" @click="exit">
         <i class="iconfont icon-close"></i>
       </div>
      <span class="size" :class="{'show-size': showSize}">{{(this.size * 100).toFixed(0) + '%'}}</span>
      <span class="msg" :class="{'show-msg': showMsg}">{{ message }}</span>
      <div class="view-control">
        <div class="show-control">
          <span class="v-pre" @click="pre"><i class="iconfont icon-pre"></i></span>
          <span class="v-next" @click="next"><i class="iconfont icon-next"></i></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../components/Loading'

export default {
  data: function () {
    return {
      loading: true,
      now: {
        url: '',
        text: ''
      },
      nowId: -1,
      lists: [],
      opacity: 0,
      left: 0,
      top: 0,
      open: false,
      first: false,
      x: 0,
      y: 0,
      reallyWidth: 0,
      reallyHeight: 0,
      size: 1,
      showSize: false,
      setSize: '',
      message: '',
      showMsg: '',
      setMsg: ''
    }
  },
  props: {
    el: {
      type: String,
      required: true
    }
  },
  watch: {
    open () {
      if (this.open) {
//      document.body.style.overflow = 'hidden';
      } else {
        setTimeout(() => {
          this.now.url = '';
          this.nowId = -1;
//        document.body.style.overflow = 'auto';
        }, 600)
      }
    },
    loading () {
      if (!this.loading) {
        this.$nextTick(() => {
          this.showImg()
        })
      }
    },
    nowId () {
      if (this.nowId >= 0) {
        this.loading = true
        this.now.url = this.lists[this.nowId].url
        this.now.text = this.lists[this.nowId].text
      }
    },
    showSize () {
      if (this.showSize) {
        clearInterval(this.setSize)
        this.setSize = setTimeout(() => {
          this.showSize = false
        }, 1500)
      }
    },
    showMsg () {
      if (this.showMsg) {
        clearInterval(this.setMsg)
        this.setmsg = setTimeout(() => {
          this.showMsg = false
          this.message = ''
        }, 1500)
      }
    }
  },
	components: {
	    Loading
	},
  methods: {
    // 退出
    exit () {
      this.open = false;
    },
    // 图片布局
    showImg () {
      var screenH = document.documentElement.clientHeight;
      var screenW = document.documentElement.clientWidth;
      var img = this.$refs.showImg;
      img.style.height = 'auto';
      img.style.width = 'auto';
      
      if ((screenH - 100) < img.height) { //图片高度大于显示高度
        if (screenW - 50 < img.width) { //图片宽度大于显示宽度
          this.size = (screenW - 300) / img.width;
          this.size = parseFloat(this.size.toFixed(2));
          img.style.width = screenW - 300 + 'px';
        } else {
          this.size = (screenH - 200) / img.height;
          this.size = parseFloat(this.size.toFixed(2));
          img.style.height = screenH - 200 + 'px';
        }
      } else {
      	if (screenW - 100 < img.width) { //图片宽度大于显示宽度
          this.size = (screenW - 100) / img.width;
          this.size = parseFloat(this.size.toFixed(2));
          img.style.width = screenW - 100 + 'px';
       	}
      }
      this.$nextTick(() => {
        this.opacity = 1;
        this.top = img.height / 2;
        this.left = img.width / 2;
        img.style.top = '50%';
        img.style.left = '50%';
      })
    },

    leave () {
      window.removeEventListener('mousemove', this.move);
      window.removeEventListener('touchmove', this.move);
      window.removeEventListener('mouseup', this.leave);
      window.removeEventListener('touchend', this.leave);
    },
    // 下一张
    next () {
      if (this.nowId < this.lists.length - 1) {
        this.nowId += 1;
      } else {
        this.end();
      }
    },

    pre () {
      if (this.nowId > 0) {
        this.nowId -= 1;
      } else {
        this.showMsg = true;
        this.message = '已经是第一张了, 向后点击看看!';
      }
    },

    end () {
      this.showMsg = true;
      this.message = '后面没有了哟!';
    }
  },
  mounted () {
    document.querySelector(this.el).addEventListener('click', (e) => {
      if (e.target.nodeName === 'IMG') {
        if (!this.first) {
          this.first = true;
          this.$nextTick(() => {
            this.$refs.showImg.onload = () => {
              // 图片加载成功后布局
              this.loading = false;
            }
          })
        }
        this.open = true;
        this.now.url = e.target.getAttribute('data-max');
        this.opacity = 0;
        var lists = Array.prototype.slice.apply(document.querySelectorAll(this.el + ' img'));
        this.lists = lists.map((item, index) => {
          if (this.now.url === item.getAttribute('data-max')) {
            this.nowId = index;
          }
          return (
          {
            src: item.src,
            url: item.getAttribute('data-max'),  
          }
          )
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .m-loading {
    color: #fff;
  }

  .view-photo {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 2017;
    background-color: rgba(0,0,0,.5);
    overflow: hidden;

    .x-show {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;

      .view-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -50px;
      }

      img.show-img {
        position: absolute;
        cursor: -webkit-grab;
        user-select: none;
        top: 50%;
        left: 50%;
      }

      .view-close {
        position: absolute;
        top:20px;
        right:30px;
        cursor: pointer;
        border-radius: 50%;
          i {
            font-size: 30px;
            color: white;
          }
      }

      .view-control {
        position: absolute;
        width: 100%;
        height: 60px;
        bottom: 0;
        background-color: rgba(0,0,0,.5);

        .show-control {
          width: 200px;
          margin: auto;
          display: flex;

          span {
            width: 100px;
            text-align: center;
            cursor: pointer;

            i {
              color: rgba(255, 255, 255, .8);
              font-size: 25px;
              line-height: 60px;
              transition: color .3s ease-out;
            }
          }

          span:hover i {
            color: rgba(255, 255, 255, 1)
          }
        }
      }

      .size {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -60px;
        margin-left: -17.5px;
        width: 80px;
        font-size: 14px;
        line-height: 35px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        background: rgba(0, 0, 0,  0.3);
        text-align: center;
        border-radius: 20px;
        color: white;
        visibility: hidden;
        opacity: 0;
      }

      .show-size {
        opacity: 1;
        visibility: visible;
      }

      .msg {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -60px;
        margin-left: -117.5px;
        width: 200px;
        font-size: 14px;
        line-height: 35px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        background: rgba(0, 0, 0,  0.3);
        text-align: center;
        border-radius: 20px;
        padding: 0 15px;
        color: white;
        visibility: hidden;
        opacity: 0;
        z-index: 10;
      }

      .show-msg {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  .model-open {
    zoom: 1;
    position: fixed;
    width: 100%;
    top: 0;
  }

  .bg-show {
    animation: vfadeIn 0.3s ease-out 1;

    img.show-img {
      visibility: hidden;
      animation: vscaleIn 0.3s ease-out 1;
      animation-fill-mode: forwards;
    }
  }

  .bg-hidden {
    animation: vfadeOut 0.3s ease-out 0.3s 1;
    animation-fill-mode: forwards;

    img.show-img {
      animation: vscaleOut 0.3s ease-out 1;
      animation-fill-mode: forwards;
    }
  }



  @keyframes vfadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes vfadeOut {
    0% {
      opacity: 1;
    }

    100% {
      visibility: hidden;
      opacity: 0;
    }
  }

  @keyframes vscaleIn {
    0% {
      visibility: visible;
      transform: scale3d(0, 0, 0);
    }

    100% {
      visibility: visible;
      transform: scale3d(1, 1, 1);
    }
  }

  @keyframes vscaleOut {
    0% {
      transform: scale3d(1, 1, 1);
    }

    100% {
      visibility: hidden;
      transform: scale3d(0, 0, 0);
    }
  }

  @media screen and (max-width: 1000px) {
    .view-photo {
      top: 50px;
      height: calc(100vh - 50px);

      .m-loading {
        margin-left: 0;
      }
    }
  }
  
  @font-face {font-family: "iconfont";
	  src: url('//at.alicdn.com/t/font_6j0cuk14qwd0a4i.eot?t=1490172160757'); /* IE9*/
	  src: url('//at.alicdn.com/t/font_6j0cuk14qwd0a4i.eot?t=1490172160757#iefix') format('embedded-opentype'), /* IE6-IE8 */
	  url('//at.alicdn.com/t/font_6j0cuk14qwd0a4i.woff?t=1490172160757') format('woff'), /* chrome, firefox */
	  url('//at.alicdn.com/t/font_6j0cuk14qwd0a4i.ttf?t=1490172160757') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
	  url('//at.alicdn.com/t/font_6j0cuk14qwd0a4i.svg?t=1490172160757#iconfont') format('svg'); /* iOS 4.1- */
	}
	
	.iconfont {
	  font-family:"iconfont" !important;
	  font-size:16px;
	  font-style:normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-close:before { content: "\e652"; }
	
	.icon-pre:before { content: "\e638"; }
	
	.icon-next:before { content: "\e63b"; }
</style>
