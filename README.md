# Old Dragon 2e - Gerador de Personagens

Um módulo para Foundry Virtual Tabletop que permite gerar personagens automaticamente para o sistema Old Dragon 2e. Agora com arquitetura modular e programação orientada a objetos para melhor organização e manutenibilidade.

## Características

- **Geração Automática**: Cria personagens com atributos aleatórios usando 3d6
- **Raças Oficiais SRD**: Suporte para Humanos, Elfos, Anões, Halflings, Meio-Elfos e Gnomos
- **Todas as Classes**: Guerreiro, Mago, Clérigo, Ladino, Druida, Paladino e Ranger
- **Equipamento Automático**: Cada classe recebe equipamento apropriado buscado exclusivamente no compêndio oficial do sistema
- **Cálculo de HP**: Pontos de vida calculados automaticamente baseado na classe e constituição
- **Sistema de Idiomas**: Idiomas baseados em Inteligência com regras de leitura/escrita
- **Magias Iniciais**: Geração automática de magias iniciais para classes arcanas
- **Interface Intuitiva**: Botão integrado no menu de atores do Foundry VTT
- **Arquitetura Modular**: Código organizado em classes especializadas

## Instalação

1. Baixe o módulo do GitHub ou clone o repositório
2. Coloque a pasta do módulo em `{userData}/Data/modules/`
3. Ative o módulo nas configurações do Foundry VTT
4. Certifique-se de que o sistema Old Dragon 2e está instalado

## Como Usar

1. Abra o menu de Atores no Foundry VTT
2. Clique no botão "Gerar Personagem" que aparece no canto superior direito
3. O módulo gerará automaticamente um personagem com:
   - Atributos aleatórios (3d6)
   - Raça e classe aleatórias
   - Equipamento apropriado
   - Pontos de vida calculados
   - Modificadores de atributos

## Configurações

O módulo não requer configurações especiais. Ele funciona automaticamente com o sistema Old Dragon 2e.

## Compatibilidade

- **Foundry VTT**: v13+
- **Sistema**: Old Dragon 2e
- **Idioma**: Português Brasileiro

## Estrutura do Projeto

```
old-dragon-2e---gerador-de-personagens/
├── module.json              # Configuração do módulo
├── scripts/
│   ├── character-generator.js  # Lógica principal
│   ├── settings.js            # Configurações
│   ├── srd-equipment.json     # Dados de equipamentos do SRD
│   └── modules/               # Classes modulares (OOP)
│       ├── Character.js       # Gerenciamento de dados do personagem
│       ├── AttributeCalculator.js # Cálculos de atributos
│       ├── RaceManager.js     # Gerenciamento de raças e idiomas
│       ├── ClassManager.js    # Gerenciamento de classes
│       ├── SpellManager.js    # Gerenciamento de magias
│       └── EquipmentManager.js # Gerenciamento de equipamentos
├── styles/
│   └── character-generator.css # Estilos do modal
├── templates/
│   └── character-generator.html # Template HTML
├── lang/
│   └── pt-BR.json            # Traduções
└── README.md                 # Este arquivo
```

## Funcionalidades Detalhadas

### Geração de Atributos
- Usa 3d6 para cada atributo (Força, Destreza, Constituição, Inteligência, Sabedoria, Carisma)
- Calcula modificadores automaticamente
- Aplica bônus de raça quando aplicável

### Raças Suportadas (SRD Oficial)
- **Humano**: Bônus +1 em todos os atributos
- **Elfo**: +1 Inteligência, +1 Destreza, -1 Constituição
- **Anão**: +1 Constituição, +1 Força, -1 Carisma
- **Halfling**: +1 Destreza, +1 Carisma, -1 Força
- **Meio-Elfo**: +1 Inteligência, +1 Carisma
- **Gnomo**: +1 Inteligência, +1 Constituição, -1 Força

