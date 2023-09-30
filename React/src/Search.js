import React, { useState } from 'react';

function Search() {
  const [cidade, setCidade] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const currentValue = inputValue.trim();

    if (currentValue) {
      const apiKey = "4d8fb5b93d4af21d66a2948710284366";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=${apiKey}&units=metric`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const { main, name, sys, weather } = data;

          if (sys && weather) {
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;

            setCidade(
              <div>
                <p>{main.temp}</p>
                <p>{sys.country}</p>
                <p>{name}</p>
                <p>{weather[0].description}</p>
                <img src={icon} alt={weather[0].description} />
              </div>
            );
          } else {
            setCidade("");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setCidade("");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setCidade("");
      setIsLoading(false);
    }
  };

  return (
    <div className="searchWrapper">
      <div className="search">
        <h2>Digite a cidade que você quer saber a previsão...</h2>
        <form onSubmit={handleSearch}>
          <input
            placeholder="Digite o nome da cidade"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Pesquisando..." : "Pesquisar por cidade!"}
          </button>
        </form>
      </div>

      {cidade ? (
        <div>{cidade}</div>
      ) : (
        <div>Pesquise por algo acima...</div>
      )}
    </div>
  );
}

export default Search;
