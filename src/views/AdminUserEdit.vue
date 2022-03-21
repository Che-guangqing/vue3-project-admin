<template>
     <el-dialog
      destroy-on-close
      v-model="dialogVisible"
      :title="id ? '修改' : '添加' "
      width="30%"
      center
      @close="closeDialog()"
    >

      <el-form ref="validateForm" :model="model" label-width="70px"  :rules="rules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="model.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="text" v-model="model.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button size="small" @click="closeDialog">Cancel</el-button>
            <el-button type="primary" size="small" @click="submitForm">Confirm</el-button>
          </el-form-item>
      </el-form>
    </el-dialog>

</template>

<script>
import { onMounted, ref, reactive, toRefs } from 'vue'
import { findAdminUser, editAdminUsers, addAdminUsers } from '@/api/apis/AdminUsers'
import { ElMessage } from 'element-plus'

export default {
  props: {
    dialogVisible: Boolean,
    id: String
  },
  emits: ['onCloseDialog'],

  setup(props, { emit }) {
    const validateForm = ref()

    const state = reactive({
      model: {},
      dialogVisible: props.dialogVisible,
    })

    onMounted(() => {
      props.id && fetch();
    })

    const rules = {
      username: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
      ],
      password: [
        { required: true, message: 'Please input Activity password', trigger: 'blur' },
      ]
    }

    const closeDialog = () => {
      emit('onCloseDialog', false)
    }

    const submitForm =  () => {
      validateForm.value.validate(valid => {
        if(valid) {
          if(props.id) {
            // 编辑
            editAdminUsers(props.id, state.model).then(res => {
                ElMessage(
                  { type: 'success',   message: '编辑成功~',}
                )
            })
          } else {
            // 添加
            addAdminUsers(state.model).then(res => {
                ElMessage(
                  { type: 'success',   message: '添加成功~',}
                )
            })
          }
          closeDialog()
        } else {
          console.log('验证失败');
        }
      })
    }

    // 详情数据
    const fetch = async () => {
      const res = await findAdminUser(props.id);
      state.model = res;
      // console.log(state.model, '详情数据');
    }

    return {
      ...toRefs(state),
      submitForm,
      rules,
      validateForm,
      closeDialog
    }
  },
}
</script>

<style scoped lang='scss'>

</style>