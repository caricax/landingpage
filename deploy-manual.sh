#!/bin/bash
# Comandos manuais para deploy - CARICAX Landing

echo "=== PARTE 1: CONFIGURAÇÃO INICIAL ==="

# 1. Configurar projeto
gcloud config set project SEU_PROJECT_ID

# 2. Verificar/configurar billing (OBRIGATÓRIO)
echo "Verificando contas de billing disponíveis:"
gcloud billing accounts list

echo ""
echo "IMPORTANTE: Se não aparecer nenhuma conta de billing ativa,"
echo "você precisa configurar uma em: https://console.cloud.google.com/billing"
echo ""
echo "Para associar billing ao projeto, execute:"
echo "gcloud billing projects link caricax-software --billing-account=SEU_BILLING_ACCOUNT_ID"
echo ""

read -p "Pressione Enter após configurar o billing para continuar..."

echo "=== PARTE 2: HABILITAR APIS ==="

# 3. Habilitar APIs necessárias
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

echo "=== PARTE 3: DEPLOY ==="

# 4. Deploy usando Cloud Build
gcloud builds submit --config cloudbuild.yaml .

echo "=== PARTE 4: OBTER URL ==="

# 5. Obter URL do serviço
SERVICE_URL=$(gcloud run services describe caricax-landing --region=us-central1 --format="value(status.url)")
echo "URL do serviço: $SERVICE_URL"

echo "=== PARTE 5: DOMÍNIO (DESCONTINUADO) ==="

echo "Domínio anterior caricax.software descontinuado."
echo "Acesso atual: https://caricax.github.io/caricax-production-spa/"

echo ""
echo "✅ Deploy concluído!"
