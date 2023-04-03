"use strict";
//
//Objeto Literal como namespace do projeto --> garante que sempre seja apontado
//para o mesmo objeto (objeto estático) sempre que App for chamado
//
var App = App || {};
/*
//-----------------------------------------------------------------------------
Módulo Principal --> primeiro a ser executado.
//-----------------------------------------------------------------------------
*
*/
//globais dentro do escopo atual (no doc -> principal.js)
var objCanvas;
var objImagens;

//
//Módulo Principal dentro do NAMESPACE APP
//
App.principal = (function ()
{
  $(document).ready( function()
  {
    objCanvas = App.singletons.singletonCanvas.getInstancia();
    objImagens = App.singletons.singletonImagens.getInstancia();
  })

  //função estática que chama funções genéricas para desenhar a tela inicial
  var desenhaTela = function ()
  {
    App.teoria.pararAnimacao();//se houver algo rodando, pára

     //garante que o evento KeyDown vai sobrescrever outros keydowns não
    //utilizados aqui!
    ajustaKeyDown();

    //garante que o evento MouseDown vai sobrescrever outros mousedowns não
    //utilizados aqui!
    ajustaMouseDown();

    //limpeza inicial da tela, para reconstrução (os dois canvas)
    App.strategiesTela.limpaTela.executa([
      "1",
      0,
      0,
      objCanvas.canvasWidth,
      objCanvas.canvasHeight
    ]);

    App.strategiesTela.limpaTela.executa([
      "2",
      0,
      0,
      objCanvas.canvasWidth,
      objCanvas.canvasHeight
    ]);

    //Pinta o fundo, com a cor e as coordenadas passadas nos parâmetros como
    //um array --> cor, x0, y0, x, y
    App.strategiesTela.construtorCorFundo.executa([
      "2",
      "#444",
      15,
      15,
      objCanvas.canvasWidth-20,
      objCanvas.canvasHeight - 15
    ]);

    //Carrega uma imagem na tela, a partir dos parâmetros passados como
    //array --> local da imagem, x0, y0, x, y
    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "lousa",
      10,
      10,
      objCanvas.canvasWidth-10,
      objCanvas.canvasHeight - 10
    ]);

    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "compasso",
      3*objCanvas.canvasWidth/4 - 30,
      60,
      200,
      156
    ]);

    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "grafico",
      80,
      320,
      500,
      100
    ]);

    //Aqui, carrega a imagem com o texto "TRIGONOMETRANDO"
    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "titulo",
      objCanvas.canvasWidth/8 - 30,
      objCanvas.canvasHeight/7 - 30,
      2*(objCanvas.canvasWidth/4) + 100,
      2*(objCanvas.canvasWidth/4)*0.2 + 50
    ]);

    //Aqui, desenha o texto na tela, com os parâmetros: mensagem, cor,
    //fonte (letra, tamanho), x, y
    var mensagem = "Seja bem vindo!";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "24px Arial",
      objCanvas.canvasWidth/6,
      objCanvas.canvasHeight/7 + (2*(objCanvas.canvasWidth/4)*0.25) + 10
    ]);

    mensagem = "Aqui você poderá consultar e praticar os conceitos básicos";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "24px Arial",
      objCanvas.canvasWidth/6,
      objCanvas.canvasHeight/7 + (2*(objCanvas.canvasWidth/4)*0.25) + 60
    ]);

    mensagem = "de trigonometria na circunferência!";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "24px Arial",
      objCanvas.canvasWidth/6,
      objCanvas.canvasHeight/7 + (2*(objCanvas.canvasWidth/4)*0.25) + 90
    ]);

    mensagem = "Explore e divirta-se!!!";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "24px Arial",
      3*objCanvas.canvasWidth/5 + 50,
      objCanvas.canvasHeight/7 + (2*(objCanvas.canvasWidth/4)*0.25) + 160
    ]);
  }
  //----------------------------------------------------------------------------
  //Detecta botões do teclado pressionados
  //----------------------------------------------------------------------------
  var ajustaKeyDown = function ()
  {
    //Para garantir nenhuma sobreposição de ações do evento keydown,
    //prevenindo execuções em telas erradas,
    //desvincula os eventos existentes
    objCanvas.doc.unbind("keydown");
  }

  //----------------------------------------------------------------------------
  // Detecta CLique
  //----------------------------------------------------------------------------
  var ajustaMouseDown = function ()
  {
    // desvincula os demais eventos, para que não execute na tela errada.
    objCanvas.canvas1.unbind();
  }

  return {
    inicio : desenhaTela
  }

})();

// --------------------------------------------------------------------------
/*
//Primeira execução --> Chama os métodos exetutados primeiramente,
//assim que o html for lido
*/
$(document).ready( function()
{
    //Esconde preloader antes de continuar, depois do load total
    $(window).load(function(){

      var posLoad = function ()
      {
        //Chama o "método" carregaMedidas do singletonCanvas
        //atribui as medidas ao CANVAS no html
        //-> objCanvas = instância única de singletonCanvas
        objCanvas.carregaMedidas();
        $('#preloader').fadeOut(500);//500 é a duração do efeito (0.5 seg)
        App.principal.inicio();
      }
      setTimeout(posLoad, 2000); //executa somente após 2 segundos
    });
}) // FIM $(document).ready
