<script>
import axios from 'axios';
import {ServerApi} from '../setting/index';
export default {
  data() {
    return {
      webApi: 'http://localhost:8080',
      username: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async login() {
      try {
        if (!this.username || !this.password) {
          this.error = 'Будь ласка, заповніть усі поля';
          return;
        } else {
          this.error = '';
          const response = await axios.get(ServerApi.host+'/api/login', {
            username: this.username,
            password: this.password,
          });
          const token = response.data;
          if(token){
            console.log(token);
            localStorage.setItem('token', token);
            this.$router.push('/dashboard');
          }
        }
      } catch (error) {
        console.log('error');
      }
    },
  },
  created() {
    // Проверка localStorage
    if (localStorage.getItem('token')) {
      // Переадресация на страницу авторизации
      this.$router.push('/dashboard');
    }
  },
};
</script>

<template>
  <div>
    <form @submit.prevent="login">
      <div class="uk-form">
        <div class="uk-form-container">
          <div class="uk-container">
            <div class="row">
              <div class="uk-width-1-1">
                <h1 class="uk-text-center">Login</h1>
              </div>
              <div class="uk-width-1-1">
                <div>
                  <label for="username">Username:</label>
                  <input class='uk-input' type="text" id="username" v-model="username">
                </div>
              </div>
              <div class="uk-width-1-1">
                <div>
                  <label for="password">Password:</label>
                  <input class='uk-input' type="password" id="password" v-model="password">
                </div>
              </div>
              <div class="uk-width-1-1 uk-text-center">
                <div>
                  <button class='uk-button uk-button-default' type="submit">Увійти</button>
                </div>
                <div v-if="error" class="uk-alert uk-alert-danger">
                  {{ error }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </form>
  </div>
</template>
