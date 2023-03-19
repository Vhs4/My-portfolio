const nomeUsuario = "Victor Hugo";
document.querySelector("header h1").innerText = nomeUsuario + " - Portfólio";

const linksNavegacao = document.querySelectorAll("nav ul li a");

linksNavegacao.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const idAlvo = link.getAttribute("href");
    document.querySelector(idAlvo).scrollIntoView({
      behavior: "smooth",
    });
  });
});