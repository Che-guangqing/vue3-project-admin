<template>
    <el-dialog
      destroy-on-close
      v-model="dialogVisible"
      :title="id ? '修改' : '添加' "
      width="30%"
      center
      @close="closeDialog()"
    >
      <el-form ref="validateForm" :model="formData" label-width="60px" :rules="rules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-upload
            class="avatar-uploader"
            action='http://localhost:3000/admin/api/upload'
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="formData.icon" :src="formData.icon" class="avatar" />
            <el-icon v-else class="el-icon-plus avatar-uploader-icon"><plus /></el-icon>

          </el-upload>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button size="small" @click="closeDialog">Cancel</el-button>
          <el-button type="primary" size="small" @click="submitForm">Confirm</el-button>
        </span>
      </template>

    </el-dialog>

</template>

<script>

import { onMounted, reactive,  ref,  toRefs } from 'vue'
import { Plus  } from '@element-plus/icons'
import { ElMessage } from 'element-plus'
import { findItem, addItems, editItems } from '@/api/apis/Items'


export default  {
  components: {
    Plus,
  },

  props: {
    dialogVisible: Boolean,
    id: String
  },
  
  emits: ['onCloseDialog'],

  setup(props, { emit }) {

    const validateForm = ref()

    const state = reactive({
      formData: {},
      dialogVisible: props.dialogVisible,
    })

    // const formData = reactive({})
    // formData = res

    onMounted(() => {
      props.id && fetch()
    })

    const rules = {
      name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
      ]
    }

    const closeDialog = () => {
      emit('onCloseDialog', false)
    }

    const handleAvatarSuccess = (res, file) => {
      // this.$set(state.formData,'icon',res.url)
      state.formData.icon = res.url
    }

    const beforeAvatarUpload = (file) => {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        ElMessage.error('Avatar picture must be JPG format!')
      }
      if (!isLt2M) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
      }
      return isJPG && isLt2M
    }

    // 获取详情数据 
    fetch = async () => {
      const res = await findItem(props.id);
      state.formData = res
    }

    const submitForm =  () => {
      validateForm.value.validate(valid => {
        if(valid) {
          if(props.id) {
            // 编辑
            editItems(props.id, state.formData).then(res => {
                ElMessage(
                  { type: 'success',   message: '编辑成功~',}
                )
            })
          } else {
            // 添加
            addItems(state.formData).then(res => {
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

    return {
      ...toRefs(state),
      closeDialog,
      submitForm,
      handleAvatarSuccess,
      beforeAvatarUpload,
      rules,
      validateForm,
    }
  },
}
</script>

<style scoped lang='scss'>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar-uploader-icon svg {
  margin-top: 74px; /* (178px - 28px) / 2 - 1px */
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.dialog-footer{
  display: flex;
  justify-content: flex-end;
}
</style>