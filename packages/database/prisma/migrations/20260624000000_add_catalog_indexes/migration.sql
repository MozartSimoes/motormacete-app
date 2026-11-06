-- AddIndex: Brand.vehicleTypeId
-- Acelera busca de marcas por tipo de veículo (moto/carro)
CREATE INDEX IF NOT EXISTS "Brand_vehicleTypeId_idx" ON "Brand"("vehicleTypeId");

-- AddIndex: VehicleModel.brandId
-- Acelera busca de modelos por marca
CREATE INDEX IF NOT EXISTS "VehicleModel_brandId_idx" ON "VehicleModel"("brandId");

-- AddIndex: Tip.(category, modelName)
-- Acelera a query de distinct modelNames por categoria em /api/tips (Step 1)
-- Complementa o índice existente (modelName, category) que cobre Step 3
CREATE INDEX IF NOT EXISTS "Tip_category_modelName_idx" ON "Tip"("category", "modelName");
