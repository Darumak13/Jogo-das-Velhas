var player = "X"; // "X" começa primeiro 
var numJog = 0;

function checkjogo(id) {
    var opt = verificarSrc(id);

    // Verifica se a célula está vazia
    if (opt === "transp.png") {
        // Define a imagem com base no jogador atual
        document.getElementById(id).src = "img/" + (player === "X"  ? "IDOSO_FELIZ.jpg" : "IDOSO_SAD.jpg");
        numJog++; // Incrementa o número de jogadas

        // Verifica se há um vencedor
        if (winchek()) {
            alert("Fim de Jogo! " + player + " venceu!");
            return false;
        }
        // Verifica se deu velha
        if (numJog >= 9) {
            alert("Fim de jogo! Deu velha!!!");
            return false;
        }

        // Alterna o jogador
        player = (player === "X") ? "O" : "X";

        // Se o jogador for "O" e o PC estiver ativo
        if (player === "O" && document.getElementById('cpu').checked) {
            setTimeout(() => {
                checkjogo(jogoDoPc());
            }, 500); // Atraso para a jogada da máquina
        }
    }
}

function jogoDoPc() {
    var availableMoves = [];
    
    // Coleta todas as células vazias
    for (var i = 1; i <= 9; i++) {
        if (verificarSrc('c' + i) === "transp.png") {
            availableMoves.push('c' + i);
        }
    }

    // Se houver células disponíveis, a máquina faz uma jogada aleatória
    if (availableMoves.length > 0) {
        var randomIndex = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[randomIndex];
    }
    
    // Retorna uma célula aleatória (caso todas estejam ocupadas, o que não deve acontecer)
    return 'c' + Math.floor((Math.random() * 9) + 1);
}

function verificarSrc(id) {
    var file = document.getElementById(id).src;
    return file.substring(file.length - 10); // Retorna os últimos 10 caracteres da URL da imagem
}

function winchek() {
    // Verificação de linhas
    for (var i = 1; i <= 3; i++) {
        if (verificarSrc('c' + i) === verificarSrc('c' + (i + 1)) && verificarSrc('c' + i) === verificarSrc('c' + (i + 2)) && verificarSrc('c' + i) !== "transp.png") {
            return true;
        }
    }

    // Verificação de colunas
    for (var i = 1; i <= 3; i++) {
        if (verificarSrc('c' + (i * 3 - 2)) === verificarSrc('c' + (i * 3 - 1)) && verificarSrc('c' + (i * 3 - 2)) === verificarSrc('c' + (i * 3)) && verificarSrc('c' + (i * 3 - 2)) !== "transp.png") {
            return true;
        }
    }

    // Verificação de diagonais
    if (verificarSrc('c1') === verificarSrc('c5') && verificarSrc('c1') === verificarSrc('c9') && verificarSrc('c1') !== "transp.png") {
        return true;
    }
    if (verificarSrc('c3') === verificarSrc('c5') && verificarSrc('c3') === verificarSrc('c7') && verificarSrc('c3') !== "transp.png") {
        return true;
    }

    return false;
}
