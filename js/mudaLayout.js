(function () {
    var botaoMudaLayout = document.querySelector('#botaoMudaLayout');
    botaoMudaLayout.onclick = function () {
        if (document.querySelector('.mural').classList.toggle('mural--linhas')) {
            this.textContent = "Blocos";
        }
        else {
            this.textContent = "Linhas";
        }
    };
})()