class Config:
    # Configurações de treinamento
    batch_size = 32
    epochs = 50
    learning_rate = 0.001

    # Configurações de pré-processamento de imagens
    tamanho_imagem = (64, 64)

    # Configurações do modelo
    num_classes = 10

    # Diretórios de dados
    caminho_dataset_treinamento = 'data/dataset/treinamento'
    caminho_dataset_teste = 'data/dataset/teste'

    # Diretórios de saída
    diretorio_modelo = 'modelos/'
    diretorio_logs = 'logs/'

# Exemplo de uso:
# config = Config()
# print(f"Batch Size: {config.batch_size}")
# print(f"Épocas: {config.epochs}")
# print(f"Taxa de Aprendizado: {config.learning_rate}")
# print(f"Tamanho da Imagem: {config.tamanho_imagem}")
# print(f"Número de Classes: {config.num_classes}")
# print(f"Caminho do Dataset de Treinamento: {config.caminho_dataset_treinamento}")
# print(f"Caminho do Dataset de Teste: {config.caminho_dataset_teste}")
# print(f"Diretório do Modelo: {config.diretorio_modelo}")
# print(f"Diretório de Logs: {config.diretorio_logs}")
