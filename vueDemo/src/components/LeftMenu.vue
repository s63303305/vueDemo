<template>
  <div id="navMenu" :class='{active : active}'>
  	<div class='nav_menu' >
  		<i class="iconfont icon-menu"  @click='show_menu'></i>
  		<a class='text-center'>username</a>
  	</div>
  	<div class='left_menu' >
  		<div class='user-info'>
	  		<a href="">
	  			<img src="../assets/images/photo.jpg" alt="" />
	  			<p class='text-center'>username</p>
	  		</a>
	  	</div>
			<ul class='menu-list'>
				<li v-for = 'item in $store.state.menus'>
					<router-link :to='item.name'>
						<i class="iconfont "  :class='item.icon' ></i> <span>{{item.text}}</span>
					</router-link>
				</li>
			</ul>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'navMenu',
  data(){
  	return{
  		active : false
  	}
  },
  methods:{
  	show_menu(){
  		this.active = !this.active;
  	}
  }
}

</script>

<style scoped lang='scss'>
	@import "../assets/css/static.scss";
	
	.user-info{
		padding: 40px 0 20px 45px;
		a{
			display:block;
			width:140px;
			
			img{
				width:140px;
				height: 140px;
				border-radius: 50%;
				transition: .6s;
				-webkit-transition: transform 6s ease-out;
        transition: transform 6s ease-out;
				
				&:hover{
					 -webkit-transform: rotate3d(0, 0, 1, 360deg);
                  transform: rotate3d(0, 0, 1, 360deg);
				}
			}
			
			p{
				color:$gray9;
				font-size: 18px;
				margin-top: 10px;
			}
		}
	}

	#navMenu{
		width: 0;
		height: 100%;
		position: fixed;
		left:0;
		top:0;
		z-index: 9;
	}
	.menu-list a{
		display: block;
		height: 45px;
		line-height: 45px;
		color:$gray9;
		padding-left: 45px;
		transition: .5s;
		-webkit-transition: .5s ease-out;
	
		.iconfont{
			display: inline-block;
			margin-right: 20px;
			
		}
		
		&.router-link-active{
				color: rgba(255, 255, 255, 0.9);
    		background-color: rgba(0, 0, 0, 0.2);
    		
    		&:hover{
    			margin-left: 0;
    		}
		}
		
		&:hover{
			color:#fff;
			margin-left: -5px;
		}
	}
	.nav_menu{
		display: none;
		line-height: 50px;
		background: #000;
		position: fixed;
		left:0;
		top:0;
		z-index: 2;
		width: 100%;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;

		 .iconfont{
		 	color:#fff;
		 	font-size: 22px;
		 	position: absolute;
		 	left:20px;
		 	cursor: pointer;
		 	top:0;
		 }
		 
		 a{
		 	color:#fff;
		 	display: block;
		 }
	}
	.left_menu{
		width: 250px; 
		height: 100%;
		background:#202020;
	}
	
	@media  screen and (max-width:1000px ) {
		.container{
			padding-left: 0;
		}
		.nav_menu{
			display: block;
		}
		.left_menu{
			opacity: .99;
			transform: translate3d(-250px, 0, 0);
			transition: .5s;
		}
		
		#navMenu.active{
			.left_menu{
				transform: translate3d(0, 0, 0);
			}	
		}
		
		.user-info{
			padding-top: 100px;
		}
	}
</style>
