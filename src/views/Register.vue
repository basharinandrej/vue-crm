<template>

  <form @submit.prevent="submitHandler" class="card auth-card">
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

      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model="name"
            :class="{invalid: $v.password.$dirty && !$v.password.required}"
        >
        <label for="name">Имя</label>
        <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.name.required"
        >Введите Ваше имя</small>
      </div>

      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>

    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link :to="{name: 'Login'}" > Войти!</router-link>
      </p>
    </div>
  </form>

</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      name: '',
      agree: false
    }
  },
  validations: {
    email: {required, email},
    password: {required, minLength: minLength(6)},
    name: {required},
    agree: {checked: v => v}
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
        agree: this.agree
      }

      await this.$store.dispatch('register', formData)

      //redirect to Home
      this.$router.push('/')
    }
  }
}
</script>