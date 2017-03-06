<template>
<div>
  <div v-html="text">
  </div>
  <button @click="mock">请求输出</button>
</div>
</template>
<script>
  export default {
    data () {
      return {
        text: ''
      }
    },
    components: {
    },
    methods: {
      mock: function () {
        this.$http.get('/api/test').then(response => {
          this.text = response.data
        }, response => {
        })
      }
    }
  }
</script>
<style scoped></style>
