<template>
  <div class="wraper">
		<leftMenu></leftMenu>
		<Loading></Loading>
    <div class="content">
      <Loading :loading="loading"></Loading>
      <div class="show-tag story-tag">
        <div class="tag-item">
            <router-link :to="{path: '/story', query: {type: type, page: page}}">鬼故事</router-link>
        </div>
        <div class="tag-item">
          <a>→</a>
        </div>
        <div class="tag-item">
            <a>{{ name }}</a>
        </div>
      </div>
      <div class="show-story" v-html="detail"></div>
      <div class="more-story" v-show="nowPage < allPages && !mloading" @click="more">加载下一页</div>
    </div>
  </div>
</template>

<script>
import leftMenu from "../components/LeftMenu.vue"
import Loading from "../components/Loading.vue"
export default {
		name:'detail',
	  data () {
	    return {
	    	id: '',
	      url: 'https://route.showapi.com/955-2?showapi_appid=43362',
	      detail: '',
	      key:'ef446c64ca1a4de2b78bca843395474d',
	      type: 'dp',
	      typeName:'',
	      name:'',
	      nowPage: 1,
	      allPages: 1,
	      loading: true,
	      mloading: false,
	      page:1
	    }
	  },
	  components: {
	    leftMenu,Loading
	  },
	  methods: {
	    start () {
	      this.$http.get(this.url + '&showapi_sign=' + this.key + '&id=' + this.id + '&page=' + this.nowPage).then((response) => {
	        // 处理数据
	        this.loading = false;
	        this.clear(response.body.showapi_res_body.text);
	        this.page = response.body.showapi_res_body.currentPage;
	        this.allPages = response.body.showapi_res_body.allPages;  
	        this.mloading = false;
	      }, (response) => {
	        console.error('请求失败！');
	        this.loading = false;
	        this.mloading = false;
	      })
	    },
	    clear (data) {
	      var a = '';
	      a = data.replace('neirong336();', '');
	      a = a.replace(/&nbsp;&nbsp;&nbsp;/g, '<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
	      this.detail += a;
	    },
	    more () {
	      if (!this.mloading) {
	        this.mloading = true;
	        this.nowPage += 1;
	        this.start();
	      }
	    }
	  },
	  mounted () {
	  	if (this.$route.query.type) {
	      this.type = this.$route.query.type;
	   	}
	  	this.name = this.$route.query.name;
	    this.id = this.$route.query.id;
	    this.start();
	  }
}
</script>

<style lang="scss" scoped>
	.content {
    margin-bottom: 30px;
    padding-left: 250px;
  }
  .show-story {
    margin: auto;
    width: 80%;
    color: #8d6e63;
    box-shadow: 0 0 15px 0 #CCC;
    background: #F6F4EC;
    border-radius: 3px;
    padding: 0 20px;
    padding-bottom: 40px;
    font: 17px/3 "Microsoft YaHei";
  }

  .story-tag {
    width: 81%;
    margin: auto;
    margin-top: 10px;

    .tag-item {
			  display: inline-block;
    		margin: 10px;
    		margin-bottom: 20px;
      &:first-child {
        margin-left: 0;
      }

      a {
        background: #F6F4EC;
        box-shadow: 0 0 15px 0 #CCC;
        color: #8d6e63;
        border-color: #8d6e63;
        position: relative;
		    padding: 10px 20px;
		    border: 1px solid #d9d9d9;
		    -webkit-border-radius: 20px;
		    border-radius: 20px;
		    -webkit-box-sizing: border-box;
		    box-sizing: border-box;
		    font-size: 15px;
		    line-height: 1.5;
      }
    }
  }
	
  .more-story {
    margin: 0 auto 30px auto;
    padding: 0 20px;
    width: 80%;
    text-align: center;
    background: #8d6e63;
    color: white;
    line-height: 35px;
    cursor: pointer;
    user-select: none;
  }

	@media screen and (max-width: 1000px) {
    .content{
    	padding-left: 0;
    }
  }

</style>
