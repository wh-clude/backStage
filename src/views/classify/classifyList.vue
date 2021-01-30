<template>
  <div>
    <el-table
      :data="classifyList"
      border
      style="width: 100%"
      header-align="center"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号" width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="catename"
        label="分类名称"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column label="图片" align="center">
        <template slot-scope="item">
          <div v-if="item.row.pid != 0">
            <img
              class="img"
              :src="
                item.row.img
                  ? $imgUrl + item.row.img
                  : 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2583035764,1571388243&fm=26&gp=0.jpg'
              "
              alt=""
            />
          </div>
          <div v-else></div>
        </template>
      </el-table-column>
      
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template slot-scope="sta">
          <el-button
            v-if="sta.row.status == 1"
            type="success"
            plain
            size="small"
            @click="openStatus(sta.row)"
            >启动</el-button
          >
          <el-button
            v-else
            type="info"
            plain
            size="small"
            @click="closeStatus(sta.row)"
            >禁用</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button
            @click="edit(scope.row.id)"
            type="primary"
            plain
            size="small"
            >编辑</el-button
          >
          <el-button type="danger" plain size="small" @click="del(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { deleteClassify, editClassify } from "../../util/axios/index";
export default {
  data() {
    return {};
  },
  mounted() {
    // console.log(this);
    this.getClassifyListAction();
  },
  methods: {
    //封装编辑事件
    edit(id) {
      this.$emit("edit", id);
    },
    ...mapActions({
      getClassifyListAction: "classify/getClassifyListAction",
    }),
    //封装删除事件
    del(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteClassify({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getClassifyListAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    openStatus(row) {
      // console.log(row);
      // console.log(this.menuList);
      row.status = 2;
      editClassify(row).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    closeStatus(row) {
      // console.log(row.status);
      // console.log(this.menuList);
      row.status = 1;
      editClassify(row).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      classifyList: "classify/getClassifyList",
    }),
  },
};
</script>

<style lang="" scoped>
.img{
  height: 50px;
}
</style>
