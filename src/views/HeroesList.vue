
<template>
    
    <div class="item-top">
      <h4>英雄列表</h4>
    </div>

    <el-table :data="items" style="width: 100%" v-loading = "loading">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="title" label="英雄称号"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template #default="scope">
          <img :src="scope.row.avatar" style="height :3rem" alt />
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scope">
          <el-button type="text"  @click="$router.push(`/heroes/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text"  @click="handleDel(scope.row)" style="color: red" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

</template>

<script>

// P12

import { onMounted, reactive, toRefs } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getHeroes, delHeroes } from '@/api/apis/Heroes'

export default {


  setup() {

    const state = reactive({
      items: [],
      loading: true
    })

    onMounted(() => {
      fetch()
    })

    const fetch = async() => {
      const res = await getHeroes();
      state.loading = false
      state.items = res;
    }


    const handleDel = (val) => {
      ElMessageBox.confirm(
        `是否要删除英雄：${val.name}`,
        '删除',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      ).then(async () => {
         const res = await delHeroes(val._id);

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

    return {
      ...toRefs(state),
      handleDel,
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