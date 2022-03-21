
<template>
    <div class="item-top">
      <h4>管理员列表</h4>
      <div><el-button size="small" type="primary" @click="handleAdd()">添加管理员</el-button></div>
    </div>
    
    <el-table :data="items" style="width: 100%" v-loading = "loading">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row._id)">编辑</el-button>
          <el-button type="text"  @click="handleDel(scope.row._id)" style="color: red" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <AdminUserEdit v-if="dialogVisible" :dialogVisible='dialogVisible' :id='rowId' @onCloseDialog='onCloseDialog' />

</template>

<script>

// P12

import { onMounted, reactive, toRefs } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getAdminUsers, delAdminUsers } from '@/api/apis/AdminUsers'
import AdminUserEdit from './AdminUserEdit.vue'

export default {

  components: {
    AdminUserEdit,
  },

  setup() {
    const state = reactive({
      items: [],
      rowId: '',
      dialogVisible: false,
      loading: false
    })

    onMounted(() => {
      fetch()
    })

    const fetch = async() => {
      const res = await getAdminUsers();
      state.loading = false
      state.items = res;
    }

    const handleDel = (id) => {
      ElMessageBox.confirm(
        `是否要删除管理员`,
        '删除',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      ).then(async () => {
         const res = await delAdminUsers(id);
         if(res.success) {
            ElMessage({
              type: 'success',
              message: '删除成功~',
            })
            fetch();
         }
      }).catch(() => {
          ElMessage({
            type: 'info',
            message: '取消删除！',
          })
      })
    }

    const handleEdit = (id) => {
      state.dialogVisible = true
      state.rowId = id
    }

    const handleAdd = () => {
      state.dialogVisible = true
      state.rowId = ''
    }

    const onCloseDialog = (val) => {
      state.dialogVisible = val
      fetch()
    }

    return {
      ...toRefs(state),
      onCloseDialog,
      handleDel,
      handleEdit,
      handleAdd
    }
  }
}
</script>

<style scoped lang='scss'>
.item-top{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>