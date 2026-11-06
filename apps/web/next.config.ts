import path from 'path'
import type { NextConfig } from 'next'

const config: NextConfig = {
  transpilePackages: ['@motormacete/database'],
  outputFileTracingRoot: path.join(__dirname, '../../'),
  // pdfkit lê seus arquivos de fonte (.afm) do disco via fs em runtime — sem
  // isso o webpack empacota a rota e deixa esses arquivos de fora, quebrando
  // a geração de PDF (/api/mecanico/relatorio) em produção.
  serverExternalPackages: ['pdfkit'],
}

export default config
