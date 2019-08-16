<template>
  <div class="index">
    <head-nav></head-nav>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import HeadNav from '@/components/HeadNav.vue' 
export default {
  name: 'index',
  components: {
    HeadNav
  }
}
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
}  
</style>
