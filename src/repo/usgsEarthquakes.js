/// see here for resource params
//https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

import UsgsRepository from "./UsgsRepository";

const resource = ".geojson";
export default {
  //'significant_day.geojson'
  get(quakeTime) {
    return UsgsRepository.get(quakeTime);
  }
};
