'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'

type Sev = 'baixo' | 'medio' | 'alto'
type Cat = 'Motor' | 'Transmissão' | 'Carroceria' | 'Rede'

interface Code {
  code: string; cat: Cat; name: string; sev: Sev
  desc: string; causes: string[]; fix: string; diy: boolean; cost: string
}

const SEV_COLOR: Record<Sev, string> = { alto: '#ef4444', medio: '#f59e0b', baixo: '#22c55e' }
const SEV_LABEL: Record<Sev, string> = { alto: 'Urgente', medio: 'Atenção', baixo: 'Leve' }
const CAT_COLOR: Record<Cat, string> = { Motor: '#ff6600', Transmissão: '#3b82f6', Carroceria: '#8b5cf6', Rede: '#06b6d4' }
const CATS: Cat[] = ['Motor', 'Transmissão', 'Carroceria', 'Rede']

const DB: Code[] = [
  // ── MOTOR P01 – Ar / Combustível ──────────────────────────────────────────
  { code: 'P0100', cat: 'Motor', sev: 'alto', name: 'Sensor MAF – Falha no circuito',
    desc: 'O sensor de fluxo de massa de ar (MAF) apresenta sinal fora da faixa normal, comprometendo o cálculo da mistura ar/combustível e o consumo do motor.',
    causes: ['Sensor MAF sujo ou com defeito', 'Vazamento no coletor de admissão', 'Chicote elétrico danificado', 'Filtro de ar entupido'],
    fix: 'Limpar o sensor MAF com spray específico. Se persistir, substituir o sensor. Verificar vedações do coletor de admissão.',
    diy: true, cost: 'R$ 150–500' },

  { code: 'P0101', cat: 'Motor', sev: 'medio', name: 'Sensor MAF – Faixa/Desempenho',
    desc: 'O sinal do MAF está fora do intervalo esperado para as condições atuais de operação. Motor pode hesitar ou ter consumo elevado.',
    causes: ['Sensor MAF desgastado', 'Filtro de ar sujo ou tipo errado', 'Mangueira de admissão com rasgo'],
    fix: 'Trocar filtro de ar, limpar o MAF. Inspecionar mangueiras de admissão quanto a rachaduras.',
    diy: true, cost: 'R$ 80–350' },

  { code: 'P0107', cat: 'Motor', sev: 'medio', name: 'Sensor MAP – Tensão baixa no coletor',
    desc: 'O sensor de pressão absoluta do coletor (MAP) está enviando tensão abaixo do esperado. Motor pode ficar em modo de emergência.',
    causes: ['Sensor MAP com defeito', 'Mangueira de vácuo rompida', 'Mau contato no conector', 'Curto no chicote'],
    fix: 'Verificar e substituir o sensor MAP e as mangueiras de vácuo associadas.',
    diy: true, cost: 'R$ 80–300' },

  { code: 'P0108', cat: 'Motor', sev: 'medio', name: 'Sensor MAP – Tensão alta no coletor',
    desc: 'O sensor MAP está enviando tensão acima do esperado. Pode indicar pressão excessiva ou falha no sensor.',
    causes: ['Sensor MAP defeituoso', 'Curto na alimentação do sensor', 'Falha no ECU'],
    fix: 'Substituir sensor MAP. Verificar circuito de alimentação com multímetro.',
    diy: true, cost: 'R$ 80–300' },

  { code: 'P0112', cat: 'Motor', sev: 'baixo', name: 'Sensor IAT – Sinal baixo (temperatura do ar)',
    desc: 'O sensor de temperatura do ar de admissão reporta valor abaixo de –40°C, valor impossível — indica falha no sensor ou curto no circuito.',
    causes: ['Sensor IAT com defeito', 'Curto-circuito no fio de sinal', 'Conector oxidado'],
    fix: 'Verificar continuidade do circuito; substituir o sensor IAT se necessário.',
    diy: true, cost: 'R$ 40–150' },

  { code: 'P0113', cat: 'Motor', sev: 'baixo', name: 'Sensor IAT – Sinal alto (temperatura do ar)',
    desc: 'O sensor IAT reporta temperatura acima de 150°C, valor impossível — indica circuito aberto ou falha no sensor.',
    causes: ['Sensor IAT com defeito', 'Circuito aberto no chicote', 'Conector solto ou oxidado'],
    fix: 'Verificar conexões; substituir o sensor IAT.',
    diy: true, cost: 'R$ 40–150' },

  { code: 'P0115', cat: 'Motor', sev: 'alto', name: 'Sensor ECT – Falha no circuito (temp. arrefecimento)',
    desc: 'O sensor de temperatura do líquido de arrefecimento (ECT) não responde corretamente. Motor pode operar em modo de emergência com mistura errada.',
    causes: ['Sensor ECT defeituoso', 'Nível de arrefecimento baixo', 'Chicote danificado', 'Termostato preso'],
    fix: 'Verificar nível de arrefecimento; substituir sensor ECT; inspecionar termostato.',
    diy: true, cost: 'R$ 60–250' },

  { code: 'P0117', cat: 'Motor', sev: 'medio', name: 'Sensor ECT – Temperatura muito baixa',
    desc: 'ECU detecta temperatura do motor abaixo de –40°C, impossível em condições normais — indica curto no sensor ou no circuito.',
    causes: ['Sensor ECT defeituoso', 'Curto-circuito no fio de sinal para o terra'],
    fix: 'Substituir sensor de temperatura do líquido de arrefecimento.',
    diy: true, cost: 'R$ 60–200' },

  { code: 'P0118', cat: 'Motor', sev: 'medio', name: 'Sensor ECT – Temperatura muito alta',
    desc: 'ECU detecta temperatura acima de 150°C sem superaquecimento real — indica circuito aberto no sensor de arrefecimento.',
    causes: ['Sensor ECT com defeito', 'Circuito aberto no chicote', 'Conector solto'],
    fix: 'Verificar conector; substituir sensor ECT.',
    diy: true, cost: 'R$ 60–200' },

  { code: 'P0120', cat: 'Motor', sev: 'alto', name: 'Sensor TPS – Falha no circuito A (acelerador)',
    desc: 'O sensor de posição do acelerador (TPS) apresenta falha. Pode causar marcha lenta irregular, perda de potência ou resposta errática ao acelerador.',
    causes: ['TPS desgastado ou com ponto morto', 'Conector oxidado', 'Chicote danificado', 'Falha no borboleta eletrônico'],
    fix: 'Calibrar ou substituir o sensor TPS. Em modelos com acelerador eletrônico (ETC), levar à oficina.',
    diy: true, cost: 'R$ 100–600' },

  { code: 'P0121', cat: 'Motor', sev: 'medio', name: 'Sensor TPS – Faixa/Desempenho',
    desc: 'O sinal do TPS não está coerente com o sinal do MAP ou com as condições de operação esperadas.',
    causes: ['TPS desgastado', 'Corpo de borboleta com sujeira', 'Problemas de calibração'],
    fix: 'Substituir o TPS. Em modelos com borboleta eletrônica, pode ser necessário calibração com scanner.',
    diy: false, cost: 'R$ 150–600' },

  // ── MOTOR P01 – Sondas Lambda ─────────────────────────────────────────────
  { code: 'P0130', cat: 'Motor', sev: 'medio', name: 'Sonda Lambda B1S1 – Falha no circuito',
    desc: 'A sonda lambda pré-catalisador do banco 1 apresenta falha. Afeta a correção da mistura em malha fechada.',
    causes: ['Sonda lambda desgastada', 'Vazamento no escapamento antes do sensor', 'Chicote danificado por calor'],
    fix: 'Inspecionar o escapamento; substituir a sonda lambda B1S1.',
    diy: true, cost: 'R$ 150–500' },

  { code: 'P0131', cat: 'Motor', sev: 'medio', name: 'Sonda Lambda B1S1 – Tensão baixa (mistura pobre)',
    desc: 'A sonda lambda pré-catalisador gera tensão muito baixa — indica possível mistura pobre ou sonda defeituosa.',
    causes: ['Vazamento de ar no coletor ou escapamento', 'Sonda lambda defeituosa', 'Pressão de combustível baixa'],
    fix: 'Verificar pressão do combustível e vedações; substituir sonda lambda se necessário.',
    diy: true, cost: 'R$ 150–500' },

  { code: 'P0133', cat: 'Motor', sev: 'medio', name: 'Sonda Lambda B1S1 – Resposta lenta',
    desc: 'A sonda lambda responde mais devagar que o esperado, indicando envelhecimento. Acima de 80 mil km é comum.',
    causes: ['Sonda lambda desgastada (acima de 80 mil km)', 'Contaminação por óleo ou aditivos', 'Baixa temperatura do escapamento'],
    fix: 'Substituir a sonda lambda. Verificar consumo de óleo se houver fumaça azul.',
    diy: true, cost: 'R$ 150–450' },

  { code: 'P0135', cat: 'Motor', sev: 'baixo', name: 'Aquecedor da Sonda Lambda B1S1 – Falha',
    desc: 'O elemento aquecedor da sonda lambda não funciona. A sonda demora mais para entrar em malha fechada, aumentando emissões a frio.',
    causes: ['Elemento aquecedor queimado', 'Fusível do aquecedor queimado', 'Problema no relé de alimentação'],
    fix: 'Verificar fusível; substituir a sonda lambda.',
    diy: true, cost: 'R$ 150–450' },

  { code: 'P0136', cat: 'Motor', sev: 'baixo', name: 'Sonda Lambda B1S2 – Falha (pós-catalisador)',
    desc: 'A sonda pós-catalisador no banco 1 apresenta falha. Usada para monitorar a eficiência do catalisador.',
    causes: ['Sonda lambda pós-cat defeituosa', 'Chicote danificado por calor', 'Conector oxidado'],
    fix: 'Substituir a sonda lambda pós-catalisador.',
    diy: true, cost: 'R$ 150–450' },

  // ── MOTOR P01 – Trim de Combustível ───────────────────────────────────────
  { code: 'P0171', cat: 'Motor', sev: 'alto', name: 'Mistura Pobre – Banco 1 (sistema magro)',
    desc: 'A ECU injeta mais combustível do que o normal (trim positivo >25%) para compensar mistura pobre. Motor pode falhar, engasgar ou perder potência. Muito comum em carros com mais de 60 mil km.',
    causes: ['Vazamento de ar no coletor de admissão', 'Sensor MAF sujo ou defeituoso', 'Bicos injetores entupidos', 'Filtro de combustível sujo', 'Bomba de combustível fraca', 'Sonda lambda com defeito'],
    fix: 'Verificar vazamentos de ar com spray de carburador; limpar ou trocar MAF; medir pressão de combustível. Limpar injetores com ultrassom.',
    diy: false, cost: 'R$ 200–1.200' },

  { code: 'P0172', cat: 'Motor', sev: 'alto', name: 'Mistura Rica – Banco 1 (sistema rico)',
    desc: 'A ECU reduz a injeção (trim negativo >–25%) para compensar excesso de combustível. Pode causar aumento de consumo e danos ao catalisador.',
    causes: ['Bico injetor preso aberto ou com vazamento', 'Sensor MAF lendo alto', 'Regulador de pressão com defeito', 'Sensor ECT preso em "temperatura fria"'],
    fix: 'Verificar injetores com scanner; medir pressão de combustível; checar leitura do sensor ECT.',
    diy: false, cost: 'R$ 300–1.500' },

  { code: 'P0174', cat: 'Motor', sev: 'alto', name: 'Mistura Pobre – Banco 2',
    desc: 'Mistura pobre no banco 2 (motores V6/V8). Causas similares ao P0171 mas no banco oposto.',
    causes: ['Vazamento de ar no coletor do banco 2', 'Sensor MAF sujo', 'Injetores entupidos no banco 2'],
    fix: 'Inspecionar coletor do banco 2; limpar MAF; verificar injetores.',
    diy: false, cost: 'R$ 300–1.500' },

  { code: 'P0175', cat: 'Motor', sev: 'alto', name: 'Mistura Rica – Banco 2',
    desc: 'Excesso de combustível no banco 2. Similar ao P0172 mas no banco oposto (V6/V8).',
    causes: ['Bico injetor preso no banco 2', 'Pressão de combustível excessiva', 'Sensor ECT com falha'],
    fix: 'Verificar injetores do banco 2; medir pressão de combustível.',
    diy: false, cost: 'R$ 300–1.500' },

  // ── MOTOR P02 – Injetores ─────────────────────────────────────────────────
  { code: 'P0190', cat: 'Motor', sev: 'alto', name: 'Sensor de Pressão do Rail de Combustível – Falha',
    desc: 'O sensor de pressão do trilho de combustível está com falha. Em motores Flex, afeta o controle de injeção tanto para gasolina quanto para etanol.',
    causes: ['Sensor de pressão do rail com defeito', 'Chicote danificado', 'Pressão incorreta no rail (bomba ou regulador)'],
    fix: 'Medir pressão com manômetro; substituir sensor se a pressão estiver correta.',
    diy: false, cost: 'R$ 150–600' },

  { code: 'P0201', cat: 'Motor', sev: 'alto', name: 'Circuito do Injetor – Cilindro 1',
    desc: 'Falha no circuito de controle do bico injetor do cilindro 1. Motor pode falhar e ter marcha irregular.',
    causes: ['Injetor com defeito', 'Circuito aberto ou curto no chicote', 'Driver do injetor no ECU com falha'],
    fix: 'Medir resistência do injetor (10–16 Ω). Substituir injetor ou verificar chicote.',
    diy: false, cost: 'R$ 200–600' },

  // ── MOTOR P03 – Falhas de Ignição ─────────────────────────────────────────
  { code: 'P0300', cat: 'Motor', sev: 'alto', name: 'Falha de Ignição Aleatória – Múltiplos Cilindros',
    desc: 'Falha de ignição (misfire) em múltiplos cilindros de forma aleatória. Código muito comum, pode ter diversas causas. Motor vibra, perde potência e pode poluir mais.',
    causes: ['Velas de ignição gastas', 'Cabos de vela ou bobinas com defeito', 'Injetores entupidos', 'Compressão baixa em um ou mais cilindros', 'Bomba de combustível fraca'],
    fix: 'Começar pelas velas e cabos/bobinas. Se persistir, fazer teste de compressão e limpeza de injetores por ultrassom.',
    diy: true, cost: 'R$ 150–1.500' },

  { code: 'P0301', cat: 'Motor', sev: 'alto', name: 'Falha de Ignição – Cilindro 1',
    desc: 'Misfire específico no cilindro 1. Motor vibra, perde potência e pode danificar o catalisador se persistir.',
    causes: ['Vela de ignição do cilindro 1 gasta ou defeituosa', 'Cabo/bobina do cilindro 1 com falha', 'Injetor do cilindro 1 entupido', 'Compressão baixa no cilindro 1'],
    fix: 'Trocar vela; trocar cabo/bobina; testar injetor; fazer teste de compressão.',
    diy: true, cost: 'R$ 100–800' },

  { code: 'P0302', cat: 'Motor', sev: 'alto', name: 'Falha de Ignição – Cilindro 2',
    desc: 'Misfire específico no cilindro 2. Causas e diagnóstico idênticos ao P0301.',
    causes: ['Vela, cabo/bobina ou injetor do cilindro 2', 'Compressão baixa no cilindro 2'],
    fix: 'Verificar componentes do cilindro 2 conforme diagnóstico.',
    diy: true, cost: 'R$ 100–800' },

  { code: 'P0303', cat: 'Motor', sev: 'alto', name: 'Falha de Ignição – Cilindro 3',
    desc: 'Misfire específico no cilindro 3.',
    causes: ['Vela, cabo/bobina ou injetor do cilindro 3', 'Compressão baixa'],
    fix: 'Verificar componentes do cilindro 3.',
    diy: true, cost: 'R$ 100–800' },

  { code: 'P0304', cat: 'Motor', sev: 'alto', name: 'Falha de Ignição – Cilindro 4',
    desc: 'Misfire específico no cilindro 4.',
    causes: ['Vela, cabo/bobina ou injetor do cilindro 4', 'Compressão baixa'],
    fix: 'Verificar componentes do cilindro 4.',
    diy: true, cost: 'R$ 100–800' },

  { code: 'P0325', cat: 'Motor', sev: 'medio', name: 'Sensor de Detonação (Knock) – Falha banco 1',
    desc: 'O sensor de detonação não responde. A ECU pode retardar o ponto de ignição preventivamente, causando perda de potência.',
    causes: ['Sensor de detonação com defeito', 'Chicote danificado', 'Torque de fixação incorreto', 'Falha no ECU'],
    fix: 'Verificar torque de fixação (18–25 Nm); substituir sensor se necessário.',
    diy: true, cost: 'R$ 80–350' },

  { code: 'P0335', cat: 'Motor', sev: 'alto', name: 'Sensor de Posição do Virabrequim (CKP) – Falha',
    desc: 'O sensor CKP não gera sinal. Sem ele, o motor geralmente não arranca ou tem falhas graves de ignição.',
    causes: ['Sensor CKP com defeito', 'Anel fônico (roda dentada) danificado', 'Folga incorreta entre sensor e anel', 'Chicote danificado'],
    fix: 'Verificar folga (0,5–1,5 mm); substituir sensor CKP; inspecionar anel fônico.',
    diy: true, cost: 'R$ 80–400' },

  { code: 'P0340', cat: 'Motor', sev: 'alto', name: 'Sensor de Posição do Comando (CMP) – Falha banco 1',
    desc: 'O sensor de fase do comando não gera sinal correto. Pode causar partida difícil e falhas na injeção sequencial.',
    causes: ['Sensor CMP com defeito', 'Roda fônica do comando danificada', 'Chicote danificado', 'Folga incorreta'],
    fix: 'Substituir sensor CMP; verificar anel fônico do comando de válvulas.',
    diy: true, cost: 'R$ 80–400' },

  // ── MOTOR P04 – Emissões ──────────────────────────────────────────────────
  { code: 'P0400', cat: 'Motor', sev: 'medio', name: 'EGR – Falha no fluxo de recirculação',
    desc: 'O sistema de recirculação dos gases de escapamento (EGR) não funciona corretamente. Pode aumentar emissões de NOx.',
    causes: ['Válvula EGR presa fechada ou aberta', 'Passagens entupidas com carvão', 'Sensor de posição da EGR com defeito'],
    fix: 'Limpar ou substituir a válvula EGR; limpar as passagens de recirculação.',
    diy: false, cost: 'R$ 200–800' },

  { code: 'P0420', cat: 'Motor', sev: 'medio', name: 'Catalisador com Eficiência Baixa – Banco 1',
    desc: 'O catalisador não converte os gases com eficiência mínima exigida. Extremamente comum em carros com mais de 100 mil km.',
    causes: ['Catalisador desgastado ou quebrado internamente', 'Envenenamento por óleo ou combustível', 'Sonda lambda pós-cat com defeito (pode ser falso positivo)', 'Mistura rica danificando o catalisador'],
    fix: 'Verificar a sonda lambda pós-cat antes de trocar o catalisador (catalisador novo é caro). Checar consumo de óleo e mistura.',
    diy: false, cost: 'R$ 500–2.500' },

  { code: 'P0430', cat: 'Motor', sev: 'medio', name: 'Catalisador com Eficiência Baixa – Banco 2',
    desc: 'Catalisador abaixo da eficiência mínima no banco 2 (motores V6/V8).',
    causes: ['Catalisador do banco 2 desgastado', 'Sonda lambda B2S2 com defeito'],
    fix: 'Verificar sonda lambda B2S2; substituir catalisador se confirmado.',
    diy: false, cost: 'R$ 500–2.500' },

  { code: 'P0440', cat: 'Motor', sev: 'baixo', name: 'Sistema EVAP – Falha geral (vapores de combustível)',
    desc: 'Falha geral no sistema de controle de vapores de combustível (EVAP). Não é urgente, mas mantém a luz do motor acesa.',
    causes: ['Tampa do tanque mal fechada ou com vedação danificada', 'Válvula de purga ou canister com defeito', 'Mangueiras do sistema EVAP rachadas'],
    fix: 'Verificar a tampa do tanque primeiro (causa mais comum). Se persistir, inspecionar válvula de purga e canister.',
    diy: true, cost: 'R$ 50–500' },

  { code: 'P0442', cat: 'Motor', sev: 'baixo', name: 'Sistema EVAP – Pequeno vazamento detectado',
    desc: 'O sistema de vapores de combustível tem um pequeno vazamento. Não é urgente mas deve ser corrigido para passar inspeção.',
    causes: ['Tampa do tanque com vedação desgastada', 'Microtrinca nas mangueiras EVAP', 'Válvula de canister com vazamento'],
    fix: 'Trocar a tampa do tanque é o primeiro passo. Inspecionar mangueiras se o código persistir.',
    diy: true, cost: 'R$ 30–400' },

  { code: 'P0455', cat: 'Motor', sev: 'baixo', name: 'Sistema EVAP – Grande vazamento detectado',
    desc: 'Vazamento grande no sistema EVAP. Muito frequentemente é apenas a tampa do tanque mal rosqueada após abastecer.',
    causes: ['Tampa do tanque mal fechada ou com defeito', 'Mangueira EVAP solta ou rompida', 'Válvula de purga presa aberta'],
    fix: 'Fechar ou trocar a tampa do tanque. Se o código voltar, verificar mangueiras e válvula de purga.',
    diy: true, cost: 'R$ 30–500' },

  // ── MOTOR P05 – Velocidade / Marcha Lenta ─────────────────────────────────
  { code: 'P0480', cat: 'Motor', sev: 'medio', name: 'Relé da Ventoinha de Resfriamento – Falha',
    desc: 'O relé que controla a ventoinha do radiador não funciona. Motor pode superaquecer em trânsito lento ou parado com ar-condicionado ligado.',
    causes: ['Relé da ventoinha com defeito', 'Fusível da ventoinha queimado', 'Motor elétrico da ventoinha defeituoso', 'Fio de controle do relé com problema'],
    fix: 'Verificar fusível; testar e substituir o relé; verificar motor da ventoinha.',
    diy: true, cost: 'R$ 50–400' },

  { code: 'P0500', cat: 'Motor', sev: 'medio', name: 'Sensor de Velocidade do Veículo (VSS) – Falha',
    desc: 'O sensor de velocidade não envia sinal correto. Pode afetar o câmbio automático, ABS e o velocímetro.',
    causes: ['Sensor VSS com defeito', 'Anel magnético danificado', 'Chicote danificado', 'Problema mecânico na caixa de câmbio'],
    fix: 'Verificar e substituir o sensor VSS. Inspecionar o anel magnético associado.',
    diy: true, cost: 'R$ 80–400' },

  { code: 'P0505', cat: 'Motor', sev: 'medio', name: 'Sistema de Marcha Lenta (IAC) – Falha',
    desc: 'O sistema de controle de marcha lenta não funciona. Motor pode morrer ao parar ou ter rotação irregular em neutro.',
    causes: ['Atuador de marcha lenta (IAC) com defeito', 'Corpo de borboleta sujo com carvão', 'Vazamento de ar', 'Problema no chicote do IAC'],
    fix: 'Limpar o corpo de borboleta e o IAC com spray específico. Substituir o IAC se necessário.',
    diy: true, cost: 'R$ 80–400' },

  { code: 'P0506', cat: 'Motor', sev: 'medio', name: 'Marcha Lenta – RPM abaixo do programado',
    desc: 'A rotação em marcha lenta está abaixo do valor programado. Motor pode morrer ao parar ou ter vibração excessiva.',
    causes: ['Corpo de borboleta sujo com carvão', 'IAC travado', 'Vazamento de vácuo', 'Velas gastas'],
    fix: 'Limpar corpo de borboleta com spray; verificar vazamentos de vácuo; trocar velas.',
    diy: true, cost: 'R$ 50–350' },

  { code: 'P0507', cat: 'Motor', sev: 'medio', name: 'Marcha Lenta – RPM acima do programado',
    desc: 'A rotação em marcha lenta está acima do normal. Motor "corre" no neutro sem acionar o acelerador.',
    causes: ['Vazamento de ar não controlado (mangueira solta ou furada)', 'IAC preso aberto', 'Válvula de bypass de ar com defeito'],
    fix: 'Inspecionar todas as mangueiras de vácuo; verificar IAC.',
    diy: true, cost: 'R$ 50–350' },

  // ── MOTOR P06 – Elétrica / ECU ────────────────────────────────────────────
  { code: 'P0560', cat: 'Motor', sev: 'medio', name: 'Tensão do Sistema Fora da Faixa',
    desc: 'A tensão medida pelo ECU está fora da faixa aceitável (geralmente 10–15 V). Pode causar comportamento errático em vários sistemas.',
    causes: ['Bateria fraca ou com defeito', 'Alternador com falha', 'Mau contato nos bornes da bateria', 'Aterramento do motor com problema'],
    fix: 'Testar bateria e alternador com multímetro/testador. Limpar e apertar bornes. Verificar fios de aterramento.',
    diy: true, cost: 'R$ 80–800' },

  { code: 'P0601', cat: 'Motor', sev: 'alto', name: 'ECU – Erro de checksum da memória interna',
    desc: 'A memória interna do módulo de gerenciamento do motor está corrompida. O módulo pode precisar de reprogramação ou substituição.',
    causes: ['Falha interna do ECU', 'Tensão de alimentação instável durante operação', 'Interferência eletromagnética'],
    fix: 'Consultar especialista em eletrônica automotiva para diagnóstico. Pode requerer reprogramação ou troca do ECU.',
    diy: false, cost: 'R$ 500–3.500' },

  // ── TRANSMISSÃO ───────────────────────────────────────────────────────────
  { code: 'P0700', cat: 'Transmissão', sev: 'alto', name: 'Sistema de Controle da Transmissão – Falha Geral (TCM)',
    desc: 'O módulo de controle da transmissão (TCM) detectou uma falha. Leia os códigos específicos P07xx para diagnóstico detalhado.',
    causes: ['Múltiplas causas — ver códigos P07xx específicos', 'Sensor de temperatura do ATF com falha', 'Solenoides defeituosos', 'Nível de ATF baixo'],
    fix: 'Ler todos os DTCs do TCM com scanner para identificar a falha específica. Verificar nível e condição do ATF.',
    diy: false, cost: 'R$ 300–4.000' },

  { code: 'P0705', cat: 'Transmissão', sev: 'alto', name: 'Sensor de Posição do Seletor (TR) – Falha',
    desc: 'O sensor que informa ao TCM a posição do câmbio (P/R/N/D) está com falha. Pode impedir partida ou o engate de certas marchas.',
    causes: ['Sensor TR com defeito', 'Ajuste incorreto do sensor', 'Chicote danificado', 'Problema no mecanismo do seletor'],
    fix: 'Ajustar ou substituir o sensor TR; verificar chicote de ligação.',
    diy: false, cost: 'R$ 150–600' },

  { code: 'P0715', cat: 'Transmissão', sev: 'alto', name: 'Sensor de Velocidade de Entrada/Turbina – Falha',
    desc: 'O sensor de rotação na entrada da transmissão automática não gera sinal correto. Pode causar trocas bruscas ou travamento em uma marcha.',
    causes: ['Sensor de velocidade com defeito', 'Chicote danificado', 'Anel magnético danificado', 'Nível de ATF baixo'],
    fix: 'Verificar nível e condição do ATF; substituir sensor se necessário.',
    diy: false, cost: 'R$ 150–600' },

  { code: 'P0720', cat: 'Transmissão', sev: 'alto', name: 'Sensor de Velocidade do Eixo de Saída – Falha',
    desc: 'O sensor de velocidade na saída da transmissão não gera sinal correto. Afeta a troca de marchas e pode travar o câmbio.',
    causes: ['Sensor defeituoso', 'Chicote danificado', 'Anel magnético com dentes quebrados'],
    fix: 'Substituir sensor; inspecionar anel magnético.',
    diy: false, cost: 'R$ 150–600' },

  { code: 'P0730', cat: 'Transmissão', sev: 'alto', name: 'Relação de Marchas Incorreta',
    desc: 'A relação de transmissão detectada não corresponde à esperada. Câmbio pode escorregar ou "patinar" entre marchas.',
    causes: ['ATF sujo ou com nível baixo', 'Embreagem interna desgastada', 'Solenoides de troca defeituosos', 'Válvulas hidráulicas entupidas'],
    fix: 'Trocar o ATF e filtro. Diagnóstico especializado para avaliar condição interna do câmbio.',
    diy: false, cost: 'R$ 500–8.000' },

  { code: 'P0740', cat: 'Transmissão', sev: 'medio', name: 'Solenóide do Conversor de Torque (TCC) – Falha',
    desc: 'O solenóide que controla o bloqueio do conversor de torque não funciona. Pode causar aumento de consumo e aquecimento do ATF.',
    causes: ['Solenóide TCC com defeito', 'ATF sujo entupindo o solenóide', 'Chicote danificado'],
    fix: 'Trocar ATF e filtro; substituir solenóide TCC se necessário.',
    diy: false, cost: 'R$ 200–1.200' },

  { code: 'P0750', cat: 'Transmissão', sev: 'alto', name: 'Solenóide de Troca A – Falha no circuito',
    desc: 'O solenóide responsável pelas trocas de marcha não responde. Pode causar trocas duras ou fixação em uma marcha específica.',
    causes: ['Solenóide com defeito', 'ATF sujo entupindo o solenóide', 'Driver do solenóide no TCM com falha'],
    fix: 'Trocar ATF e filtro da transmissão; substituir solenóide se necessário.',
    diy: false, cost: 'R$ 300–2.000' },

  { code: 'P0755', cat: 'Transmissão', sev: 'alto', name: 'Solenóide de Troca B – Falha no circuito',
    desc: 'O solenóide B de troca de marcha não responde. Causa sintomas similares ao P0750.',
    causes: ['Solenóide B com defeito', 'ATF sujo', 'Chicote danificado'],
    fix: 'Trocar ATF; substituir solenóide B.',
    diy: false, cost: 'R$ 300–2.000' },

  // ── CARROCERIA / SEGURANÇA ────────────────────────────────────────────────
  { code: 'B0001', cat: 'Carroceria', sev: 'alto', name: 'Air Bag do Motorista – Falha no circuito de detonação',
    desc: 'Falha no circuito do air bag frontal do motorista. O sistema SRS pode NÃO funcionar em uma colisão.',
    causes: ['Conector espiral (relógio) com defeito', 'Módulo do air bag com falha', 'Chicote danificado sob o volante', 'Módulo ACU com defeito'],
    fix: 'Não tente reparar sozinho — risco de detonação acidental. Levar à oficina com scanner SRS para diagnóstico seguro.',
    diy: false, cost: 'R$ 300–2.500' },

  { code: 'B0002', cat: 'Carroceria', sev: 'alto', name: 'Air Bag do Passageiro – Falha no circuito de detonação',
    desc: 'Falha no sistema de air bag frontal do passageiro. O air bag pode não atuar em uma colisão.',
    causes: ['Módulo do air bag com defeito', 'Chicote sob o painel danificado', 'Módulo ACU com falha'],
    fix: 'Diagnóstico com scanner SRS especializado. Não tentar reparo caseiro.',
    diy: false, cost: 'R$ 300–2.500' },

  { code: 'C0031', cat: 'Carroceria', sev: 'alto', name: 'Sensor ABS – Roda Dianteira Esquerda',
    desc: 'O sensor de velocidade da roda dianteira esquerda não gera sinal correto. ABS e controle de estabilidade podem ser desativados.',
    causes: ['Sensor ABS com defeito', 'Anel fônico sujo ou danificado', 'Rolamento de roda com falha na pista magnética', 'Chicote do sensor danificado'],
    fix: 'Limpar sensor e anel fônico; substituir sensor ou rolamento se necessário.',
    diy: true, cost: 'R$ 100–600' },

  { code: 'C0034', cat: 'Carroceria', sev: 'alto', name: 'Sensor ABS – Roda Dianteira Direita',
    desc: 'Sensor de velocidade da roda dianteira direita com falha. ABS e estabilidade podem ser desativados.',
    causes: ['Sensor ABS com defeito', 'Anel fônico ou rolamento com falha', 'Chicote danificado'],
    fix: 'Limpar ou substituir sensor; verificar rolamento.',
    diy: true, cost: 'R$ 100–600' },

  { code: 'C0037', cat: 'Carroceria', sev: 'alto', name: 'Sensor ABS – Roda Traseira Esquerda',
    desc: 'Sensor de velocidade da roda traseira esquerda com falha. ABS e estabilidade podem ser desativados.',
    causes: ['Sensor ABS com defeito', 'Anel fônico sujo ou danificado', 'Chicote danificado'],
    fix: 'Limpar ou substituir sensor; verificar anel fônico e rolamento.',
    diy: true, cost: 'R$ 100–600' },

  { code: 'C0040', cat: 'Carroceria', sev: 'alto', name: 'Sensor ABS – Roda Traseira Direita',
    desc: 'Sensor de velocidade da roda traseira direita com falha.',
    causes: ['Sensor ABS com defeito', 'Anel fônico ou rolamento com falha'],
    fix: 'Limpar ou substituir sensor; verificar anel fônico e rolamento.',
    diy: true, cost: 'R$ 100–600' },

  { code: 'C0110', cat: 'Carroceria', sev: 'alto', name: 'Motor da Bomba ABS – Falha no circuito',
    desc: 'O motor da bomba hidráulica do ABS não funciona corretamente. O sistema ABS será desativado.',
    causes: ['Motor da bomba ABS com defeito', 'Relé da bomba queimado', 'Fusível do ABS queimado', 'Módulo ABS com defeito'],
    fix: 'Verificar fusíveis e relé do ABS; diagnóstico do módulo com scanner.',
    diy: false, cost: 'R$ 500–3.000' },

  // ── REDE (U codes) ────────────────────────────────────────────────────────
  { code: 'U0001', cat: 'Rede', sev: 'alto', name: 'Barramento CAN – Falha na comunicação',
    desc: 'Falha na rede CAN que interliga os módulos do veículo. Pode gerar múltiplos códigos de falha em cascata em vários sistemas.',
    causes: ['Módulo defeituoso "puxando" o barramento', 'Fio CAN com curto ou aberto', 'Conector OBD-II com problema', 'Interferência elétrica'],
    fix: 'Diagnóstico com osciloscópio no barramento CAN. Identificar o módulo causador da falha.',
    diy: false, cost: 'R$ 300–3.500' },

  { code: 'U0100', cat: 'Rede', sev: 'alto', name: 'Sem Comunicação com ECM/PCM',
    desc: 'Outros módulos não conseguem se comunicar com o módulo de gerenciamento do motor. Sistema pode entrar em modo de falha.',
    causes: ['ECM/PCM sem alimentação ou com defeito', 'Fusível do ECM queimado', 'Falha no barramento CAN', 'Mau contato nos conectores do ECM'],
    fix: 'Verificar alimentação e aterramento do ECM; verificar fusíveis; diagnosticar o barramento CAN.',
    diy: false, cost: 'R$ 300–4.000' },

  { code: 'U0101', cat: 'Rede', sev: 'alto', name: 'Sem Comunicação com TCM (Transmissão)',
    desc: 'O módulo da transmissão não se comunica. Pode causar trocas incorretas ou travar o câmbio automático.',
    causes: ['TCM sem alimentação ou com defeito', 'Fusível do TCM queimado', 'Falha no barramento CAN'],
    fix: 'Verificar alimentação do TCM; verificar fusíveis; diagnosticar CAN.',
    diy: false, cost: 'R$ 300–3.000' },

  { code: 'U0121', cat: 'Rede', sev: 'alto', name: 'Sem Comunicação com Módulo ABS',
    desc: 'O módulo ABS não responde na rede CAN. ABS e controle de estabilidade provavelmente desativados.',
    causes: ['Módulo ABS com defeito', 'Falha no barramento CAN', 'Alimentação do módulo ABS com problema'],
    fix: 'Verificar alimentação e aterramento do módulo ABS; diagnosticar CAN.',
    diy: false, cost: 'R$ 300–2.500' },

  { code: 'U0140', cat: 'Rede', sev: 'medio', name: 'Sem Comunicação com BCM (Módulo de Carroceria)',
    desc: 'O módulo de carroceria (que controla travas, vidros, iluminação, buzina etc.) não se comunica.',
    causes: ['BCM com defeito', 'Falha no barramento CAN', 'Problemas de alimentação do BCM', 'Fusível queimado'],
    fix: 'Verificar fusíveis e alimentação do BCM; substituir módulo se confirmado.',
    diy: false, cost: 'R$ 400–2.500' },

  { code: 'U0155', cat: 'Rede', sev: 'medio', name: 'Sem Comunicação com Painel de Instrumentos (IPC)',
    desc: 'O módulo do painel de instrumentos não se comunica. Pode causar falhas nos indicadores ou apagamento total do painel.',
    causes: ['Módulo IPC com defeito', 'Fusível queimado', 'Falha no CAN'],
    fix: 'Verificar alimentação do IPC; verificar fusíveis; substituir módulo se necessário.',
    diy: false, cost: 'R$ 300–2.000' },
]

