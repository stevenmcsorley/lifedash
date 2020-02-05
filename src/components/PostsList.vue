<template>
  <article>
    <div v-for="post in posts" v-bind="{ post }" :key="post.id">
      <slot v-bind="post"></slot>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import * as QuakeInterfaces from "../Interfaces/QuakeInterfaces";

@Component
export default class PostList extends Vue {
  @Prop() private posts!: QuakeInterfaces.Posts;
}
</script>
