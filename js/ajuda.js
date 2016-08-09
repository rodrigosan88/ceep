(function(controlador){

    $('#ajuda').click(function(){
        $.getJSON('https://ceep.herokuapp.com/cartoes/instrucoes', function(res){
            console.log(res);
            res.instrucoes.forEach(function(instrucao){
                controlador.adicionaCartao(instrucao.conteudo, instrucao.cor);
            });
        });
    });

})(controladorDeCartoes)