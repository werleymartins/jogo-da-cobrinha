//Cria o elemento onde o jogo será executado
let canvas = document.getElementById("snake");

let context = canvas.getContext("2d");
let direction = "";
let box = 32;

//Não permite que aconteça um último movimento após o jogo finalizar
let flag = true;

//Cria a cobrinha e define sua posição inicial de maneira aleatória
let snake = [];
snake[0] = {
    x: Math.floor(Math.random() * 16) * box,
    y: Math.floor(Math.random() * 16) * box
}

//Cria a comidinha e define sua posição inicial de maneira aleatória
let food = {
    x: Math.floor(Math.random() * 16) * box,
    y: Math.floor(Math.random() * 16) * box
}

//Inicia o jogo com intervalo de 100 milissegundos
let game = setInterval(iniciarJogo, 100);

//Verifica o evento de clique do teclado e chama a função atualizarDirecao
document.addEventListener('keydown', atualizarDirecao);

//Define a direção do novo movimento de acordo com a leitura do teclado
//desde que não seja na direção oposta à direção atual da cobrinha
function atualizarDirecao(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

//Desenha a área onde o jogo será executado
function desenharBackground() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box, 16*box);
}

//Desenha a cobrinha
function desenharCobrinha() {
    for (let i=0; i<snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//Desenha a comidinha
function desenharComidinha() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//Finaliza o jogo com derrota
function finalizarJogo() {
    clearInterval(game);
    alert("Você perdeu!!");
    flag = false;
}

//Inicia o jogo
function iniciarJogo() {
    //Obtém a posição inicial
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Define a posição do novo movimento
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    //Cria a posição do novo movimento
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //Para movimentar a cobrinha, será necessário adicionar um quadradinho na direção do novo movimento 
    //e retirar o último quadradinho se a cobrinha não comeu a comidinha

    //Adiciona um quadradinho do novo movimento na primeira posição
    snake.unshift(newHead);

    //Verifica se a cobrinha comeu a comidinha
    if (snakeX == food.x && snakeY == food.y) {
        //Cria uma nova comidinha
        food.x = Math.floor(Math.random() * 16) * box,
        food.y = Math.floor(Math.random() * 16) * box
    } else {
        //Retira o último quadradinho
        snake.pop();
    }

/*
    //Permite que a cobrinha atravesse a parede e inicie na outra ponta, de forma que não suma na tela
    if (snake[0].x < 0 && direction == "left") snake[0].x = 15*box;
    if (snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 15*box;
    if (snake[0].y > 15*box && direction == "down") snake[0].y = 0;
*/

    //O jogador vence se montar uma cobrinha com 20 quadradinhos
    if (snake.length == 20) {
        clearInterval(game);
        alert("Você venceu!!");
        flag = false;
    }

    //O jogador perde se a cobrinha tocar na parede  
    if ((snake[0].x < 0 && direction == "left") || (snake[0].x > 15*box && direction == "right") ||
            (snake[0].y < 0 && direction == "up") || (snake[0].y > 15*box && direction == "down")) {
        finalizarJogo();
    }

    //O jogador perde se a cobrinha tocar no seu corpo
    for (i=1; i<snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            finalizarJogo();
        }
    }

    if (flag) {
        desenharBackground();
        desenharCobrinha();
        desenharComidinha();
    }
}
