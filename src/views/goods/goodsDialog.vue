<template>
  <div>
    <!-- Form -->
    <el-dialog
      :title="popUp.isAdd ? '添加商品' : '编辑商品'"
      center
      :visible.sync="popUp.isShow"
      :before-close="cancel"
      @opened="createEditor"
    >
      <el-form :model="goodsForm" :rules="rules" ref="ruleForm">
        <el-form-item
          label="一级分类"
          prop="first_cateid"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="goodsForm.first_cateid"
            placeholder="请选择"
            @change="changeClassify(false)"
          >
            <el-option
              v-for="item in getClassifyList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="二级分类"
          prop="second_cateid"
          :label-width="formLabelWidth"
        >
          <el-select v-model="goodsForm.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondClassify"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品名称"
          prop="goodsname"
          :label-width="formLabelWidth"
        >
          <el-input v-model="goodsForm.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="商品价格"
          prop="price"
          :label-width="formLabelWidth"
        >
          <el-input v-model="goodsForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="市场价格"
          prop="market_price"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="goodsForm.market_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 图片上传 -->
        <el-form-item label="图片" :label-width="formLabelWidth">
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
        <!-- 规格 -->
        <el-form-item
          label="商品规格"
          prop="specsid"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="goodsForm.specsid"
            placeholder="请选择"
            @change="changeSpecs(false)"
          >
            <el-option
              v-for="item in getSpecsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="规格属性"
          prop="specsattr"
          :label-width="formLabelWidth"
        >
          <el-select
            multiple
            v-model="goodsForm.specsattr"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in specsArray"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 新品 热卖 -->
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="goodsForm.isnew" :label="1">是</el-radio>
          <el-radio v-model="goodsForm.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="goodsForm.ishot" :label="1">是</el-radio>
          <el-radio v-model="goodsForm.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="goodsForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <div id="editor"></div>
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
import { addGoods, getOneGoods, editGoods } from "../../util/axios/index";
import { mapActions, mapGetters } from "vuex";
import E from "wangeditor";
export default {
  data() {
    return {
      goodsForm: {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖推荐
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
      rules: {
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "change" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 1,
            max: 12,
            message: "长度在 1 到 12 个字符",
            trigger: "blur",
          },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "change" },
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "change" },
        ],
      },
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览的弹框默认是false
      imgUrl: "", //文件图片的配置对象
      fileList: [], //文件列表

      secondClassify: [], //二级分类列表
      specsArray: [], //规格属性数组（二级）
      editor: null,
      goodsSpecs: [],
    };
  },
  computed: {
    ...mapGetters({
      getGoodsList: "goods/getGoodsList",
      getClassifyList: "classify/getClassifyList", //分类列表
      getSpecsList: "specs/getSpecsList", //规格列表
    }),
  },
  mounted() {
    this.getClassifyListAction(); //触发商品分类行动
    this.getSpecsAction(); //触发商品规格行动
  },
  props: ["popUp"],
  methods: {
    ...mapActions({
      getGoodsAction: "goods/getGoodsAction",
      getCountAction: "goods/getCountAction",
      getClassifyListAction: "classify/getClassifyListAction",
      getSpecsAction: "specs/getSpecsAction",
    }),
    //创建富文本编辑器
    createEditor() {
      this.editor = new E("#editor");
      this.editor.create();
      this.editor.txt.html("");
    },
    //一级分类切换事件
    changeClassify(n) {
      // console.log(this.goodsForm.first_cateid, "一级id");
      let index = this.getClassifyList.findIndex(
        (item) => this.goodsForm.first_cateid == item.id
      );
      this.secondClassify = this.getClassifyList[index].children;
      if (!n) {
        this.goodsForm.second_cateid = "";
      }
    },
    changeSpecs(n) {
      let index = this.getSpecsList.findIndex(
        (item) => this.goodsForm.specsid == item.id
      );
      this.specsArray = this.getSpecsList[index].attrs;
      if (!n) {
        this.goodsForm.specsattr = "";
      }
    },

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

    //封装取消事件
    cancel() {
      this.$emit("cancel", { isShow: false, isAdd: this.popUp.isAdd });
      this.reset();
    },
    //重置表单的内容
    reset() {
      this.goodsForm = {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖推荐
        status: 1, //状态1正常2禁用
      };
    },
    //封装添加菜单事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.goodsForm.specsattr, "规格属性");
          // 把富文本编辑器的内容赋给商品描述
          this.goodsForm.description = this.editor.txt.html();
          // console.log(this.goodsForm.specsattr);
          //把规格属性转化为字符串的形式
          this.goodsForm.specsattr = this.goodsForm.specsattr
            ? this.goodsForm.specsattr.join(",")
            : "";
          // console.log(this.goodsForm,'tijiaotijiaotijiao');
          this.goodsForm.img = this.imgUrl;
          let file = new FormData();
          //FormData 数据的添加只能用append ,获取值也只能用get方式获取
          //循环添加 对象 转化成了 FormData这种格式
          for (let i in this.goodsForm) {
            file.append(i, this.goodsForm[i]);
          }
          addGoods(file).then((res) => {
            // console.log(res, "添加成功");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getGoodsAction();
              this.getCountAction();
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
    //封装一个查看一条数据的事件
    lookUp(id) {
      getOneGoods({ id }).then((res) => {
        console.log(res);
        console.log(this.goodsForm, "asasas");
        if (res.data.code == 200) {
          this.goodsForm = res.data.list;
          this.goodsForm.id = id;
          //当查询数据调取接口，给fileList数组赋值
          this.fileList = this.goodsForm.img
            ? [{ url: this.$imgUrl + this.goodsForm.img }]
            : [];
          this.goodsForm.specsattr = this.goodsForm.specsattr.split(",");
          this.changeClassify(true);
          this.changeSpecs(true);
        }
      });
    },
    //封装编辑菜单事件
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 把富文本编辑器的内容赋给商品描述
          this.goodsForm.description = this.editor.txt.html();
          //把规格属性转化为字符串的形式
          this.goodsForm.specsattr = this.goodsForm.specsattr
            ? this.goodsForm.specsattr.join(",")
            : "";

          this.goodsForm.img = this.imgUrl ? this.imgUrl : this.goodsForm.img;
          let file = new FormData();
          for (let i in this.goodsForm) {
            file.append(i, this.goodsForm[i]);
          }
          editGoods(file).then((res) => {
            // console.log(res, "编辑成功");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getGoodsAction();
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
