class Sorteio {
    constructor() {
        this.listaAmigos = [];
        this.input = document.getElementById('amigo');
        this.ul = document.getElementById('listaAmigos');
        this.cartasContainer = document.getElementById('cartas-container');
        this.reiniciarButton = document.getElementById('button-reiniciar');
        this.notificacao = document.getElementById('notificacao');

        document.getElementById('button-add').addEventListener('click', () => this.adicionarAmigo());
        document.getElementById('button-draw').addEventListener('click', () => this.sortearAmigo());
        document.getElementById('button-reiniciar').addEventListener('click', () => this.reiniciar());
    }

    adicionarAmigo() {
        let nome = this.input.value.trim();
        if (!nome) {
            this.mostrarNotificacao("Digite um nome válido!", 'erro');
            return;
        }
        nome = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
        if (this.listaAmigos.includes(nome)) {
            this.mostrarNotificacao("Este nome já foi adicionado!", 'erro');
            return;
        }

        this.listaAmigos.push(nome);
        this.atualizarLista();
        this.input.value = '';
        this.input.focus();
        this.mostrarNotificacao(`${nome} foi adicionado com sucesso!`, 'sucesso');
    }

    removerAmigo(nome) {
        this.listaAmigos = this.listaAmigos.filter(amigo => amigo !== nome);
        this.atualizarLista();
        this.mostrarNotificacao(`${nome} foi removido da lista!`, 'info');
    }

    atualizarLista() {
        this.ul.innerHTML = '';
        this.listaAmigos.forEach(nome => {
            const li = document.createElement('li');
            li.textContent = nome;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.classList.add('button-remove');
            removeButton.onclick = () => this.removerAmigo(nome);

            li.appendChild(removeButton);
            this.ul.appendChild(li);
        });
    }

    gerarSorteio() {
        const amigosEmbaralhados = [...this.listaAmigos].sort(() => Math.random() - 0.5);
        const sorteio = new Map();
        for (let i = 0; i < amigosEmbaralhados.length; i++) {
            let amigo = amigosEmbaralhados[i];
            let amigoSecreto = amigosEmbaralhados[(i + 1) % amigosEmbaralhados.length];
            sorteio.set(amigo, amigoSecreto);
        }
        return sorteio;
    }

    sortearAmigo() {
        if (this.listaAmigos.length < 2) {
            this.mostrarNotificacao("Adicione pelo menos 2 participantes!", 'erro');
            return;
        }

        this.cartasContainer.innerHTML = '';
        const sorteio = this.gerarSorteio();

        sorteio.forEach((escolhido, amigo) => {
            const carta = document.createElement('div');
            carta.classList.add('carta');
            carta.innerHTML = `
                <div class="carta-frente">
                    ${amigo}
                </div>
                <div class="carta-tras">
                    ${escolhido}
                </div>
            `;
            carta.addEventListener('click', () => {
                carta.classList.toggle('virada');
            });
            this.cartasContainer.appendChild(carta);
        });

        this.reiniciarButton.disabled = false;
    }

    reiniciar() {
        this.listaAmigos = [];
        this.atualizarLista();
        this.cartasContainer.innerHTML = '';
        this.reiniciarButton.disabled = true;
        this.mostrarNotificacao('Sorteio reiniciado!', 'info');
    }

    mostrarNotificacao(mensagem, tipo) {
        this.notificacao.textContent = mensagem;
        this.notificacao.className = `notificacao ${tipo}`;
        setTimeout(() => {
            this.notificacao.textContent = '';
            this.notificacao.className = 'notificacao';
        }, 3000);
    }
}

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

window.onload = () => {
    new Sorteio();
    criarNeve();
};
