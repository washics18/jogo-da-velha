var rodada = 1;
var matriz_jogo = Array(3); // a,b,c

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;

$(document).ready(function () {

    $("#btn_iniciar_jogo").click(function () {

        // validação dos apelidos dos jogadores
        // função val() recupera o value do campo caracteristica do input 

        if ($("#entrada_jogador_1").val() == "") {
            alert("Apelido jogador 1 não foi preenchido");
            return false;
        }

        if ($("#entrada_jogador_2").val() == "") {
            alert("Apelido jogador 2 não foi preenchido");
            return false;
        }

        // exibir nomes dos jogadores
        $("#nome_jogador_1").html($("#entrada_jogador_1").val());
        $("#nome_jogador_2").html($("#entrada_jogador_2").val());

        // controlar visualizações das divs
        $("#pagina_inicial").hide();
        $("#palco_jogo").show();

    })

    $(".jogada").click(function () {

        var campo_clicado = this.id; // o this faz referencia ao elemento clicado do click. Ex: no meio vai trazer b-2, no primeiro quadrado a-1.
        $("#" + campo_clicado).off();
        jogo(campo_clicado);

    })

    function jogo(id) { // jogo vai trazer o campo clicado para o lugar do id na função

        var icone = "";
        var ponto = 0;

        if ((rodada % 2) == 1) { // quando o valor da rodada for dividido por 2 e tiver resto 1 é a vez do primeiro jogador ou quando par é o 1 impar é o 2.
            icone = 'url("imagens/marcacao_1.png")';
            ponto = -1;
        }
        else {
            icone = 'url("imagens/marcacao_2.png")';
            ponto = 1;

        }

        rodada++; // incrementar a quantidade de rodada durante o jogo.
        $("#" + id).css('background-image', icone);

        var linha_coluna = id.split("-"); // retirar o traço do id

        matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto; // primeira chave a linha a,b,c a segunda chave coluna 1,2,3

        verifica_combinacao();
    }

    function verifica_combinacao() {

        // verificar na horizontal

        var pontos = 0;

        for (var i = 1; i <= 3; i++) {
            pontos = pontos + matriz_jogo['a'][i];
        }
        ganhador(pontos);
        pontos = 0; // para zerar a verificação 

        for (var i = 1; i <= 3; i++) {
            pontos = pontos + matriz_jogo['b'][i];
        }
        ganhador(pontos);
        pontos = 0;

        for (var i = 1; i <= 3; i++) {
            pontos = pontos + matriz_jogo['c'][i];
        }
        ganhador(pontos);

        // verificar na vertical

        for (var l = 1; l <= 3; l++) {
            pontos = 0; // começar do zero os pontos
            pontos += matriz_jogo['a'][l]; // soma da linha "a" + "b" + "c" em relação o id
            pontos += matriz_jogo['b'][l];
            pontos += matriz_jogo['c'][l];

            ganhador(pontos);

        }

        // verificar na diagonal

        pontos = 0;
        pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
        ganhador(pontos);

        pontos = 0;
        pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
        ganhador(pontos);




    }

    function ganhador(pontos) {

        if (pontos == -3) {

            var jogada_1 = $("#entrada_jogador_1").val();
            alert(jogada_1 + " é o vencedor");
            $(".jogada").off(); // desabilita a função click no vencedor 
        }
        else if (pontos == 3) {

            var jogada_2 = $("#entrada_jogador_2").val();
            alert(jogada_2 + " é o vencedor");
            $(".jogada").off();
        }
    }

})
