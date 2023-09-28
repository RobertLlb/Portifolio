# model.py

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# Carregar os dados pré-processados (substitua com o caminho correto)
dados_preprocessados = pd.read_csv('dados_preprocessados.csv')

# Dividir os dados em recursos (X) e rótulos (y)
X = dados_preprocessados.drop(columns=['codigo_gerado'])
y = dados_preprocessados['codigo_gerado']

# Criar um modelo de rede neural simples
modelo = keras.Sequential([
    layers.Input(shape=(X.shape[1],)),  # Camada de entrada
    layers.Dense(128, activation='relu'),  # Camada oculta com ativação ReLU
    layers.Dense(64, activation='relu'),   # Outra camada oculta com ativação ReLU
    layers.Dense(1)  # Camada de saída (1 neurônio para a geração de código)
])

# Compilar o modelo
modelo.compile(optimizer='adam', loss='mean_squared_error')

# Treinar o modelo com os dados
modelo.fit(X, y, epochs=50, batch_size=32, validation_split=0.2)

# Salvar o modelo treinado (substitua com o caminho correto)
modelo.save('modelo_IA.h5')
