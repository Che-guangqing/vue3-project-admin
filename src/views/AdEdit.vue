<template>
    <div class="item-top">
      <h4>{{id ? '编辑' : '新建'}}广告位</h4>
    </div>

    <el-form :model="model" label-width="120px" @submit.native.prevent="save">
        <el-form-item label="名称" prop='name'>
          <el-input v-model="model.name"></el-input>
        </el-form-item>

        <el-form-item label="广告" prop='items'>
          <el-button size="small" @click="model.items.push({})">
            <i class="el-icon-plus"></i> 添加广告
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="24" v-for="(item,i) in model.items" :key="i">
              <el-form-item label="跳转链接(URL)" prop='url'>
                <el-input v-model="item.url"></el-input>
              </el-form-item>
              <el-form-item label="图片" style="margin-top:0.5rem" prop='image'>
                <el-upload
                  class="avatar-uploader"
                  action='http://localhost:3000/admin/api/upload'
                  :show-file-list="false"
                  :on-success="res => item.image = res.url"
                >
                  <img v-if="item.image" :src="item.image" class="avatar" />
                  <el-icon v-else class="el-icon-plus avatar-uploader-icon"><plus /></el-icon>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="model.items.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item style="margin-top: 10rem">
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
    </el-form>

</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { findAd, editAds, addAds } from '@/api/apis/Ads'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus  } from '@element-plus/icons'

export default {
  props: {
    id: String
  },
  components: {
    Plus,
  },
  setup(props) {
    const state = reactive({
      model: {
        items: []
      },
    })
    let router = useRouter();

    onMounted(() => {
      props.id && fetch();
    })

    const save = async () => {
      let res;
      if (props.id) {
        res = await editAds(props.id, state.model);
      } else {
        res = await addAds(state.model);
      }
      router.push('/ads/list')
      ElMessage({
        type: "success",
        message: "保存成功",
      });
    }

    // 详情数据
    const fetch = async () => {
      const res = await findAd(props.id);
      state.model = res;
      // console.log(state.model, '详情数据');
    }

    return {
      ...toRefs(state),
      save
    }
  },
}
</script>

<style scoped lang='scss'>

</style>