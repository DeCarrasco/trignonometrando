"use strict";

var App = App || {};

App.ciclo = (function ()
{
  var objCanvas; // para a instância de Singleton Canvas
  var objImagens; // para a instância de Singleton Imagens
  var mensagem; // para textos no geral
  var primeiraTela; // indica se é a primeira tela do módulo, (garante que o ângulo comece sempre em ZERO)

  //constantes
  var X_ZERO;
  var Y_ZERO;
  var RAIO;

  //Constantes numéricas - ângulos principais
  var CENTO_OITENTA = Math.PI;
  var TREZENTOS_SESSENTA = 2*Math.PI;

  $(document).ready( function()
  {
    //instância de singletons
    objCanvas = App.singletons.singletonCanvas.getInstancia();
    objImagens = App.singletons.singletonImagens.getInstancia();

    //constantes para serem usadas pelas funções
    X_ZERO = objCanvas.canvasWidth/4 + objCanvas.canvasWidth/20 - 30;
    Y_ZERO = objCanvas.canvasHeight/2.1 + 20;
    RAIO = objCanvas.canvasHeight/3;
  })

  //- Única função a ser chamada de fora do módulo.
  //- Primeria função executada, base para executar as demais
  //- Carrega todos os elementos iniciais
  //----------------------------------------------------------------------------
  // Primeira função - Início
  //----------------------------------------------------------------------------
  var inicio = function ()
  {
    App.teoria.pararAnimacao();//se houver algo rodando, pára

    //quando início é executado, a primeira tela do módulo é renderizada
    //aqui, indica que é a primeira tela
    primeiraTela = true;

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

    //Imagem de Fundo
    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "cadernoEsquerda",
      5,
      5,
      objCanvas.canvasWidth - 5,
      objCanvas.canvasHeight - 5
    ]);

    //Desenha a circunferência inicial e todos os elementos relacionados
    //no canvas de baixo, para não ser redesenhado

    // Desenhando a circunferência
    App.strategiesTela.construtorArco.executa([
        "2",
        X_ZERO,
        Y_ZERO,
        RAIO,
        0,
        TREZENTOS_SESSENTA,
        "#A9A9A9",
        4
    ]);

    //Eixo dos Cossenos
    App.strategiesTela.construtorReta.executa([
      "2",
      (X_ZERO)-(RAIO) + 1,
      Y_ZERO,
      (X_ZERO)+(RAIO) + 20,
      Y_ZERO,
      "#4B00B2",
      4
    ]);
    //Seta do eixo dos cossenos
    App.strategiesTela.construtorReta.executa([
      "2",
      (X_ZERO)+(RAIO) + 20,
      Y_ZERO,
      (X_ZERO)+(RAIO) + 10,
      Y_ZERO - 5,
      "#4B00B2",
      3
    ]);
    App.strategiesTela.construtorReta.executa([
      "2",
      (X_ZERO)+(RAIO) + 20,
      Y_ZERO,
      (X_ZERO)+(RAIO) + 10,
      Y_ZERO + 5,
      "#4B00B2",
      3
    ]);

    mensagem = "cos";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#4B00B2",
      "Bold 16px Arial",
      (X_ZERO)+(RAIO) + 4,
      Y_ZERO + 17
    ]);

    mensagem = "1";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#4B00B2",
      "Bold 16px Arial",
      (X_ZERO)+(RAIO) - 13,
      Y_ZERO + 17
    ]);

    mensagem = "-1";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#4B00B2",
      "Bold 16px Arial",
      (X_ZERO)-(RAIO) + 4,
      Y_ZERO + 17
    ]);

    //Eixo dos Senos
    App.strategiesTela.construtorReta.executa([
      "2",
      X_ZERO,
      (Y_ZERO)-(RAIO) - 20,
      X_ZERO,
      (Y_ZERO)+(RAIO) + 1,
      "#008000",
      4
    ]);
    //Seta do eixo dos senos
    App.strategiesTela.construtorReta.executa([
      "2",
      X_ZERO,
      (Y_ZERO)-(RAIO) - 20,
      X_ZERO - 5,
      (Y_ZERO)-(RAIO) - 10,
      "#008000",
      3
    ]);
    App.strategiesTela.construtorReta.executa([
      "2",
      X_ZERO,
      (Y_ZERO)-(RAIO) - 20,
      X_ZERO + 5,
      (Y_ZERO)-(RAIO) - 10,
      "#008000",
      3
    ]);

    mensagem = "sen";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#008000",
      "Bold 16px Arial",
      (X_ZERO) - 35,
      Y_ZERO - RAIO - 2
    ]);

    mensagem = "1";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#008000",
      "Bold 16px Arial",
      (X_ZERO) - 13,
      Y_ZERO - RAIO + 17
    ]);

    mensagem = "-1";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#008000",
      "Bold 16px Arial",
      (X_ZERO) - 20,
      Y_ZERO + RAIO - 5
    ]);

    //Eixo das Tangentes
    App.strategiesTela.construtorReta.executa([
      "2",
      (X_ZERO)+(RAIO)+2,
      51,
      (X_ZERO)+(RAIO)+2,
      objCanvas.canvasHeight - 60,
      "#DAA520",
      4
    ]);
    //seta do eixo das Tangentes
    App.strategiesTela.construtorReta.executa([
      "2",
      (X_ZERO)+(RAIO)+2,
      51,
      (X_ZERO)+(RAIO) - 3,
      61,
      "#DAA520",
      3
    ]);
    App.strategiesTela.construtorReta.executa([
      "2",
      (X_ZERO)+(RAIO)+2,
      51,
      (X_ZERO)+(RAIO) + 7,
      61,
      "#DAA520",
      3
    ]);

    mensagem = "tg";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#DAA520",
      "Bold 16px Arial",
      (X_ZERO)+(RAIO) + 5,
      80
    ]);

    //Ponto de Origem - 0
    mensagem = "0";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#4B00B2",
      "Bold 16px Arial",
      (X_ZERO) - 12,
      Y_ZERO + 15
    ]);

    //Reta vermelha inicial
    //com as coordenadas para a reta vermelha (que delimita o ângulo),
    //em 0 graus
    reDesenha(X_ZERO + RAIO + 4, Y_ZERO, 0);

    //Imagem demonstrativa das Teclas direcionais (teclado)
    //imagem, x0, y0, x, y
    App.strategiesTela.construtorImagemFundo.executa([
      "1",
      "teclas",
      (X_ZERO)+(2*RAIO) + 60,
      objCanvas.canvasHeight/4 - 10,
      RAIO/1.5,
      (RAIO/1.5)*0.64
    ]);

    //Seta o texto inicial na tela
    //--> Mensagem inicial de uso -- Instruções básicas
    //
    //Fundo Azul Instruções
    App.strategiesTela.construtorCorFundo.executa([
      "1",
      "#d0d3ec",
      (X_ZERO)+(RAIO) + 50,
      objCanvas.canvasHeight/2 - 35,
      475,
      120
    ]);

    //Linha Azul - Acima do titulo
    App.strategiesTela.construtorReta.executa([
      "2",
      (X_ZERO)+(RAIO) + 93,
      objCanvas.canvasHeight/4 - 70,
      (X_ZERO)+(3*RAIO) + 140,
      objCanvas.canvasHeight/4 - 70,
      "#1f1fff",
      2
    ]);

    //Linha Azul - Abaixo do titulo
    App.strategiesTela.construtorReta.executa([
      "2",
      (X_ZERO)+(RAIO) + 93,
      objCanvas.canvasHeight/4 - 30,
      (X_ZERO)+(3*RAIO) + 140,
      objCanvas.canvasHeight/4 - 30,
      "#1f1fff",
      2
    ]);

    mensagem = "O Ciclo Trigonométrico";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#1f1fff",
      "Bold 35px Arial",
      (X_ZERO)+(RAIO) + 90,
      objCanvas.canvasHeight/4 - 40
    ]);

    mensagem = "Use as teclas direcionais do seu teclado (setas";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#191970",
      "Bold 18px Arial",
      (X_ZERO)+(RAIO) + 90,
      objCanvas.canvasHeight/2 - 10
    ]);

     mensagem = "para cima e para baixo, conforme a imagem acima)";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#191970",
      "Bold 18px Arial",
      (X_ZERO)+(RAIO) + 60,
      objCanvas.canvasHeight/2 + 15
    ]);

    mensagem = "para interagir com o ciclo e verificar as relações";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#191970",
      "Bold 18px Arial",
      (X_ZERO)+(RAIO) + 60,
      objCanvas.canvasHeight/2 + 40
    ]);

    mensagem = "trigonométricas, ou escolha entre os botões abaixo:";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#191970",
      "Bold 18px Arial",
      (X_ZERO)+(RAIO) + 60,
      objCanvas.canvasHeight/2 + 65
    ]);

    App.strategiesTela.construtorCorFundo.executa([
      "2",
      "#e9ebff",
      2*objCanvas.canvasWidth/3 - 55,
      objCanvas.canvasHeight/2 + 140,
      190,
      40
    ]);

    //Botão 30°
    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "btTrinta",
      2*objCanvas.canvasWidth/3 - 50,
      objCanvas.canvasHeight/2 + 145,
      50,
      35
    ]);
    //Botão 45°
    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "btQuarentaCinco",
      2*objCanvas.canvasWidth/3 + 15,
      objCanvas.canvasHeight/2 + 145,
      50,
      35
    ]);
    //Botão 60°
    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "btSessenta",
      2*objCanvas.canvasWidth/3 + 80,
      objCanvas.canvasHeight/2 + 145,
      50,
      35
    ]);

    //Linha Azul - Acima dos Botões 30, 45 e 60
    App.strategiesTela.construtorReta.executa([
      "2",
      2*objCanvas.canvasWidth/3 - 55,
      objCanvas.canvasHeight/2 + 140,
      2*objCanvas.canvasWidth/3 + 135,
      objCanvas.canvasHeight/2 + 140,
      "#1f1fff",
      1
    ]);

  }// fim função início

  //Recebe as coordenadas para calcular o novo ponto
  //para a reta pontilhada que cruza a tangente, as coordenadas das demais retas
  //pontilhadas, da reta vermelha
  //Redesenha o ciclo completamente
  //----------------------------------------------------------------------------
  // Segunda função - reDesenha
  //----------------------------------------------------------------------------
  var reDesenha = function (pontoX, pontoY, angRad)
  {
    //limpeza inicial da tela, para reconstrução
    //somente o canvas superior
    App.strategiesTela.limpaTela.executa([
      "1",
      0,
      0,
      objCanvas.canvasWidth,
      objCanvas.canvasHeight,
    ]);

    // chamada do novo ponto aqui para desenhar as retas pontilhadas
    var novoP = App.strategiesCalculadora.novoPonto.calcula([pontoX, pontoY, 0, X_ZERO, Y_ZERO, RAIO]);

    //Para a reta pontilhada laranja, somente se ângulo for diferente de 90
    //e de 270
    if(angRad!= (90*CENTO_OITENTA)/180 && angRad!= (270*CENTO_OITENTA)/180)
    {
      /*
      Desenhando a reta Laranja PONTILHADA
      */
      App.strategiesTela.construtorRetaPontilhada.executa([
        "1",
        pontoX,
        pontoY,
        novoP[0],
        novoP[1],
        "#DAA520",
        3,
        [5] //dashed
      ]);
    }

    //pontilhado até os senos ---> mesmo y, x0
      App.strategiesTela.construtorRetaPontilhada.executa([
        "1",
        X_ZERO,
        pontoY,
        pontoX,
        pontoY,
        "#008000",
        3,
        [5] //dashed
      ]);

      //pontilhado até os cossenos ---> mesmo x, y0
      App.strategiesTela.construtorRetaPontilhada.executa([
        "1",
        pontoX,
        Y_ZERO,
        pontoX,
        pontoY,
        "#4B00B2",
        3,
        [5] //dashed
      ]);

    if(angRad>0 || angRad!=(359*CENTO_OITENTA)/180)
    {
    //Preenche o ângulo com arcos coloridos, para indicar a área que ele representa
        for(var i = RAIO - 2; i >= 4; i = i-4)
        {
          // Desenhando as circunferências
          App.strategiesTela.construtorArco.executa([
              "1",
              X_ZERO,
              Y_ZERO,
              i,
              0,
              angRad,
              "#F00",
              0.7
          ]);
        }
    }

    //Reta Vermelha que delimita o ângulo
    //Por último, para ficar sobreposta aos demais
    App.strategiesTela.construtorReta.executa([
      "1",
      X_ZERO,
      Y_ZERO,
      pontoX,
      pontoY,
      "#B22222",
      4
    ]);
  }// Fim Função Redesenha

  // Recebe o valor do ângulo
  // chama a função para calcular seno, cosseno e tangente
  // Exibe na tela os valores (ângulo, seno, cosseno e tangente)

  //----------------------------------------------------------------------------
  // Terceira função - reEscreve
  //----------------------------------------------------------------------------
  var reEscreve = function (graus)
  {
    var rad = graus*CENTO_OITENTA/180;

    //Fundo Azul - Ângulo
    App.strategiesTela.construtorCorFundo.executa([
      "1",
      "#d0d3ec",
      (X_ZERO)+(RAIO)*1.75 - 50,
      objCanvas.canvasHeight/4 + 30,
      2*(RAIO) + 90,
      30
    ]);

    //Valor ângulo
    mensagem = graus + "°  ||  " + parseFloat(rad.toFixed(5)) + " rad  ||  "
                     + parseFloat((rad/CENTO_OITENTA).toFixed(5)) + " π rad";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#191970",
      "Bold 20px Arial",
      (X_ZERO)+(RAIO)*1.5 + 20,
      objCanvas.canvasHeight/4 + 50
    ]);

    mensagem = "Medida do Ângulo: ";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#1f1fff",
      "Bold 18px Arial",
      (X_ZERO)+(RAIO)*1.5 - 10,
      objCanvas.canvasHeight/4 + 20
    ]);

    //Fundo Azul - Seno
    App.strategiesTela.construtorCorFundo.executa([
      "1",
      "#d0d3ec",
      (X_ZERO)+(RAIO)*1.75 - 65,
      objCanvas.canvasHeight/4 + 95,
      2*(RAIO) - 90,
      30
    ]);

    //valor Seno
    mensagem = App.strategiesTrigo.seno.calcula(rad);
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#191970",
      "Bold 20px Arial",
      (X_ZERO)+(RAIO)*1.75 + 50,
      objCanvas.canvasHeight/4 + 115
    ]);

    mensagem = "Seno:     ";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#1f1fff",
      "Bold 18px Arial",
      (X_ZERO)+(RAIO)*1.75 - 50,
      objCanvas.canvasHeight/4 + 115
    ]);

    //Fundo Azul - Cosseno
    App.strategiesTela.construtorCorFundo.executa([
      "1",
      "#d0d3ec",
      (X_ZERO)+(RAIO)*1.75 - 65,
      objCanvas.canvasHeight/4 + 135,
      2*(RAIO) - 90,
      30
    ]);

    //valor cosseno
    mensagem = App.strategiesTrigo.cosseno.calcula(rad);
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#191970",
      "Bold 20px Arial",
      (X_ZERO)+(RAIO)*1.75 + 50,
      objCanvas.canvasHeight/4 + 155
    ]);

    mensagem = "Cosseno:  ";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#1f1fff",
      "Bold 18px Arial",
      (X_ZERO)+(RAIO)*1.75 - 50,
      objCanvas.canvasHeight/4 + 155
    ]);

    //Fundo Azul - Tangente
    App.strategiesTela.construtorCorFundo.executa([
      "1",
      "#d0d3ec",
      (X_ZERO)+(RAIO)*1.75 - 65,
      objCanvas.canvasHeight/4 + 175,
      2*(RAIO) - 90,
      30
    ]);

    //valor Tangente
    mensagem = App.strategiesTrigo.tangente.calcula(rad);
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#191970",
      "Bold 20px Arial",
      (X_ZERO)+(RAIO)*1.75 + 50,
      objCanvas.canvasHeight/4 + 195
    ]);

    mensagem = "Tangente: ";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#1f1fff",
      "Bold 18px Arial",
      (X_ZERO)+(RAIO)*1.75 - 50,
      objCanvas.canvasHeight/4 + 195
    ]);

    //Fundo AZUL da Observação
    App.strategiesTela.construtorCorFundo.executa([
      "1",
      "#e9ebff",
      (X_ZERO)+2.8*(RAIO) + 25,
      objCanvas.canvasHeight/4 + 95,
      195,
      110
    ]);

    mensagem = "Obs:";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f00",
      "Bold 16px Arial",
      (X_ZERO)+2.8*(RAIO) + 35,
      objCanvas.canvasHeight/4 + 125
    ]);

    mensagem = "Os valores são";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#191970",
      "Bold 16px Arial",
      (X_ZERO)+2.8*(RAIO) + 80,
      objCanvas.canvasHeight/4 + 125
    ]);

    mensagem = "arredondados para até ";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#191970",
      "Bold 16px Arial",
      (X_ZERO)+2.8*(RAIO) + 35,
      objCanvas.canvasHeight/4 + 155
    ]);

    mensagem = "cinco casas decimais.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#191970",
      "Bold 16px Arial",
      (X_ZERO)+2.8*(RAIO) + 35,
      objCanvas.canvasHeight/4 + 185
    ]);

  }//Fim Função reEscreve

  //Detecta as teclas para cima e para baixo, para fazer o ângulo crescer ou
  //encolher e atualizar a tela conforme essa variação.
  //Aqui, faz as tranformações para encontrar as coordenadas todas, chama as
  //funções para redesenhar todo o ciclo e para reescrever na tela os resultados
  //(ângulo - graus e radianos - , seno, cosseno, tangente)

  //----------------------------------------------------------------------------
  // Quarta Função - ajustaKeydown
  // Quando um botão do teclado é pressionado...
  // Caso seja seta para cima ou seta para baixo, segue:
  //----------------------------------------------------------------------------

  // Fora da função, pois deve guardar o valor final dentro da função
  //var angFinal = 0;
  var angFinal;

  var ajustaKeyDown = function ()
  {
    //desvincula os eventos existentes (todos os keydowns)
    objCanvas.doc.unbind("keydown");

    objCanvas.doc.on("keydown.ciclo", function (evt)
    {
      var angRad; // para uso interno na função

      // garante que o ângulo sempre comece em ZERO quando entrar no módulo
      if(primeiraTela)
      {
        angFinal = 0;
        primeiraTela = false;
      }

      switch (evt.keyCode) //Testa o código do evento do teclado
      {
        //
        /*
        código 40 -> seta para baixo --------------------------------------------
        Faz a reta andar no sentido antihorário, fazendo o ângulo decrescer
        */
        case 40:
          /*
          Como a coordenada Y no canvas é invertida em relação ao plano cartesiano,
          é preciso pensar no ciclo com sentido invertido.
          Quando o angFinal anterior for 360 (ou, corrigido o sentido,
          angFinal anterior = 0), queremos que o valor a seguir não seja mais
          acrescido, e sim que retorne ao valor inicial 1 (pois vamos trabalhar
          com ângulos apenas de 0 à 360).
          */
          if(angFinal==360)
            angFinal=1;
          else
            angFinal++;

          //somente depois de tomada a decisão acima, aplica-se a decisão a seguir
          //para o angFinal atualizado
          if(angFinal==360)
            angRad = 0;

          else
            angRad = (angFinal*CENTO_OITENTA)/180;// valor corrigido, em Rad

          break;

        //
        /*
        seta para cima ----------------------------------------------
        */
        case 38:
          /*
          Como a coordenada Y no canvas é invertida em relação ao plano cartesiano,
          é preciso pensar no ciclo com sentido invertido.
          Quando o angFinal anterior for 0 (ou, corrigido o sentido,
          angFinal anterior = 360), queremos que o valor a seguir não seja mais
          descrescido, e sim que retorne ao valor 359 (pois vamos trabalhar
          com ângulos apenas de 0 à 360).
          */
          if(angFinal==0)
            angFinal=359;
          else
            angFinal--;

          //somente depois de tomada a decisão acima, aplica-se a decisão a seguir
          //para o angFinal atualizado
          if(angFinal==0)
            angRad = (360*CENTO_OITENTA)/180;

          else
            angRad = (angFinal*CENTO_OITENTA)/180;

          break;

        /*
        Para qualquer outra tecla, encerra a execução dessa função
        */
        default:
          return;
      }
      //chama função para calcular o ponto da reta vermelha,
      // para redesenhar e escreescrever
      var ponto = App.strategiesCalculadora.ponto.calcula([angRad, X_ZERO, Y_ZERO, RAIO]);
      reDesenha(ponto[0], ponto[1], angRad);
      reEscreve(360-angFinal);
    });
  } //Fim ajustaKeydown

  /*
  // Função para detectar o clique e verificar se as coordenadas dele estão
  // dentro da área de algum dos botões,
  // para direcionar à ação adequada
  */
  //----------------------------------------------------------------------------
  // Quinta Função - ajustaMouseDown
  //----------------------------------------------------------------------------
  //
  var ajustaMouseDown = function ()
  {
    // desvincula os demais eventos, para que não execute na tela errada.
    objCanvas.canvas1.unbind();

    objCanvas.canvas1.bind("mousedown.Ciclo", function(event)
    {
      var x, y;

      //a função offset() indica a posição real de um objeto em relação à página
      //sempre com dois valores: .left-> distância à esquerda; .top -> do topo
      //assim, encontramos a posição exata do canvas.
      var posicaoOffset = objCanvas.canvas1.offset();

      /*
      // - clientX indica a posição x do elemento (ou evento, no caso, o clique)
      dentro da área útil do browser (excluindo abas, barras de rolagem, etc).
      // - document.body.scrollLeft -> distância de rolagem da página, à
      esquerda
      // - document.documentElement.scrollLeft -> distância de rolagem do
      elemento, à esquerda
      // - Assim, X = coordenada absoluta do clique + espaço rolado da página à
      esquerda + espaço rolado do elemento à esquerda - distância do elemento
      ao canto esquerdo da página
      */
      //nesse ponto, é preciso fazer o acesso ao DOM para verificar a rolagem.
      //objCanvas.doc[0] = document (o retorno de $(document) é um array de dois
      //elementos, o primeiro deles, de índice 0, é o document, como em js puro)
      //Assim, a função abaixo objCanvas.doc[0].body.scrollLeft é o mesmo que:
      //document.body.scrollLeft. Fazendo essa substituição, é possível
      //manter o acesso único ao DOM no singletonCanvas
      x = event.clientX + objCanvas.doc[0].body.scrollLeft
          + objCanvas.doc[0].documentElement.scrollLeft
          - Math.floor(posicaoOffset.left);

      /*
      Para y, todas as definições anteriores são válidas, para a coordenada
      na vertical (distância do topo)
      */
      y = event.clientY + objCanvas.doc[0].body.scrollTop
          + objCanvas.doc[0].documentElement.scrollTop
          - Math.floor(posicaoOffset.top) + 1;

      //Botão 30°
      if(x >= 2*objCanvas.canvasWidth/3 - 48
        && x <= 2*objCanvas.canvasWidth/3 - 2
        && y >= objCanvas.canvasHeight/2 + 147
        && y <= objCanvas.canvasHeight/2 + 178)
      {
        angFinal = 330;
        primeiraTela = false;
        var ponto = App.strategiesCalculadora.ponto.calcula([
          330*CENTO_OITENTA/180,
          X_ZERO,
          Y_ZERO,
          RAIO
        ]);
        reDesenha(ponto[0], ponto[1], 330*CENTO_OITENTA/180);
        reEscreve(360-angFinal);
      }
      //Botão 45°
      else if(x >= 2*objCanvas.canvasWidth/3 + 17
        && x <= 2*objCanvas.canvasWidth/3 + 63
        && y >= objCanvas.canvasHeight/2 + 147
        && y <= objCanvas.canvasHeight/2 + 178)
      {
        angFinal = 315;
        primeiraTela = false;
        var ponto = App.strategiesCalculadora.ponto.calcula([
          315*CENTO_OITENTA/180,
          X_ZERO,
          Y_ZERO,
          RAIO
        ]);
        reDesenha(ponto[0], ponto[1], 315*CENTO_OITENTA/180);
        reEscreve(360-angFinal);
      }
      //Botão 60°
      else if(x >= 2*objCanvas.canvasWidth/3 + 82
        && x <= 2*objCanvas.canvasWidth/3 + 128
        && y >= objCanvas.canvasHeight/2 + 147
        && y <= objCanvas.canvasHeight/2 + 178)
      {
        angFinal = 300;
        primeiraTela = false;
        var ponto = App.strategiesCalculadora.ponto.calcula([
          300*CENTO_OITENTA/180,
          X_ZERO,
          Y_ZERO,
          RAIO
        ]);
        reDesenha(ponto[0], ponto[1], 300*CENTO_OITENTA/180);
        reEscreve(360-angFinal);
      }
    });
  } //Fim ajustaMouseDown

  /*
    Retorno: função inicio -> ponto de acesso ao módulo
  */
  return {
    inicio: inicio //única função visível externamente ao módulo
  }
})();
