<template>
  <div class="notfound">
    <img src="../assets/404.png" alt="">
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'not-found'
}
</script>

<style lang="scss" scoped>
  .notfound {
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    > img {
      width: 100%;
    }
  }
</style>
