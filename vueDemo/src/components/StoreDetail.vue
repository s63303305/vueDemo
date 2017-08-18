<template>
	<div class='storeDetail clearBoth'>
		<div class="store_detail" v-for='item in items'>
		    <router-link :to="{path:'/story/detail', query :{id:item.id,type:type,name:item.title}}"  class=' item-list-cont clearBoth'>
	    		<div class='fl-l'>
	    			<img  :src="item.img" />
	    		</div>
	    		<div class='fl-r'>
	    			<div class='tit' title='item.title'>{{item.title}}</div><p title='item.desc'>{{item.desc}}</p>
	    		</div>
		    </router-link>
		</div>
	</div>
</template>

<script>
export default {
	name:'store_detail',
 	props: ['items','type']
}
</script>

<style lang="scss" scoped>
  	.store_detail{
		display: inline-block;
		width: 31%;
		height: 140px;
		overflow: hidden;
		padding: 10px;
		margin: 0 1% 20px;
		background-color: #fff;
   		border: 1px solid #eee;
   		-webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 60px rgba(0, 0, 0, 0.06) inset;
   				box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset;
		box-sizing: border-box;
			-webkit-box-sizing: border-box;
			
		.fl-l{
			width: 35%;
		}
		.fl-r{
			width: 65%;
			padding-left:10px;
			box-sizing: border-box;
			-webkit-box-sizing: border-box;
			
			.tit{
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				color:#62bbc3;
			}
			p{
				color:#666;
				word-break: break-all;
				text-align: justify;
				font-size: 12px;
				max-height: 130px;
				overflow: hidden;
			}
		}
	}
	
	@media  screen and (max-width:1500px ) {
		.storeDetail {
			display: flex;
			flex-wrap: wrap;
		}
	    .store_detail{
	    	width: 48%;
	    	height: auto;
	    }
	}
	
	@media  screen and (max-width:650px ) {
	    .store_detail{
	    	width: 100%;
	    	margin: 0 0 20px;
	    }
	}
</style>
