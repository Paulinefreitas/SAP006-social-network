import { receberUsuario, logOut } from "../../services/index.js";
import { postarMensagem } from "../../services/index.js";
// import { loadPosts } from "../../pages/feed/index.js"
export default () => {
  const container = document.createElement("div");
  const userInfo = receberUsuario();
//   const mensagensPostadas = postarMensagem();
  const template = `
    
    <div class="perfil">
        <header class="header-feed">
            <h1 class="titulo-header">Ellas</h1>
            <button id="logout-perfil" class="logout-header"><img src="imagens/sair.png" alt="icone de sair"></button>
        </header>
        <div id="card-perfil">
            <img class="img-persona" src="imagens/mulher.png" alt="imagem persona">
            <h2 class="username">${userInfo.displayName}</h2>
            <button class="btn-editar-perfil">Editar</button>
        </div>
        <div id="posts-autor" class="posts-autor"></div>
          
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

//LOGOUT
const logout = container.querySelector("#logout-perfil");
logout.addEventListener("click", () => {
  logOut();
});

  return container;
};
 