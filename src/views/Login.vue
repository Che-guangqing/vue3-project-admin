
<template>
  <div class="login-body">
    <el-card header="请先登陆" class="login-card">
        <div class="head">
          <img  src="../assets/logo.png" />
          <div class="tips">Vue3.0 后台管理系统</div>
        </div>
        <el-form label-position="top" :rules="rules" :model="model" ref="loginForm" class="login-form">
          <el-form-item label="账号" prop="username">
            <el-input type="text" v-model.trim="model.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model.trim="model.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary" @click="submit">登陆</el-button>
          </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { reactive, toRefs, ref } from 'vue';
import { useRouter } from 'vue-router'
import { loginFn } from '@/api/apis/AdminUsers'

export default {

  setup() {
    const loginForm = ref(null)
    const state = reactive({
      model:{},
      rules: {
        username: [
          { required: 'true', message: '账户不能为空', trigger: 'blur' }
        ],
        password: [
          { required: 'true', message: '密码不能为空', trigger: 'blur' }
        ]
      }
    })
    let router = useRouter();

    const submit =  () => {
      loginForm.value.validate( async (valid) => {
        if (valid) {
          const res = await loginFn(state.model)
          if(res) {
            // // 把返回的token存入localStorage
            localStorage.token = res.token
            console.log(res)
            router.push('/')
            ElMessage({
              type:'success',
              message:'登陆成功'
            })
          }
        } else {
          console.log('error submit!!')
          return false;
        }
      })


    }
    return {
      ...toRefs(state),
      submit,
      loginForm
    }
  }

};
</script>
<style scoped>
  .login-body {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .head {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    padding: 10px 20px;
  }

  .head .tips {
    font-size: 12px;
    color: #999;
    margin-left: 10px;
    transform: translateY(-10px);
  }
  .login-form {
    width: 80%;
    margin: 0 auto;
  }
  .el-button{
    margin-top: 25px;
  }
</style>
