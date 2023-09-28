# train.py

import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# Carregar os dados pré-processados (substitua com o caminho correto)
dados_preprocessados = pd.read_csv('dados_preprocessados.csv')

# Dividir os dados em recursos (X) e rótulos (y)
X = dados_preprocessados.drop(columns=['codigo_gerado'])
y = dados_preprocessados['codigo_gerado']

# Carregar o modelo de IA treinado (substitua com o caminho correto)
modelo = keras.models.load_model('modelo_IA.h5')

# Compilar o modelo (se necessário, dependendo das configurações de treinamento)
# modelo.compile(optimizer='adam', loss='mean_squared_error')

# Treinar o modelo com os dados
historico_treinamento = modelo.fit(X, y, epochs=50, batch_size=32, validation_split=0.2)

# Avaliar o desempenho do modelo (opcional)
# resultado = modelo.evaluate(X_teste, y_teste)
# print(f'Acurácia: {resultado}')

# Salvar o modelo treinado (substitua com o caminho correto)
modelo.save('modelo_IA_treinado.h5')

# Opcional: Salvar o histórico de treinamento para análise futura
# pd.DataFrame(historico_treinamento.history).to_csv('historico_treinamento.csv', index=False)
