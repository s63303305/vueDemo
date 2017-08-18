<template>
	<div class="container" >
		<leftMenu></leftMenu>
		<div class='videoBox'>
			<p style='font-size: 16px;padding-bottom: 10px;'>视频UI自设置</p>
			<VideoUI></VideoUI>
		</div>
		
	</div>
</template>

<script>
	import leftMenu from "../components/LeftMenu.vue"
	import VideoUI from "../components/VideoUI.vue"
	export default {
		name:'video',
		data(){
			return {
				
			}
		},
	  	components:{leftMenu,VideoUI},
	  	methods:{
	  		
	  	}
	}
</script>

<style scoped lang='scss' >
	.videoBox{
		width: 800px;
		padding-top: 8%;
		margin: auto;
	}
	@media only screen and (max-width: 1200px)  {
		.videoBox{
			width: 80%;
		}
	}
</style>