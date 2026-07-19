#!/bin/bash

# Script simplificado de deploy - apenas Cloud Build
# Uso: ./deploy-simple.sh PROJECT_ID

set -e

PROJECT_ID=${1:-""}

if [ -z "$PROJECT_ID" ]; then
    echo "❌ Erro: PROJECT_ID é obrigatório"
    echo "Uso: $0 <PROJECT_ID>"
    echo "Exemplo: $0 meu-projeto-gcp"
    exit 1
fi

echo "🚀 Iniciando deploy para Google Cloud Run..."
echo "📦 Projeto: $PROJECT_ID"

# Verificar se gcloud está instalado
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI não encontrado. Instale o Google Cloud SDK."
    exit 1
fi

# Configurar projeto
echo "⚙️  Configurando projeto..."
gcloud config set project $PROJECT_ID

# Habilitar APIs
echo "🔧 Habilitando APIs necessárias..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Submit build
echo "🏗️  Enviando para Cloud Build..."
gcloud builds submit --config cloudbuild.yaml .

# Obter URL do serviço
echo "🔍 Obtendo URL do serviço..."
SERVICE_URL=$(gcloud run services describe caricax-landing --region=us-central1 --format="value(status.url)")

echo ""
echo "✅ Deploy concluído com sucesso!"
echo "🌐 URL temporária: $SERVICE_URL"
echo ""
echo "🔗 Domínio anterior caricax.software descontinuado."
echo "📋 Acesso atual: https://caricax.github.io/caricax-production-spa/"
