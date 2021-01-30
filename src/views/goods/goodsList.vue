<template>
  <div>
    <el-table
      :data="getGoodsList"
      border
      style="width: 100%"
      header-align="center"
    >
      <el-table-column prop="id" label="商品编号" width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="goodsname"
        label="商品名称"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="market_price"
        label="市场价格"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column label="图片" align="center" width="200">
        <template slot-scope="item">
          <div>
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
        </template>
      </el-table-column>
      <el-table-column label="是否新品" width="120" align="center">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.isnew == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖" width="120" align="center">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.ishot == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
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
import { deleteGoods, editGoods } from "../../util/axios/index";
export default {
  data() {
    return {};
  },
  mounted() {
    // console.log(this);
    this.getGoodsAction();
    this.getCountAction();
  },
  methods: {
    //封装编辑事件
    edit(id) {
      this.$emit("edit", id);
    },
    ...mapActions({
      getGoodsAction: "goods/getGoodsAction",
      getCountAction: "goods/getCountAction",
    }),
    //封装删除事件
    del(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteGoods({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getGoodsAction();
              this.getCountAction();
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
      editGoods(row).then((res) => {
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
      editGoods(row).then((res) => {
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
      getGoodsList: "goods/getGoodsList",
    }),
  },
};
</script>

<style lang="" scoped>
.img {
  height: 50px;
}
</style>
