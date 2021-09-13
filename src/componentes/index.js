import { deletePost } from "../services/index.js";
export function postTemplate(post) {
  const componente = document.createElement("div");
  const conteudo = `
<div id="${post.id}">
  <div class="usuario-card">
    <h3>${post.data?.user_id}</h3>
  </div>
  <div class="id-filme-card">
    <h2>${post.data?.film_name}</h2>
    <section>${post.data?.film_img}</section>
  </div>
  <div class="texto-card">
  <p>${post.data?.text}</p>
  </div>
  <div class="interacao-card">
    <button class="like">${post.data?.likes}</button>
    <button class="comentar">${post.data?.comments}</button>
    <button class="deletar">Deletar</button>
  </div>
  
</div>
`;
  componente.innerHTML = conteudo;
  const btnDeletar = componente.querySelector(".deletar");
  btnDeletar.addEventListener("click", () => {
    deletePost(post.id);
  });
  return componente;
}
