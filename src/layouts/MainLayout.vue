<template>
  <div class="app-main-layout">

    <Navbar @click-huick="isOpen = !isOpen"/>

    <Sidebar v-model="isOpen"/>

    <main class="app-content" :class="{full: !isOpen}">
      <router-view/>
    </main>

    <div class="fixed-action-btn">
      <router-link to="/record" class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import Sidebar from '../components/app/Sidebar'
  import Navbar from '../components/app/Navbar'

  export default {
    name: "main-layout",
    data: () => ({
      isOpen: true
    }),
    components: {
      Sidebar, Navbar
    }
  }

</script>