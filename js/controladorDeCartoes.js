var controladorDeCartoes = (function(){
    
    var contadorCartoes = $('.cartao').length;
    //$('.mural').on('click','.opcoesDoCartao-remove', criaOpcoesDoCartao);
    
    function decideTipoCartao(conteudo){
        var quebras = conteudo.split("<br>").length;
        var totalDeLetras = conteudo.replace(/<br>/g, ' ').length;

        var ultimoMaior = '';
        conteudo.replace('/<br>/g', ' ')
            .split(' ')
            .forEach(function(palavra){
                if(palavra.length > ultimoMaior.length){
                    ultimoMaior = palavra;
                }    
            });
        var tamMaior = ultimoMaior.length;
        var tipoCartao = 'cartao--textoPequeno';
        if(tamMaior < 9 && quebras < 5 && totalDeLetras < 55){
            tipoCartao = 'cartao--textoGrande';
        } else if(tamMaior < 12 && quebras < 6 && totalDeLetras < 75){
            tipoCartao = 'cartao--textoMedio';
        }
        return tipoCartao;
    }    
    
    function adicionaCartao(conteudo, cor){
        contadorCartoes++;

        var opcoes = criaOpcoesDoCartao(contadorCartoes);
        var tipoCartao = decideTipoCartao(conteudo);
        var conteudoTag = $('<p>').addClass('cartao-conteudo').append(conteudo);

        $('<div>')
            .attr('id', 'cartao_' + contadorCartoes)
            .attr('tabindex', 0)
            .addClass('cartao')
            .addClass(tipoCartao)
            .append(opcoes)
            .append(conteudoTag)
            .css('background-color', cor)
            .prependTo('.mural').fadeIn();
        /*var contexto = {
            cartao: {
                id:"cartao_" + contadorCartoes,
                tipo: tipoCartao,
                cor: cor,
                conteudo: conteudo
            },
            cores: [
                {nome: 'Padrao', codigo:'#EBEF40'},
                {nome: 'Importante', codigo:'#F05450'},
                {nome: 'Tarefa', codigo:'#92C4EC'},
                {nome: 'Inspiracao', codigo:'#76EF40'}
            ]
        };
        var template = $('#cartoes-template').html();
        var templateRenderizado = Mustache.render(template,contexto);
        $('.mural').prepend(templateRenderizado);*/
        $(document).trigger('precisaSincronizar');
        apresentaMensagem('Um novo cartao foi adicionado!!','success');
    }
    
    return {
        adicionaCartao: adicionaCartao,
        idUltimoCartao: function(){
            return contadorCartoes;
        }
    
    }
    
    function removeCartao(){
        var cartao = document.querySelector('#cartao_' + this.dataset.ref);
        cartao.classList.add('cartao--some');
        setTimeout(function(){
            cartao.remove();
            $(document).trigger('precisaSincronizar');
        }, 400);
        apresentaMensagem('Um cartao foi removido de seu mural','');
    }
    
})();