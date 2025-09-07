/**
 * Classe AttributeCalculator - Responsável por cálculos relacionados a atributos
 * Gerencia geração de atributos, modificadores e cálculos derivados
 */
class AttributeCalculator {
    constructor() {
        this.attributeNames = {
            strength: 'Força',
            dexterity: 'Destreza',
            constitution: 'Constituição',
            intelligence: 'Inteligência',
            wisdom: 'Sabedoria',
            charisma: 'Carisma'
        };
    }

    /**
     * Gera atributos aleatórios usando 3d6
     * @returns {Object} Objeto com atributos gerados
     */
    generateAttributes() {
        const attributes = {};
        const attributeKeys = Object.keys(this.attributeNames);
        
        for (const attr of attributeKeys) {
            attributes[attr] = this.roll3d6();
        }
        
        return attributes;
    }

    /**
     * Rola 3d6 para um atributo
     * @returns {number} Resultado da rolagem (3-18)
     */
    roll3d6() {
        let total = 0;
        for (let i = 0; i < 3; i++) {
            total += Math.floor(Math.random() * 6) + 1;
        }
        return total;
    }

    /**
     * Calcula modificadores baseados nos atributos
     * @param {Object} attributes - Objeto com atributos
     * @returns {Object} Objeto com modificadores calculados
     */
    calculateModifiers(attributes) {
        const modifiers = {};
        
        for (const [attr, value] of Object.entries(attributes)) {
            modifiers[attr] = this.getModifier(value);
        }
        
        return modifiers;
    }

    /**
     * Calcula modificador para um valor de atributo
     * @param {number} value - Valor do atributo
     * @returns {number} Modificador (-3 a +4)
     */
    getModifier(value) {
        if (value <= 3) return -3;
        if (value <= 5) return -2;
        if (value <= 8) return -1;
        if (value <= 12) return 0;
        if (value <= 15) return 1;
        if (value <= 17) return 2;
        return 3; // 18
    }

    /**
     * Calcula pontos de vida baseado na classe e constituição
     * @param {string} className - Nome da classe
     * @param {number} constitution - Valor de constituição
     * @returns {number} Pontos de vida calculados
     */
    calculateHitPoints(className, constitution) {
        const conModifier = this.getModifier(constitution);
        const baseHP = this.getClassHitDie(className);
        return Math.max(1, baseHP + conModifier);
    }

    /**
     * Retorna o dado de vida da classe
     * @param {string} className - Nome da classe
     * @returns {number} Dado de vida (4, 6, 8, 10)
     */
    getClassHitDie(className) {
        const classHitDie = {
            'mago': 4,
            'bruxo': 4,
            'feiticeiro': 4,
            'sorcerer': 4,
            'wizard': 4,
            'warlock': 4,
            'ladino': 6,
            'thief': 6,
            'ranger': 6,
            'bardo': 6,
            'bard': 6,
            'clérigo': 8,
            'clerigo': 8,
            'cleric': 8,
            'druida': 8,
            'druid': 8,
            'xamã': 8,
            'xama': 8,
            'guerreiro': 10,
            'warrior': 10,
            'paladino': 10,
            'paladin': 10,
            'bárbaro': 10,
            'barbaro': 10,
            'barbarian': 10
        };

        const classNameLower = className.toLowerCase();
        return classHitDie[classNameLower] || 6; // Default para classes não listadas
    }

    /**
     * Calcula classe de armadura baseada na destreza e equipamento
     * @param {number} dexterity - Valor de destreza
     * @param {Array} equipment - Array de equipamentos
     * @returns {number} Classe de armadura calculada
     */
    calculateArmorClass(dexterity, equipment) {
        const dexModifier = this.getModifier(dexterity);
        let baseAC = 10 + dexModifier;

        // Verifica se tem armadura equipada
        const armor = equipment.find(item => 
            item.type === 'armor' || 
            item.name?.toLowerCase().includes('armadura') ||
            item.name?.toLowerCase().includes('armor')
        );

        if (armor) {
            // Lógica simplificada - pode ser expandida
            baseAC = 12 + dexModifier; // Armadura básica
        }

        return baseAC;
    }

    /**
     * Calcula ataque base baseado na classe e nível
     * @param {string} className - Nome da classe
     * @param {number} level - Nível do personagem
     * @param {Object} attributes - Atributos do personagem
     * @returns {Object} Objeto com BAC e BAD
     */
    calculateBaseAttack(className, level, attributes) {
        const classType = this.getClassType(className);
        const bac = this.calculateBAC(classType, level);
        const bad = this.calculateBAD(classType, level, attributes);
        
        return { bac, bad };
    }

    /**
     * Determina o tipo de classe para cálculos de ataque
     * @param {string} className - Nome da classe
     * @returns {string} Tipo da classe (warrior, priest, rogue, wizard)
     */
    getClassType(className) {
        const classNameLower = className.toLowerCase();
        
        if (['guerreiro', 'warrior', 'paladino', 'paladin', 'bárbaro', 'barbaro', 'barbarian', 'ranger'].includes(classNameLower)) {
            return 'warrior';
        }
        if (['clérigo', 'clerigo', 'cleric', 'druida', 'druid', 'xamã', 'xama'].includes(classNameLower)) {
            return 'priest';
        }
        if (['ladino', 'thief', 'bardo', 'bard', 'assassino', 'assassin'].includes(classNameLower)) {
            return 'rogue';
        }
        return 'wizard'; // Mago e especializações
    }

    /**
     * Calcula Bônus de Ataque de Combate (BAC)
     * @param {string} classType - Tipo da classe
     * @param {number} level - Nível do personagem
     * @returns {number} BAC calculado
     */
    calculateBAC(classType, level) {
        const bacProgression = {
            warrior: level, // +1 por nível
            priest: Math.floor(level * 0.75), // +3/4 por nível
            rogue: Math.floor(level * 0.75), // +3/4 por nível
            wizard: Math.floor(level * 0.5) // +1/2 por nível
        };
        
        return bacProgression[classType] || 0;
    }

    /**
     * Calcula Bônus de Ataque à Distância (BAD)
     * @param {string} classType - Tipo da classe
     * @param {number} level - Nível do personagem
     * @param {Object} attributes - Atributos do personagem
     * @returns {number} BAD calculado
     */
    calculateBAD(classType, level, attributes) {
        const dexModifier = this.getModifier(attributes.dexterity);
        const baseBAD = this.calculateBAC(classType, level);
        
        return baseBAD + dexModifier;
    }

    /**
     * Retorna os nomes dos atributos
     * @returns {Object} Objeto com nomes dos atributos
     */
    getAttributeNames() {
        return { ...this.attributeNames };
    }
}
