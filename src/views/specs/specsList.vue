<template>
  <div>
    <el-table :data="specsList" border style="width: 100%" header-align="center"  row-key="id"   default-expand-all   :tree-props="{children: 'children'}">
      <el-table-column prop="id" label="规格编号" width="120" align="center">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="120" align="center">
      </el-table-column>
      <el-table-column prop="attrs" label="规格属性" align="center">
        <template slot-scope="item">
          <div>
            <el-tag v-for="(attrs,index) in item.row.attrs" :key="index" type="info">
              {{attrs}}
            </el-tag>
          </div>
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
import {deleteSpecs, editSpecs } from "../../util/axios/index";
export default {
  data() {
    return {};
  },
  mounted() {
    // console.log(this);
    this.getSpecsAction();
    this.getSpecsCount()
  },
  methods: {
    //封装编辑事件
    edit(id) {
      this.$emit("edit", id);
    },
    ...mapActions({
      getSpecsAction: "specs/getSpecsAction",
      getSpecsCount:'specs/getCountAction'
    }),
    //封装删除事件
    del(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteSpecs({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getSpecsAction();
              this.getSpecsCount();
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
      editSpecs(row).then((res) => {
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
      editSpecs(row).then((res) => {
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
      specsList: "specs/getSpecsList",
    }),
  },
};
</script>

<style lang="" scoped>
</style>
