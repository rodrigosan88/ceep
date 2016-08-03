var botaoMudaLayout = document.querySelector('#botaoMudaLayout');

botaoMudaLayout.onclick = function () {
    if(document.querySelector('.mural').classList.toggle('mural--linhas')){
        this.textContent = "Blocos";
    } else {
        this.textContent = "Linhas";
    }
};

var botoesRemove = document.querySelectorAll('.opcoesDoCartao-remove');
for (var i=0; i < botoesRemove.length; i++) {
    botoesRemove[i].addEventListener('click', removeCartao);
}

function removeCartao(){
    var cartao = document.querySelector('#cartao_' + this.dataset.ref);
    cartao.classList.add('cartao--some');
    setTimeout(function(){
        cartao.remove();
    }, 400);
}

var contadorCartoes = $('.cartao').length;

$(".novoCartao").submit( function(event){

    var campoConteudo = $('.novoCartao-conteudo');
    var conteudo = campoConteudo.val().trim();
    
    if(conteudo){
        contadorCartoes++;
        
        var botaoRemover = $('<button>')
                            .addClass('opcoesDoCartao-opcao')
                            .addClass('opcoesDoCartao-remove')
                            .attr('data-ref',contadorCartoes)
                            .text('Remover')
                            .click(removeCartao);
        
        var opcoes = $('<div>').addClass('opcoesDoCartao').append(botaoRemover);
        
        var conteudoTag = $('<p>').addClass('cartao-conteudo').append(conteudo);
        
        $('<div>')
            .attr('id', 'cartao_' + contadorCartoes)
            .addClass('cartao')
            .append(opcoes)
            .append(conteudoTag)
            .prependTo('.mural').fadeIn();
    } else {
        $('.mensagem').remove();
        $('<span>').addClass('mensagem').addClass('erro').append('TESTE').appendTo('.novoCartao').fadeIn(411);
    }
    
    campoConteudo.val('');
    event.preventDefault();
});