#!/bin/bash

# Script de deploy para Google Cloud Run
# Domínio anterior caricax.software (descontinuado)

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funções de utilidade
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Configurações
PROJECT_ID=${1:-""}
REGION="us-central1"
SERVICE_NAME="caricax-landing"

if [ -z "$PROJECT_ID" ]; then
    log_error "Uso: $0 <PROJECT_ID>"
    echo "Exemplo: $0 my-gcp-project"
    exit 1
fi

log_info "Iniciando deploy para Google Cloud Run..."
log_info "Projeto: $PROJECT_ID"
log_info "Região: $REGION"
log_info "Serviço: $SERVICE_NAME"

# 1. Verificar se gcloud está instalado e autenticado
if ! command -v gcloud &> /dev/null; then
    log_error "gcloud CLI não encontrado. Instale o Google Cloud SDK primeiro."
    exit 1
fi

# 2. Verificar autenticação
log_info "Verificando autenticação..."
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q "@"; then
    log_warning "Não autenticado no gcloud. Executando autenticação..."
    gcloud auth login
fi

# 3. Configurar projeto
log_info "Configurando projeto..."
gcloud config set project $PROJECT_ID

# 4. Habilitar APIs necessárias
log_info "Habilitando APIs necessárias..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# 5. Build da aplicação
log_info "Fazendo build da aplicação Angular..."
npm ci
npm run build

# 6. Build e deploy usando Cloud Build
log_info "Iniciando Cloud Build..."
gcloud builds submit --config cloudbuild.yaml .

# 7. Verificar se o serviço foi deployado
log_info "Verificando deployment..."
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)")

if [ -n "$SERVICE_URL" ]; then
    log_success "Serviço deployado com sucesso!"
    log_info "URL do serviço: $SERVICE_URL"
else
    log_error "Falha no deployment"
    exit 1
fi

log_success "Deploy concluído com sucesso!"
echo ""
log_info "Acesse: $SERVICE_URL"
log_info "Domínio anterior caricax.software descontinuado."
log_info "Acesso atual: https://caricax.github.io/caricax-production-spa/"
