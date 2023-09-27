// URL da API de previsão do tempo da Microsoft
const apiUrl = "https://atlas.microsoft.com/weather/forecast/minute/json";
const apiKey = "SUA_CHAVE_DE_API_AQUI"; // Substitua pela sua chave de API

// Elementos HTML
const locationInput = document.getElementById("locationInput");
const getForecastButton = document.getElementById("getForecastButton");
const weatherForecastElement = document.getElementById("weatherForecast");

// Função para fazer a solicitação à API
async function getWeatherForecast(latitude, longitude, interval) {
    try {
        const response = await fetch(`${apiUrl}?api-version=1.1&query=${latitude},${longitude}&interval=${interval}`, {
            headers: {
                "Ocp-Apim-Subscription-Key": apiKey, // Configuração da chave de API
            },
        });

        if (response.ok) {
            const data = await response.json();
            displayWeatherForecast(data);
        } else {
            console.error("Erro ao buscar previsão do tempo:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Erro na solicitação:", error);
    }
}

// Função para exibir os dados da previsão do tempo na página
function displayWeatherForecast(data) {
    // Aqui, você pode formatar e exibir os dados como desejar
    // Por exemplo, exiba informações sobre o tempo minuto a minuto na página
    weatherForecastElement.innerHTML = `
        <h2>Previsão Minuto a Minuto</h2>
        <p>${data.summary.briefPhrase60}</p>
        <!-- Adicione mais detalhes da previsão aqui -->
    `;
}

// Manipulador de evento para o botão "Obter Previsão"
getForecastButton.addEventListener("click", () => {
    const location = locationInput.value;
    const [latitude, longitude] = location.split(",");

    if (latitude && longitude) {
        getWeatherForecast(latitude, longitude, 5); // Intervalo de 5 minutos (você pode ajustar conforme necessário)
    } else {
        alert("Por favor, insira as coordenadas no formato 'latitude,longitude'. Exemplo: 47.632346,-122.138874");
    }
});
