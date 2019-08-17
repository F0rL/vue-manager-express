<template>
  <div class="fund-list">
    <div class="table_header">
      <el-form :inline="true" ref="add_data" :model="search_data">
        <el-form-item label="按照时间筛选:">
          <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>--
          <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="search" @click="handleSearch">筛选</el-button>
        </el-form-item>
        <el-form-item class="btnAdd">
          <el-button 
            type="primary" 
            size="small" 
            icon="view" 
            @click="handleAdd"
            v-if="user.identity === 'manager'"
          >添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <!-- 表格主体 -->
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        max-height="450"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
        <el-table-column prop="date" label="创建时间" align="center" width="220">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型" align="center" width="120"></el-table-column>
        <el-table-column prop="describe" label="收支描述" align="center" width="180"></el-table-column>
        <el-table-column prop="income" label="收入" align="center" width="120">
          <template slot-scope="scope">
            <span style="color:#00d053">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" align="center" width="120">
          <template slot-scope="scope">
            <span style="color:#f56767">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="账户金额" align="center" width="140">
          <template slot-scope="scope">
            <span style="color:#00d053">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column prop="operation" align="center" width="180" label="操作" v-if="user.identity === 'manager'">
          <template slot-scope="scope">
            <el-button
              type="warning"
              icon="edit"
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              icon="delete"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="paginations.page_index"
              :page-size="paginations.page_size"
              :page-sizes="paginations.page_sizes"
              :layout="paginations.layout"
              :total="paginations.total"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 弹出窗口 -->
    <show-dialog :dialog="dialog" @update="getProfile" :formData="formData"></show-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import ShowDialog from "@/components/ShowDialog";

export default {
  name: "fundList",
  data() {
    return {
      tableData: [],
      allTableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      formData: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      paginations: {
        page_index: 1, //当前页面
        total: 0, //总页数
        page_size: 5, //一页显示多少条
        page_sizes: [5, 10, 15, 20], // 设置一页显示多少条
        layout: "total,sizes,prev,pager,next,jumper" //翻页属性
      },
      search_data: {
        startTime: "",
        endTime: ""
      },
      filterTabledata: []
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      this.$request
        .get("/api/profiles")
        .then(res => {
          this.allTableData = res.data;
          this.filterTabledata = res.data;
          // 设置分页
          this.setpagination();
        })
        .catch(error => console.log(error));
    },
    handleEdit(index, row) {
      this.dialog = {
        show: true,
        title: "修改信息",
        option: "edit"
      };
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.$request.delete(`/api/profiles/delete/${row._id}`).then(res => {
        this.$message({
          type: "warning",
          message: "删除成功"
        });
        this.getProfile();
      });
      console.log(index, row);
    },
    handleAdd() {
      this.dialog = {
        show: true,
        title: "添加信息",
        option: "add"
      };
      this.formData = {};
    },
    handleSizeChange(page_size) {
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      let index = this.paginations.page_size * (page - 1);
      let nums = this.paginations.page_size * page;
      let tables = [];
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
        this.tableData = tables;
      }
    },
    setpagination() {
      //初始化
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      // 设置展示数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSearch() {
      //筛选
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
        this.getProfile();
        return;
      }
      const sTime = this.search_data.startTime;
      const eTime = this.search_data.endTime;
      this.allTableData = this.filterTabledata.filter(item => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= sTime && time <= eTime;
      });

      this.setpagination();
    }
  },
  components: {
    ShowDialog
  }
};
</script>

<style lang="scss" scoped>
.fund-list {
  box-sizing: border-box;
  width: calc(100% - 180px);
  margin-left: 180px;
  padding: 16px;
  .table_header {
    margin-bottom: 20px;
    overflow: hidden;
    .btnAdd {
      float: right;
    }
  }
  .pagination {
    text-align: right;
    margin-top: 10px;
  }
}
</style>
