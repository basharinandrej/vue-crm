<template>
  <form @submit.prevent="submitHandler" class="card auth-card" >
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: (
                $v.email.$dirty && !$v.email.required) ||
                $v.email.$dirty && !$v.email.email
            }"
        >
        <label for="email">Email</label>
        <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.required"
        >Поле Email не должно быть пустым</small>
        <small
            class="helper-text invalid"
            v-else-if="$v.email.$dirty && !$v.email.email"
        >Поле Email сделаете корректным</small>
      </div>

      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: (
                $v.password.$dirty && !$v.password.required) ||
                $v.password.$dirty && !$v.password.minLength
            }"
        >
        <label for="password">Пароль</label>
        <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required"
        >Введите пароль</small>
        <small
            class="helper-text invalid"
            v-else-if="$v.password.$dirty && !$v.password.minLength"
        >Пароль должен быть не короче {{ $v.password.$params.minLength.min }} символов. Сейчас он {{password.length}}</small>
      </div>
    </div>

    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link :to="{name: 'Register'}" >Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>


<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    email: {required, email},
    password: {required, minLength: minLength(6)}
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        // Метод touch активизирует валидацию
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {
        console.log('Error_LogIn ', 'Вероятно неверный логин');
      }
    }
  }
}
</script>


