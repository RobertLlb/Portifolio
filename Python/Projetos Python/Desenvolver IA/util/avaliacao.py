import tensorflow as tf
import numpy as np

def avaliar_modelo(modelo, dataloader):
    # Avaliar o modelo no conjunto de dados de teste
    resultados = modelo.evaluate(dataloader, verbose=1)
    
    # Exibir métricas de avaliação
    print("Métricas de Avaliação:")
    for i, metric_name in enumerate(modelo.metrics_names):
        print(f"{metric_name}: {resultados[i]:.4f}")

def prever_com_modelo(modelo, dataloader):
    # Fazer previsões no conjunto de dados de teste
    previsoes = modelo.predict(dataloader, verbose=1)
    
    return previsoes

def calcular_metricas_verdadeiro_falso_positivo_negativo(y_verdadeiro, y_predito):
    # Calcular métricas de verdadeiro positivo, falso positivo, verdadeiro negativo e falso negativo
    verdadeiro_positivo = np.sum((y_verdadeiro == 1) & (y_predito == 1))
    falso_positivo = np.sum((y_verdadeiro == 0) & (y_predito == 1))
    verdadeiro_negativo = np.sum((y_verdadeiro == 0) & (y_predito == 0))
    falso_negativo = np.sum((y_verdadeiro == 1) & (y_predito == 0))

    return verdadeiro_positivo, falso_positivo, verdadeiro_negativo, falso_negativo

def calcular_precisao(verdadeiro_positivo, falso_positivo):
    # Calcular a precisão
    precisao = verdadeiro_positivo / (verdadeiro_positivo + falso_positivo + 1e-10)

    return precisao

def calcular_revocacao(verdadeiro_positivo, falso_negativo):
    # Calcular a revocação (recall)
    revocacao = verdadeiro_positivo / (verdadeiro_positivo + falso_negativo + 1e-10)

    return revocacao

def calcular_f1(precisao, revocacao):
    # Calcular a medida F1
    f1 = 2 * (precisao * revocacao) / (precisao + revocacao + 1e-10)

    return f1

# Exemplo de uso:
# y_verdadeiro = np.array([1, 0, 1, 1, 0])
# y_predito = np.array([1, 1, 0, 1, 0])
# vp, fp, vn, fn = calcular_metricas_verdadeiro_falso_positivo_negativo(y_verdadeiro, y_predito)
# precisao = calcular_precisao(vp, fp)
# revocacao = calcular_revocacao(vp, fn)
# f1 = calcular_f1(precisao, revocacao)
# print(f"Verdadeiro Positivo: {vp}")
# print(f"Falso Positivo: {fp}")
# print(f"Verdadeiro Negativo: {vn}")
# print(f"Falso Negativo: {fn}")
# print(f"Precisão: {precisao:.4f}")
# print(f"Revocação: {revocacao:.4f}")
# print(f"Medida F1: {f1:.4f}")
