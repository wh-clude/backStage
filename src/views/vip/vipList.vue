<template>
  <div>
    <el-table :data="memberList" border style="width: 100%" header-align="center">
      <el-table-column prop="uid" label="用户编号" align="center">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="200" align="center">
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
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button
            @click="edit(scope.row.uid)"
            type="primary"
            plain
            size="small"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {  editMember } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getMemberListAction();
  },
  methods: {
    ...mapActions({
      getMemberListAction: "member/getMemberListAction",
    }),
    edit(uid) {
      this.$emit("edit", uid);
    },
    openStatus(row) {
      console.log(row);
      // console.log(this.menuList);
      row.status = 2;
      editMember(row).then((res) => {
        // console.log(res);
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
      editMember(row).then((res) => {
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
      memberList: "member/getMemberList",
    }),
  },
};
</script>

<style lang="" scoped>
</style>
