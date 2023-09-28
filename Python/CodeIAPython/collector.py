# collector.py
# Certificar de instalar pip install requests beautifulsoup4


import requests
from bs4 import BeautifulSoup

# URL da página da web a ser coletada
url = "https://example.com"

# Enviar uma solicitação HTTP para a URL
response = requests.get(url)

# Verificar se a solicitação foi bem-sucedida
if response.status_code == 200:
    # Analisar o conteúdo HTML da página com BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')

    # Aqui você pode implementar a lógica para extrair informações específicas da página
    # Por exemplo, encontrar e coletar elementos HTML relevantes

    # Exemplo: Encontrar todos os links na página
    links = soup.find_all('a')
    
    # Imprimir os links encontrados
    for link in links:
        print(link.get('href'))
else:
    print("A solicitação HTTP não foi bem-sucedida. Código de status:", response.status_code)
