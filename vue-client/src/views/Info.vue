<template>
  <div class="info">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="user">
          <img :src="user.avatar" class="avatar">
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <div class="user-item">
            <icon-base icon-name="icon-user" width="28" height="28">
              <icon-user />
            </icon-base>
            <span>{{user.name}}</span>
          </div>
          <div class="user-item">
            <icon-base icon-name="icon-user" width="28" height="28">
              <user-folder />
            </icon-base>
            <span>{{user.identity === 'identity' ? '员工' : '管理员'}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import IconBase from "@/components/IconBase.vue";
import IconUser from "@/components/icon/IconUser.vue";
import UserFolder from "@/components/icon/UserFolder.vue";

export default {
  name: "info",
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  components: {
    IconBase,
    IconUser,
    UserFolder
  }
}
</script>

<style lang="scss" scoped>
.info {
  height: 100%;
  .row-bg {
    width: 100%;
    height: 100%;
    .user {
      text-align: center;
      position: relative;
      top: 30%;
      img {
        width: 150px;
        border-radius: 50%;
      }
      span {
        display: block;
        text-align: center;
        margin-top: 20px;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  .userinfo {
    height: 100%;
    background-color: #eee;
    .user-item {
      display: flex;
      align-items: center;
      position: relative;
      top: 30%;
      padding: 26px;
      font-size: 28px;
      color: #333;
      span {
        margin-left: 10px;
      }
    }
  }
}

.user .userinfo {
  height: 100%;
  background-color: #eee;
}

</style>
