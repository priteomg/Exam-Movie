import axios from "axios";

export default axios.create({
  baseURL:
    "https://api.themoviedb.org/3/search/movie?api_key=17afcd74e67796016577244fdca52898&query=a",
  headers: {
    "Content-type": "application/json",
  },
});
