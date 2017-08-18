<template>
  <div class="wraper">
		<leftmenu></leftmenu>
    <div class="content">这个页面好像还没有哟！</div>
  </div>
</template>

<script>
import leftMenu from "../components/LeftMenu.vue"
export default {
	name:'err',
  data () {
    return {
    }
  },
  components: {
		leftMenu
  }
}
</script>

<style lang="scss">
</style>
