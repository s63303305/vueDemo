<template>
  <div class="container">
  	<leftMenu></leftMenu>
    <Loading :loading="loading"></Loading>
    <div class="content">
      <div class="m-title"><h3>豆瓣电影Top250</h3></div>
      <div class="m-list">
        <div class="m-item" v-for="(item, $index) in moviceList" :data-id="item.id" @click="showDetail(item.id, $index)">
          <img :src="item.images.large" :alt="item.images.alt" class="m-img" />
          <div class="m-top">
            <p>{{ item.title }}</p>
          </div>
          <div class="m-bottom">
            <p>当前排名: {{ $index + 1 }}</p>
            <p>评分: {{ item.rating.average }}</p>
            <p>导演: <span v-for="d in item.directors" :data-id="d.id"> {{ d.name }} </span></p>
            <p>主演: <span v-for="a in item.casts" :data-id="a.id"> {{ a.name }}<span>,</span></span></p>
            <p>原名: {{ item.original_title }}</p>
            <p>看过人数: {{ item.collect_count }}</p>
            <p>类型: <span v-for="g in item.genres">{{ g }}, </span></p>
            <p>年代: {{ item.year }}</p>
          </div>
        </div>
      </div>
    </div>
    <button class="add-more btn" @click="goMore()" v-if="this.moviceList.length >= 20 && this.moviceList.length <= 250 && this.add === false">点击加载更多....</i></button>
    <button class="add-more btn disabled" v-else>加载中<i class="iconfont icon-loading i-loading"></i></button>
    <div class="movie-bg" v-show="detailIn" ref="content">
      <div class="movie-pos" @click.self="detailIn = false">
        <div class="movie-detail">
          <div class="movie-header">
            <i class="iconfont icon-close" @click="detailIn = false"></i>
            <h4>电影详情</h4>
          </div>
          <div class="movie-body" v-show="dLoading" style="text-align: center; padding-top: 50px;">
            加载中..
          </div>
          <div class="movie-body"  v-show="!dLoading">
            <h1 class="title">{{ details.title }} <span v-show="details.title !== details.original_title">({{ details.original_title }})</span></h1>
            <div class="m-left">
              <img :src="details.images.large">
            </div>
            <div class="m-right">
              <P>别名: <span v-for="item in details.aka">{{ item }} </span></p>
              <p>排名: <span>{{ now + 1 }}</span></p>
              <P>导演: <span v-for="item in details.directors">{{ item.name }} </span></p>
              <P>主演: <span v-for="item in details.casts">{{ item.name }} </span></p>
              <p>上映时间: <span>{{ details.year }} 年</span></p>
              <p>评分: <span>{{ details.rating.average }} 分</span></p>
              <p>短评: <span>{{ details.comments_count }} 条</span><a class="btn" :href="details.alt + 'comments?status=P'" target="_blank">查看短评</a></p>
              <p>影评: <span>{{ details.reviews_count }} 条</span><a class="btn" :href="details.alt + '/reviews'" target="_blank">查看影评</a</p>
              <p>收藏人数: <span>{{ details.collect_count }} 人</span></p>
              <p>看过人数: <span>{{ details.comments_count }} 人</span></p>
              <p>想看人数: <span>{{ details.wish_count }} 人</span></p>
              <p>打分人数: <span>{{ details.ratings_count }} 人</span></p>
              <p>简介: <span>{{ details.summary }}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import leftMenu from "../components/LeftMenu.vue"
import Loading from '../components/Loading'

export default {
	name:'movies',
  data () {
    return {
			loading: true,
    	url: 'https://api.douban.com/v2/movie/top250?start=',
      url2: 'https://api.douban.com/v2/movie/subject/',
      moviceList:[],
      dLoading: true,
      add: false,
    	start: 0,
    	count: '&count=',
      now: 0,
      movies: {},
      detailIn: false,
      detailId: 0,
      details: {
        title: '',
        original_title: '',
        rating: {
          average: 0
        },
        images: {
          large: ''
        },
        aka: [],
        comments_count: 0,
        collect_count: 0,
        ratings_count: 0,
        reviews_count: 0,
        wish_count: 0,
        alt: '',
        year: 0,
        summary: '',
        directors: [],
        casts: [],
        countries: []
      }	
    }
  },
  computed: {
    key () {
      return this.$store.state.key
    }
  },
  components: {leftMenu,Loading},
  watch: {
    detailIn () {
      this.$refs.content.scrollTop = 0
      var body = document.querySelector('body')
      if (this.detailIn) {
        body.style.top = -(document.body.scrollTop) + 'px'
        body.classList.add('model-open')
      } else {
        body.classList.remove('model-open')
        var top = body.style.top
        top = top.replace('px', '')
        document.body.scrollTop = -top
        body.style.top = 0
      }
    }
  },
  methods: {
		showMovies(){
			this.$http.jsonp(this.url+this.start+this.count).then(function(response){
				this.loading = false;
				var arr = response.body.subjects;
				for(var i=0 ; i< arr.length ; i++){
					this.moviceList.push(arr[i])
				}
				this.add = false;
				console.log(11111)
				window.localStorage.setItem('movies', JSON.stringify({
          	date: (Date.parse(new Date())),
          	start: this.moviceList.length + arr.length,
          	moviceList: this.moviceList.concat(arr)
        }))
				
			},function(error){
				this.loading = false;
				console.log('请求失败!');
			})
		},
		detail () {
      this.$http.jsonp(this.url2 + this.detailId).then((response) => {
        this.details = response.body;
        this.dLoading = false;
      }, (response) => {
        console.log('请求失败!');
      })
    },
		showDetail (id, index) {
      this.detailIn = true;
      this.detailId = id;
      this.dLoading = true;
      this.now = index;
      this.detail();
   },
   goMore(){
   		this.add = true;
   		this.start += 20;
   		this.showMovies();
   }
  },
  mounted () {
  	 // 读取本地数据
    var local = window.localStorage.getItem('movies');
    var data = JSON.parse(local);
    var date = Date.parse(new Date());
    if (data) {
      if (data.moviceList.length >= 20 && (date - data.date) / (24 * 3600000) <= 5 && data.start > 0) {
        this.loading = false;
        this.moviceList = data.moviceList;
        this.start = data.start;
      } else {
        this.showMovies();
        window.localStorage.removeItem('movies');
      }
    } else {
      this.showMovies();
    }
  }
}
</script>

