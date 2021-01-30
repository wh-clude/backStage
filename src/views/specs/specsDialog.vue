<template>
  <div>
    <!-- Form -->
    <el-dialog
      :title="popUp.isAdd ? '添加商品规格' : '编辑商品规格'"
      center
      :visible.sync="popUp.isShow"
      :before-close="cancel"
    >
      <el-form :model="specsForm" :rules="rules" ref="ruleForm">
        <el-form-item
          label="规格名称"
          prop="specsname"
          :label-width="formLabelWidth"
        >
          <el-input v-model="specsForm.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 规格属性 -->
        <el-form-item
          v-for="(item, index) in domains"
          :key="index"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <el-input
            class="specsAttr"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button v-if="index == 0" @click="addAttrs" type="primary"
            >新增规格属性</el-button
          >
          <el-button v-else @click="delAttrs(item)" type="danger"
            >删除</el-button
          >
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="specsForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="popUp.isAdd" type="primary" @click="add('ruleForm')"
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
import { addSpecs, getOneSpecs, editSpecs } from "../../util/axios/index";
import { mapActions, mapGetters } from "vuex";
// console.log(indexRouter, "erererer");
export default {
  data() {
    return {
      specsForm: {
        specsname: "", //商品规格名称
        attrs: "", //商品规格属性值
        status: 1, //状态1正常2禁用
      },
      domains: [
        {
          value: "",
        },
      ],
      formLabelWidth: "120px",
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //动态添加表单项
    addAttrs() {
      if (this.domains.length <= 6) {
        this.domains.push({ value: "" });
      } else {
        this.$message.warning("只能添加这么多了~~~");
      }
    },
    //动态删除表单项
    delAttrs(item) {
      var index = this.domains.indexOf(item);
      if (index !== -1) {
        this.domains.splice(index, 1);
      }
    },
    ...mapActions({
      getSpecsAction: "specs/getSpecsAction",
      getSpecsCount: "specs/getCountAction",
    }),
    //封装取消事件
    cancel() {
      this.$emit("cancel", { isShow: false, isAdd: this.popUp.isAdd });
      this.reset();
    },
    //重置表单的内容
    reset() {
      this.menuForm = {
        pid: 0, //上级分类编号
        title: "", //标题
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      };
      this.$refs["ruleForm"].resetFields();
      this.domains = [
        {
          value: "",
        },
      ];
    },
    //封装添加菜单事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.specsForm);
          // console.log(this.domains,'qqqqqqqq');
          this.specsForm.attrs = this.domains
            .map((item) => item.value)
            .join(",");
          // console.log(this.specsForm.attrs,'sssss');
          addSpecs(this.specsForm).then((res) => {
            // console.log(res, "添加成功");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getSpecsAction();
              this.getSpecsCount();
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
      // console.log(this.menuForm, "1212");
    },
    //封装一个查看一条数据的事件
    lookUp(id) {
      getOneSpecs({ id }).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          this.specsForm = res.data.list[0];
          this.specsForm.id = id;
          this.specsForm.attrs.map((item, index) => {
            if (index == 0) {
              this.domains[0].value = item;
            } else {
              this.domains.push({
                value: item,
              });
            }
          });
        }
      });
    },
    //封装编辑菜单事件
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.specsForm.attrs = this.domains
            .map((item) => item.value)
            .join(",");
          editSpecs(this.specsForm).then((res) => {
            // console.log(res, "编辑成功");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getSpecsAction();
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
      // console.log(this.menuForm, "1212");
    },
  },
  computed: {
    ...mapGetters({
      getSpecsList: "specs/getSpecsList",
    }),
  },
  props: ["popUp"],
};
</script>

<style lang="" scoped>
.specsAttr {
  width: 65%;
}
</style>
