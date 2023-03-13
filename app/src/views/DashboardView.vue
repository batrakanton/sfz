<script>
import axios from 'axios';
import { ServerApi } from '../setting/index';
export default {
  data() {
    return {
      isAuthenticated: localStorage.getItem('token') !== null,
      sessionId: null,
      users: []
    }
  },
  mounted() {

  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.isAuthenticated = false
      this.$router.push('/')
    }
  },
  async created() {
    // Проверка localStorage
    if (!localStorage.getItem('token')) {
      // Переадресация на страницу авторизации
      this.$router.push('/');
    }
    try {
      const response = await axios.get(ServerApi.host+'/api/personal',{
        params: {
          token: localStorage.getItem('token'),
          iv: ServerApi.iv,
          key: ServerApi.key,
          limit: 10
        }
      });
      this.users = response.data;
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<template>
<!--  <div>-->
<!--    <header>-->
<!--      <nav>-->
<!--        <router-link to="/">Home</router-link>-->
<!--        <router-link to="/dashboard">Dashboard</router-link>-->
<!--        <router-link v-if="!isAuthenticated" to="/">Login</router-link>-->
<!--        <button v-if="isAuthenticated" @click="logout">Logout</button>-->
<!--      </nav>-->
<!--    </header>-->
<!--  </div>-->

  <div v-if="!isAuthenticated">Необхідна авторизація</div>

  <div v-if="isAuthenticated" class="dashboard-container">
    <div class="dashboard-menu">

    </div>
    <div class="dashboard-content">
      <div class="dashboard-right-menu">
        <div class="left-side">

        </div>
        <div class="center">

        </div>
        <div class="right-side">
          <router-link to="/profile" class="right-menu-fio">
            Батрак Антон
          </router-link>
          <a class="uk-button-logout" v-if="isAuthenticated" @click="logout">
            <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
          </a>
        </div>
      </div>
      <div class="dashboard-data">
        <div class="uk-overflow-auto">
          <table class="uk-table uk-table-divider uk-table-striped uk-table-hover uk-table-small">
            <thead>
              <tr>
                <th class="uk-text-center">Таб №</th>
                <th>Прізвище</th>
                <th>Ім'я</th>
                <th>По батькові</th>
                <th>Підрозділ</th>
                <th>Посада</th>
                <th>Категорія</th>
                <th>Відсутність за табелем</th>
                <th>Моб.телефон</th>
                <th>Місцезнаходження</th>
                <th>Вид зайнятості</th>
                <th>Умови проживання</th>
                <th>Коментар місцезнаходження</th>
                <th>Графік роботи</th>
                <th>Стать</th>
                <th>Дата народження</th>
                <th>Дата реєстрація заяви</th>
                <th>Дата реєстрація як ВПО</th>
                <th>Наявність паспорта рф</th>
                <th>Активний посібник</th>
                <th>Визивали на бесіду ОРКИ</th>
                <th>Паспорт рф</th>
                <th>Повернення після деокупації</th>
                <th></th>
              </tr>
            </thead>
            <tbody v-for="user in users" :key="user.id">
              <tr>
                <td class="uk-text-center">{{ user.tab }}</td>
                <td>{{ user.last_name }}</td>
                <td>{{ user.first_name }}</td>
                <td>{{ user.middle_name }}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

</template>
