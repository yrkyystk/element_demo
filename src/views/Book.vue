<template>
  <div>
    <table>
      <tr>
        <td>编号</td>
        <td>图书名称</td>
        <td>作者</td>
      </tr>
      <tr v-for="singlebook in books">
        <td >{{singlebook.id}}</td>
        <td >{{singlebook.name}}</td>
        <td >{{singlebook.author}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Book",
  data() {
    return {
      books:[
        {
          id:1,
          name:'java1',
          author:'东野圭吾'
        },
        {
          id:2,
          name:'java2',
          author:'东野圭吾2'
        },
        {
          id:3,
          name:'java3',
          author:'东野圭吾3'
        }
      ]
    }
  },
  created() {
    const _this = this
    axios.get('http://localhost:8181/book/findAll').then(function(resp)
    {
      _this.books = resp.data
    })
  }
}
</script>

<style scoped>

</style>