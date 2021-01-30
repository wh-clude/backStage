<template>
  <div>
    <!-- Form -->
    <el-dialog
      :title="popUp.isAdd ? '添加分类' : '编辑分类'"
      center
      :visible.sync="popUp.isShow"
      :before-close="cancel"
    >
      <el-form :model="classifyForm" :rules="rules" ref="ruleForm">
        <el-form-item label="上级分类" prop="pid" :label-width="formLabelWidth">
          <el-select v-model="classifyForm.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in classifyList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="分类名称"
          prop="catename"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="classifyForm.catename"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 图片上传 -->
        <el-form-item
          v-if="classifyForm.pid != 0"
          label="图片"
          :label-width="formLabelWidth"
        >
          <el-upload
            action="#"
            :auto-upload="false"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- 预览展示 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="classifyForm.status"
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
import {
  addClassify,
  getOneClassify,
  editClassify,
} from "../../util/axios/index";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      classifyForm: {
        pid: 0, //上级分类编号
        catename: "", //商品分类名称
        img: "", //图片(一般用于二级分类)
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          {
            min: 2,
            max: 12,
            message: "长度在 1 到 12 个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请选择上级分类", trigger: "change" }],
      },
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览的弹框默认是false
      imgUrl: "", //文件图片的配置对象
      fileList: [], //文件列表
    };
  },
  computed: {
    ...mapGetters({
      classifyList: "classify/getClassifyList",
    }),
  },
  props: ["popUp"],
  methods: {
    //文件上传的限制
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //当文件改变时，触发的函数方法
    onChange(file) {
      console.log(file, "文件的属性配置");
      this.imgUrl = file.raw;
    },
    //预览时的删除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //方法预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    ...mapActions({
      getClassifyListAction: "classify/getClassifyListAction",
    }),
    //封装取消事件
    cancel() {
      this.$emit("cancel", { isShow: false, isAdd: this.popUp.isAdd });
      this.reset();
    },
    //重置表单的内容
    reset() {
      this.classifyForm = {
        pid: 0, //上级分类编号
        catename: "", //商品分类名称
        img: "", //图片(一般用于二级分类)
        status: 1, //状态1正常2禁用
      };
    },
    //封装添加菜单事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.classifyForm.img = this.imgUrl;
          addClassify(this.classifyForm).then((res) => {
            // console.log(res, "添加成功");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getClassifyListAction();
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
      getOneClassify({ id }).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          this.classifyForm = res.data.list;
          this.classifyForm.id = id;
          //当查询数据调取接口，给fileList数组赋值
          this.fileList = this.classifyForm.img
            ? [{ url: this.$imgUrl + this.classifyForm.img }]
            : "";
        }
      });
    },
    //封装编辑菜单事件
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.classifyForm.img = this.imgUrl ? this.imgUrl : this.classifyForm.img;
          let file = new FormData();
          for (let i in this.classifyForm) {
            file.append(i, this.classifyForm[i]);
          }
          editClassify(file).then((res) => {
            // console.log(res, "编辑成功");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getClassifyListAction();
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
  },
};
</script>

<style lang="" scoped>
</style>
