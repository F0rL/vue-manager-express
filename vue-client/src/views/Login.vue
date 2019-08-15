<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <h1 class="title">在线后台管理系统</h1>
      </div>
      <el-form
        :model="loginUser"
        status-icon
        :rules="rules"
        ref="loginForm"
        class="loginForm"
        label-width="auto"
      >
        <el-form-item
          prop="email"
          label="邮箱"
        >
          <el-input v-model="loginUser.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginUser.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="tiparea">
        <p>还没有账号？现在<router-link to="/register">注册</router-link></p>
      </div>
    </section>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginUser: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur", },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      //console.log(this.registerUser)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$request.post('/api/users/login', this.loginUser)
            .then(res => {
              this.$message({
                message: '账号登录成功',
                type: 'success'
              })
              //将token存储到localStorage
              const { token } = res.data;
              localStorage.setItem('eleToken', token)
              //解析token
              const decoded = jwt_decode(token)
              console.log(decoded)
              //存储到vuex
              this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded))
              this.$store.dispatch('setUser', decoded)

              this.$router.push('/index')
            })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/responsive.scss";

.login {
  position: relative;
  height: 100%;
  width: 100%;
  background: rgb(0, 185, 255);
  background: linear-gradient(
    180deg,
    rgba(0, 185, 255, 1) 0%,
    rgba(159, 198, 195, 0.7567401960784313) 72%,
    rgba(0, 255, 222, 1) 100%
  );
  > .form_container {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    @include pc {
      width: 370px;
    }
    @include phone {
      width: 60vw;
    }
    background-color: #fff;
    padding: 20px;
    font-size: 20px;
    border-radius: 8px;
    > .manage_tip {
      > .title {
        text-align: center;
        font-weight: bold;
        color: #ccc;
        margin-bottom: 20px;
      }
    }
    > .submit_btn {
      width: 100%;
    }
    > .tiparea {
      text-align: right;
      font-size: 12px;
      color: #333;
       p a {
        color: #409eff;
      }
    }
  }
}
</style>
