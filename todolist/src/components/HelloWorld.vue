<template>
  <div class="hello">
    <div class="todo-input">
      <div class="input-wrapper">
        <input
          type="text"
          v-model.trim="todo"
          placeholder="type our due here..."
        />
      </div>
      <button @click="addTodoItem">添加</button>
      <ul>
        <li v-for="item in list" :key="item._id">
          <span class="todo-content">{{ item.text }}</span>
          <span class="delete-todo" @click="deleteItem(item._id)">移除</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      list: [],
      todo: '',
    }
  },
  beforeMount() {
    this.$axios.get('/').then((res) => {
      this.list = res.data
      console.log(res.data)
    });
  },
  methods: {
    addTodoItem() {
      if (this.todo === '') {
        return false
      } else {
        this.$axios.post('/addItem', {
          text: this.todo
        }).then((res) => {
          this.list = res.data
          console.log(res.data)
          this.todo = ''
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    deleteItem(id) {
      this.$axios.delete(`/deleteItem/${id}`).then((res) => {
        this.list = res.data
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  margin: 0 auto;
  width: 400px;
}
li {
  margin: 0 10px;
  margin: 20px;
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
a {
  color: #42b983;
}

.input-wrapper {
  padding: 7px;
  display: inline-block;
  background-color: rgb(246, 247, 248);
}

input {
  height: 20px;
  width: 200px;
  border: none;
  background-color: rgb(246, 247, 248);
  outline: none;
}

button {
  width: 135px;
  height: 35px;
  border: none;
  background-color: #00a1d6;
  color: white;
}

.todo-content {
}

.delete-todo {
  background-color: rgb(251, 114, 153);
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
}
</style>
