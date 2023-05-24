import axios from "axios";

const token = localStorage.getItem("token");
const head = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default async function getItem(url, loading, data) {
  await head
    .get(url)
    .then((res) => {
      data(res.data);
      console.log(res.data);
      loading(false);
    })
    .catch((error) => {
      console.log(error);
      prompt(error.message);
    });
}

export async function loginPost(url, data, status) {
  await axios
    .post(url, data)
    .then((response) => {
      localStorage.setItem("token", response.data.access_token);
      status("ok");
    })
    .catch((error) => {
      console.log(error.response.data.message.message);
      prompt(error.response.data.message.message);
    });
}

export async function getGeneric(url, setdata) {
  await head
    .get(url)
    .then((res) => {
      setdata(res.data);
    })
    .catch((error) => prompt(error.message));
}
