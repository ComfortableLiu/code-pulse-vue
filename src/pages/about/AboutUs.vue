<template>
  <div class="container">
    <first-visit-welcome />
    <hr>
    <contact-me />
  </div>
</template>

<script setup lang="ts">
import FirstVisitWelcome from "@/components/FirstVisitWelcome.vue";
import ContactMe from "@/components/ContactMe.vue";
</script>

<style scoped>
.container {
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding-top: 24px;
}

hr {
  margin: 54px 0;
}
</style>
