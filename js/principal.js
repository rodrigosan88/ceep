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
    var conteudo = campoConteudo.val().trim().replace(/\n/g, "<br>");
    
    if(conteudo){
        contadorCartoes++;
        
        var botaoRemover = $('<button>')
                            .addClass('opcoesDoCartao-opcao')
                            .addClass('opcoesDoCartao-remove')
                            .attr('data-ref',contadorCartoes)
                            .text('Remover')
                            .click(removeCartao);
        
        var opcoes = $('<div>').addClass('opcoesDoCartao').append(botaoRemover);
        var tipoCartao = decideTipoCartao(conteudo);
        var conteudoTag = $('<p>').addClass('cartao-conteudo').append(conteudo);
        
        $('<div>')
            .attr('id', 'cartao_' + contadorCartoes)
            .addClass('cartao')
            .addClass(tipoCartao)
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
    debugger;
    return tipoCartao;
}

$('#busca').on('input', function(){
    var busca = $(this).val().trim();
    
    if(busca.length){
        $('.cartao').hide().filter(function(){
            var conteudoCartao = $(this).find('.cartao-conteudo').text();
            var regex = new RegExp(busca, 'i');
            return conteudoCartao.match(regex);
        }).show();
    }else{
        $('.cartao').show();
    }
});