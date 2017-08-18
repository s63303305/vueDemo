<template>
	<div class="container">
		<leftMenu></leftMenu>
		<Loading :loading="loading"></Loading>
		<div class='story-page clearBoth'>
			<div  class='story-list'>
				<a  v-for='item in types' :class='{active : item.type == type}' @click='tap_type($event,item.type,item.name)' >{{item.name}}</a>
			</div>
			<div id='story-cont' v-show='show'>
				<StoreDetail :items='datas' :type='type'></StoreDetail>
				<Pagenation :allPages="allPages" :current="current" :type="type"></Pagenation>
			</div>
		</div>
	</div>
</template>

<script>
	import leftMenu from "../components/LeftMenu.vue"
	import StoreDetail from "../components/StoreDetail.vue"
	import Loading from "../components/Loading.vue"
	import Pagenation from "../components/Pagenation.vue"
	
	export default {
		name:'about',
		data(){
			return {
				loading:true,
				show:false,
				url: 'https://route.showapi.com/955-1?&showapi_appid=43362',
				type:'dp',
				allPages:0,
				key:'ef446c64ca1a4de2b78bca843395474d',
				page:1,
				types:[
					{
			          name: '短篇',
			          type: 'dp'
			        },
			        {
			          name: '长篇',
			          type: 'cp'
			        },
			        {
			          name: '校园',
			          type: 'xy'
			        },
			        {
			          name: '医院',
			          type: 'yy'
			        },
			        {
			          name: '家里',
			          type: 'jl'
			        },
			        {
			          name: '民间',
			          type: 'mj'
			        },
			        {
			          name: '灵异',
			          type: 'ly'
			        },
			        {
			          name: '原创',
			          type: 'yc'
			        },
			        {
			          name: '内涵',
			          type: 'neihanguigushi'
			        }
				],
				datas:[
					{title:'',desc:''}
				]
			}
		},
		computed:{
			current () {
		      return this.$route.query.page ? this.$route.query.page : 1
		    }
		},
		watch: {
		    current () {
		      this.loading = true;
		      this.tap();
		    }
		},
	  	components:{leftMenu,Loading,StoreDetail,Pagenation},
	  	methods:{
	  		tap(){
	  			this.$http.get(this.url + '&showapi_sign=' + this.key + '&page=' + this.current + '&type=' + this.type).then((data) => {
		        	this.loading = false;
		        	if(data.body.showapi_res_body.pagebean){
		        		this.show = true;
			        	this.datas = data.body.showapi_res_body.pagebean.contentlist;
			        	this.allPages = data.body.showapi_res_body.pagebean.allPages ? data.body.showapi_res_body.pagebean.allPages : 0;
			        	window.scroll(0, 0);
		        	}else{
		        		console.log('请稍后重试')
		        	}
		        	
			    }, (response) => {
			        this.loading = false ;
			        console.error('请求失败！');
			    })
	  		},
	  		tap_type(event,type,names){
				if(type != this.type){
					this.$router.push({ 
						path:'/story',
						query:{type:type,names:names}
					})
					this.$router.go(1);
					this.type = type ;
	  				this.tap();
	  				this.loading = true;
				}
	  		}
	  	},
	  	mounted(){
	  		if (this.$route.query.type) {
		      this.type = this.$route.query.type
		   	}
		    this.tap();
	  	}
	}
</script>

<style  lang='scss' scoped>
	#story-cont{
		padding: 20px;
	}
	
	.story-list{
		padding:0 10px;
		
		a{
			display: inline-block;
			padding: 0 10px;
			line-height: 30px;
			cursor: pointer;

			&:hover,&.active{
				color:#e78170;
			}
		}
	}
	
	
</style>