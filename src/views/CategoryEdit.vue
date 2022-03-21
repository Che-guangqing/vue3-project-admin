<template>
    <el-dialog
      destroy-on-close
      v-model="dialogVisible"
      :title="id ? '修改' : '添加' "
      width="30%"
      center
      @close="closeDialog()"
    >
      <el-form ref="validateForm" :model="formData" label-width="80px" :rules='rules' >
        <el-form-item label="上级分类" prop="parent">
          <el-select v-model="formData.parent" placeholder="请选择上级分类" >
            <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name"></el-input>
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

import { reactive,  ref,  toRefs, onMounted } from 'vue'
import { Plus  } from '@element-plus/icons'
import { ElMessage } from 'element-plus'
import { getCategories, findCategorie, addCategories, editCategories } from '@/api/apis/Categories'


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
      dialogVisible: props.dialogVisible,
      formData: {},
      parents: []
    })

    onMounted(() => {
      props.id && fetch()
    })

    const rules = {
      name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 2, max: 5, message: 'Length should be 2 to 5', trigger: 'blur' },
      ]
    }

    const closeDialog = () => {
      emit('onCloseDialog', false)
    }

    onMounted(() => {
      fetchParents()
    })

    const fetchParents = async() => {
      const res = await getCategories();
      state.parents = res;
    }


    // 获取详情数据 
    fetch = async () => {
      const res = await findCategorie(props.id);
      state.formData = res
    }

    const submitForm =  () => {
      validateForm.value.validate(valid => {
        if(valid) {
          if(props.id) {
            // 编辑
            editCategories(props.id, state.formData).then(res => {
              if(res._id) {
                ElMessage({
                  type: 'success',
                  message: '编辑成功~',
                })
                closeDialog()
              }
            })
          } else {
            // 添加
            addCategories(state.formData).then(res => {
              if(res._id) {
                ElMessage({
                  type: 'success',
                  message: '添加成功~',
                })
                closeDialog()
              }
            })
          }

        } else {
          console.log('验证失败');
        }
      })
    }

    return {
      ...toRefs(state),
      closeDialog,
      submitForm,
      rules,
      validateForm
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