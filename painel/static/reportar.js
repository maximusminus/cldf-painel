/* OS-087 — o formulário de reportar um problema.
 *
 * Um arquivo local, como `explorador.js`: nenhuma página do painel carrega script inline
 * (a postura que o teste do explorador já guardava desde o OS-079), e nada aqui faz
 * requisição — o envio é um link que o VISITANTE segue, então o site continua com 0
 * requisições próprias.
 *
 * O alvo e o limite vêm dos atributos `data-` do próprio formulário, escritos pela
 * construção: este arquivo não conhece nenhum endereço.
 */
(function () {
  var f = document.getElementById("form-reportar");
  if (!f) { return; }
  var ACAO = f.getAttribute("data-acao") || "";
  var LIMITE = parseInt(f.getAttribute("data-limite"), 10) || 6000;
  var campoUrl = document.getElementById("reportar-pagina");
  if (campoUrl && window.location && window.location.href) {
    campoUrl.value = window.location.href;
  }
  var aviso = document.getElementById("reportar-aviso");
  f.addEventListener("submit", function (ev) {
    var titulo = f.elements.title.value.trim();
    var texto = f.elements.body.value.trim();
    var pagina = campoUrl ? campoUrl.value.trim() : "";
    if (!titulo || !texto) { return; }
    var corpo = texto + "\n\n---\nPagina: " + pagina;
    ev.preventDefault();
    if (corpo.length > LIMITE) {
      aviso.textContent =
        "O texto passou de " + LIMITE + " caracteres (" + corpo.length +
        "). Encurte antes de enviar.";
      return;
    }
    aviso.textContent = "";
    window.open(
      ACAO + "?title=" + encodeURIComponent(titulo) +
      "&body=" + encodeURIComponent(corpo),
      "_blank",
      "noopener"
    );
  });
})();
