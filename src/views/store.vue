<template>
  <div>
    <div>{{status}}</div>
    <div @click="setStatus">改变状态</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      status: 'status'
    })
  },
  methods: {
    setStatus () {
      this.$store.dispatch('setStatus', 123)
    }
  }
}
</script>
