import tensorflow as tf
import numpy as np
from modelos.modelo import MinhaModeloDeIA
from util.preprocessamento import carregar_e_preprocessar_imagens
from util.avaliacao import avaliar_modelo
from config import Config

# Carregar configurações
config = Config()

# Carregar e pré-processar dados de teste
dataloader_teste = carregar_e_preprocessar_imagens(config.caminho_dataset_teste, config.tamanho_imagem, config.batch_size)

# Carregar o modelo treinado
modelo = tf.keras.models.load_model(config.diretorio_modelo + 'meu_modelo.h5')

# Avaliar o modelo
avaliar_modelo(modelo, dataloader_teste)

# Fazer previsões com o modelo (opcional)
# previsoes = modelo.predict(dataloader_teste, verbose=1)
