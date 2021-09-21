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
      <button id="logout-perfil" class="logout-header"><img src="imagens/sair.png" alt="icone de sai"></button>
    </header>
    <div class="body-feed">
      <section id="conteudo-central">
        <form name= "myForm" action="" id="post-form" class="post-form">
          <label for="name-film">Filme</label>
          <input type="text" id="name-film" class="inputs-form"/>
          <textarea
            name="post-input"
            id="post-text"
            class="inputs-form"
            cols="30"
            rows="10"
            placeholder="Escreva sobre o filme...">
          </textarea>
          <div class="buttons">
            <button class="button-post" type="button" id="button-publicar">Publicar</button>
            <input class="button-post" type="reset" id="button-descartar" value="Cancelar">
          </div>
        </form>
        <div id="feed" class="posts-feed">
          <div id="lista-feed" class="lista-feed"></div>
        </div>
      </section>
    </div>
        <footer id="rodape-feed" class="rodape-feed">
        <nav class="icon-rodape">
        <a href="#feed"><img src="imagens/feed.png" alt="icone de feed">
        </a>
        <a href="#feed"><img src="imagens/adicionar.png" alt="icone de adicionar">
        </a>
        <a href="#perfil"><img src="imagens/perfil.png" alt="icone de perfil">
        </a>
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
    const postagem = {
      text: text,
      film_name: filmName,
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
  
//LOGOUT
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