(function(){

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

})()