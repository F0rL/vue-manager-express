<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <h1 class="title">在线后台管理系统</h1>
      </div>
      <el-form
        :model="registerUser"
        status-icon
        :rules="rules"
        ref="registerForm"
        class="registerForm"
        label-width="auto"
      >
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="registerUser.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱"
        >
          <el-input v-model="registerUser.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="registerUser.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="registerUser.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择身份" prop="checkPass">
          <el-select v-model="registerUser.identity" placeholder="请选择">
            <el-option label="管理员" value="manager"></el-option>
            <el-option label="员工" value="employee"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
          <el-button @click="resetForm('registerForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      callback()
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerUser.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerUser.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        email: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        name: [
          { validator: checkName, required: true, trigger: "blur" },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        pass: [
          { validator: validatePass, trigger: "blur", required: true },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur", required: true }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../public/css/responsive.scss";

.register {
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
  }
}
</style>
