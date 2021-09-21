import {
  deletarPostagem,
  receberUsuario,
  
  adicionarLike,
  retirarLike,
  atualizarPerfil,
} from "../services/index.js";

export function postTemplate(post) {
  
  const userInfo = receberUsuario();
  
  const componente = document.createElement("div");
  const conteudo = `
<div id="${post.id}" class="post-id">
  <div class="usuario-card">
    <img class="img-persona" src="imagens/mulherP.png" alt="imagem persona">
    <h3 class="username-post">${post.data?.username}</h3>
  </div>
  <div class="id-filme-card">
    <h2>${post.data?.film_name}</h2>
  </div>
  <div class="texto-card">
   <p>${post.data?.text}</p>
  </div>
  <div class="btns-post">
    <div class="like">
      <span class="like-n">${post.data?.array_likes.length}</span>
      <button class="like" data-func="like">Curtir</button>
    </div>
    <div class="edit-btn">
      <button class="editar">Editar</button>
      <button class="deletar">Deletar</button>
    </div>
  </div>
</div>
`;
  //${post.data?.likes} no button curtir
  componente.innerHTML = conteudo;

  //CURTIR

  let liked = false;
  componente.addEventListener("click", (event) => {
    if (event.target.dataset.func === "like") {
      const somarLike = () => {
        const curtir = event.target.previousElementSibling;
        const curtida = Number(curtir.innerText);
        curtir.innerText = curtida + 1;
        liked = true;
      };
      const diminuirLike = () => {
        const curtir = event.target.previousElementSibling;
        const curtida = Number(curtir.innerText);
        curtir.innerText = curtida - 1;
        liked = false;
      };
      //Atualizar firebase like + array de uid
      if (liked) {
        diminuirLike();
        retirarLike(userInfo.uid, post.id);
        //remover uid do array firebase
      } else {
        somarLike();
        adicionarLike(userInfo.uid, post.id);
        //adicionar uid do array firebase
      }
    }
  });

  //DELETAR
  const btnDeletar = componente.querySelector(".deletar");
  if (post.data.user_id === userInfo.uid) {
    const divClassNone = componente.querySelector(".edit-btn");
    divClassNone.style.display = "flex";
  }
  btnDeletar.addEventListener("click", () => {
    deletarPostagem(post.id).then(() => {
      const btnsIntera = btnDeletar.parentNode;
      const divPost = btnsIntera.parentNode;
      divPost.remove();
      });
  });

  // EDITAR

  const btnEditar = componente.querySelector(".editar");
  btnEditar.addEventListener("click", (event) => {
    const edit =
      event.target.parentElement.previousElementSibling.previousElementSibling
        .children[0];
    console.log(
      event.target.parentElement.previousElementSibling.previousElementSibling
        .children[0]
    );
    edit.setAttribute("contentEditable", "true");
  });

  // const btnSalvar = componente.querySelector(".salvar");

  // btnSalvar.addEventListener("click", () => {
  //   console.log("clicou");
  // });

  return componente;
}

