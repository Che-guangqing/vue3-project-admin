<template>
    <div class="item-top">
      <h4>{{ id ? "编辑" : "新建" }}文章</h4>
    </div>
    <el-form :model="model" label-width="120px" @submit.native.prevent="save">
        <el-form-item label="所属分类" prop="categories">
          <el-select v-model="model.categories" multiple placeholder="请选择分类" >
            <el-option
              v-for="item in categories"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="model.title"></el-input>
        </el-form-item>
        <el-form-item label="详情" prop="body">
          <QuillEditor theme='snow' ref="editorRef"  />
        </el-form-item>

        <el-form-item style="margin-top: 10rem">
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
    </el-form>

</template>

<script>
// npm install @vueup/vue-quill@beta --save
import { QuillEditor } from '@vueup/vue-quill'
import WangEditor from 'wangeditor'

import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { reactive, onMounted, toRefs, ref} from 'vue'
import { getCategories } from '@/api/apis/Categories'
import { addArticles, findArticle, editArticles } from '@/api/apis/Articles'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'


export default {
  props: {
    id: String
  },
  components: {
    QuillEditor,
    WangEditor
  },

  setup(props) {

    const editorRef = ref()
    const state = reactive({
      model: {},
      categories: []
    })

    let router = useRouter();

    onMounted(() => {
      fetchCategories()
      props.id && fetch();
    })

    const save = async () => {
      let res;
      // 富文本编辑器赋值
      state.model.body = editorRef.value.getText().replace(/(\r\n|\n|\r)/gm, '<br />') !== '<br />' ?  editorRef.value.getHTML() : ''
      if (props.id) {
        res = await editArticles(props.id, state.model);
      } else {
        res = await addArticles(state.model);
      }
      console.log(state.model);
      router.push('/articles/list')
      ElMessage({
        type: "success",
        message: "保存成功",
      });
    }

    // 详情数据
    const fetch = async () => {
      const res = await findArticle(props.id);
      state.model = res;
      state.model.body = editorRef.value.setHTML(res.body)

      // console.log(state.model, '详情数据');
    }

    // 分类数据
    const fetchCategories = async () => {
      const res = await getCategories();
      state.categories = res;
      // console.log(res, '分类数据');
    }


    return {
      ...toRefs(state),
      editorRef,
      save
    }
    
  },
}
</script>

<style scoped lang='scss'>

</style>