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
    apresentaMensagem('Um cartao foi removido de seu mural','');
}

var contadorCartoes = $('.cartao').length;

$(".novoCartao").submit( function(event){

    var campoConteudo = $('.novoCartao-conteudo');
    var conteudo = campoConteudo.val().trim().replace(/\n/g, "<br>");
    
    if(conteudo){
        adicionaCartao(conteudo, '');
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

$('#ajuda').click(function(){
    $.getJSON('https://ceep.herokuapp.com/cartoes/instrucoes', function(res){
        console.log(res);
        res.instrucoes.forEach(function(instrucao){
            adicionaCartao(instrucao.conteudo, instrucao.cor);
        });
    });
});

function adicionaCartao(conteudo, cor){
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
        .css('background-color', cor)
        .prependTo('.mural').fadeIn();
    apresentaMensagem('Um novo cartao foi adicionado!!','success');
}

$('#sync').click(function(){
    $('#sync').removeClass('botaoSync--sincronizado');
    $('#sync').addClass('botaoSync--esperando');
    
    var cartoes = [];
    $('.cartao').each(function(){
        var cartao = {};
        cartao.conteudo = $(this).find('.cartao-conteudo').html();
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

var mensagemCount = 0;

function apresentaMensagem(mensagem, tipo){
    
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