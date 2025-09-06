# Correção das Jogadas de Proteção - Old Dragon 2e

## Problema Identificado

O gerador de personagens estava exibindo apenas os valores base das jogadas de proteção (JPD, JPC, JPS) baseados na classe e nível, sem aplicar os modificadores de atributos e bônus raciais conforme as regras do Old Dragon 2e.

## Solução Implementada

### 1. Nova Função `calculateFinalSavingThrows`

Criada função que calcula os valores finais das jogadas de proteção incluindo:

- **Valores base**: Baseados na classe e nível do personagem
- **Modificadores de atributos**:
  - JPD: Modificador de Destreza
  - JPC: Modificador de Constituição  
  - JPS: Modificador de Sabedoria
- **Bônus raciais**:
  - Humano: +1 aleatório em uma JP
  - Elfo: +1 JPD
  - Anão: +1 JPC
  - Halfling: +1 JPS
  - Orc: +1 JPC
  - Goblin: +1 JPD

### 2. Atualização do Template HTML

O modal agora exibe:
- **Valor final** da jogada de proteção
- **Breakdown detalhado** mostrando:
  - Base (valor da classe/nível)
  - Mod (modificador de atributo)
  - Raça (bônus racial)

### 3. Estilos CSS Adicionados

Estilos para exibir o breakdown das jogadas de proteção de forma clara e organizada.

### 4. Atualização da Criação de Personagem

A função `createCharacterInFoundry` agora armazena corretamente:
- Valores finais das jogadas de proteção
- Bônus raciais separados
- Modificadores de atributos aplicados

## Exemplos de Cálculo

### Guerreiro Humano nível 1 (Destreza 14, Constituição 13, Sabedoria 11)
- JPD: 5 (base) + 2 (mod Destreza) + 0 (raça) = **7**
- JPC: 5 (base) + 1 (mod Constituição) + 0 (raça) = **6**  
- JPS: 5 (base) + 0 (mod Sabedoria) + 1 (raça) = **6**

### Elfo Ladino nível 3 (Destreza 16, Constituição 12, Sabedoria 13)
- JPD: 3 (base) + 3 (mod Destreza) + 1 (raça) = **7**
- JPC: 5 (base) + 1 (mod Constituição) + 0 (raça) = **6**
- JPS: 3 (base) + 1 (mod Sabedoria) + 0 (raça) = **4**

## Arquivos Modificados

- `scripts/character-generator.js`: Nova função e atualizações
- `styles/character-generator.css`: Estilos para breakdown
- `test/test-protection-rolls.js`: Arquivo de teste criado

## Testes Realizados

Criado arquivo de teste que verifica:
- ✅ Valores base corretos por classe e nível
- ✅ Modificadores de atributos aplicados corretamente  
- ✅ Bônus raciais aplicados corretamente
- ✅ Valores finais calculados corretamente
- ✅ Breakdown detalhado disponível para debug

## Resultado

Agora o gerador exibe corretamente os valores finais das jogadas de proteção no modal, incluindo todos os modificadores conforme as regras do Old Dragon 2e. O usuário pode ver tanto o valor final quanto o breakdown detalhado para entender como o cálculo foi feito.
