<template>
  <div class="index">
    <head-nav></head-nav>
    <div class="container">
      <left-menu></left-menu>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HeadNav from '@/components/HeadNav.vue'
import LeftMenu from '../components/LeftMenu.vue'

export default {
  name: 'index',
  components: {
    HeadNav,
    LeftMenu
  }
}
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  > .container {
    flex: 1;
  }
}  
</style>
