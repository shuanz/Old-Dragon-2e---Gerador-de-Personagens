/**
 * Classe Character - Gerencia dados e estado de um personagem
 * Responsável por armazenar e manipular informações do personagem
 */
class Character {
    constructor() {
        this.name = '';
        this.race = null;
        this.class = null;
        this.level = 1;
        this.attributes = {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        };
        this.modifiers = {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        };
        this.hitPoints = 0;
        this.armorClass = 0;
        this.baseAttack = { bac: 0, bad: 0 };
        this.movement = 0;
        this.languages = { count: 0, languages: [], canReadWrite: false };
        this.alignment = '';
        this.appearance = null;
        this.personality = null;
        this.background = '';
        this.equipment = [];
        this.initialSpells = [];
        this.raceData = null;
        this.classData = null;
        this.raceUUID = null;
        this.classUUID = null;
        this.raceId = null;
        this.classId = null;
    }

    /**
     * Define os atributos do personagem
     * @param {Object} attributes - Objeto com os atributos
     */
    setAttributes(attributes) {
        this.attributes = { ...attributes };
    }

    /**
     * Define os modificadores dos atributos
     * @param {Object} modifiers - Objeto com os modificadores
     */
    setModifiers(modifiers) {
        this.modifiers = { ...modifiers };
    }

    /**
     * Define a raça do personagem
     * @param {Object} race - Dados da raça
     */
    setRace(race) {
        this.race = race;
        this.raceData = race;
        this.raceUUID = race?.uuid || null;
        this.raceId = race?.id || null;
    }

    /**
     * Define a classe do personagem
     * @param {Object} classData - Dados da classe
     */
    setClass(classData) {
        this.class = classData;
        this.classData = classData;
        this.classUUID = classData?.uuid || null;
        this.classId = classData?.id || null;
    }

    /**
     * Define o nome do personagem
     * @param {string} name - Nome do personagem
     */
    setName(name) {
        this.name = name;
    }

    /**
     * Define o nível do personagem
     * @param {number} level - Nível do personagem
     */
    setLevel(level) {
        this.level = level;
    }

    /**
     * Define os pontos de vida
     * @param {number} hitPoints - Pontos de vida
     */
    setHitPoints(hitPoints) {
        this.hitPoints = hitPoints;
    }

    /**
     * Define a classe de armadura
     * @param {number} armorClass - Classe de armadura
     */
    setArmorClass(armorClass) {
        this.armorClass = armorClass;
    }

    /**
     * Define o ataque base
     * @param {Object} baseAttack - Objeto com BAC e BAD
     */
    setBaseAttack(baseAttack) {
        this.baseAttack = { ...baseAttack };
    }

    /**
     * Define o movimento
     * @param {number} movement - Movimento em metros
     */
    setMovement(movement) {
        this.movement = movement;
    }

    /**
     * Define os idiomas conhecidos
     * @param {Object} languages - Objeto com idiomas e capacidades
     */
    setLanguages(languages) {
        this.languages = { ...languages };
    }

    /**
     * Define o alinhamento
     * @param {string} alignment - Alinhamento do personagem
     */
    setAlignment(alignment) {
        this.alignment = alignment;
    }

    /**
     * Define a aparência
     * @param {Object} appearance - Objeto com dados de aparência
     */
    setAppearance(appearance) {
        this.appearance = { ...appearance };
    }

    /**
     * Define a personalidade
     * @param {Object} personality - Objeto com dados de personalidade
     */
    setPersonality(personality) {
        this.personality = { ...personality };
    }

    /**
     * Define o histórico
     * @param {string} background - Histórico do personagem
     */
    setBackground(background) {
        this.background = background;
    }

    /**
     * Define o equipamento
     * @param {Array} equipment - Array com equipamentos
     */
    setEquipment(equipment) {
        this.equipment = [...equipment];
    }

    /**
     * Define as magias iniciais
     * @param {Array} spells - Array com magias iniciais
     */
    setInitialSpells(spells) {
        this.initialSpells = [...spells];
    }

    /**
     * Retorna uma cópia dos dados do personagem
     * @returns {Object} Cópia dos dados do personagem
     */
    toObject() {
        return {
            name: this.name,
            race: this.race,
            class: this.class,
            level: this.level,
            attributes: { ...this.attributes },
            modifiers: { ...this.modifiers },
            hitPoints: this.hitPoints,
            armorClass: this.armorClass,
            baseAttack: { ...this.baseAttack },
            movement: this.movement,
            languages: { ...this.languages },
            alignment: this.alignment,
            appearance: this.appearance ? { ...this.appearance } : null,
            personality: this.personality ? { ...this.personality } : null,
            background: this.background,
            equipment: [...this.equipment],
            initialSpells: [...this.initialSpells],
            raceData: this.raceData,
            classData: this.classData,
            raceUUID: this.raceUUID,
            classUUID: this.classUUID,
            raceId: this.raceId,
            classId: this.classId
        };
    }

    /**
     * Reseta o personagem para valores padrão
     */
    reset() {
        this.name = '';
        this.race = null;
        this.class = null;
        this.level = 1;
        this.attributes = {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        };
        this.modifiers = {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        };
        this.hitPoints = 0;
        this.armorClass = 0;
        this.baseAttack = { bac: 0, bad: 0 };
        this.movement = 0;
        this.languages = { count: 0, languages: [], canReadWrite: false };
        this.alignment = '';
        this.appearance = null;
        this.personality = null;
        this.background = '';
        this.equipment = [];
        this.initialSpells = [];
        this.raceData = null;
        this.classData = null;
        this.raceUUID = null;
        this.classUUID = null;
        this.raceId = null;
        this.classId = null;
    }
}
