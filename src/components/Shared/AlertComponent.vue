<template>
  <v-alert class="rounded-0" color="error" dismissible @input="onClose">{{
    text
  }}</v-alert>
</template>
<script>
export default {
  props: ["text"],
  methods: {
    onClose() {
      this.$emit("dismissed");
    },
  },
};
</script>
