import axios from "axios";

const baseDomain = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/";
// The base URL is empty this time due we are using the jsonplaceholder API
const baseURL = `${baseDomain}`;

export default axios.create({
  baseURL
});