### Classes Suportadas
- **Guerreiro**: D10 de vida, armas e armaduras
- **Mago**: D4 de vida, magias arcanas
- **Clérigo**: D8 de vida, magias divinas
- **Ladino**: D6 de vida, habilidades furtivas
- **Druida**: D8 de vida, magias divinas da natureza
- **Paladino**: D10 de vida, habilidades sagradas
- **Ranger**: D6 de vida, habilidades de sobrevivência
- **Bárbaro**: D10 de vida, combate feroz
- **Bardo**: D6 de vida, habilidades sociais e magias
- **Assassino**: D6 de vida, habilidades furtivas avançadas
- **Necromante**: D4 de vida, magias de necromancia
- **Ilusionista**: D4 de vida, magias de ilusão
- **Bruxo**: D4 de vida, magias arcanas especiais
- **Feiticeiro**: D4 de vida, magias arcanas naturais

### Equipamento por Classe
Cada classe recebe equipamento apropriado:
- **Guerreiro**: Espada longa, escudo, armadura de couro
- **Mago**: Cajado, túnica, pergaminhos
- **Clérigo**: Martelo de guerra, escudo, armadura
- **Ladino**: Adaga, armadura de couro, ferramentas
- E assim por diante...

### Sistema de Idiomas
- **Base**: 2 idiomas iniciais (raça/origem)
- **Inteligência 2-3**: Nenhum idioma
- **Inteligência 4-8**: Apenas fala (não lê/escreve)
- **Inteligência 9+**: Lê e escreve todos os idiomas conhecidos
- **Idiomas adicionais**: Baseados no modificador de Inteligência

### Magias Iniciais
- **Classes Arcanas**: 3 magias aleatórias de 1º círculo + magias exclusivas
- **Lista de 12 magias**: Abrir/Trancar, Cerrar Portas, Disco Flutuante, etc.
- **Magias Exclusivas**: Som Ilusório (Ilusionista), Aterrorizar (Necromante), etc.

## Arquitetura Modular

O módulo utiliza programação orientada a objetos com classes especializadas:

### Classes Principais
- **`Character.js`** - Gerenciamento de dados do personagem
- **`AttributeCalculator.js`** - Cálculos de atributos e modificadores
- **`RaceManager.js`** - Gerenciamento de raças e idiomas
- **`ClassManager.js`** - Gerenciamento de classes e restrições
- **`SpellManager.js`** - Gerenciamento de magias e especializações
- **`EquipmentManager.js`** - Gerenciamento de equipamentos

### Benefícios
- **Separação de Responsabilidades**: Cada classe tem uma função específica
- **Manutenibilidade**: Código organizado e fácil de manter
- **Escalabilidade**: Fácil adicionar novas funcionalidades
- **Testabilidade**: Classes independentes para testes unitários

## Desenvolvimento

### Pré-requisitos
- Node.js (opcional, para desenvolvimento)
- Foundry VTT
- Sistema Old Dragon 2e

### Estrutura do Código
- `character-generator.js`: Lógica principal e orquestração
- `settings.js`: Configurações do módulo
- `modules/`: Classes modulares especializadas
- `character-generator.css`: Estilos do modal
- `character-generator.html`: Template do modal
- `srd-equipment.json`: Dados de equipamentos do SRD

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Changelog

### v2.0.0
- **Arquitetura Modular**: Implementação de programação orientada a objetos
- **Classes Especializadas**: 6 novas classes modulares para organização
- **Sistema de Idiomas**: Regras completas baseadas em Inteligência
- **Magias Iniciais**: Geração automática com 12 magias aleatórias
- **Raças SRD**: Apenas raças oficiais (removido Orc e Goblin)
- **Saneamento de Código**: Remoção de funções não utilizadas
- **Melhorias na Manutenibilidade**: Código mais limpo e organizado

### v1.1.0
- Melhorias na geração de equipamentos
- Correções de bugs menores
- Otimizações de performance

### v1.0.0
- Lançamento inicial
- Geração básica de personagens
- Suporte a todas as raças e classes do Old Dragon 2e
- Interface integrada ao Foundry VTT
- Localização em português brasileiro

## Contribuições

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request no GitHub.

## Agradecimentos

- Equipe do Foundry Virtual Tabletop pela plataforma
- Desenvolvedores do sistema Old Dragon 2e
- Comunidade brasileira de RPG