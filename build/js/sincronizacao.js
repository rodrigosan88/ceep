(function(){

    $('#sync').click(function(){
        $(document).trigger('precisaSincronizar');
    });
    
    $(document).on('precisaSincronizar', function(){
        $('#sync').removeClass('botaoSync--sincronizado');
        $('#sync').addClass('botaoSync--esperando');
    });
    
    $(document).on('precisaSincronizar', function(){
        var cartoes = [];
        $('.cartao').each(function(){
            var cartao = {};
            cartao.conteudo = $(this).find('.cartao-conteudo').html();
            cartao.cor = $(this).find('.cartao-conteudo').context.style.backgroundColor;
            cartoes.push(cartao);
        });

        var mural = {
            usuario: 'rodrigo.menezes@cnj.jus.br',
            cartoes: cartoes
        };

        $.ajax({
            url: "https://ceep.herokuapp.com/cartoes/salvar",
            method: "POST",
            data: mural,
            success: function(res){
                $('#sync').addClass('botaoSync--sincronizado');
                apresentaMensagem(res.quantidade + " cartoes salvos em " + res.usuario, 'info');
                var quantidadeRemovidos = controladorDeCartoes.idUltimoCartao() - res.quantidade;
                console.log(quantidadeRemovidos + 'Cartoes removidos');
            },
            error: function(){
                $('#sync').addClass('botaoSync--deuRuim');
                apresentaMensagem("Nao foi possivel salvar o mural",'');
            },
            complete: function(){
                $('#sync').removeClass('botaoSync--esperando');
            }
        });        
    });
    
})();
