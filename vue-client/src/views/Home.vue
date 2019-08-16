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
    height: 100%;
    margin-left: 180px;
    background: url(../assets/bg.jpg) no-repeat;
    background-size: 100% 100%;
    > .container {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      text-align: center;
      color: #ccc;
      > .title {
        padding-top: 40vh;
        font-size: 40px;
      }
      > .lead {
        margin-top: 40px;
        font-size: 22px;
      }
    }
  }
</style>
