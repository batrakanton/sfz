<script>
export default {

  data() {
    return {
      isAuthenticated: localStorage.getItem('token') !== null
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.isAuthenticated = false
      this.$router.push('/')
    }
  },
  created() {
    // Проверка localStorage
    if (!localStorage.getItem('token')) {
      // Переадресация на страницу авторизации
      this.$router.push('/');
    }
  },
}
</script>

<template>
  <div>
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link v-if="!isAuthenticated" to="/">Login</router-link>
        <button v-if="isAuthenticated" @click="logout">Logout</button>
      </nav>
    </header>
  </div>
</template>
