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