/**
 * Configurações do módulo Old Dragon 2e - Gerador de Personagens
 */

Hooks.on('init', function() {
    // Registra as configurações do módulo
    game.settings.register('old-dragon-2e-gerador-de-personagens', 'enableAutoGeneration', {
        name: 'Habilitar Geração Automática',
        hint: 'Permite gerar personagens automaticamente ao clicar no botão',
        scope: 'world',
        config: true,
        type: Boolean,
        default: true
    });

    game.settings.register('old-dragon-2e-gerador-de-personagens', 'defaultLevel', {
        name: 'Nível Padrão',
        hint: 'Nível inicial dos personagens gerados',
        scope: 'world',
        config: true,
        type: Number,
        default: 1,
        range: {
            min: 1,
            max: 20,
            step: 1
        }
    });

    game.settings.register('old-dragon-2e-gerador-de-personagens', 'enableEquipment', {
        name: 'Incluir Equipamento',
        hint: 'Adiciona equipamento básico aos personagens gerados',
        scope: 'world',
        config: true,
        type: Boolean,
        default: true
    });

    game.settings.register('old-dragon-2e-gerador-de-personagens', 'enableNames', {
        name: 'Gerar Nomes',
        hint: 'Gera nomes aleatórios para os personagens',
        scope: 'world',
        config: true,
        type: Boolean,
        default: true
    });

    game.settings.register('old-dragon-2e-gerador-de-personagens', 'allowedRaces', {
        name: 'Raças Permitidas',
        hint: 'Selecione quais raças podem ser geradas',
        scope: 'world',
        config: true,
        type: Array,
        default: ['human', 'elf', 'dwarf', 'halfling', 'half-elf', 'gnome'],
        choices: {
            'human': 'Humano',
            'elf': 'Elfo',
            'dwarf': 'Anão',
            'halfling': 'Halfling',
            'half-elf': 'Meio-Elfo',
            'gnome': 'Gnomo'
        }
    });

    game.settings.register('old-dragon-2e-gerador-de-personagens', 'allowedClasses', {
        name: 'Classes Permitidas',
        hint: 'Selecione quais classes podem ser geradas',
        scope: 'world',
        config: true,
        type: Array,
        default: ['fighter', 'mage', 'cleric', 'thief', 'druid', 'paladin', 'ranger'],
        choices: {
            'fighter': 'Guerreiro',
            'mage': 'Mago',
            'cleric': 'Clérigo',
            'thief': 'Ladino',
            'druid': 'Druida',
            'paladin': 'Paladino',
            'ranger': 'Ranger'
        }
    });

    game.settings.register('old-dragon-2e-gerador-de-personagens', 'buttonPosition', {
        name: 'Posição do Botão',
        hint: 'Onde o botão de geração deve aparecer',
        scope: 'world',
        config: true,
        type: String,
        default: 'header',
        choices: {
            'header': 'Cabeçalho da Janela',
            'toolbar': 'Barra de Ferramentas',
            'sidebar': 'Barra Lateral'
        }
    });

    game.settings.register('old-dragon-2e-gerador-de-personagens', 'buttonStyle', {
        name: 'Estilo do Botão',
        hint: 'Aparência visual do botão de geração',
        scope: 'world',
        config: true,
        type: String,
        default: 'default',
        choices: {
            'default': 'Padrão',
            'minimal': 'Minimalista',
            'fantasy': 'Fantasia'
        }
    });

});
