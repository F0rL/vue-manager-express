<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <h1 class="title">在线后台管理系统</h1>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'register'
}
</script>

<style lang="scss" scoped>
  @import '../../public/css/responsive.scss';

  .register {
    position: relative;
    height: 100%;
    width: 100%;
    background: rgb(0,185,255);
    background: linear-gradient(180deg, rgba(0,185,255,1) 0%, rgba(159,198,195,0.7567401960784313) 72%, rgba(0,255,222,1) 100%);
    > .form_container {
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      @include pc {
        width: 370px;
        height: 210px;
      };
      @include phone {
        width: 80vw;
        height: 60vw;
      }
      > .manage_tip {
        > .title {
          text-align: center;
          font-weight: bold;
          font-size: 26px;
          color: #fff;
        }
      }
    }
  }
</style>
