<template>
  <el-container style="height: 100vh; ">

    <el-aside width="200px" height='100vh' style="background-color: rgb(255, 255, 255)">
      <el-menu router :default-openeds="['1']" unique-opened :default-active="$route.path" >

        <el-sub-menu index="1">
          <template #title>
            <el-icon><message /></el-icon>内容管理
          </template>
          
          <el-menu-item-group>
            <template #title>分类</template>
            <!-- <el-menu-item index="/categories/create">新建分类</el-menu-item> -->
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <template #title>物品</template>
            <!-- <el-menu-item index="/items/create">新建物品</el-menu-item> -->
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group title="英雄">
            <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group title="文章">
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
          
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon><icon-menu /></el-icon>运营管理
          </template>
          <el-menu-item-group>
            <template #title>广告位</template>
            <el-menu-item index="/ads/create">新建广告位</el-menu-item>
            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <el-icon><setting /></el-icon>系统设置
          </template>

          <el-menu-item-group title="管理员">
            <!-- <el-menu-item index="/admin_users/create">管理员新建</el-menu-item> -->
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>

        </el-sub-menu>
      </el-menu>
    </el-aside>

    <el-container style="border-left: 1px solid #eee">
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <el-icon style="margin-right: 15px"><setting /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.push('/login')">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>Tom</span>
      </el-header>

      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Message, Menu, Setting } from '@element-plus/icons'

export default defineComponent({
  components: {
    Message,
    Setting,
    'icon-menu': Menu,
  },
  setup() {
    const item = {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    }

    const tableData = ref(Array(20).fill(item))

    return {
      tableData,
    }
  },
})
</script>

<style scoped>
.el-header {
  background-color: #b0c0d4;
  color: var(--el-text-color-primary);
  line-height: 60px;
}
.el-menu {
  border: none !important
}

.el-main{
  padding: 20px 40px !important;
}
.el-aside {
  color: var(--el-text-color-primary);
}
</style>
