from flask import Flask, request, jsonify
import subprocess
import os

app = Flask(__name__)

@app.route('/treinar', methods=['POST'])
def treinar():
    # Executar treinamento
    try:
        subprocess.run(["python", "treinar.py"])
        return jsonify({"message": "Treinamento concluído com sucesso!"})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/avaliar', methods=['POST'])
def avaliar():
    # Executar avaliação
    try:
        subprocess.run(["python", "avaliar.py"])
        return jsonify({"message": "Avaliação concluída com sucesso!"})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/prever', methods=['POST'])
def prever():
    # Executar previsão (adicione sua lógica de previsão aqui)
    try:
        # Coloque sua lógica de previsão aqui usando o modelo treinado
        # Exemplo simples: modelo.predict(imagem)
        resultado = {"message": "Previsão concluída com sucesso!"}
        return jsonify(resultado)
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
