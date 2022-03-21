
<template>
    
    <div class="item-top">
      <h4>物品列表</h4>
      <div><el-button size="small" type="primary" @click="handleAdd()">添加物品</el-button></div>
    </div>

    <el-table :data="items" style="width: 100%" v-loading = "loading">
      <el-table-column label="ID" prop="_id"  />
      <el-table-column label="物品名称" prop="name"  />
      <el-table-column label="图标" prop="icon">
        <template  #default="scope">
          <img :src="scope.row.icon" style="height :3rem" alt />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button type="text"  @click="handleEdit(scope.row._id)">编辑</el-button>
          <el-button type="text"  @click="handleDel(scope.row)" style="color: red" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ItemEdit v-if="dialogVisible" :dialogVisible='dialogVisible' :id='rowId' @onCloseDialog='onCloseDialog' />

</template>

<script>


import { onMounted, reactive, toRefs } from 'vue'
import ItemEdit from './ItemEdit'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getItems, delItems } from '@/api/apis/Items'

export default {

  components: {
    ItemEdit,
  },

  setup() {

    const state = reactive({
      items: [],
      rowId: '',
      dialogVisible: false,
      loading: true
    })

    onMounted(() => {
      fetch()
    })

    const fetch = async() => {
      const res = await getItems();
      state.loading = false
      state.items = res;
    }

    const handleDel = (val) => {
      ElMessageBox.confirm(
        `是否要删除物品：${val.name}`,
        '删除',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      ).then(async () => {
         const res = await delItems(val._id);

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