export default function OBDPage() {
  const router = useRouter()
  const [query, setQuery]   = useState('')
  const [cat,   setCat]     = useState<Cat | 'todos'>('todos')
  const [open,  setOpen]    = useState<string | null>(null)

  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    return DB.filter(c => {
      const matchCat = cat === 'todos' || c.cat === cat
      const matchQ   = !q
        || c.code.toLowerCase().includes(q)
        || c.name.toLowerCase().includes(q)
        || c.desc.toLowerCase().includes(q)
        || c.causes.some(x => x.toLowerCase().includes(q))
        || c.fix.toLowerCase().includes(q)
      return matchCat && matchQ
    })
  }, [query, cat])

  return (
    <div className="min-h-screen" style={{ background: '#1c1c22' }}>
      <Header />

      <div className="max-w-[980px] mx-auto px-4 py-10">

        {/* Title row */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-[12px] font-bold tracking-[3px] uppercase mb-1"
              style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
              Diagnóstico
            </p>
            <h1 className="text-[42px] leading-none mb-2"
              style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
              Códigos de Falha OBD
            </h1>
            <p className="text-[14px] max-w-xl" style={{ color: '#666' }}>
              Pesquise o código que apareceu no seu scanner ou na luz de check engine.
              Causas mais comuns, como resolver e custo estimado do reparo.
            </p>
          </div>
          <button
            onClick={() => router.push('/home')}
            className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-[16px] transition-all hover:bg-white/5"
            style={{ border: '1px solid #3a3a42', color: '#555' }}
            title="Fechar"
          >✕</button>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#555' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </span>
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setOpen(null) }}
            placeholder="Digite o código (P0300) ou palavra-chave (catalisador, misfire, marcha...)"
            className="w-full pl-12 pr-4 py-4 rounded-xl text-[14px] outline-none"
            style={{ background: '#28282e', border: '1px solid #3a3a42', color: '#f0ede8', fontFamily: 'var(--font-barlow)' }}
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['todos', ...CATS] as const).map(c => (
            <button
              key={c}
              onClick={() => { setCat(c); setOpen(null) }}
              className="px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-[1px] transition-all"
              style={{
                fontFamily: 'var(--font-barlow-condensed)',
                background: cat === c ? (c === 'todos' ? '#ff6600' : CAT_COLOR[c as Cat]) : '#28282e',
                color: cat === c ? '#fff' : '#555',
                border: `1px solid ${cat === c ? 'transparent' : '#3a3a42'}`,
              }}
            >
              {c === 'todos'
                ? `Todos · ${DB.length}`
                : `${c} · ${DB.filter(x => x.cat === c).length}`}
            </button>
          ))}
        </div>

        <p className="text-[11px] mb-4" style={{ color: '#3a3a42', fontFamily: 'var(--font-barlow-condensed)' }}>
          {results.length} código{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
        </p>

        {/* Results list */}
        <div className="flex flex-col gap-2">
          {results.map(c => {
            const isOpen = open === c.code
            return (
              <div
                key={c.code}
                className="rounded-2xl overflow-hidden transition-all"
                style={{
                  background: '#28282e',
                  border: `1px solid ${isOpen ? CAT_COLOR[c.cat] + '55' : '#3a3a42'}`,
                }}
              >
                {/* Row */}
                <button
                  onClick={() => setOpen(isOpen ? null : c.code)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
                >
                  <span
                    className="text-[17px] font-black tracking-wider shrink-0 w-[64px]"
                    style={{ color: CAT_COLOR[c.cat], fontFamily: 'var(--font-bebas-neue)' }}
                  >
                    {c.code}
                  </span>
                  <span className="flex-1 text-[13px] font-semibold leading-tight" style={{ color: '#e0ddd8' }}>
                    {c.name}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="hidden sm:block text-[10px] font-bold uppercase tracking-[1px] px-2.5 py-0.5 rounded-full"
                      style={{
                        background: CAT_COLOR[c.cat] + '18',
                        color: CAT_COLOR[c.cat],
                        fontFamily: 'var(--font-barlow-condensed)',
                      }}
                    >
                      {c.cat}
                    </span>
                    <span
                      className="text-[10px] font-bold uppercase tracking-[1px] px-2.5 py-0.5 rounded-full"
                      style={{
                        background: SEV_COLOR[c.sev] + '18',
                        color: SEV_COLOR[c.sev],
                        fontFamily: 'var(--font-barlow-condensed)',
                      }}
                    >
                      {SEV_LABEL[c.sev]}
                    </span>
                    <span
                      className="text-[14px] transition-transform duration-200"
                      style={{ display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : 'none', color: '#444' }}
                    >
                      ▾
                    </span>
                  </div>
                </button>

                {/* Expanded */}
                {isOpen && (
                  <div className="px-5 pb-6 pt-1" style={{ borderTop: '1px solid #222' }}>
                    <p className="text-[13px] leading-relaxed mb-5" style={{ color: '#999' }}>{c.desc}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[1.5px] mb-2.5"
                          style={{ color: '#444', fontFamily: 'var(--font-barlow-condensed)' }}>
                          Causas mais prováveis
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {c.causes.map((cause, i) => (
                            <li key={i} className="flex items-start gap-2 text-[12px] leading-snug" style={{ color: '#777' }}>
                              <span style={{ color: CAT_COLOR[c.cat], marginTop: 1, flexShrink: 0 }}>▸</span>
                              {cause}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[1.5px] mb-1.5"
                            style={{ color: '#444', fontFamily: 'var(--font-barlow-condensed)' }}>
                            Como resolver
                          </p>
                          <p className="text-[12px] leading-relaxed" style={{ color: '#777' }}>{c.fix}</p>
                        </div>
                        <div className="flex items-center gap-4 flex-wrap">
                          <div className="flex items-center gap-1.5">
                            <span className="shrink-0">{c.diy
                              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                            }</span>
                            <span className="text-[11px] font-bold uppercase tracking-[0.5px]"
                              style={{ color: c.diy ? '#22c55e' : '#f59e0b', fontFamily: 'var(--font-barlow-condensed)' }}>
                              {c.diy ? 'Pode ser DIY' : 'Oficina recomendada'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="shrink-0"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span>
                            <span className="text-[11px] font-bold"
                              style={{ color: '#888', fontFamily: 'var(--font-barlow-condensed)' }}>
                              Estimativa: {c.cost}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {results.length === 0 && (
            <div className="text-center py-20">
              <p className="mb-4 flex justify-center" style={{ color: '#333' }}>
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </p>
              <p className="text-[16px] mb-1" style={{ color: '#444' }}>
                Nenhum código encontrado para &quot;{query}&quot;
              </p>
              <p className="text-[13px]" style={{ color: '#333' }}>
                Tente o código exato (P0300) ou palavras em português (catalisador, injetor, marcha lenta...)
              </p>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-center mt-10 text-[11px] leading-relaxed" style={{ color: '#3a3a42' }}>
          As informações são educativas e baseadas em causas estatisticamente mais comuns.
          Para diagnóstico definitivo, use um scanner automotivo e consulte um mecânico qualificado.
        </p>
      </div>
    </div>
  )
}
