const BASE_URL = "http://127.0.0.1:8000/api/v1";

export default async function getPosts() {
  const response = await fetch(`${BASE_URL}/posts/`);
  const json = await response.json();
  return json;
}
