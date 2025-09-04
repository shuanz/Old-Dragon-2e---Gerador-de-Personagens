# Old Dragon 2e - Gerador de Personagens

Um módulo para Foundry Virtual Tabletop que permite gerar personagens automaticamente para o sistema Old Dragon 2e.

## Características

- **Geração Automática**: Cria personagens com atributos aleatórios usando 3d6
- **Múltiplas Raças**: Suporte para Humanos, Elfos, Anões, Halflings, Orcs e Goblins
- **Todas as Classes**: Guerreiro, Mago, Clérigo, Ladino, Druida, Paladino e Ranger
- **Equipamento Automático**: Cada classe recebe equipamento apropriado
- **Cálculo de HP**: Pontos de vida calculados automaticamente baseado na classe e constituição
- **Interface Intuitiva**: Botão integrado no menu de atores do Foundry VTT

## Instalação

1. Baixe o módulo do GitHub ou clone o repositório
2. Coloque a pasta do módulo em `{userData}/Data/modules/`
3. Ative o módulo nas configurações do Foundry VTT
4. Certifique-se de que o sistema Old Dragon 2e está instalado

## Como Usar

1. Abra o menu de Atores (Actors) no Foundry VTT
2. Clique no botão "Gerar Personagem" no cabeçalho da janela
3. Um personagem será criado automaticamente com:
   - Nome aleatório
   - Raça e classe aleatórias
   - Atributos gerados com 3d6
   - Equipamento apropriado para a classe
   - Pontos de vida calculados

## Requisitos

- Foundry Virtual Tabletop v11 ou superior
- Sistema Old Dragon 2e instalado

## Estrutura do Projeto

```
old-dragon-2e-gerador-de-personagens/
├── module.json                 # Manifesto do módulo
├── scripts/
│   └── character-generator.js   # Script principal
├── styles/
│   └── character-generator.css  # Estilos CSS
├── templates/
│   └── character-generator.html # Template HTML
├── lang/
│   └── pt-BR.json             # Localização em português
└── README.md                   # Este arquivo
```

## Funcionalidades Técnicas

### Geração de Atributos
- Usa 3d6 para cada atributo (Força, Destreza, Constituição, Inteligência, Sabedoria, Carisma)
- Calcula modificadores automaticamente baseado na tabela do Old Dragon 2e

### Cálculo de HP
- HP base por classe:
  - Guerreiro/Paladino: 8 HP
  - Clérigo/Druida/Ranger: 6 HP
  - Mago/Ladino: 4 HP
- Modificador de constituição aplicado

### Equipamento por Classe
- **Guerreiro**: Espada longa, escudo, armadura de couro, mochila, rações, etc.
- **Mago**: Cajado, túnica, pergaminhos, tinta e pena, etc.
- **Clérigo**: Martelo de guerra, escudo, símbolo sagrado, etc.
- **Ladino**: Adagas, arco curto, flechas, gancho de escalada, etc.
- **Druida**: Bastão, símbolo natural, saco de dormir, etc.
- **Paladino**: Espada longa, escudo, símbolo sagrado, etc.
- **Ranger**: Espada curta, arco longo, flechas, etc.

## Desenvolvimento

### Hooks Utilizados
- `Hooks.on('init')`: Inicialização do módulo
- `Hooks.on('ready')`: Configuração após carregamento
- `Hooks.on('renderActorDirectory')`: Adição do botão na interface

### Classes Principais
- `OldDragon2eCharacterGenerator`: Classe principal para geração de personagens

## Licença

MIT License - veja o arquivo LICENSE para detalhes.

## Suporte

Para reportar bugs ou solicitar funcionalidades, abra uma issue no GitHub:
https://github.com/shuanzoleiron/old-dragon-2e-gerador-de-personagens/issues

## Changelog

### v1.0.0
- Versão inicial do módulo
- Geração automática de personagens
- Suporte a todas as raças e classes do Old Dragon 2e
- Interface integrada ao Foundry VTT
- Localização em português brasileiro

## Contribuições

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request no GitHub.

## Agradecimentos

- Equipe do Foundry Virtual Tabletop pela plataforma
- Desenvolvedores do sistema Old Dragon 2e
- Comunidade brasileira de RPG
