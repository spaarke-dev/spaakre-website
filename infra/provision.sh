#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# Spaarke Website - Azure Resource Provisioning
# ============================================================
# Prerequisites: az login
# Usage: bash infra/provision.sh
# ============================================================

# ---- Configuration ----
RESOURCE_GROUP="rg-spaarke-website"
LOCATION="eastus2"
STORAGE_ACCOUNT="stspaarkewebsite"
APP_INSIGHTS="appi-spaarke-website"
BLOB_CONTAINER="videos"
TABLE_NAME="ContactSubmissions"

echo "=== Spaarke Website - Azure Provisioning ==="
echo ""

# 1. Resource Group
echo "[1/5] Creating resource group: $RESOURCE_GROUP"
az group create \
  --name "$RESOURCE_GROUP" \
  --location "$LOCATION" \
  --output none

# 2. Storage Account
echo "[2/5] Creating storage account: $STORAGE_ACCOUNT"
az storage account create \
  --name "$STORAGE_ACCOUNT" \
  --resource-group "$RESOURCE_GROUP" \
  --location "$LOCATION" \
  --sku Standard_LRS \
  --kind StorageV2 \
  --min-tls-version TLS1_2 \
  --output none

# Get connection string
STORAGE_CONNECTION=$(az storage account show-connection-string \
  --name "$STORAGE_ACCOUNT" \
  --resource-group "$RESOURCE_GROUP" \
  --query connectionString \
  --output tsv)

# 3. Blob container (public read for video)
echo "[3/5] Creating blob container: $BLOB_CONTAINER"
az storage container create \
  --name "$BLOB_CONTAINER" \
  --account-name "$STORAGE_ACCOUNT" \
  --public-access blob \
  --output none

# 4. Table Storage
echo "[4/5] Creating table: $TABLE_NAME"
az storage table create \
  --name "$TABLE_NAME" \
  --account-name "$STORAGE_ACCOUNT" \
  --output none

# 5. Application Insights
echo "[5/5] Creating Application Insights: $APP_INSIGHTS"
az monitor app-insights component create \
  --app "$APP_INSIGHTS" \
  --resource-group "$RESOURCE_GROUP" \
  --location "$LOCATION" \
  --kind web \
  --application-type web \
  --output none

APPINSIGHTS_CONNECTION=$(az monitor app-insights component show \
  --app "$APP_INSIGHTS" \
  --resource-group "$RESOURCE_GROUP" \
  --query connectionString \
  --output tsv)

echo ""
echo "=== Provisioning Complete ==="
echo ""
echo "Resource Group:  $RESOURCE_GROUP"
echo "Storage Account: $STORAGE_ACCOUNT"
echo "Blob Container:  $BLOB_CONTAINER"
echo "Table:           $TABLE_NAME"
echo "App Insights:    $APP_INSIGHTS"
echo ""
echo "--- Connection Strings (store securely, do NOT commit) ---"
echo "STORAGE_ACCOUNT_CONNECTION=$STORAGE_CONNECTION"
echo "APPLICATIONINSIGHTS_CONNECTION_STRING=$APPINSIGHTS_CONNECTION"
echo ""
echo "Video upload URL: https://${STORAGE_ACCOUNT}.blob.core.windows.net/${BLOB_CONTAINER}/"
echo ""
echo "Next steps:"
echo "  1. Copy connection strings to .env.local"
echo "  2. Create Azure Static Web App (Task 041)"
echo "  3. Configure env vars in SWA (Task 042)"
