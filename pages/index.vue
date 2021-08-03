<template>
  <div v-if="!isLoading">
    {{budgets.map(b => b.category)}}
  </div>
  <div v-else>
    <span>Chargement des articles en cours...</span>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isLoading: true
      }
    },
    async asyncData ({ $axios }) {
      const budgets = (await $axios.get('/api/budgets')).data;

      return {
        budgets: budgets,
        isLoading: false
      }
    },
    components: {
    }
  }
</script>
