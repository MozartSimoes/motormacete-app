export const DEFAULT_ITEMS: Record<string, { category: string; items: string[] }[]> = {
  moto: [
    { category: 'Documentos', items: ['CNH', 'CRLV', 'Seguro obrigatório'] },
    { category: 'Pneus', items: ['Calibragem dianteiro', 'Calibragem traseiro', 'Desgaste dos pneus'] },
    { category: 'Motor', items: ['Nível de óleo', 'Corrente/transmissão', 'Nível do radiador'] },
    { category: 'Elétrica', items: ['Faróis dianteiro e traseiro', 'Pisca-pisca', 'Bateria'] },
    { category: 'Freios', items: ['Pastilhas dianteiras', 'Pastilhas traseiras', 'Fluido de freio'] },
    { category: 'Equipamentos', items: ['Capacete', 'Luvas', 'Jaqueta/proteções', 'Bota'] },
    { category: 'Bagagem', items: ['Fixação de baú/alforje', 'Peso distribuído'] },
  ],
  carro: [
    { category: 'Documentos', items: ['CNH', 'CRLV', 'Seguro obrigatório'] },
    { category: 'Pneus', items: ['Calibragem (incluindo estepe)', 'Desgaste', 'Fissuras/danos'] },
    { category: 'Motor', items: ['Nível de óleo', 'Nível do radiador', 'Nível da direção hidráulica'] },
    { category: 'Elétrica', items: ['Faróis', 'Lanternas', 'Pisca-pisca', 'Bateria'] },
    { category: 'Freios', items: ['Pastilhas', 'Fluido de freio'] },
    { category: 'Bagagem', items: ['Carga segura', 'Limite de peso respeitado'] },
  ],
}
