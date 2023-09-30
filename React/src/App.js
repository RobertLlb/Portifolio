import './App.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { WiThermometer, WiHumidity } from 'react-icons/wi';
import { FaFlag, FaSearch, FaSpinner } from 'react-icons/fa';
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import Select from 'react-select';

// Configuração inicial do i18n
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        home: 'Home',
        about: 'About',
        contact: 'Contact',
        enterCity: 'Enter the city you want to know the weather for...',
        searchPlaceholder: 'Enter city name',
        searchButton: 'Search for city!',
        errorFetchingData: 'Error fetching data. Please try again.',
        noResult: 'Search for something above...',
        createdBy: 'Created by Robert Barbosa',
      },
    },
    pt: {
      translation: {
        home: 'Início',
        about: 'Sobre',
        contact: 'Contato',
        enterCity: 'Digite a cidade que você deseja saber o clima...',
        searchPlaceholder: 'Digite o nome da cidade',
        searchButton: 'Pesquisar por cidade!',
        errorFetchingData: 'Erro ao buscar dados. Tente novamente.',
        noResult: 'Pesquise por algo acima...',
        createdBy: 'Criado por Robert',
      },
    },
    es: {
      translation: {
        home: 'Inicio',
        about: 'Acerca de',
        contact: 'Contacto',
        enterCity: 'Ingrese la ciudad de la que desea conocer el clima...',
        searchPlaceholder: 'Ingrese el nombre de la ciudad',
        searchButton: 'Buscar ciudad!',
        errorFetchingData: 'Error al buscar datos. Por favor, inténtelo de nuevo.',
        noResult: 'Busque algo arriba...',
        createdBy: 'Creado por Robert',
      },
    },
    de: {
      translation: {
        home: 'Startseite',
        about: 'Über uns',
        contact: 'Kontakt',
        enterCity: 'Geben Sie die Stadt ein, für die Sie das Wetter wissen möchten...',
        searchPlaceholder: 'Geben Sie den Stadtnamen ein',
        searchButton: 'Stadt suchen!',
        errorFetchingData: 'Fehler beim Abrufen der Daten. Bitte versuchen Sie es erneut.',
        noResult: 'Suchen Sie oben nach etwas...',
        createdBy: 'Erstellt von Robert',
      },
    },
    ja: {
      translation: {
        home: 'ホーム',
        about: '約',
        contact: 'お問い合わせ',
        enterCity: '知りたい都市を入力してください...',
        searchPlaceholder: '都市名を入力してください',
        searchButton: '都市を検索！',
        errorFetchingData: 'データの取得エラー。もう一度お試しください。',
        noResult: '上記の内容を検索してください...',
        createdBy: 'Robertによって作成',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

const languageOptions = [
  { value: 'en', label: '🇺🇸', flag: '🇺🇸' },
  { value: 'pt', label: '🇧🇷', flag: '🇧🇷' },
  { value: 'es', label: '🇪🇸', flag: '🇪🇸' }, // Espanhol
  { value: 'de', label: '🇩🇪', flag: '🇩🇪' }, // Alemão
  { value: 'ja', label: '🇯🇵', flag: '🇯🇵' }, // Japonês
];


function App() {
  const [cidade, setCidade] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { t, i18n } = useTranslation();

  const handleLanguageChange = (selectedOption) => {
    i18n.changeLanguage(selectedOption.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const currentValue = inputValue.trim();

    if (currentValue) {
      try {
        const apiKey = "4d8fb5b93d4af21d66a2948710284366";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=${apiKey}&units=metric`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        const { main, name, sys, weather } = data;

        if (sys && weather) {
          const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;

          setCidade(
            <div className="cidadestatus">
              <div>
                <WiThermometer /> {main.temp}°C
              </div>
              <div>
                <FaFlag /> {sys.country}
              </div>
              <div>{name}</div>
              <div>
                <WiHumidity /> {weather[0].description}
              </div>
              <img src={icon} alt={weather[0].description} />
            </div>
          );
        } else {
          setCidade("");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(t('errorFetchingData'));
        setCidade("");
      } finally {
        setIsLoading(false);
      }
    } else {
      setCidade("");
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">{t('home')}</Link>
            </li>
            <li>
              <Link to="/about">{t('about')}</Link>
            </li>
            <li>
              <Link to="/contact">{t('contact')}</Link>
            </li>
          </ul>
          <div className="language-select">
            <Select
              options={languageOptions}
              defaultValue={languageOptions.find((option) => option.value === i18n.language)}
              onChange={handleLanguageChange}
              isSearchable={false}
              className="language-select"
            />
          </div>
        </nav>
      </header>
      <div className="searchWrapper">
        <div className="search">
          <h2>{t('enterCity')}</h2>
          <form onSubmit={handleSearch}>
            <div className="input-container">
              <input
                placeholder={t('searchPlaceholder')}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? <FaSpinner /> : <FaSearch />}
              </button>
            </div>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
        
        {cidade ? (
          <div>{cidade}</div>
        ) : (
          <div className="no-result">{t('noResult')}</div>
        )}
      </div>
      <footer className="footer">
        <p>{t('createdBy')}</p>
      </footer>
    </div>
  );
}

export default App;
