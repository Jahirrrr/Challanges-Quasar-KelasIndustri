<template>
  <q-item
    clickable
    v-ripple
    :class="$route.name == routeName ? 'activeItem' : ''"
    @click="goToPage(routeName)"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    routeName: {
      type: String,
      required: true
    }
  },

  setup() {

    return {
      linkActive: ref(''),
    }
  },
  
  methods: {
    goToPage(routeName: string) {
      this.linkActive = routeName;
      this.$router.push({ name: routeName });
    },
  },
});
</script>