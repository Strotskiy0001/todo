class Http {
  #API_url = "https://636938a928cd16bba71860c1.mockapi.io/";
  #endpoint = null;

  constructor(url) {}

  create(url, item) {
    return axios.post(this.#API_url + url, item).then((r) => r.data);
  }

  getAll(url) {
    return axios(this.#API_url + url).then((r) => r.data);
  }

  update(url, id, item) {
    return axios.put(this.#API_url + url + id, item).then((r) => r.data);
    ls - а;
  }

  delete(url, id) {
    return axios.delete(this.#API_url + url + id).then((r) => r.data);
  }
}
