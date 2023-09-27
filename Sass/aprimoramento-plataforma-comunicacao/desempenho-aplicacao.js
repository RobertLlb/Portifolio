// Função para calcular o tempo de carregamento da página
function calcularTempoCarregamento() {
    const performance = window.performance;
    if (!performance) {
        console.warn("API de Performance não suportada neste navegador.");
        return;
    }

    const timing = performance.timing;
    const tempoCarregamento = timing.loadEventEnd - timing.navigationStart;

    console.log(`Tempo de carregamento da página: ${tempoCarregamento} ms`);
}

// Função para calcular o tempo de execução de uma função
function calcularTempoExecucao(funcao) {
    const inicio = performance.now();
    funcao();
    const fim = performance.now();
    const tempoExecucao = fim - inicio;

    console.log(`Tempo de execução da função: ${tempoExecucao} ms`);
}

// Exemplo de uso:
window.addEventListener("load", () => {
    // Calcular o tempo de carregamento da página após o evento "load"
    calcularTempoCarregamento();

    // Simular uma operação demorada e calcular o tempo de execução
    calcularTempoExecucao(() => {
        // Simule alguma operação demorada aqui
        for (let i = 0; i < 100000000; i++) {
            // Faça algo
        }
    });
});
