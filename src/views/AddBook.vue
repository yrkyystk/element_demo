<template>
  <el-form style="width:60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="图书名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item label="作者" prop="author">
      <el-input v-model="ruleForm.author"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        author: '',

      },
      rules: {
        name: [
          { required: true, message: '图书名称不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在3-5字符', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '作者不能为空', trigger: 'change' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //前端输入数据测试代码 alert('提交成功!');
          axios.post('http://localhost:8181/book/save',_this.ruleForm).then(function (resp){
            //测试后端是否成功返回的测试代码 console.log(resp);
            if(resp.data == "success")
              //测试添加是否成功的测试代码 alert("添加成功!");
            //  _this.$message('添加成功');
            _this.$alert('<<'+_this.ruleForm.name+'>>添加成功,3s后返回到图书列表', '添加成功提示', {
              confirmButtonText: '确定',
              callback: action => {
                clearTimeout(_this.timer);  //清除延迟执行
                setTimeout(()=>{
                  //需要延迟的代码 :3秒后延迟跳转到首页，可以加提示什么的
                  _this.$router.push({
                    name:"BookManage"
                  });
                  //延迟时间：3秒
                },3000);
              }
            });
          })

        } else {
          console.log('提交失败');
          this.$message('添加失败');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>