// Função para buscar a previsão do tempo de uma API de terceiros
async function buscarPrevisaoTempo() {
    const apiKey = 'sua-chave-de-api-aqui'; // Substitua pela sua chave de API
    const cidade = 'SuaCidade'; // Substitua pelo nome da cidade desejada
    const apiUrl = `https://api-de-previsao-do-tempo.com?api_key=${apiKey}&cidade=${cidade}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Verifique se a resposta contém dados válidos de previsão do tempo
        if (data && data.temperatura && data.descricao) {
            const previsaoTempoElement = document.getElementById('previsaoTempo');

            // Exiba os dados da previsão do tempo na página
            previsaoTempoElement.innerHTML = `
                <h2>Previsão do Tempo para ${cidade}</h2>
                <p>Temperatura: ${data.temperatura}°C</p>
                <p>Descrição: ${data.descricao}</p>
            `;
        } else {
            console.error('Dados de previsão do tempo inválidos.');
        }
    } catch (error) {
        console.error('Erro ao buscar previsão do tempo:', error);
    }
}

// Chame a função de busca de previsão do tempo quando a página carregar
window.addEventListener('load', buscarPrevisaoTempo);
