//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do Número Secreto';
//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 100';
let listaNumeroSorteados = [];
let numeroLimite = 3;
let numeroSecreto = gerarNumeroSecreto();
let tentativa = 1;

function exibirTextoTela (tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mensagemInicial() {
    exibirTextoTela('h1', 'Jogo do Número Secreto');
    exibirTextoTela('p', 'Escolha um número entre 1 e 10');
}
mensagemInicial();


function verificarChute() {
    let chute = document.querySelector('input').value;
    let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativa = `Você descobriu o número secreto com ${tentativa} ${palavraTentativa}!`;

    if (chute == numeroSecreto){
        document.getElementById('reiniciar').removeAttribute('disabled');
        //reiniciarJogo();
        exibirTextoTela('h1', 'Parabéns!');
        exibirTextoTela('p', mensagemTentativa);
    }
    else {
        if (chute > numeroSecreto) {
        exibirTextoTela('p', 'O número secreto é menor');
        } 
        else {
        exibirTextoTela('p', 'O número secreto é maior');
        }
        tentativa ++;
        limparCampo();
    }

}

function gerarNumeroSecreto(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let qtdNumerosLista = listaNumeroSorteados.length;

    if (qtdNumerosLista == numeroLimite){
        listaNumeroSorteados = [];
    }

    if (listaNumeroSorteados.includes(numeroEscolhido)){
        return gerarNumeroSecreto();
    }
    else {
        listaNumeroSorteados.push(numeroEscolhido);
        console.log(listaNumeroSorteados);
        return numeroEscolhido;
    }

}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroSecreto();
    limparCampo();
    mensagemInicial();
    tentativa++;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
