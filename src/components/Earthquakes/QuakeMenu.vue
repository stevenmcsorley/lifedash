<template>
  <div class="dev-grid-wrapper__article--column--1 dev-u-padding-default">
    <article>
      <div class="dev-card-base dev-u-padding-default">
        <h1>{{ this.postsCount.length }} EarthQuakes</h1>
        <!-- {{ this.postsCount }} -->
        {{ this.timeRangetitle }}
        <p>
          Past Hour
          <a
            href=""
            v-on:click.prevent="emitMenuParam('significant_hour.geojson')"
            >Significant</a
          >
          /
          <a href="" v-on:click.prevent="emitMenuParam('all_hour.geojson')"
            >All</a
          >
        </p>
        <p>
          Past Day
          <a
            href=""
            v-on:click.prevent="emitMenuParam('significant_day.geojson')"
            >Significant</a
          >
          /
          <a href="" v-on:click.prevent="emitMenuParam('all_day.geojson')"
            >All</a
          >
        </p>
        <p>
          Past 7 Days
          <a
            href=""
            v-on:click.prevent="emitMenuParam('significant_week.geojson')"
            >Significant</a
          >
          /
          <a href="" v-on:click.prevent="emitMenuParam('all_week.geojson')"
            >All</a
          >
        </p>
        <p>
          Past 30 Days
          <a
            href=""
            v-on:click.prevent="emitMenuParam('significant_month.geojson')"
            >Significant</a
          >
          /
          <a href="" v-on:click.prevent="emitMenuParam('all_month.geojson')"
            >All</a
          >
        </p>
      </div>
    </article>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import EarthQuakeStore from "../../store/EarthQuakeStore/EarthQuakeStore";
import PostsList from "./PostsList.vue";
// import { RepositoryFactory } from "./../repo/RepositoryFactory";
// const UgsRepository = RepositoryFactory.get("earthquakes");
// import moment from "moment";

import * as QuakeInterfaces from "../../Interfaces/QuakeInterfaces";

@Component({
  components: {}
})
export default class QuakeMenu extends Vue {
  @Prop() private posts!: QuakeInterfaces.Posts[];
  EarthQuakeStore: any = getModule(EarthQuakeStore);
  timerange: string = "";

  private emitMenuParam(param: string) {
    console.log("emitting");
    this.EarthQuakeStore.updateQuakeMenuParam(param);
  }

  private get postsCount() {
    return this.posts;
  }

  private get timeRangetitle() {
    return this.EarthQuakeStore.getQuakeMenuParam;
  }
}
</script>
