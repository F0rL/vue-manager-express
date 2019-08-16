<template>
  <div class="head-nav">
    <el-row>
      <el-col :span="12" class="logo-container">
        <img class="logo" src="@/assets/logo.png" alt />
        <span class="title">在线后台管理系统</span>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <img class="avatar" :src="user.avatar" alt />
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.name}}</p>
          </div>
          <span class="username">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "head-nav",
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "info":
          this.showInfoList();
          break;
        case "logout":
          this.logout()
          break;
      }
    },
    showInfoList() {
      this.$router.push('/info')
    },
    logout() {
      //清除token
      localStorage.removeItem('eleToken')
      //设置vuex
      this.$store.dispatch('clearCurrentState')
      //跳转
      this.$router.push('/login')
    }
  },

};
</script>

<style lang="scss" scoped>
.head-nav {
  height: 60px;
  background-color: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
  overflow: hidden;
  .logo-container {
    line-height: 60px;
    margin-left: 20px;
    .logo {
      height: 50px;
      width: 50px;
      margin-right: 5px;
      vertical-align: middle;
      display: inline-block;
    }
    .title {
      vertical-align: middle;
      font-size: 22px;
      font-family: "Microsoft YaHei";
      letter-spacing: 3px;
    }
  }
  .user {
    line-height: 60px;
    text-align: right;
    float: right;
    padding-right: 20px;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
      display: inline-block;
    }
    .welcome {
      display: inline-block;
      width: auto;
      vertical-align: middle;
      padding: 0 5px;
      .name {
        line-height: 20px;
        text-align: center;
        font-size: 14px;
      }
      .comename {
        font-size: 12px;
      }
      .avatarname {
        color: #409eff;
        font-weight: bolder;
      }
    }
    .username {
      cursor: pointer;
      margin-right: 5px;
    }
    .el-dropdown {
      color: #fff;
    }
  }
}
</style>
