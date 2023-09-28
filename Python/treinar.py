import tensorflow as tf
from modelos.modelo import MinhaModeloDeIA
from util.preprocessamento import carregar_e_preprocessar_imagens
from config import Config

# Carregar configurações
config = Config()

# Carregar e pré-processar dados de treinamento
dataloader_treinamento = carregar_e_preprocessar_imagens(config.caminho_dataset_treinamento, config.tamanho_imagem, config.batch_size)

# Criar e compilar o modelo
modelo = MinhaModeloDeIA(num_classes=config.num_classes)
modelo.build((None, *config.tamanho_imagem, 3))  # '3' representa o número de canais de cores (RGB)
modelo.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=config.learning_rate),
               loss='categorical_crossentropy',
               metrics=['accuracy'])

# Treinar o modelo
modelo.fit(dataloader_treinamento, epochs=config.epochs)

# Salvar o modelo treinado
modelo.save(config.diretorio_modelo + 'meu_modelo.h5')
