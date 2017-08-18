<template>
	<div class="container" >
		<leftMenu></leftMenu>
		<div  @click='info_show' style='width:100%;height:100%;'>
			<div class='about-cont animated' :class='{fadeInUp : about_cont , fadeOutDown : !about_cont}' >
				<div class='show_cont ' >
					<div class='cont-bg'><img src="../assets/images/108940.jpg" alt="" /></div>
					<div class='cont-info'>
						<h3>叩首为梦 码梦为生</h3>
						<div class='text'>
							<p>从明天起, 做一个幸福的人, 喂马, 劈柴, 周游世界 </p>
							<p>一个人有两个我，一个在黑暗中醒着，一个在光明中睡着。</p>
							<p>若我会见到你，事隔经年。我如何向你招呼，以眼泪，以沉默。</p>
						</div>
					</div>
				</div>
			</div>
		</div>		
	</div>
</template>

<script>
	import leftMenu from "../components/LeftMenu.vue"
	
	export default {
		name:'about',
		data(){
			return {
				about_cont : true 
			}
		},
	  	components:{leftMenu},
	  	methods:{
	  		info_show(){
	  			this.about_cont = !this.about_cont;
	  		}
	  	}
	}
</script>

<style scoped lang='scss' >
	body{
		overflow-y: none;
	}
	.container{
	    background-image: url('../assets/images/center.jpg');
	    padding-left: 250px;
	    position: fixed;
	    background-position: 50%;
	    background-repeat: no-repeat;
	    background-size: cover;
	}
	.about-cont{
		width: 620px;
		height: 540px;
		border-radius: 10px;
		overflow: hidden;
		background: #fff; 
		position: absolute;
		left:50%;
		top:50%;
		margin-left: 125px;
		opacity: .9;
		
		.cont-bg{
			height: 65%;
			overflow: hidden;
			
			img{
				width: 100%;
				height: 100%;
			}
		}
		.cont-info{
			height: 35%;
			text-align: center;
			
			h3{
				font-size: 25px;
			    font-weight: bold;
			    line-height: 50px;
			    text-align: center;
			    margin-top: 25px;
			}
		}
		
		.show_cont{
			height: 100%;
			
			&.close_cont{
				opacity: 0;
				-webkit-opacity: 0;
			}
		}
	}
	@media  screen and (max-width:1000px ) {
	    .about-cont{
	    	margin-left: 0;
	    	width: 70%;
	    	height: auto;
	    	.cont-info{
	    		padding: 0 20px 20px;
	    		
	    		h3{
	    			font-size: 20px;
	    			line-height: 30px;
	    			margin: 10px 0;
	    		}
	    	}
	    }
	}
</style>