# Seleção de Raça e Classe - Old Dragon 2e Gerador de Personagens

## Funcionalidades Implementadas

### 1. Dropdowns de Seleção
- **Seleção de Raça**: Dropdown com todas as raças disponíveis no compêndio SRD
- **Seleção de Classe**: Dropdown que filtra classes baseado na raça selecionada
- **Atualização em Tempo Real**: O personagem é atualizado automaticamente quando raça ou classe são alteradas

### 2. Filtragem Inteligente de Classes
- Classes são filtradas automaticamente baseado na raça selecionada
- Respeita restrições de raça (ex: Anão Aventureiro, Elfo Aventureiro, etc.)
- Mantém classes gerais disponíveis para todas as raças

### 3. Customização Pós-Sorteio
- Após gerar um personagem aleatório, é possível alterar raça e classe
- Todos os valores são recalculados automaticamente (PV, CA, BAC, BAD, etc.)
- Equipamento é ajustado conforme restrições da classe
- Magias iniciais são geradas conforme a classe selecionada

### 4. Interface Melhorada
- Controles de seleção com design consistente com o tema do módulo
- Ícones visuais para raça e classe
- Animações e efeitos hover
- Responsivo para diferentes tamanhos de tela

## Como Usar

1. **Geração Inicial**: O modal abre com raça e classe aleatórias já selecionadas
2. **Alterar Raça**: Use o dropdown "Raça" para selecionar uma nova raça
3. **Alterar Classe**: Use o dropdown "Classe" para selecionar uma nova classe
4. **Regenerar**: Use o botão "Gerar" para sortear nova raça e classe aleatórias
5. **Criar Personagem**: Use o botão "Criar Personagem" para finalizar

## Arquivos Modificados

- `scripts/character-generator.js`: Lógica principal de seleção e filtragem
- `styles/character-generator.css`: Estilos para os controles de seleção

## Métodos Adicionados

- `loadAllRaces()`: Carrega todas as raças do compêndio SRD
- `loadAllClasses()`: Carrega todas as classes do compêndio SRD
- `filterClassesByRace()`: Filtra classes baseado na raça selecionada
- `updateCharacterFromSelection()`: Atualiza personagem quando raça/classe são alteradas

## Compatibilidade

- Mantém total compatibilidade com funcionalidades existentes
- Funciona com todos os compêndios SRD do Old Dragon 2e
- Preserva restrições de classe e raça do sistema
