"use strict";

var App = App || {};

//Apresenta os créditos e observações sobre o sistema
App.sobre = (function ()
{
  var objCanvas;
  var objImagens;
  var mensagem;

  $(document).ready( function()
  {
    //instância de singletonCanvas
    objCanvas = App.singletons.singletonCanvas.getInstancia();
    objImagens = App.singletons.singletonImagens.getInstancia();
  })

  //Função Principal
  var inicio = function ()
  {
    App.teoria.pararAnimacao();//se houver algo rodando, pára

    //garante que o evento KeyDown vai sobrescrever outros keydowns não
    //utilizados aqui!
    ajustaKeyDown();

    //ajusta as configurações de evento mouse down
    ajustaMouseDown();

    //limpeza inicial da tela, para reconstrução
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

    /*
    pinta o fundo
    */
    App.strategiesTela.construtorCorFundo.executa([
      "2",
      "#444",
      15,
      15,
      objCanvas.canvasWidth-20,
      objCanvas.canvasHeight - 15
    ]);

    /*
    carrega imagem de fundo
    */
    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "lousa",
      10,
      10,
      objCanvas.canvasWidth-10,
      objCanvas.canvasHeight - 10
    ]);

    mensagem = "Desenvolvido por";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Arial",
      objCanvas.canvasWidth/2 - 80,
      80
    ]);

    mensagem = "Denise Cristina Carrasco";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#b3ee3a",
      "23px Arial",
      objCanvas.canvasWidth/2 - 130,
      120
    ]);

    mensagem = "como parte do trabalho de graduação do curso de Tecnologia em";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Arial",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 20,
      160
    ]);

    mensagem = "Análise e Desenvolvimento de Sistema da Fatec Mogi das Cruzes,";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Arial",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 18,
      190
    ]);

    mensagem = "sob a orientação de";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Arial",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 15,
      220
    ]);

    mensagem = "Elias Ribeiro de Castro";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#b3ee3a",
      "22px Arial",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 215,
      220
    ]);

    mensagem = "e";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "22px Arial",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 446,
      220
    ]);

    mensagem = "Fretz Sievers Junior.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#b3ee3a",
      "22px Arial",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 465,
      220
    ]);

    mensagem = "Obs: Todas as imagens aqui utilizadas foram retiradas de bancos de imagens grátis";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "16px Arial",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 55,
      300
    ]);

    mensagem = "que distribuem somente arquivos sob a licença Creative Commons CC0, totalmente livres";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "16px Arial",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 25,
      330
    ]);

    mensagem = "de direitos autorais e disponíveis para uso comercial ou não, para alteração e distribuição,";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "16px Arial",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 25,
      360
    ]);

    mensagem = "sem necessidade de atribuição.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#fff",
      "16px Arial",
      objCanvas.canvasWidth/2 - (objCanvas.canvasWidth/3) + 25,
      390
    ]);
  }
  /*
    Detecta botões do teclado pressionados
  */
  var ajustaKeyDown = function ()
  {
    //Para garantir nenhuma sobreposição de ações do evento keydown,
    //prevenindo execuções em telas erradas,
    //desvincula os eventos existentes
    objCanvas.doc.unbind("keydown");
  }

  /*
    Detecta cliques
  */
  var ajustaMouseDown = function ()
  {
    // desvincula os demais eventos, para que não execute na tela errada.
    objCanvas.canvas1.unbind();
  }

  /*
    Retorno: função inicio -> ponto de acesso ao módulo
  */
  return {
    inicio: inicio //única função visível externamente ao módulo
  }
})();
