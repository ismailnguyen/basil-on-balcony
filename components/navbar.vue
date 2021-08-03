<template>
  <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <h1 class="navbar-item button is-primary has-text-weight-bold">
            {{ siteName }}
          </h1>
        </a>
        
      <a class="navbar-burger burger" aria-label="menu" aria-expanded="false" v-on:click="openMenu()" v-bind:class="{ 'is-active': isNavbarMenuOpened }">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" v-bind:class="{ 'is-active': isNavbarMenuOpened }">
      <div class="navbar-start">
        <nuxt-link class="navbar-item navbar-link is-arrowless" to="/">
          Overview
        </nuxt-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <nuxt-link class="navbar-link" to="/transactions">
            Transactions
          </nuxt-link>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              {{ (new Date()).getFullYear() }}
            </a>
            <a class="navbar-item">
              {{ (new Date()).getFullYear() - 1 }}
            </a>
            <a class="navbar-item">
              {{ (new Date()).getFullYear() - 2 }}
            </a>
            <a class="navbar-item">
              All
            </a>
          </div>
        </div>
        <nuxt-link class="navbar-item navbar-link is-arrowless" to="/budgets">
          Budget
        </nuxt-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-light" target="_blank" rel="noopener">
              Settings
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    data() {
      return {
        siteName: process.env.siteName,
        isNavbarMenuOpened: false
      }
    },
    methods: {
      openMenu: function () {
          this.isNavbarMenuOpened = !this.isNavbarMenuOpened;
      }
    }
  }
</script>
