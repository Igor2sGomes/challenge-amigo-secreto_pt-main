let listaAmigos = [];//variável da array/lista

// Adiciona amigo
function adicionarAmigo() {
    const input = document.getElementById('amigo');
    let nome = input.value.trim();
    if(!nome) { 
        alert("Digite um nome válido!"); 
        return; 
    }
        nome = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
        if(listaAmigos.includes(nome)) {
             alert("Este nome já foi adicionado!"); 
             return; 
    }

    listaAmigos.push(nome);
    atualizarLista();
    input.value = '';
    input.focus();
}

// Atualiza lista
function atualizarLista() {
    const ul = document.getElementById('listaAmigos');
    ul.innerHTML = '';
    listaAmigos.forEach(nome => {
        const li = document.createElement('li');
        li.textContent = nome;
        ul.appendChild(li);
    });
}

// Gera sorteio sem repetir
function gerarSorteio(lista) {
    let sorteio = [];
    let tentativa = 0;
    const maxTentativas = 100;
    while(tentativa < maxTentativas) {
        let copia = [...lista];
        sorteio = lista.map(amigo => {
            let possiveis = copia.filter(x => x !== amigo);
            if(possiveis.length === 0) return null;
            let escolhido = possiveis[Math.floor(Math.random() * possiveis.length)];
            copia = copia.filter(x => x !== escolhido);
            return {amigo, escolhido};
        });
        if(!sorteio.includes(null)) break;
        tentativa++;
    }
    if(tentativa === maxTentativas) {
        alert("Não foi possível gerar o sorteio. Tente novamente.");
        return [];
    }
    return sorteio;
}

// Sortear amigos
function sortearAmigo() {
    if(listaAmigos.length < 2) { alert("Adicione pelo menos 2 participantes!"); return; }

    const cartasContainer = document.getElementById('cartas-container');
    cartasContainer.innerHTML = '';

    const sorteio = gerarSorteio(listaAmigos);
    if(sorteio.length === 0) return;

    sorteio.forEach((par, index) => {
        setTimeout(() => {
            const carta = document.createElement('div');
            carta.classList.add('carta');
            carta.textContent = `${par.amigo} → ${par.escolhido}`;
            cartasContainer.appendChild(carta);
        }, index * 400);
    });

    document.getElementById('button-reiniciar').disabled = false;
}

// Reiniciar
function reiniciar() {
    listaAmigos = [];
    atualizarLista();
    document.getElementById('cartas-container').innerHTML = '';
    document.getElementById('button-reiniciar').disabled = true;
}

// Neve
function criarNeve() {
    const neveContainer = document.getElementById('neve-container');
    setInterval(() => {
        const floco = document.createElement('div');
        floco.className = 'snowflake';
        floco.style.left = Math.random() * window.innerWidth + 'px';
        floco.style.fontSize = (Math.random() * 20 + 10) + 'px';
        floco.style.animationDuration = (Math.random() * 5 + 5) + 's';
        floco.textContent = '❄';
        neveContainer.appendChild(floco);
        setTimeout(() => neveContainer.removeChild(floco), 10000);
    }, 300);
}

window.onload = criarNeve;
