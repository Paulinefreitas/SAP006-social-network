import {
  postarMensagem,
  receberUsuario,
  logOut,
} from "../../services/index.js";
import { postTemplate } from "../../componentes/index.js";
export default () => {
  const container = document.createElement("div");

  const template = `
  <div class="feed">
    <header class="header-feed">
      <h1 class="titulo-header">Ellas</h1>
      <button id="logout-perfil" class="logout-header">Logout</button>
    </header>
    <div class="body-feed">
      <section id="conteudo-central">
        <form name= "myForm" action="" id="post-form" class="post-form">
          <label for="name-film">Filme</label>
          <input type="text" id="name-film" />
          <label for="img-film">Anexe uma imagem do filme</label>
          <input type="file" id="input-img-film" accept="image/*" />
          <textarea
            name="post-input"
            id="post-text"
            cols="30"
            rows="10"
            placeholder="Escreva sobre o filme...">
          </textarea>
          <div class="buttons">
            <button class="button-post" type="button" id="button-publicar">Publicar</button>
            <input class="button-post" type="reset" id="button-descartar" value="Descartar">
          </div>
        </form>
        <div id="feed" class="posts-feed">
          <div id="lista-feed" class="lista-feed"></div>
        </div>
      </section>
      <aside id="conteudo-lateral">
        <div id="card-perfil">
        <img src="" alt=""/>
        <input type="file" id="foto-usuario" accept="image/*"></input>
        <div class="username"></div>
        <button class="btn-editar-perfil">Editar</button>
        </div>
        </aside>
        </div>
        <footer id="rodape-feed" class="rodape-feed">
        <nav class="icon-rodape">
        <a href="">Feed</a>
        <a href="">Adicionar</a>
        <a href="">Pesquisar</a>
        </nav>
        </footer>  
        </div>
        `;
  container.innerHTML = template;

  loadPosts();

  //LIMPAR INPUTS

  container.querySelector("#post-form").value = "";

  const userInfo = receberUsuario();
  console.log(userInfo);
  //CRIAR POST
  const btn = container.querySelector("#button-publicar");
  btn.addEventListener("click", () => {
    console.log("clicou aqui!");
    const text = container.querySelector("#post-text").value;
    const filmName = container.querySelector("#name-film").value;
    const filmImage = container.querySelector("#input-img-film").value;
    const postagem = {
      text: text,
      film_name: filmName,
      film_img: filmImage,
      user_id: userInfo.uid,
      username: userInfo.displayName,
      likes: 0,
      array_likes: [],
    };

    postarMensagem(postagem)
      .then(() => {
        console.log("Document successfully written!");
        loadPosts();
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });

  const logout = container.querySelector("#logout-perfil");
  logout.addEventListener("click", () => {
    logOut();
  });

  return container;

  // MOSTRAR POST NA TELA

  function loadPosts() {
    const postsCollection = firebase.firestore().collection("postagens");
    container.querySelector("#lista-feed").innerHTML = "Carregando...";
    postsCollection.get().then((querySnapshot) => {
      container.querySelector("#lista-feed").innerHTML = "";
      querySnapshot.forEach((doc) => {
        const post = { id: doc.id, data: doc.data() };
        const componente = postTemplate(post);
        console.log(componente)
        container.querySelector("#lista-feed").appendChild(componente);
      });
    });
  }
};

//EDITAR