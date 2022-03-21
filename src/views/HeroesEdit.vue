<template>
    <div class="item-top">
      <h4>{{ id ? "编辑" : "新建" }}英雄</h4>
    </div>

    <el-form :model="model" label-width="120px" @submit.native.prevent="save">

      <el-tabs v-model="defaultCard" type="border-card">
         
         <el-tab-pane label="基础信息" name="basic">
            <el-form-item label="名称">
              <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="称号">
              <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
              <el-upload
                class="avatar-uploader"
                action='http://localhost:3000/admin/api/upload'
                :show-file-list="false"
                :on-success="res => model.avatar = res.url"
              >
                <img v-if="model.avatar" :src="model.avatar" class="avatar" />
                <el-icon v-else class="el-icon-plus avatar-uploader-icon"><plus /></el-icon>
              </el-upload>
            </el-form-item>

            <el-form-item label="Banner">
              <el-upload
                class="avatar-uploader"
                action='http://localhost:3000/admin/api/upload'
                :show-file-list="false"
                :on-success="res => model.banner = res.url"
              >
                <img v-if="model.banner" :src="model.banner" class="avatar" />
                <el-icon v-else class="el-icon-plus avatar-uploader-icon"><plus /></el-icon>
              </el-upload>
            </el-form-item>

            <el-form-item label="类型">
              <el-select v-model="model.categories" multiple placeholder="请选择分类" >
                <el-option
                  v-for="item in categories"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="难度">
              <el-rate
                style="margin-top: 0.6rem"
                :max="9"
                show-score
                v-model="model.scores.difficult"
              ></el-rate>
            </el-form-item>
            <el-form-item label="技能">
              <el-rate
                style="margin-top: 0.6rem"
                :max="9"
                show-score
                v-model="model.scores.skills"
              ></el-rate>
            </el-form-item>
            <el-form-item label="攻击">
              <el-rate
                style="margin-top: 0.6rem"
                :max="9"
                show-score
                v-model="model.scores.attack"
              ></el-rate>
            </el-form-item>
            <el-form-item label="生存">
              <el-rate
                style="margin-top: 0.6rem"
                :max="9"
                show-score
                v-model="model.scores.survive"
              ></el-rate>
            </el-form-item>

            <el-form-item label="顺风出装">
              <el-select v-model="model.items1" multiple placeholder="请选择出装" >
                <el-option
                  v-for="item in items"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="逆风出装" >
              <el-select v-model="model.items2" multiple placeholder="请选择出装">
                <el-option
                  v-for="item in items"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="召唤师技能" >
              <el-select v-model="model.callSkills" multiple placeholder="请选择技能">
                <el-option
                  v-for="item in items"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="使用技巧">
              <el-input type="textarea" v-model="model.usegeTips"></el-input>
            </el-form-item>
            <el-form-item label="对抗技巧">
              <el-input type="textarea" v-model="model.battleTips"></el-input>
            </el-form-item>
            <el-form-item label="团战思路">
              <el-input type="textarea" v-model="model.teamTips"></el-input>
            </el-form-item>
         </el-tab-pane>

         <el-tab-pane label="技能" name="skills">
            <el-button size="small" @click="model.skills.push({})">
              <i class="el-icon-plus"></i> 添加技能
            </el-button>
            <el-row type="flex" style="flex-wrap: wrap">
              <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
                <br>
                <el-form-item label="名称">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                  <el-upload
                    class="avatar-uploader"
                     action='http://localhost:3000/admin/api/upload'
                    :show-file-list="false"
                    :on-success="(res) => $set(item, 'icon', res.url)"
                  >
                    <img v-if="item.icon" :src="item.icon" class="avatar" />
                    <el-icon v-else class="el-icon-plus avatar-uploader-icon"><plus /></el-icon>
                  </el-upload>
                  <el-radio v-model="item.isMajor" label="1">主升</el-radio>
                  <el-radio v-model="item.isMajor" label="2">次升</el-radio>
                  <el-radio v-model="item.isMajor" label="3">都不是</el-radio>
                </el-form-item>
                <el-form-item label="冷却值">
                  <el-input v-model="item.delay"></el-input>
                </el-form-item>
                <el-form-item label="消耗">
                  <el-input v-model="item.cost"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input v-model="item.description" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="小提示">
                  <el-input v-model="item.tips"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="danger"
                    size="small"
                    @click="model.skills.splice(i, 1)"
                    >删除</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
         </el-tab-pane>
         
         <el-tab-pane label="最佳搭档" name="partners">
            <el-button size="small" @click="model.partners.push({})">
              <i class="el-icon-plus"></i> 添加英雄
            </el-button>
            <el-row type="flex" style="flex-wrap: wrap">
              <el-col :md="12" v-for="(item, i) in model.partners" :key="i">
                <br>
                <el-form-item label="英雄">
                  <el-select filterable v-model="item.hero" placeholder="请选择英雄">
                    <el-option
                      v-for="hero in heroes"
                      :key="hero._id"
                      :value="hero._id"
                      :label="hero.name"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="描述">
                  <el-input v-model="item.description" type="textarea" rows='4'></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button
                    type="danger"
                    size="small"
                    @click="model.partners.splice(i, 1)"
                    >删除</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
         </el-tab-pane>

         <el-tab-pane label="被谁克制" name="byWhoControl">
            <el-button size="small" @click="model.byWhoControl.push({})">
              <i class="el-icon-plus"></i> 添加英雄
            </el-button>
            <el-row type="flex" style="flex-wrap: wrap">
              <el-col :md="12" v-for="(item, i) in model.byWhoControl" :key="i">
                <br>
                <el-form-item label="英雄">
                  <el-select filterable v-model="item.hero" placeholder="请选择英雄">
                    <el-option
                      v-for="hero in heroes"
                      :key="hero._id"
                      :value="hero._id"
                      :label="hero.name"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="描述">
                  <el-input v-model="item.description" type="textarea" rows='3'></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button
                    type="danger"
                    size="small"
                    @click="model.partners.splice(i, 1)"
                    >删除</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
         </el-tab-pane>

         <el-tab-pane label="克制谁" name="controlWho">
            <el-button size="small" @click="model.controlWho.push({})">
              <i class="el-icon-plus"></i> 添加英雄
            </el-button>
            <el-row type="flex" style="flex-wrap: wrap">
              <el-col :md="12" v-for="(item, i) in model.controlWho" :key="i">
                <br>
                <el-form-item label="英雄">
                  <el-select filterable v-model="item.hero" placeholder="请选择英雄">
                    <el-option
                      v-for="hero in heroes"
                      :key="hero._id"
                      :value="hero._id"
                      :label="hero.name"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="描述">
                  <el-input v-model="item.description" type="textarea" rows='5'></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button
                    type="danger"
                    size="small"
                    @click="model.partners.splice(i, 1)"
                    >删除</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
         </el-tab-pane>

         <el-tab-pane label="皮肤" name="skins">
            <el-button size="small" @click="model.skin.push({})" >
              <i class="el-icon-plus"></i> 添加皮肤
            </el-button>
            <el-row type="flex" style="flex-wrap: wrap">
              <el-col :md="6" v-for="(item, i) in model.skin" :key="i">
                <br>
                <el-form-item label="名称">
                    <el-input v-model="item.name" type="text"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                  <el-upload
                    class="avatar-uploader"
                    action='http://localhost:3000/admin/api/upload'
                    :show-file-list="false"
                    :on-success="res => item.img = res.url"
                  >
                    <img v-if="item.img" :src="item.img" class="img-skin" />
                    <el-icon v-else class="el-icon-plus avatar-uploader-icon"><plus /></el-icon>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="danger"
                    size="small"
                    @click="model.skin.splice(i, 1)"
                    >删除</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
         </el-tab-pane>

      </el-tabs>

      <el-form-item style="margin-top: 1rem">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { getHeroes, addHeroes, findHeroe, editHeroes } from '@/api/apis/Heroes'
