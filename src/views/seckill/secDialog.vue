<template>
  <div>
    <!-- Form -->
    <el-dialog
      :title="popDialog.isAdd ? '添加活动' : '编辑活动'"
      center
      :visible.sync="popDialog.isShow"
      :before-close="cancel"
    >
      <el-form :model="seckForm" :rules="rules" ref="ruleForm">
        <el-form-item
          label="活动名称"
          prop="title"
          :label-width="formLabelWidth"
        >
          <el-input v-model="seckForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <el-date-picker
            v-model="value"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select
            v-model="seckForm.first_cateid"
            placeholder="请选择"
            @change="changeClassify(false)"
          >
            <el-option
              v-for="item in classifyList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select
            v-model="seckForm.second_cateid"
            placeholder="请选择"
            @change="changeGoods(false)"
          >
            <el-option
              v-for="item in secondClassify"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="seckForm.goodsid" placeholder="请选择">
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="seckForm.status"
            active-color="#13ce66"
            inactive-color="#ccc"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          v-if="popDialog.isAdd"
          type="primary"
          @click="add('ruleForm')"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="update('ruleForm')"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addSeck,
  editSeck,
  getOneSeck,
  getGoodsList,
} from "../../util/axios/index";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      seckForm: {
        id: 1, //编号，必填项
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1, //状态1正常2禁用
      },
      value: "",
      formLabelWidth: "120px",
      rules: {
        title: [
          { required: true, message: "请输入秒杀名称", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
      secondClassify: [],
      goodsArr: [], //商品
    };
  },
  mounted() {
    this.getClassifyListAction();
  },
  computed: {
    ...mapGetters({
      classifyList: "classify/getClassifyList",
    }),
  },
  methods: {
    ...mapActions({
      getSeckListAction: "seck/getSeckListAction",
      getClassifyListAction: "classify/getClassifyListAction",
    }),
    //封装一级分类切换事件
    changeClassify(n) {
      //查找与classifyList的一级分类所在的索引
      let index = this.classifyList.findIndex(
        (item) => this.seckForm.first_cateid == item.id
      );
      this.secondClassify = this.classifyList[index].children;
      if (!n) {
        this.seckForm.second_cateid = "";
        this.seckForm.goodsid = "";
      }
    },
    //封装一个切换商品的事件
    changeGoods(n) {
      getGoodsList({
        fid: this.seckForm.first_cateid,
        sid: this.seckForm.second_cateid,
      }).then((res) => {
        // console.log(res, "商品列表");
        if (res.data.code == 200) {
          this.goodsArr = res.data.list ? res.data.list : [];
        }
      });
      if (!n) {
        this.seckForm.goodsid = "";
      }
    },
    //封装取消函数b
    cancel() {
      this.$emit("cancel", { isShow: false, isAdd: this.popDialog.isAdd });
      this.reset();
    },
    //重置表单的内容
    reset() {
      this.seckForm = {
        id: 1, //编号，必填项
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1, //状态1正常2禁用
      };
    },
    //封装添加事件
    add(formName) {
      // console.log(this.value,'aaaaaa');

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.seckForm.begintime = new Date(this.value[0]).getTime();
          this.seckForm.endtime = new Date(this.value[1]).getTime();
          addSeck(this.seckForm).then((res) => {
            // console.log(res, "添加成功");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getSeckListAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          // console.log("error submit!!");
          this.$message.error("error submit!!");
          return false;
        }
      });
    },
    //封装修改事件
    update(formName) {
      // console.log(this.roleForm,'sssss');
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.seckForm.begintime = new Date(this.value[0]).getTime();
          this.seckForm.endtime = new Date(this.value[1]).getTime();
          editSeck(this.seckForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getSeckListAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          this.$message.error("error submit!!");
          return false;
        }
      });
    },
    lookUp(id) {
      // console.log(id);
      getOneSeck({ id }).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          this.seckForm = res.data.list;
          this.seckForm.id = id;
          // 对时间进行转换
          this.value = [new Date(parseInt(this.seckForm.begintime)) , new Date(parseInt(this.seckForm.endtime))]
          this.changeClassify(true);
          this.changeGoods(true);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
  props: ["popDialog"],
};
</script>

<style lang="" scoped>
</style>
