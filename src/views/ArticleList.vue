<template>
    <div class="item-top">
      <h4>文章列表</h4>
    </div>

    <el-table :data="items" style="width: 100%" v-loading = "loading">
      <el-table-column prop="_id" label="ID" width="230" />
      <el-table-column prop="title" label="文章标题" />
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button type="text"  @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text"  @click="handleDel(scope.row._id)" style="color: red" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getArticles, delArticles } from '@/api/apis/Articles'

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
      const res = await getArticles();
      state.loading = false
      state.items = res;
    }

    const handleDel = (id) => {
      ElMessageBox.confirm(
        `是否要删除文章`,
        '删除',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      ).then(async () => {
         const res = await delArticles(id);

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
  },
}
</script>

<style scoped lang='scss'>

</style>