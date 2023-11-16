<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="q-pa-md" style="width: 400px; max-width: 80vw">
      <div class="text-h6 text-center q-mb-md">Login Form</div>

      <!-- Tambahkan formulir login di sini -->
      <q-form @submit="login">
        <q-input
          v-model="username"
          dense
          outlined
          label="Username"
        />
        <div v-html="html"></div>
        <br>

        <q-input
          v-model="password"
          dense
          outlined
          type="password"
          label="Password"
        />
        <br>

        <q-btn
          type="submit"
          color="primary"
          label="Login"
        />
      </q-form>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoginTodo',
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    const login = () => {
      // Logika login di sini
      // Anda dapat menambahkan validasi dan logika autentikasi

      // Contoh pengalihan ke halaman setelah login
      router.push('/dashboard');
    };

    return { username, password, login };
  },
});
</script>
