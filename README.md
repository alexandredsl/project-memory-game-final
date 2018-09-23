# Jogo da Memória

## Como jogar

* Nesse mesmo site, clique na opção "Clone or Download".
* Selecione a opção "Download ZIP".
* No arquivo que baixado, extraia o conteúdo e execute o index.html

## Funcionamento do jogo

O jogo é composto de 16 cartas que são embaralhadas no começo do jogo e ao reiniciar.
Quando duas cartas ocultas são clicadas , jogo mostra as cartas e as adiciona em uma fila para verificar se o símbolo
que elas tem são iguais. Se for iguais eles ficaram com uma cor verde representando que as cartas que estavam na fila
combinaram e agora não estão mais disponíveis para o clique. Caso as cartas que estavam na fila não forem iguais, o
jogo irá esconde-las e irá. Ao final de cada comparação de duas cartas, as cartas são removidas da fila de verificação do jogo.

Possui ainda marcador de pontuação usando estrelas, que se passar de 16 movimentos, diminui uma estrela e se passar de 24 movimentos, diminui mais uma.

No jogo também há um contador de tempo que inicia quando se é clicado na primeira carta e termina quando todas as combinações são encontradas.

Quando todas as combinações são encontradas o jogo exibe uma mensagem parabenizando o jogador exibindo pontuação,
número de movimentos e tempo final.

Lista de dependências do jogo

## Dependências

Toda funcionalidade do site foi criada usando Vanilla JavaScript e Jquery.
