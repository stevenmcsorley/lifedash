<template>
  <div class="home">
    <ParentComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import ParentComponent from "@/components/ParentComponent.vue";

export default {
  components: {
    ParentComponent
  }
};
</script>
