"use strict";

var App = App || {};

App.desafio = (function ()
{
  var objCanvas; // para a instância de Singleton Canvas
  var objImagens; // para a instância de Singleton Imagens
  var mensagem; //para textos em geral
  var primeiraTela; // para saber se é a tela inicial (habilitar botões nas telas certas)
  var telaQuestões; // para saber se é a tela das questões (habilitar botões)

  var sen45 = Math.sqrt(2)/2; //lembrando que sen45 = cos45
  var xBtSolucao; // para facilitar as medidas dos botões
  var hBotao = 28; // para facilitar as medidas dos botões
  var wBotao = 85; // para facilitar as medidas dos botões

  $(document).ready( function()
  {
    //instância de singletonCanvas
    objCanvas = App.singletons.singletonCanvas.getInstancia();
    objImagens = App.singletons.singletonImagens.getInstancia();

    xBtSolucao = objCanvas.canvasWidth - 220;
  })

  /*
  - Única função a ser chamada de fora do módulo.
  - Primeria função executada, base para executar as demais
  - Carrega todos os elementos iniciais
  */
  //----------------------------------------------------------------------------
  // Primeira função - Início
  //----------------------------------------------------------------------------
  var inicio = function ()
  {
    primeiraTela = true;

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

    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "desafioFrente",
      10,
      10,
      objCanvas.canvasWidth-10,
      objCanvas.canvasHeight - 10
    ]);

    //imagem, x0, y0, x, y --> Lápis do Desafio
    App.strategiesTela.construtorImagemFundo.executa([
      "1",
      "lapis",
      20,
      150,
      180,
      305
    ]);

    //fundo da caixa de diálogo
    App.strategiesTela.construtorCorFundo.executa([
      "2",
      "#fff",
      250,
      40,
      objCanvas.canvasWidth - 300,
      objCanvas.canvasHeight - 70
    ]);

    /*
      Caixa de Diálogo do Lápis
    */
    App.strategiesTela.construtorMoldura.executa([
      "1",
      "#bd2020",
      250,
      40,
      objCanvas.canvasWidth - 300,
      objCanvas.canvasHeight - 70,
      10
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      250,
      135,
      250,
      195,
      "#fff",
      15
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      170,
      200,
      250,
      200,
      "#bd2020",
      10
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      170,
      200,
      250,
      130,
      "#bd2020",
      10
    ]);

    App.strategiesTela.construtorImagemFundo.executa([
      "1",
      "interrogacao",
      objCanvas.canvasWidth/2 - 80,
      50,
      50,
      80
    ]);

    App.strategiesTela.construtorImagemFundo.executa([
      "1",
      "exclamacao",
      objCanvas.canvasWidth/2 + 180,
      50,
      25,
      80
    ]);

    mensagem = "Desafio";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold Italic 42px Arial",
      objCanvas.canvasWidth/2,
      120
    ]);

    mensagem = "Teste seu conhecimento em Trigonometria no Ciclo,";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 22px Arial",
      objCanvas.canvasWidth/2 - 150,
      160
    ]);

    mensagem = "resolvendo as questões propostas a seguir.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 22px Arial",
      objCanvas.canvasWidth/2 - 180,
      190
    ]);

    mensagem = "Não se preocupe, são só cinco questões para";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 22px Arial",
      objCanvas.canvasWidth/2 - 150,
      240
    ]);

    mensagem = "verificar se você entendeu bem os conceitos básicos."
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 22px Arial",
      objCanvas.canvasWidth/2 - 180,
      270
    ]);

    mensagem = "Após resolver as questões, você pode consultar";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 22px Arial",
      objCanvas.canvasWidth/2 - 150,
      320
    ]);

    mensagem = "as soluções detalhadas e comparar com as suas.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 22px Arial",
      objCanvas.canvasWidth/2 - 180,
      350
    ]);

    mensagem = "Se tiver dúvidas, observe melhor o ciclo e";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 22px Arial",
      objCanvas.canvasWidth/2 - 150,
      400
    ]);

    mensagem = "converse com seu professor.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 22px Arial",
      objCanvas.canvasWidth/2 - 180,
      430
    ]);

    //Botão OK
    App.strategiesTela.construtorImagemFundo.executa([
      "1",
      "btOk",
      objCanvas.canvasWidth - 200,
      objCanvas.canvasHeight - 95,
      80,
      50
    ]);
  }

  //----------------------------------------------------------------------------
  // Segunda função - Perguntas
  //----------------------------------------------------------------------------
  var perguntas = function ()
  {
    //limpeza inicial da tela, para reconstrução
    App.strategiesTela.limpaTela.executa([
      "1",
      0,
      0,
      objCanvas.canvasWidth,
      objCanvas.canvasHeight
    ]);

    //limpeza inicial da tela, para reconstrução
    App.strategiesTela.limpaTela.executa([
      "2",
      0,
      0,
      objCanvas.canvasWidth,
      objCanvas.canvasHeight
    ]);

    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "desafio",
      10,
      10,
      objCanvas.canvasWidth-10,
      objCanvas.canvasHeight - 10
    ]);

    //Linha Acima do titulo
    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 - 80,
      75,
      objCanvas.canvasWidth/2 + 75,
      75,
      "#5050ab",
      2
    ]);

    mensagem = "Questões";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#5050ab",
      "Bold 30px Arial",
      objCanvas.canvasWidth/2 - 70,
      100
    ]);

     //Linha Abaixo do titulo
    App.strategiesTela.construtorReta.executa([
      "2",
      objCanvas.canvasWidth/2 - 80,
      105,
      objCanvas.canvasWidth/2 + 75,
      105,
      "#5050ab",
      2
    ]);

     /*
    pinta o fundo da linha 1
    */
    App.strategiesTela.construtorCorFundo.executa([
      "2",
      //"#d5d8ef",
      "#5050ab",
      120,
      120,
      objCanvas.canvasWidth - 240,
      30
    ]);

    mensagem = "(1)  Para que valores de x temos sen x = cos x, sendo 0° < x < 360°?";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      //"#222",
      "#fff",
      "Bold 18px Arial",
      150,
      140
    ]);

    //Botão Solução para Questão 1
    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "btSolucao",
      xBtSolucao,
      121,
      wBotao,
      hBotao
    ]);

     /*
    pinta o fundo da linha 2
    */
    App.strategiesTela.construtorCorFundo.executa([
      "2",
      //"#c4ffc1",
      "#d5d8ef",
      120,
      160,
      objCanvas.canvasWidth - 240,
      55
    ]);

    mensagem = "(2)  Se sen x > sen y, estando x e y no primeiro quadrante, podemos";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      //"#222",
      "#222",
      "Bold 18px Arial",
      150,
      180
    ]);

    mensagem = "      afirmar que cos x > cos y?";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#222",
      "Bold 18px Arial",
      150,
      205
    ]);

    //Botão Solução para Questão 2
    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "btSolucao",
      xBtSolucao,
      171,
      wBotao,
      hBotao
    ]);

    /*
    pinta o fundo da linha 3
    */
    App.strategiesTela.construtorCorFundo.executa([
      "2",
      "#5050ab",
      120,
      225,
      objCanvas.canvasWidth - 240,
      55
    ]);

    mensagem = "(3)  Dê o sinal dos números:";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 18px Arial",
      150,
      245
    ]);

    mensagem = "      a) tg π/6     b) tg 5π/4     c) tg 7π/4     d) tg π/2";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 18px Arial",
      150,
      270
    ]);

    //Botão Solução para Questão 3
    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "btSolucao",
      xBtSolucao,
      237,
      wBotao,
      hBotao
    ]);

     /*
    pinta o fundo da linha 4
    */
    App.strategiesTela.construtorCorFundo.executa([
      "2",
      "#d5d8ef",
      120,
      290,
      objCanvas.canvasWidth - 240,
      55
    ]);

    mensagem = "(4)  Resolva as equações no intervalo 0 ≤ x < 2π:";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#222",
      "Bold 18px Arial",
      150,
      310
    ]);

    mensagem = "      a) sen x = 1    b) cos x = 0    c) tg x = 1    d) sen x = -1/2";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#222",
      "Bold 18px Arial",
      150,
      335
    ]);

    //Botão Solução para Questão 4
    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "btSolucao",
      xBtSolucao,
      303,
      wBotao,
      hBotao
    ]);

    /*
    pinta o fundo da linha 5
    */
    App.strategiesTela.construtorCorFundo.executa([
      "2",
      "#5050ab",
      120,
      355,
      objCanvas.canvasWidth - 240,
      55
    ]);

    mensagem = "(5)  Seja x = π/6. Determine os valores de:";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 18px Arial",
      150,
      375
    ]);

    mensagem = "      a) sen x     b) cos 2x      c) tg 3x     d) sen -x";
    App.strategiesTela.construtorTexto.executa([
      "2",
      mensagem,
      "#fff",
      "Bold 18px Arial",
      150,
      400
    ]);

    //Botão Solução para Questão 5
    App.strategiesTela.construtorImagemFundo.executa([
      "2",
      "btSolucao",
      xBtSolucao,
      369,
      wBotao,
      hBotao
    ]);
  }

  //----------------------------------------------------------------------------
  // Terceira função - Resposta 01
  //----------------------------------------------------------------------------
  var resposta01 = function ()
  {
    //cor, x0, y0, x, y
    //Cor do fundo para a resposta
    App.strategiesTela.construtorCorFundo.executa([
      "1",
      "#fff",
      50,
      50,
      objCanvas.canvasWidth - 100,
      objCanvas.canvasHeight - 100
    ]);

    /*
    Desenha a reta vertical do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 + objCanvas.canvasWidth/10 + 60,
      "#dedc28",
      3
    ]);

    mensagem = "sen";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#dedc28",
      "Bold 16px Arial",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 10,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
    ]);

     /*
    Desenha a reta horizontal do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - objCanvas.canvasWidth/10 - 10,
      objCanvas.canvasHeight/3 + 50,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 50,
      "#ae00ff",
      3
    ]);

    mensagem = "cos";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#ae00ff",
      "Bold 16px Arial",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 70,
    ]);

    /*
    Desenha a ponta (seta) da reta horizontal do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 45,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 55,
      "#ae00ff",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 45,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 20,
      objCanvas.canvasHeight/3 + 50,
      "#ae00ff",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 20,
      objCanvas.canvasHeight/3 + 50,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 55,
      "#ae00ff",
      2
    ]);

    /*
    Desenha a ponta (seta) da reta vertical do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      "#dedc28",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      "#dedc28",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      "#dedc28",
      2
    ]);

    //Arco Azul
    App.strategiesTela.construtorArco.executa([
        "1",
        objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
        objCanvas.canvasHeight/3 + 50,
        objCanvas.canvasWidth/10,
        0,
        - 2*Math.PI,
        "#5c54cf",
        3
    ]);

    //Pontos 45 e 225
    App.strategiesTela.construtorCirculo.executa([
        "1",
        (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))+((objCanvas.canvasWidth/10)*sen45),
        (objCanvas.canvasHeight/3 + 50)-(objCanvas.canvasWidth/10*sen45),
        4,
        0,
        - 2*Math.PI,
        "#f00",
        3
    ]);

    mensagem = "45°";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f00",
      "Bold 16px Arial",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))+((objCanvas.canvasWidth/10)*sen45) + 10,
      (objCanvas.canvasHeight/3 + 50)-(objCanvas.canvasWidth/10*sen45),
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))-((objCanvas.canvasWidth/10)*sen45),
        (objCanvas.canvasHeight/3 + 50)+(objCanvas.canvasWidth/10*sen45),
        4,
        0,
        - 2*Math.PI,
        "#f00",
        3
    ]);

    mensagem = "225°";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f00",
      "Bold 16px Arial",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))-((objCanvas.canvasWidth/10)*sen45) - 40,
      (objCanvas.canvasHeight/3 + 50)+(objCanvas.canvasWidth/10*sen45) + 10,
    ]);

    //Pontilhados e valores (seno e Cosseno)
    App.strategiesTela.construtorRetaPontilhada.executa([
      "1",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))+((objCanvas.canvasWidth/10)*sen45),
      (objCanvas.canvasHeight/3 + 50)-(objCanvas.canvasWidth/10*sen45),
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5)),
      (objCanvas.canvasHeight/3 + 50)-(objCanvas.canvasWidth/10*sen45),
      "#f00",
      3,
      [5] //dashed
    ]);

    mensagem = "√2/2"; //sen 45
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f00",
      "Bold 16px Arial",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5)) - 35,
      (objCanvas.canvasHeight/3 + 50)-(objCanvas.canvasWidth/10*sen45) + 5,
    ]);

    App.strategiesTela.construtorRetaPontilhada.executa([
      "1",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))+((objCanvas.canvasWidth/10)*sen45),
      (objCanvas.canvasHeight/3 + 50)-(objCanvas.canvasWidth/10*sen45),
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))+((objCanvas.canvasWidth/10)*sen45),
      (objCanvas.canvasHeight/3 + 50),
      "#f00",
      3,
      [5] //dashed
    ]);

    mensagem = "√2/2"; //cos 45
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f00",
      "Bold 16px Arial",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))+((objCanvas.canvasWidth/10)*sen45) - 20,
      (objCanvas.canvasHeight/3 + 50) + 20,
    ]);

    App.strategiesTela.construtorRetaPontilhada.executa([
      "1",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))-((objCanvas.canvasWidth/10)*sen45),
      (objCanvas.canvasHeight/3 + 50)+(objCanvas.canvasWidth/10*sen45),
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5)),
      (objCanvas.canvasHeight/3 + 50)+(objCanvas.canvasWidth/10*sen45),
      "#f00",
      3,
      [5] //dashed
    ]);

    mensagem = " -√2/2"; //sen 225
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f00",
      "Bold 16px Arial",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5)) + 5,
      (objCanvas.canvasHeight/3 + 50)+(objCanvas.canvasWidth/10*sen45) + 5,
    ]);

    App.strategiesTela.construtorRetaPontilhada.executa([
      "1",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))-((objCanvas.canvasWidth/10)*sen45),
      (objCanvas.canvasHeight/3 + 50)+(objCanvas.canvasWidth/10*sen45),
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))-((objCanvas.canvasWidth/10)*sen45),
      (objCanvas.canvasHeight/3 + 50),
      "#f00",
      3,
      [5] //dashed
    ]);

    mensagem = "-√2/2"; //cos 225
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f00",
      "Bold 16px Arial",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))-((objCanvas.canvasWidth/10)*sen45) - 20,
      (objCanvas.canvasHeight/3 + 50) - 5,
    ]);

    mensagem = "(Questão 1)  Para que valores de x temos sen x = cos x, sendo 0° < x < 360°?";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#222",
      "Bold 18px Arial",
      60,
      100
    ]);

    mensagem = "SOLUÇÃO:";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      100,
      150
    ]);

    mensagem = "Analisando o ciclo trigonométrico, percebe-se que os arcos";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      130,
      190
    ]);

    mensagem = "que possuem seus valores de seno e cosseno iguais só podem";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      100,
      220
    ]);

    mensagem = "ser: um arco com extremidade bem no ponto médio do arco no";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      100,
      250
    ]);

    mensagem = "Primeiro Quadrante e um arco com extremidade no ponto médio ";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      100,
      280
    ]);

    mensagem = "do Terceiro Quadrante.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      100,
      310
    ]);

    mensagem = "Assim, só podem ser 45° e 225°.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      130,
      360
    ]);

    btSaiSolucao();
  }

  //----------------------------------------------------------------------------
  // Quarta função - Resposta 02
  //----------------------------------------------------------------------------
  var resposta02 = function ()
  {
    //Cor do fundo para a resposta
    App.strategiesTela.construtorCorFundo.executa([
      "1",
      "#fff",
      50,
      50,
      objCanvas.canvasWidth - 100,
      objCanvas.canvasHeight - 100
    ]);

    /*
    Desenha a reta vertical do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 + objCanvas.canvasWidth/10 + 60,
      "#dedc28",
      3
    ]);

    mensagem = "sen";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#dedc28",
      "Bold 16px Arial",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 10,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
    ]);

     /*
    Desenha a reta horizontal do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - objCanvas.canvasWidth/10 - 10,
      objCanvas.canvasHeight/3 + 50,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 50,
      "#ae00ff",
      3
    ]);

    mensagem = "cos";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#ae00ff",
      "Bold 16px Arial",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 70,
    ]);

    /*
    Desenha a ponta (seta) da reta horizontal do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 45,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 55,
      "#ae00ff",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 45,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 20,
      objCanvas.canvasHeight/3 + 50,
      "#ae00ff",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 20,
      objCanvas.canvasHeight/3 + 50,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 55,
      "#ae00ff",
      2
    ]);

    /*
    Desenha a ponta (seta) da reta vertical do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      "#dedc28",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      "#dedc28",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      "#dedc28",
      2
    ]);

    //Arco Azul
    App.strategiesTela.construtorArco.executa([
        "1",
        objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
        objCanvas.canvasHeight/3 + 50,
        objCanvas.canvasWidth/10,
        0,
        - 2*Math.PI,
        "#5c54cf",
        3
    ]);

    //Pontos x e y
    App.strategiesTela.construtorCirculo.executa([
        "1",
        (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))+((objCanvas.canvasWidth/10)*sen45) - 10,
        (objCanvas.canvasHeight/3 + 50)-(objCanvas.canvasWidth/10*sen45) - 10,
        4,
        0,
        - 2*Math.PI,
        "#f00",
        3
    ]);

    mensagem = "x";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f00",
      "Bold 16px Arial",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))+((objCanvas.canvasWidth/10)*sen45) - 5,
      (objCanvas.canvasHeight/3 + 50)-(objCanvas.canvasWidth/10*sen45) - 15,
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))+((objCanvas.canvasWidth/10)*sen45) + 10,
        (objCanvas.canvasHeight/3 + 50)-(objCanvas.canvasWidth/10*sen45) + 10,
        4,
        0,
        - 2*Math.PI,
        "#00ff00",
        3
    ]);

    mensagem = "y";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#00ff00",
      "Bold 16px Arial",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))+((objCanvas.canvasWidth/10)*sen45) + 15,
      (objCanvas.canvasHeight/3 + 50)-(objCanvas.canvasWidth/10*sen45) + 10,
    ]);

    //Pontilhados x
    App.strategiesTela.construtorRetaPontilhada.executa([
      "1",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))+((objCanvas.canvasWidth/10)*sen45) - 10,
      (objCanvas.canvasHeight/3 + 50)-(objCanvas.canvasWidth/10*sen45) - 10,
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5)),
      (objCanvas.canvasHeight/3 + 50)-(objCanvas.canvasWidth/10*sen45) - 10,
      "#f00",
      3,
      [5] //dashed
    ]);

    App.strategiesTela.construtorRetaPontilhada.executa([
      "1",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))+((objCanvas.canvasWidth/10)*sen45) - 10,
      (objCanvas.canvasHeight/3 + 50)-(objCanvas.canvasWidth/10*sen45) - 10,
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5)) +((objCanvas.canvasWidth/10)*sen45) - 10,
      (objCanvas.canvasHeight/3 + 50),
      "#f00",
      3,
      [5] //dashed
    ]);

    //Pontilhados y
    App.strategiesTela.construtorRetaPontilhada.executa([
      "1",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))+((objCanvas.canvasWidth/10)*sen45) + 10,
      (objCanvas.canvasHeight/3 + 50)-(objCanvas.canvasWidth/10*sen45) + 10,
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5)),
      (objCanvas.canvasHeight/3 + 50)-(objCanvas.canvasWidth/10*sen45) + 10,
      "#00ff00",
      3,
      [5] //dashed
    ]);

    App.strategiesTela.construtorRetaPontilhada.executa([
      "1",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))+((objCanvas.canvasWidth/10)*sen45) + 10,
      (objCanvas.canvasHeight/3 + 50)-(objCanvas.canvasWidth/10*sen45) + 10,
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5)) +((objCanvas.canvasWidth/10)*sen45) + 10,
      (objCanvas.canvasHeight/3 + 50),
      "#00ff00",
      3,
      [5] //dashed
    ]);

    mensagem = "(Questão 2)  Se sen x > sen y, estando x e y no primeiro quadrante, podemos";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#222",
      "Bold 18px Arial",
      60,
      100
    ]);

    mensagem = "          afirmar que cos x > cos y?";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#222",
      "Bold 18px Arial",
      60,
      130
    ]);

    mensagem = "SOLUÇÃO:";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      100,
      170
    ]);

    mensagem = "A melhor forma de analisar o caso é construir o ciclo e";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      130,
      200
    ]);

    mensagem = "acrescentar os pontos x e y conforme o enunciado, para poder";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      100,
      230
    ]);

    mensagem = "observar o que acontece.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      100,
      260
    ]);

    mensagem = "Analisando os pontos e seus respectivos reflexos nos eixos dos";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      130,
      290
    ]);

    mensagem = "senos e dos cossenos, pode-se verificar que, para as condições do";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      100,
      320
    ]);

    mensagem = "enunciado, cos x < cos y. Logo, a resposta é NÃO!";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      100,
      350
    ]);

    btSaiSolucao();
  }

  //----------------------------------------------------------------------------
  // Quinta função - Resposta 03
  //----------------------------------------------------------------------------
  var resposta03 = function ()
  {
    //Cor do fundo para a resposta
    App.strategiesTela.construtorCorFundo.executa([
      "1",
      "#fff",
      50,
      50,
      objCanvas.canvasWidth - 100,
      objCanvas.canvasHeight - 100
    ]);

    /*
    Desenha a reta vertical do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 + objCanvas.canvasWidth/10 + 60,
      "#dedc28",
      3
    ]);

    mensagem = "sen";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#dedc28",
      "Bold 16px Arial",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 10,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
    ]);

     /*
    Desenha a reta horizontal do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - objCanvas.canvasWidth/10 - 10,
      objCanvas.canvasHeight/3 + 50,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 50,
      "#ae00ff",
      3
    ]);

    mensagem = "cos";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#ae00ff",
      "Bold 16px Arial",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 70,
    ]);

    /*
    Desenha a reta Tangente do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10,
      objCanvas.canvasHeight/3 + objCanvas.canvasWidth/10 + 70,
      "#f00",
      3
    ]);

    mensagem = "tg";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f00",
      "Bold 16px Arial",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
    ]);

    /*
    Desenha a ponta (seta) da reta tangente do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 - 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      "#f00",
      3
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      "#f00",
      3
    ]);

    /*
    Desenha a ponta (seta) da reta horizontal do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 45,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 55,
      "#ae00ff",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 45,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 20,
      objCanvas.canvasHeight/3 + 50,
      "#ae00ff",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 20,
      objCanvas.canvasHeight/3 + 50,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + objCanvas.canvasWidth/10 + 10,
      objCanvas.canvasHeight/3 + 55,
      "#ae00ff",
      2
    ]);

    /*
    Desenha a ponta (seta) da reta vertical do sistema cartesiano
    */
    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      "#dedc28",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) - 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      "#dedc28",
      2
    ]);

    App.strategiesTela.construtorReta.executa([
      "1",
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5) + 5,
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 40,
      objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
      objCanvas.canvasHeight/3 - objCanvas.canvasWidth/10 + 30,
      "#dedc28",
      2
    ]);

    //Arco Azul
    App.strategiesTela.construtorArco.executa([
        "1",
        objCanvas.canvasWidth-(objCanvas.canvasWidth/5),
        objCanvas.canvasHeight/3 + 50,
        objCanvas.canvasWidth/10,
        0,
        - 2*Math.PI,
        "#5c54cf",
        3
    ]);

    //Ponto 0 Tangente
    App.strategiesTela.construtorCirculo.executa([
        "1",
        (objCanvas.canvasWidth-(objCanvas.canvasWidth/5)) + objCanvas.canvasWidth/10,
        (objCanvas.canvasHeight/3 + 50),
        4,
        0,
        - 2*Math.PI,
        "#f00",
        3
    ]);

    mensagem = "0";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f00",
      "Bold 14px Arial",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5)) + objCanvas.canvasWidth/10 + 3,
        (objCanvas.canvasHeight/3 + 50) - 5,
    ]);

    //Ponto cental
    App.strategiesTela.construtorCirculo.executa([
        "1",
        (objCanvas.canvasWidth-(objCanvas.canvasWidth/5)),
        (objCanvas.canvasHeight/3 + 50),
        4,
        0,
        - 2*Math.PI,
        "#f00",
        3
    ]);

    //Demais Pontos
    App.strategiesTela.construtorCirculo.executa([
        "1",
        (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))+((objCanvas.canvasWidth/10)*(Math.sqrt(3)/2)),
        (objCanvas.canvasHeight/3 + 50)-(objCanvas.canvasWidth/10*0.5),
        4,
        0,
        - 2*Math.PI,
        "#0f0",
        3
    ]);

    mensagem = "π/6";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#0f0",
      "Bold 16px Arial",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))+((objCanvas.canvasWidth/10)*(Math.sqrt(3)/2)) - 20,
      (objCanvas.canvasHeight/3 + 50)-(objCanvas.canvasWidth/10*0.5) + 25,
    ]);

    //Pontilhado
    App.strategiesTela.construtorRetaPontilhada.executa([
      "1",
      objCanvas.canvasWidth-objCanvas.canvasWidth/5,
      objCanvas.canvasHeight/3 + 50,
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))+((objCanvas.canvasWidth/10)*(Math.sqrt(3)/2)) + 18,
      (objCanvas.canvasHeight/3 + 50)-(objCanvas.canvasWidth/10*0.5) - 10,
      "#0f0",
      2,
      [5] //dashed
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))-((objCanvas.canvasWidth/10)*sen45),
        (objCanvas.canvasHeight/3 + 50)+(objCanvas.canvasWidth/10*sen45),
        4,
        0,
        - 2*Math.PI,
        "#333333",
        3
    ]);

    mensagem = "5π/4";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#333333",
      "Bold 16px Arial",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))-((objCanvas.canvasWidth/10)*sen45) - 40,
      (objCanvas.canvasHeight/3 + 50)+(objCanvas.canvasWidth/10*sen45) + 10,
    ]);

    //Pontilhado
    App.strategiesTela.construtorRetaPontilhada.executa([
      "1",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))-((objCanvas.canvasWidth/10)*sen45),
      (objCanvas.canvasHeight/3 + 50)+(objCanvas.canvasWidth/10*sen45),
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))-((objCanvas.canvasWidth/10)*sen45) + 172,
      (objCanvas.canvasHeight/3 + 50)+(objCanvas.canvasWidth/10*sen45) - 172,
      "#333333",
      2,
      [5] //dashed
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        (objCanvas.canvasWidth-(objCanvas.canvasWidth/5)),
        (objCanvas.canvasHeight/3 + 50) - objCanvas.canvasWidth/10,
        4,
        0,
        - 2*Math.PI,
        "#f00",
        3
    ]);

    mensagem = "π/2";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f00",
      "Bold 16px Arial",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5)) - 35,
      (objCanvas.canvasHeight/3 + 50) - objCanvas.canvasWidth/10,
    ]);

    App.strategiesTela.construtorCirculo.executa([
        "1",
        (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))+((objCanvas.canvasWidth/10)*sen45),
        (objCanvas.canvasHeight/3 + 50)+(objCanvas.canvasWidth/10*sen45),
        4,
        0,
        - 2*Math.PI,
        "#f67b0e",
        3
    ]);

    mensagem = "7π/4";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#f67b0e",
      "Bold 16px Arial",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))+((objCanvas.canvasWidth/10)*sen45) - 40,
      (objCanvas.canvasHeight/3 + 50)+(objCanvas.canvasWidth/10*sen45) + 5,
    ]);

    //Pontilhado
    App.strategiesTela.construtorRetaPontilhada.executa([
      "1",
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5)),
      (objCanvas.canvasHeight/3 + 50),
      (objCanvas.canvasWidth-(objCanvas.canvasWidth/5))+((objCanvas.canvasWidth/10)*sen45) + 32,
        (objCanvas.canvasHeight/3 + 50)+(objCanvas.canvasWidth/10*sen45) + 32,
      "#f67b0e",
      2,
      [5] //dashed
    ]);


    mensagem = "(Questão 3)  Dê o sinal dos números:";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#222",
      "Bold 18px Arial",
      60,
      100
    ]);

    mensagem = "          a) tg π/6     b) tg 5π/4    c) tg 7π/4     d) tg π/2";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#222",
      "Bold 18px Arial",
      60,
      130
    ]);

    mensagem = "SOLUÇÃO:";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      100,
      170
    ]);

    mensagem = "Desenhando os pontos sobre o ciclo fica mais fácil solucionar.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      130,
      200
    ]);

    mensagem = "Lembre-se que os valores da Tangente crescem conforme vc ";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      130,
      230
    ]);

    mensagem = "anda para cima sobre o eixo das tangentes e que o ponto 0 do";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      100,
      260
    ]);

    mensagem = "eixo das tangentes coincide com a circunferência.";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      100,
      290
    ]);

    mensagem = "Observando os pontos no ciclo, podemos responder:";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      130,
      320
    ]);

    mensagem = "a) +     b) +     c) -     d) Não existe tg π/2";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      130,
      350
    ]);

    btSaiSolucao();
  }

  //----------------------------------------------------------------------------
  // Sexta função - Resposta 04
  //----------------------------------------------------------------------------
  var resposta04 = function ()
  {
    //Cor do fundo para a resposta
    App.strategiesTela.construtorCorFundo.executa([
      "1",
      "#fff",
      50,
      50,
      objCanvas.canvasWidth - 100,
      objCanvas.canvasHeight - 100
    ]);

    mensagem = "(Questão 4)  Resolva as equações no intervalo 0 ≤ x < 2π:";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#222",
      "Bold 18px Arial",
      60,
      100
    ]);

    mensagem = "          a) sen x = 1    b) cos x = 0    c) tg x = 1    d) sen x = -1/2";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#222",
      "Bold 18px Arial",
      60,
      130
    ]);

    mensagem = "SOLUÇÃO:";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      100,
      175
    ]);

    mensagem = "a) sen x = 1 => sen x = sen 90° => x = 90° ou π/2 rad ----> Então: S={π/2}";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      230,
      175
    ]);

    mensagem = "b) cos x = 0 => cos x = cos 90° => x = 90° ou π/2 rad";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      230,
      215
    ]);

    mensagem = "e cos x = cos 270° => x = 270° ou 3π/2 rad. ----> Então: S={π/2, 3π/2}";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      255,
      235
    ]);

    mensagem = "c) tg x = 1 => tg x = tg 45° => x = 45° ou π/4 rad";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      230,
      275
    ]);

    mensagem = "e tg x = tg 225° => x = 225° ou 5π/4 rad. ----> Então: S={π/4, 5π/4}";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      255,
      295
    ]);

    mensagem = "d) sen x = -1/2 => sen x = sen 210° => x = 210° ou 7π/6 rad";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      230,
      340
    ]);

    mensagem = "e sen x = sen 330° => x = 330° ou 11π/6 rad ----> Então: S={7π/6, 11π/6}";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      255,
      360
    ]);

    btSaiSolucao();
  }

  //----------------------------------------------------------------------------
  // Sétima função - Resposta 05
  //----------------------------------------------------------------------------
  var resposta05 = function ()
  {
    //Cor do fundo para a resposta
    App.strategiesTela.construtorCorFundo.executa([
      "1",
      "#fff",
      50,
      50,
      objCanvas.canvasWidth - 100,
      objCanvas.canvasHeight - 100
    ]);

    mensagem = "(Questão 5)  Seja x = π/6. Determine os valores de:";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#222",
      "Bold 18px Arial",
      60,
      100
    ]);

    mensagem = "          a) sen x     b) cos 2x      c) tg 3x     d) sen -x";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#222",
      "Bold 18px Arial",
      60,
      130
    ]);

    mensagem = "SOLUÇÃO:";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      100,
      180
    ]);

    mensagem = "a) sen x = sen π/6 = sen 30° = 1/2";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      330,
      220
    ]);

    mensagem = "b) cos 2x = cos 2π/6 = cos 60° = 1/2";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      320,
      260
    ]);

    mensagem = "c) tg 3x = tg 3π/6 = tg 90° => Não existe tg 90°";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      280,
      300
    ]);

    mensagem = "d) sen -x = sen -π/6 = sen -30° ou sen 330° = -1/2";
    App.strategiesTela.construtorTexto.executa([
      "1",
      mensagem,
      "#bd2020",
      "Bold 18px Arial",
      270,
      340
    ]);

    btSaiSolucao();
  }

  //----------------------------------------------------------------------------
  // Oitava função - botão para Sair da Solução
  //----------------------------------------------------------------------------
  var btSaiSolucao = function ()
  {
    //Botão OK
    App.strategiesTela.construtorImagemFundo.executa([
      "1",
      "btOk",
      objCanvas.canvasWidth/2 - 25,
      objCanvas.canvasHeight - 95,
      50,
      30
    ]);
  }

  /*
    Detecta botões do teclado pressionados
  */
  //----------------------------------------------------------------------------
  // Nova função - Ajusta KeyDown
  //----------------------------------------------------------------------------
  var ajustaKeyDown = function ()
  {
    //desvincula os eventos existentes
    objCanvas.doc.unbind("keydown");
  }

  /*
  // Função para detectar o clique e verificar se as coordenadas dele está
  // dentro da área de agum dos botões,
  // para direcionar à ação adequada
  */
  //----------------------------------------------------------------------------
  // Função ajustaMouseDown
  //----------------------------------------------------------------------------
  //
  var ajustaMouseDown = function ()
  {
    // desvincula os demais eventos, para que não execute na tela errada.
    objCanvas.canvas1.unbind();

    objCanvas.canvas1.bind("mousedown.Desafio", function(event)
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

      if(x > objCanvas.canvasWidth - 200 && x < objCanvas.canvasWidth - 120
           && y > objCanvas.canvasHeight - 95 && y < objCanvas.canvasHeight - 45
           && primeiraTela)
      {
        //Botão OK da primeira tela do Desafio
          perguntas();
          telaQuestões = true; //vai pra tela de perguntas
          primeiraTela = false;
      }
     else if(x > xBtSolucao && x < xBtSolucao + wBotao
            && y > 121 && y < 121 + hBotao
            && telaQuestões)
     {
        //Resposta 1
          resposta01();
          telaQuestões = false;
     }
     else if(x > xBtSolucao && x < xBtSolucao + wBotao
            && y > 171 && y < 171 + hBotao
            && telaQuestões)
     {
        //Resposta 2
          resposta02();
          telaQuestões = false;
     }
     else if(x > xBtSolucao && x < xBtSolucao + wBotao
            && y > 237 && y < 237 + hBotao
            && telaQuestões)
     {
        //Resposta 3
          resposta03();
          telaQuestões = false;
     }
     else if(x > xBtSolucao && x < xBtSolucao + wBotao
            && y > 303 && y < 303 + hBotao
            && telaQuestões)
     {
        //Resposta 4
          resposta04();
          telaQuestões = false;
     }
     else if(x > xBtSolucao && x < xBtSolucao + wBotao
            && y > 369 && y < 369 + hBotao
            && telaQuestões)
     {
        //Resposta 5
          resposta05();
          telaQuestões = false;
     }
     else if(x > objCanvas.canvasWidth/2 - 25 && x < objCanvas.canvasWidth/2 + 25
        && y > objCanvas.canvasHeight - 95 && y < objCanvas.canvasHeight - 65
        && !primeiraTela)
    {
          //limpa a tela superior (canvas superior), para apagar somente a resposta
          App.strategiesTela.limpaTela.executa([
            "1",
            0,
            0,
            objCanvas.canvasWidth,
            objCanvas.canvasHeight
          ]);

          telaQuestões = true;
    }

    });
  };

  /*
    Retorno: função inicio -> ponto de acesso ao módulo
  */
  return {
    inicio: inicio //única função visível externamente ao módulo
  }

})();
