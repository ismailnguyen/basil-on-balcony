<template>
  <div class="main">
    <Navbar />
    <nuxt/>
    <Footer />
  </div>
</template>

<script>
  import Navbar from '~/components/navbar.vue'
  import Footer from '~/components/footer.vue'

  export default {
    components: {
      Navbar,
      Footer
    },
  }
</script>

<style>
  body {
    min-height: 100vh;
    background-color: white;
  }
</style>
