import { registerLogin, atualizarPerfil } from "../../services/index.js";

export default () => {
  console.log("cadastro");
  const container = document.createElement("div");

  const template = `
  <div class="cadastro">  
  <h1 class="header-register">Ellas</h1>
    <p>Uma filmografia repleta de mulheres incríveis para te inspirar!</p>
    <div class="container-register">
      <div class="card-register">
        <h2 class="titulo-card">CRIAR UMA NOVA CONTA</h2>
        <form>
          <input required="required" autocomplete="off" type="text" placeholder="Insira seu nome completo" id="username"
          class='login-area'>
          <input required="required" autocomplete="off" type="email" placeholder="example@example.com" id="register-email"
          class="login-area">
          <input required="required" autocomplete="off" type="password" placeholder="Insira uma senha (Min. 6 digítos)"
          id="register-password" class="login-area">
          <div></div>
          <button class="btn button-area" id="button-register">Cadastrar</button>
          <p class='font-small-register'>Já tem uma conta?
        <a href='/#login' id='sign-up-login'>Faça o login.</a>
        </form>
      </div>
    </div> 
    </div> 
  `;

  container.innerHTML = template;

  const name = container.querySelector("#username");
  const email = container.querySelector("#register-email");
  const password = container.querySelector("#register-password");
  const registerBtn = container.querySelector("#button-register");

  registerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    registerLogin(email.value, password.value)
      .then((user) => {
        window.location.hash = "#feed";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("deu ruim", errorCode, errorMessage);
      });
    atualizarPerfil(name.value);
  });

  return container;
};
