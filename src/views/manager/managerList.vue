<template>
  <div>
    <el-table :data="manageList" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号"> </el-table-column>
      <el-table-column prop="username" label="用户名称" width="150">
      </el-table-column>
      <el-table-column prop="roleid" label="所属角色" width="160">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120">
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
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="primary" plain size="small"
            >编 辑</el-button
          >
          <el-button
            type="danger"
            plain
            size="small"
            @click="del(scope.row.uid)"
            >删 除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { delManager,editManager } from "../../util/axios/index";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getManagerList();
  },
  methods: {
    ...mapActions({
      getManagerList: "manager/getManagerAction",
       getCount:'manager/getCountAction'
    }),
    //编辑
    edit(row) {
      console.log(row);
      this.$emit("edit", row);
    },
    //封装删除事件
    del(uid) {
      // console.log(uid, "qqqqqqqqqqq");
      // delManager({uid}).then(res=>{
      //   console.log(res);
      // })
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delManager({ uid }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getManagerList();
              this.getCount();
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
      editManager(row).then((res) => {
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
      editManager(row).then((res) => {
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
      manageList: "manager/getManagerList",
    }),
  },
};
</script>

<style lang="" scoped>
</style>
