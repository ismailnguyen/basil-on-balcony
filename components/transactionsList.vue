<template>
  <section class="section">
    <div class="container">

      <div class="columns">
        <div class="column">
          <h1 class="title">{{ title }}</h1>
        </div>
        <div class="column is-narrow">
          <div class="field has-addons">
            <div class="control has-icons-left">
              <input class="input is-rounded" type="text" placeholder="Rechercher ..." v-model="searchQuery">
                <span class="icon is-small is-left">
                  <fa :icon="fas.faSearch"/>
                </span>
              </div>
            </div>
        </div>
      </div>

      <div class="columns is-mobile is-multiline is-centered">
        <div class="column is-one-third-desktop is-half-tablet is-full-mobile" v-for="(article, i) in transactions" :key="i">
          <Article :article="article" />
        </div>
      </div>

    </div>
  </section>
</template>

<script>
  import { fas } from '@fortawesome/free-solid-svg-icons'
  import Article from '~/components/articleCard.vue'

  export default {
    props: ['transactions'],
    components: {
      Article
    },
    data () {
      return {
        title: 'Transactions',
        searchQuery: ''
      }
    },
    methods: {

    },
    computed: {
      fas: function () {
         return fas
      }
    }
  }
</script>
