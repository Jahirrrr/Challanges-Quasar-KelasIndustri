<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ $t('title') }}
        </q-toolbar-title>

        <q-select
            v-model="locale"
            :options="localeOptions"
            label="Quasar Language"
            emit-value
            map-options
            options-dense
            dark
            :input-style="{ backgroundColor: '#ff0000' }"
            style="min-width: 150px"
          />

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n'
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Dashboard',
    routeName: 'dashboard',
    link: '/dashboard'
  },
  {
    title: 'Help',
    routeName: 'help',
    link: '/help'
  },
  {
    title: 'Login',
    routeName: 'login',
    link: '/login'
  }
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    const leftDrawerOpen = ref(false)

    return {
      locale,
      localeOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'id', label: 'Indonesia' }
      ],
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
});
</script>