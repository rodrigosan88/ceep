var mensagemCount = 0;
var alertas = false;
function apresentaMensagem(mensagem, tipo){
    if(alertas){
        var id = mensagemCount;
        mensagemCount++;
        var botaoFechar = $('<span>')
                            .addClass('closebtn')
                            .append('&times;')
                            .click(function(){
                                var div = this.parentElement;
                                div.style.opacity = 0;
                                setTimeout(function(){div.remove();}, 600);                            
                            });

        $('<div>')
            .attr('id', id)
            .addClass('alert')
            .addClass(tipo)
            .append(botaoFechar)
            .append(mensagem)
            .prependTo('#msg');
    }
}

var usuario = 'rodrigo.menezes@cnj.jus.br';

$.getJSON(
    'https://ceep.herokuapp.com/cartoes/carregar?callback=?',
    {usuario:usuario},
    function(res){
        var cartoes = res.cartoes;
        apresentaMensagem(cartoes.length + ' carregados em ' + res.usuario ,'info');
        cartoes.forEach(function(cartao){
            controladorDeCartoes.adicionaCartao(cartao.conteudo);   
        });
    }
);