(function (controlador){

    $(".novoCartao").submit( function(event){

        var campoConteudo = $('.novoCartao-conteudo');
        var conteudo = campoConteudo.val().trim().replace(/\n/g, "<br>");

        if(conteudo){
            controlador.adicionaCartao(conteudo, '');
        } else {
            $('.mensagem').remove();
            $('<span>').addClass('mensagem').addClass('erro').append('TESTE').appendTo('.novoCartao').fadeIn(411);
        }
        $(document).trigger('precisaSincronizar');
        campoConteudo.val('');
        event.preventDefault();
    });
    
})(controladorDeCartoes)
