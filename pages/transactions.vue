<template>
  <TransactionsList v-if="!isLoading" :transactions="sheets" />
    <div v-else>
      <span>Loading transactions...</span>
    </div>
</template>

<script>
  import TransactionsList from '~/components/transactionsList.vue'

  export default {
    data () {
      return {
        isLoading: true
      }
    },
    async asyncData ({ $axios }) {
      const sheets = (await $axios.get('/api/transactions')).data;

      return {
        sheets: sheets,
        isLoading: false
      }
    },
    components: {
      TransactionsList
    }
  }
</script>
