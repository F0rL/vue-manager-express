<template>
  <div class="home">
    <div class="container">
      <h1 class="title">在线后台</h1>
      <p class="lead">改善提高,永无止境</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home'
}
</script>

<style lang="scss" scoped>
  .home {
    width: 100%;
    height: 100%;
    // background: url(../assets/home-bg.jpg) no-repeat;
    > .container {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      text-align: center;
      color: #ccc;
      > .title {
        font-size: 40px;
      }
      > .lead {
        margin-top: 40px;
        font-size: 22px;
      }
    }
  }
</style>
