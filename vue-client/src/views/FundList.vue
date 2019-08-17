<template>
<div class="fund-list">
  <el-table
    v-if="tableData.length > 0"
    :data="tableData"
    max-height="450"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      label="序号"
      align="center"
      width="70">
    </el-table-column>
    <el-table-column
      prop="date"
      label="创建时间"
      align="center"
      width="220">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="type"
      label="收支类型"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      prop="describe"
      label="收支描述"
      align="center"
      width="180">
    </el-table-column>
    <el-table-column
      prop="income"
      label="收入"
      align="center"
      width="120">
      <template slot-scope="scope">
        <span style="color:#00d053">{{ scope.row.income }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="expend"
      label="支出"
      align="center"
      width="120">
      <template slot-scope="scope">
        <span style="color:#f56767">{{ scope.row.expend }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="cash"
      label="账户金额"
      align="center"
      width="140">
      <template slot-scope="scope">
        <span style="color:#00d053">{{ scope.row.cash }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注"
      align="center">
    </el-table-column>
    <el-table-column 
      prop="operation"
      align="center"
      width="180"
      label="操作">
      <template slot-scope="scope">
        <el-button
          type="warning"
          icon="edit"
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          icon="delete"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "fundList",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      this.$request
        .get("/api/profiles")
        .then(res => {
          this.tableData = res.data;
        })
        .catch(error => console.log(error));
    },
    handleEdit(index, row){
      console.log(index, row)
    },
    handleDelete(index, row){
      console.log(index, row)
    },
  }
};
</script>

<style lang="scss" scoped>
.fund-list {
  box-sizing: border-box;
  width: calc(100% - 180px);
  margin-left: 180px;
  padding: 16px;
}
</style>
