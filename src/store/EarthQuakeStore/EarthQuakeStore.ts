import store from "../store";
import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action,
  MutationAction
} from "vuex-module-decorators";
@Module({
  dynamic: true,
  namespaced: true,
  store,
  name: "earthQuakeStore"
})
class EarthQuakeStore extends VuexModule {
  public earthquakes: any = "";
  public quakeMenuParam: string = "";

  @Action({ commit: "updateEarthQuakes" })
  public setWeather(readings: {}) {
    const earthquakes = readings;
    return earthquakes;
  }

  @Action({ commit: "updateQuakeMenuParam" })
  public setQuakeMenuParam(param: string) {
    const quakeMenuParam = param;
    return quakeMenuParam;
  }

  @Mutation
  updateEarthQuakes(payload: any) {
    this.earthquakes = payload;
  }

  @Mutation
  updateQuakeMenuParam(payload: any) {
    this.quakeMenuParam = payload;
  }

  get getEarthQuakes(): any {
    return this.earthquakes;
  }

  get getQuakeMenuParam(): any {
    return this.quakeMenuParam;
  }
}

export default EarthQuakeStore;
