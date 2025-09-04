# Old Dragon 2e - Gerador de Personagens

Um módulo para Foundry Virtual Tabletop que permite gerar personagens automaticamente para o sistema Old Dragon 2e.

## Características

- **Geração Automática**: Cria personagens com atributos aleatórios usando 3d6
- **Múltiplas Raças**: Suporte para Humanos, Elfos, Anões, Halflings, Orcs e Goblins
- **Todas as Classes**: Guerreiro, Mago, Clérigo, Ladino, Druida, Paladino e Ranger
- **Equipamento Automático**: Cada classe recebe equipamento apropriado buscado exclusivamente no compêndio oficial do sistema
- **Cálculo de HP**: Pontos de vida calculados automaticamente baseado na classe e constituição
- **Interface Intuitiva**: Botão integrado no menu de atores do Foundry VTT

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

- **Foundry VTT**: v10+
- **Sistema**: Old Dragon 2e
- **Idioma**: Português Brasileiro

## Estrutura do Projeto

```
old-dragon-2e-gerador-de-personagens/
├── module.json              # Configuração do módulo
├── scripts/
│   ├── character-generator.js  # Lógica principal
│   └── settings.js            # Configurações
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

### Raças Suportadas
- **Humano**: Bônus +1 em todos os atributos
- **Elfo**: +1 Inteligência, +1 Destreza, -1 Constituição
- **Anão**: +1 Constituição, +1 Força, -1 Carisma
- **Halfling**: +1 Destreza, +1 Carisma, -1 Força
- **Orc**: +1 Força, +1 Constituição, -1 Inteligência, -1 Carisma
- **Goblin**: +1 Destreza, +1 Inteligência, -1 Força, -1 Constituição

### Classes Suportadas
- **Guerreiro**: D10 de vida, armas e armaduras
- **Mago**: D4 de vida, magias arcanas
- **Clérigo**: D8 de vida, magias divinas
- **Ladino**: D6 de vida, habilidades furtivas
- **Druida**: D8 de vida, magias divinas da natureza
- **Paladino**: D10 de vida, habilidades sagradas
- **Ranger**: D6 de vida, habilidades de sobrevivência

### Equipamento por Classe
Cada classe recebe equipamento apropriado:
- **Guerreiro**: Espada longa, escudo, armadura de couro
- **Mago**: Cajado, túnica, pergaminhos
- **Clérigo**: Martelo de guerra, escudo, armadura
- **Ladino**: Adaga, armadura de couro, ferramentas
- E assim por diante...

## Desenvolvimento

### Pré-requisitos
- Node.js (opcional, para desenvolvimento)
- Foundry VTT
- Sistema Old Dragon 2e

### Estrutura do Código
- `character-generator.js`: Contém toda a lógica de geração
- `settings.js`: Configurações do módulo
- `character-generator.css`: Estilos do modal
- `character-generator.html`: Template do modal

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Changelog

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