<style lang="scss" >
.model-open{
		zoom: 1;
    position: fixed;
    width: 100%;
    top: 0;
}
.btn {
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c0ccda;
    color: #1f2d3d;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #50bfff;
    border-color: #50bfff;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;

    &:hover {
      opacity: 0.8
    }
  }

  button.disabled {
    cursor: not-allowed;
  }

  i.i-loading {
    position: absolute;
    padding: -2px;
    -webkit-animation: loading 2s linear infinite;
    animation: loading 2s linear infinite;
  }

  @-webkit-keyframes loading {
    0% {
      -webkit-transform: rotate3d(0, 0, 0, 360deg);
    }

    100% {
      -webkit-transform: rotate3d(0, 0, 1, 360deg);
    }
  }

  @keyframes loading {
    0% {
      -webkit-transform: rotate3d(0, 0, 0, 360deg);
              transform: rotate3d(0, 0, 0, 360deg);
    }

    100% {
      -webkit-transform: rotate3d(0, 0, 1, 360deg);
              transform: rotate3d(0, 0, 1, 360deg);
    }
  }

  .m-title {
    width: 100%;
    padding-left: 30px;
    height: 100px;
    background-color: #e3ebec;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;

    h3 {
      font-size: 35px;
      font-weight: bold;
      color: #37a;
      letter-spacing: 1px;
      line-height: 100px;
    }
  }

  .m-list {
    position: relative;
    width: 1320px;
    margin: auto;

    .m-item {
      position: relative;
      display: inline-block;
      width: 300px;
      height: 444px;
      margin: 40px 0 0 30px;
      overflow: hidden;
      cursor: pointer;
      animation: show-m .5s ease-out 1;
      -webkit-box-sizing: border-box;
      				box-sizing: border-box;

      @keyframes show-m {
        0% {
          opacity: 0;
        }

        100% {
          opacity: 1;
        }
      }

        .m-img {
          width: 100%;
          height: 100%;
          -webkit-transform: scale(1.04);
                  transform: scale(1.04);
          -webkit-transfrom: scale(1.04);
          -moz-webkit-transfrom: scale(1.04)
        }

        .m-top {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 40px;
          background-color: rgba(0, 0, 0, 0.4);

          p {
            text-align: center;
            line-height: 40px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.9);
          }
        }

        .m-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 10px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          background-color: rgba(0, 0, 0, 0.6);
          -webkit-transform: translate3d(0, 110px, 0);
          transform: translate3d(0, 110px, 0);
          -webkit-transition: 0.3s all ease-out;
          transition: 0.3s all ease-out;
          opacity: 0.8;

          p {
            width: 95%;
            line-height: 26px;
            margin: 0;
            color:#fff;
          }
        }

        &:hover {
          .m-bottom {
            opacity: 1;
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }
        }
     }
  }

  .add-more {
    display: block;
    margin: 10px auto 50px auto;
    width: 200px;
    cursor: pointer;
  }


  @media screen and (max-width: 1600px) {
    .m-list {
      width: 990px;
    }
  }

  @media screen and (max-width: 1300px) {
    .m-list {
      width: 700px;
      .m-item{
      	margin:40px 25px 0;
      }
    }
  }

  @media screen and (max-width: 850px) {
    .m-list {
      width: 100%;

      .m-item {
        display: block;
        margin: 20px auto;

        .m-bottom {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          -moz-transform: translate3d(0, 0, 0);
        }
      }
    }
  }

  @media screen and (max-width: 320px) {
    .m-title {
      h3 {
        font-size: 25px;
      }
    }
    .m-list {
      .m-item {
        display: block;
        width: 260px;
        height: 350px;
        margin: 20px auto;
      }
    }
  }
</style>