import { getCategories } from '@/api/apis/Categories'
import { getItems } from '@/api/apis/Items'
import { useRouter } from 'vue-router'
import { Plus  } from '@element-plus/icons'

import { ElMessage } from 'element-plus'


export default {

  props: {
    id: String,
  },
  components: {
    Plus,
  },
  setup(props) {
    const defaultCard = ref('basic')
    const state = reactive({
      model: {
        banner: "",
        skills: [],
        partners: [],
        controlWho: [],
        byWhoControl: [],
        skin: [],
        name: "",
        avatar: "",
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 6,
        },
        usegeTips: "",
        battleTips: "",
        teamTips: "",
      },
      categories: [],
      items: [],
      heroes: [],
    })
    let router = useRouter();
    console.log(router);


    onMounted(() => {
      fetchItems();
      fetchCategories();
      fetchHeroes();
      props.id && fetch();
    })

    const save = async () => {
      let res;
      if (props.id) {
        // 修改
        res = await editHeroes(props.id, state.model);
      } else {
        // 新增
        res = await addHeroes(state.model);
      }
      router.push('/heroes/list')
      ElMessage({
        type: "success",
        message: "保存成功",
      });
    }

    // 详情数据
    const fetch = async () => {
      const res = await findHeroe(props.id);
      state.model = Object.assign({}, state.model, res);
      // console.log(state.model, '详情数据');
    }

    // 获取分类数据
    const fetchCategories = async () => {
      const res = await getCategories();
      state.categories = res;
      // console.log(res, '获取分类数据');
    }

    // 获取物品数据
    const fetchItems = async () => {
      const res = await getItems();
      state.items = res;
      // console.log(res, '获取物品数据'); 
    }

    // 获取英雄数据
    const fetchHeroes = async () => {
      const res = await getHeroes();
      state.heroes = res;
    }

    return {
      defaultCard,
      ...toRefs(state),
      save,
    }
    
  },
}
</script>

<style scoped lang='scss'>

</style>