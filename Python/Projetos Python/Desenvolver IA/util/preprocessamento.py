import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator

def carregar_e_preprocessar_imagens(caminho_dataset, tamanho_imagem, batch_size):
    # Carregar imagens do disco e aplicar pré-processamento
    datagen = ImageDataGenerator(
        rescale=1./255,                # Escala de pixel para [0, 1]
        rotation_range=20,             # Rotação aleatória de até 20 graus
        width_shift_range=0.2,         # Deslocamento horizontal aleatório
        height_shift_range=0.2,        # Deslocamento vertical aleatório
        horizontal_flip=True,          # Inversão horizontal aleatória
        shear_range=0.2,               # Deformação de corte aleatória
        zoom_range=0.2,                # Zoom aleatório
        fill_mode='nearest'            # Preencher pixels de borda
    )

    # Carregar imagens do disco e aplicar as transformações de pré-processamento
    dataloader = datagen.flow_from_directory(
        caminho_dataset,
        target_size=tamanho_imagem,
        batch_size=batch_size,
        class_mode='categorical',      # Seus rótulos são categóricos
        shuffle=True                    # Embaralhar os dados
    )

    return dataloader

# Exemplo de uso:
# caminho_dataset = 'data/dataset/treinamento'
# tamanho_imagem = (64, 64)
# batch_size = 32
# dataloader = carregar_e_preprocessar_imagens(caminho_dataset, tamanho_imagem, batch_size)
