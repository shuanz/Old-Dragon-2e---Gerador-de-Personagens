# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [2.2.0] - 2024-12-19

### 🎲 Adicionado
- **Sistema de Sorteio Variável**: Nova função `getRandomItemsFromList()` para criar muito mais variedade nos equipamentos
- **Distribuição Aleatória de Equipamentos**:
  - ARMAS: 1-2 armas por classe (varia entre 1 e 2)
  - ARMADURAS: 0-1 armadura por classe (pode não ter armadura)
  - ESCUDOS: probabilidade de 70-80% (não sempre presente)
  - ITENS GERAIS: 1-3 itens por classe (varia muito)
  - RECIPIENTES: 1-2 recipientes por classe (varia entre 1 e 2)
- **Embaralhamento de Itens**: Evita repetições e garante itens únicos
- **Probabilidades Realistas**: Escudos não são garantidos, criando mais realismo

### 🔧 Corrigido
- **Erro EquipmentManager**: Corrigido `ReferenceError: EquipmentManager is not defined`
- **Duplicação da Adaga**: Removida duplicação que fazia Adaga aparecer sempre
- **Restrições de Equipamento**: Implementadas listas completas de armas por classe conforme especificação
- **Ordem de Carregamento**: Corrigida ordem dos módulos no `module.json`

### 📦 Melhorado
- **Listas Completas de Armas**: Implementadas todas as 24 armas para Guerreiro, 7 para Arqueiro, 6 para Clérigo, etc.
- **Equipamentos SRD**: Incluídos todos os equipamentos diversos do SRD (armaduras, escudos, itens gerais, recipientes)
- **Arquitetura Modular**: Melhor organização com classes especializadas
- **Compatibilidade**: Mantida compatibilidade com todas as classes existentes

### 🎯 Benefícios
- **Variedade Máxima**: Cada personagem terá quantidade diferente de equipamentos
- **Aleatoriedade Real**: Não há mais padrões fixos
- **Flexibilidade**: Sistema pode ser facilmente ajustado (mudar min/max)
- **Respeita Restrições**: Mantém todas as restrições de classe implementadas

## [2.1.4] - 2024-12-18

### 🔧 Corrigido
- Nome da pasta de download corrigido de "old-dragon-2e-gerador-de-personagens" para "old-dragon-2e---gerador-de-personagens"

## [2.1.3] - 2024-12-18

### 📦 Melhorado
- Arquitetura modular implementada
- Classes especializadas para melhor organização
- Sistema de geração de equipamentos aprimorado

## [2.1.2] - 2024-12-17

### 🔧 Corrigido
- Problemas de compatibilidade com Foundry VTT v13
- Erros de carregamento de módulos

## [2.1.1] - 2024-12-16

### 📦 Melhorado
- Interface do gerador de personagens
- Sistema de geração de atributos

## [2.1.0] - 2024-12-15

### 🎉 Lançamento Inicial
- Gerador de personagens para Old Dragon 2e
- Geração automática de atributos, raças, classes e equipamentos
- Interface integrada ao Foundry VTT
- Compatibilidade com sistema Old Dragon 2e
