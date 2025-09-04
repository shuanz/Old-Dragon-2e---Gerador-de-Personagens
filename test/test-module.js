/**
 * Testes para o módulo Old Dragon 2e - Gerador de Personagens
 * Execute este arquivo no console do navegador para testar o módulo
 */

// Função para testar a geração de atributos
function testAttributeGeneration() {
    console.log('=== Teste de Geração de Atributos ===');
    const generator = new OldDragon2eCharacterGenerator();
    
    for (let i = 0; i < 5; i++) {
        const attributes = generator.generateAttributes();
        console.log(`Personagem ${i + 1}:`, attributes);
        
        // Verifica se todos os atributos estão entre 3 e 18
        Object.values(attributes).forEach(value => {
            if (value < 3 || value > 18) {
                console.error(`Atributo inválido: ${value}`);
            }
        });
    }
}

// Função para testar o cálculo de modificadores
function testModifierCalculation() {
    console.log('=== Teste de Cálculo de Modificadores ===');
    const generator = new OldDragon2eCharacterGenerator();
    
    const testAttributes = {
        strength: 3,
        dexterity: 8,
        constitution: 12,
        intelligence: 15,
        wisdom: 17,
        charisma: 18
    };
    
    const modifiers = generator.calculateModifiers(testAttributes);
    console.log('Atributos de teste:', testAttributes);
    console.log('Modificadores calculados:', modifiers);
    
    // Verifica se os modificadores estão corretos
    const expectedModifiers = {
        strength: -3,
        dexterity: -1,
        constitution: 0,
        intelligence: +1,
        wisdom: +2,
        charisma: +3
    };
    
    Object.keys(modifiers).forEach(attr => {
        if (modifiers[attr] !== expectedModifiers[attr]) {
            console.error(`Modificador incorreto para ${attr}: esperado ${expectedModifiers[attr]}, obtido ${modifiers[attr]}`);
        }
    });
}

// Função para testar a geração de personagens completos
function testCharacterGeneration() {
    console.log('=== Teste de Geração de Personagens ===');
    const generator = new OldDragon2eCharacterGenerator();
    
    for (let i = 0; i < 3; i++) {
        const character = generator.generateCharacter();
        console.log(`Personagem ${i + 1}:`, character);
        
        // Verifica se o personagem tem todas as propriedades necessárias
        const requiredProps = ['name', 'race', 'class', 'attributes', 'modifiers', 'hitPoints', 'equipment', 'level'];
        requiredProps.forEach(prop => {
            if (!character.hasOwnProperty(prop)) {
                console.error(`Propriedade ausente: ${prop}`);
            }
        });
        
        // Verifica se o HP está correto
        if (character.hitPoints < 1) {
            console.error(`HP inválido: ${character.hitPoints}`);
        }
    }
}

// Função para testar a geração de equipamento
function testEquipmentGeneration() {
    console.log('=== Teste de Geração de Equipamento ===');
    const generator = new OldDragon2eCharacterGenerator();
    
    const classes = ['fighter', 'mage', 'cleric', 'thief', 'druid', 'paladin', 'ranger'];
    
    classes.forEach(characterClass => {
        const equipment = generator.generateEquipment(characterClass);
        console.log(`${characterClass}:`, equipment);
        
        if (!Array.isArray(equipment) || equipment.length === 0) {
            console.error(`Equipamento inválido para ${characterClass}`);
        }
    });
}

// Função para testar a geração de nomes
function testNameGeneration() {
    console.log('=== Teste de Geração de Nomes ===');
    const generator = new OldDragon2eCharacterGenerator();
    
    const names = [];
    for (let i = 0; i < 10; i++) {
        const name = generator.generateName();
        names.push(name);
        console.log(`Nome ${i + 1}: ${name}`);
    }
    
    // Verifica se há nomes duplicados
    const uniqueNames = new Set(names);
    if (uniqueNames.size !== names.length) {
        console.warn('Nomes duplicados encontrados');
    }
}

// Função para executar todos os testes
function runAllTests() {
    console.log('Iniciando testes do módulo Old Dragon 2e - Gerador de Personagens');
    console.log('==============================================================');
    
    try {
        testAttributeGeneration();
        console.log('');
        
        testModifierCalculation();
        console.log('');
        
        testCharacterGeneration();
        console.log('');
        
        testEquipmentGeneration();
        console.log('');
        
        testNameGeneration();
        console.log('');
        
        console.log('Todos os testes concluídos!');
    } catch (error) {
        console.error('Erro durante os testes:', error);
    }
}

// Executa os testes se o módulo estiver carregado
if (typeof OldDragon2eCharacterGenerator !== 'undefined') {
    runAllTests();
} else {
    console.error('Módulo Old Dragon 2e - Gerador de Personagens não encontrado!');
    console.log('Certifique-se de que o módulo está ativo no Foundry VTT');
}

// Exporta as funções de teste para uso manual
window.OldDragon2eGeneratorTests = {
    testAttributeGeneration,
    testModifierCalculation,
    testCharacterGeneration,
    testEquipmentGeneration,
    testNameGeneration,
    runAllTests
};
