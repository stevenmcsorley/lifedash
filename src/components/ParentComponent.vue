/* eslint-disable vue/no-unused-vars */
<template>
  <div class="wrapper">
    <QuakeMenu :posts="computedPosts"></QuakeMenu>
    <article>
      <div class="dev-card-base dev-u-padding-default">
        <p>
          Filter :
          <input
            type="text"
            v-model="searchQuery"
            @input.prevent="computedPosts"
          />
        </p>
      </div>
    </article>
    <div class="dev-grid-wrapper__article--column--1 dev-u-padding-default">
      <posts-list v-if="!isLoading" :posts="computedPosts.slice(0, 20)">
        <template slot-scope="post">
          <div class="dev-card-base">
            <div
              class="dev-card-base__header dev-u-padding-default"
              v-bind:class="getClass(post.alert)"
            >
              {{ post.title }}
            </div>
            <div class="dev-card-base__body dev-u-padding-default">
              <table style="width:100%;text-align:left;">
                <tr>
                  <td>Time</td>
                  <td>
                    <span>{{
                      post.time | moment("dddd, MMMM Do YYYY, h:mm:ss a")
                    }}</span>
                  </td>
                </tr>
                <tr>
                  <td>Updated</td>
                  <td>
                    <span>{{
                      post.updated | moment("dddd, MMMM Do YYYY, h:mm:ss a")
                    }}</span>
                  </td>
                </tr>
                <tr>
                  <td>felt reports</td>
                  <td>{{ post.felt }}</td>
                </tr>
                <tr>
                  <td>Intensity</td>
                  <td>{{ post.cdi }}</td>
                </tr>
                <tr>
                  <td>Alert</td>
                  <td>{{ post.alert }}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>{{ post.status }}</td>
                </tr>
                <tr>
                  <td>tsunami</td>
                  <td>{{ post.tsunami }}</td>
                </tr>
              </table>
            </div>

            <!-- {{ quake.properties }} -->
            <div class="map">
              <l-map
                :zoom="7"
                :center="[post.coordinates[1], post.coordinates[0]]"
              >
                <l-tile-layer
                  :url="url"
                  :attribution="attribution"
                ></l-tile-layer>
                <l-marker
                  :lat-lng="[post.coordinates[1], post.coordinates[0]]"
                ></l-marker>
              </l-map>
            </div>
          </div>
        </template>
      </posts-list>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import EarthQuakeStore from "../store/EarthQuakeStore/EarthQuakeStore";
import PostsList from "./PostsList.vue";
import QuakeMenu from "./Earthquakes/QuakeMenu.vue";
import { RepositoryFactory } from "./../repo/RepositoryFactory";
const UgsRepository = RepositoryFactory.get("earthquakes");
import moment from "moment";

@Component({
  components: { QuakeMenu, PostsList }
})
export default class PostList extends Vue {
  @Watch("storeMenuParam")
  async menuStore(val: string, oldVal: string) {
    console.log("changed");
    this.menuParam = this.EarthQuakeStore.getQuakeMenuParam;
    await this.fetch(this.menuParam);
  }
  EarthQuakeStore: any = getModule(EarthQuakeStore);
  post: any = [];
  posts: any = [];
  isLoading: boolean = false;
  features: any = [];
  zoom: number = 13;
  url: string = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
  attribution: string = "";
  error: boolean = false;
  errorMessage: any = "";
  menuParam: any = "";
  searchQuery: string = "";

  private async mounted() {
    await this.fetch("significant_week.geojson");
  }

  private async fetch(params: string) {
    console.log("called");
    try {
      this.isLoading = true;
      const { data } = await UgsRepository.get(params);
      let posts = [];

      posts = data.features;

      let properties = posts.map(key => key["properties"]);

      let geometry = posts.map(key => key["geometry"]);

      let combined = [];

      for (let i = 0; i < properties.length; i++) {
        combined.push({
          ...properties[i],
          ...geometry[i]
        });
      }

      console.log("comb", combined);

      console.log("try", posts);
      this.EarthQuakeStore.updateEarthQuakes(combined);
      this.isLoading = false;
      this.posts = await this.EarthQuakeStore.getEarthQuakes;
    } catch (e) {
      this.isLoading = true;
      this.error = true;
      this.errorMessage = e;
      console.log("error", e);
    }
  }
  getClass(alert: string) {
    return {
      green: alert == "green",
      yellow: alert == "yellow",
      orange: alert == "orange",
      red: alert == "red",
      none: alert == ""
    };
  }

  private get computedPosts() {
    console.log("pets", this.posts);
    let postStore = this.posts;
    if (this.searchQuery) {
      postStore = postStore.filter((p: any) => {
        //return p.alert.indexOf(this.searchQuery) !== -1;
        return this.posts.filter(m => m.properties.alert === this.searchQuery);
      });
    }

    return postStore;
  }

  private get storeMenuParam() {
    return this.EarthQuakeStore.getQuakeMenuParam;
  }

  private get filteredQuakes() {
    // this.posts.filter(m => m.properties.alert === this.searchQuery);

    return this.searchQuery
      ? this.posts.filter(m => m.alert === this.searchQuery)
      : {};
  }

  private updateStoreOnSearch() {
    if (this.filteredQuakes.length > 0) {
      this.EarthQuakeStore.updateEarthQuakes(this.filteredQuakes);
    }
    console.log("enter", this.filteredQuakes);
  }
}
</script>
<style scoped>
.map {
  height: 300px;
  width: 100%;
}
.green {
  background: green;
}
.yellow {
  background: yellow;
}
.orange {
  background: orange;
}
.red {
  background: red;
}
</style>
