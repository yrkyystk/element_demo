<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="id"
          label="编号"
          width="150">
      </el-table-column>
      <el-table-column
          prop="name"
          label="书名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="author"
          label="作者"
          width="120">
      </el-table-column>
      <el-table-column
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click = "deleteById(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total = "total"
        @current-change = "page">
    </el-pagination>

<!--    edit dialog-->
    <el-dialog  title="编辑信息" :visible.sync="dialogFormVisible" >
      <el-form :model="editForm" label-width="100px" style="width:80%" ref="editForm">

        <el-form-item label="id" prop="id">
          <el-input v-model="editForm.id" readonly></el-input>
        </el-form-item>

        <el-form-item label="图书名称" prop="name" >
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>

        <el-form-item label="作者" prop="author">
          <el-input v-model="editForm.author"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEdit">取 消</el-button>
        <el-button type="primary"  @click="submitDialog('editForm')">确 定 更 新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {


  methods: {
    handleClick(row) {
      console.log(row);
      this.dialogFormVisible=true;
      this.editForm.id=row.id;
      this.editForm.name = row.name;
      this.editForm.author = row.author;
      // this.$router.push({
      //   query: {
      //     id: row.id,
      //     name: row.name,
      //     author: row.author
      //   }
      // })

    },
    //关闭修改编辑框
    closeEdit() {
      this.dialogFormVisible = false
    },
    //修改编辑
    submitDialog(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put("http://localhost:8181/book/update",_this.editForm).then(function (resp) {
            // console.log(resp)
            if(resp.data=="success"){
              _this.$alert('更新成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.closeEdit();
                  _this.$router.go(0);
                }
              });

             // alert('修改调试代码:更新成功!')
            }else{
              this.$message("更新失败")
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //删除操作
    deleteById(row) {
      const _this = this;
      axios.get("http://localhost:8181/book/deleteById/"+row.id).then(function(resp){
       //test code: alert('111');
        _this.$alert('<<'+row.name+'>>删除成功', '删除成功提示', {
          confirmButtonText: '确定',
          callback: action => {
              window.location.reload();
          }
        });
      })
    },
    page(currentPage) {
      // alert(currentPage)
      const _this = this
      axios.get("http://localhost:8181/book/findAll/"+currentPage+"/"+_this.pageSize).then(function(resp){
        //调试
        //console.log(resp)
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })
    },
  },
  created() {
    const _this = this
    axios.get('http://localhost:8181/book/findAll/1/'+_this.pageSize).then(function(resp){
      //调试
       //console.log(resp)
      _this.tableData = resp.data.content

      _this.total = resp.data.totalElements




    })
  },
  data() {
    return {
      pageSize: 5,
      total: null,
      tableData: null,
      /*[{
        id: 1,
        name: '解忧杂货店',
        author: '东野圭吾',
        city: '普陀区',

      }, {
        id: 1,
        name: '解忧杂货店',
        author: '东野圭吾',
        city: '普陀区',
      }, {
        id: 2,
        name: '解忧杂货店2',
        author: '东野圭吾2',
        city: '普陀区2',
      }, {
        id: 3,
        name: '解忧杂货店3',
        author: '东野圭吾3',
        city: '普陀区3',
      }]*/
      dialogFormVisible: false,
      editTableData:null,
      editForm: {
        id : '',
        name: '',
        author: '',
      },
      formLabelWidth: '120px'
    }
  }
}
</script>