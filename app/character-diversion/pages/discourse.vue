<template>
  <NuxtLayout class="">
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts">
import { Discourse } from "~/types";

export default defineComponent({
  setup() {
    definePageMeta({
      name: "Discourse",
      icon: "bars-progress",
      order: 3,
      layoutTransition: {
        name: "page",
      },
    });
  },
  mounted() {
    this.$state.discourse.fetch();
  },
  watch: {
    $route: {
      handler() {
        this.$state.discourse.setCurrent(this.$route.params.id);
      },
      immediate: true,
    },
    "$state.discourse.current": {
      handler(current: Discourse) {
        if (!current) {
          this.$state.opinion.reset("active");
          return;
        }
        const dicourseFont = document.createElement("style");
        dicourseFont.appendChild(
          document.createTextNode(`@font-face {
          font-family: 'dicourseFont';
          src: url("${this.$strapi.api.url}${current.attributes.font.data.attributes.url}");
        }`)
        );
        document.head.appendChild(dicourseFont);
      },
      deep: true,
    },
  },
})
</script>

<style>
:where(.font-user) {
  font-family: dicourseFont, var(--font-sans);
}
</style>
