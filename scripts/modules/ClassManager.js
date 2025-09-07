/**
 * Classe ClassManager - Responsável por gerenciar classes e habilidades
 * Gerencia carregamento de classes do SRD e cálculos relacionados
 */
class ClassManager {
    constructor() {
        this.classArchetypes = {
            // Classes específicas de raça (aventureiro) - devem ser tratadas primeiro
            'aventureiro': 'cleric', // Anão Aventureiro - herda de Clérigo
            'adventurer': 'cleric', // Anão Aventureiro - herda de Clérigo
            'elfo aventureiro': 'thief', // Elfo Aventureiro - herda de Ladrão
            'elf adventurer': 'thief', // Elfo Aventureiro - herda de Ladrão
            'halfling aventureiro': 'thief', // Halfling Aventureiro - herda de Ladrão
            'halfling adventurer': 'thief', // Halfling Aventureiro - herda de Ladrão
            
            // Classes gerais
            'guerreiro': 'warrior',
            'warrior': 'warrior',
            'mago': 'wizard',
            'wizard': 'wizard',
            'bruxo': 'wizard',
            'feiticeiro': 'wizard',
            'sorcerer': 'wizard',
            'warlock': 'wizard',
            'clérigo': 'cleric',
            'clerigo': 'cleric',
            'cleric': 'cleric',
            'ladino': 'thief',
            'thief': 'thief',
            'ladrão': 'thief',
            'druida': 'druid',
            'druid': 'druid',
            'paladino': 'paladin',
            'paladin': 'paladin',
            'ranger': 'ranger',
            'bárbaro': 'barbarian',
            'barbaro': 'barbarian',
            'barbarian': 'barbarian',
            'bardo': 'bard',
            'bard': 'bard',
            'xamã': 'shaman',
            'xama': 'shaman',
            'shaman': 'shaman',
            'necromante': 'necromancer',
            'necromancer': 'necromancer',
            'ilusionista': 'illusionist',
            'illusionist': 'illusionist',
            'assassino': 'assassin',
            'assassin': 'assassin',
            'arqueiro': 'archer',
            'archer': 'archer',
            'proscrito': 'outlaw',
            'outlaw': 'outlaw',
            'acadêmico': 'academic',
            'academico': 'academic',
            'academic': 'academic'
        };

        this.classRestrictions = {
            warrior: {
                onlyImpact: false,
                armor: 'any',
                shield: true,
                noLarge: false,
                weaponSize: 'any'
            },
            wizard: {
                onlyImpact: true,
                armor: 'none',
                shield: false,
                noLarge: true,
                weaponSize: 'small'
            },
            cleric: {
                onlyImpact: true,
                armor: 'any',
                shield: true,
                noLarge: false,
                weaponSize: 'any'
            },
            thief: {
                onlyImpact: false,
                armor: 'light',
                shield: true,
                noLarge: false,
                weaponSize: 'any'
            },
            druid: {
                onlyImpact: true,
                armor: 'light',
                shield: true,
                noLarge: false,
                weaponSize: 'any'
            },
            paladin: {
                onlyImpact: false,
                armor: 'any',
                shield: true,
                noLarge: false,
                weaponSize: 'any'
            },
            ranger: {
                onlyImpact: false,
                armor: 'light',
                shield: true,
                noLarge: false,
                weaponSize: 'any'
            },
            barbarian: {
                onlyImpact: false,
                armor: 'any',
                shield: true,
                noLarge: false,
                weaponSize: 'any'
            },
            bard: {
                onlyImpact: false,
                armor: 'light',
                shield: true,
                noLarge: false,
                weaponSize: 'any'
            },
            shaman: {
                onlyImpact: true,
                armor: 'light',
                shield: true,
                noLarge: false,
                weaponSize: 'any'
            },
            necromancer: {
                onlyImpact: true,
                armor: 'none',
                shield: false,
                noLarge: true,
                weaponSize: 'small'
            },
            illusionist: {
                onlyImpact: true,
                armor: 'none',
                shield: false,
                noLarge: true,
                weaponSize: 'small'
            },
            assassin: {
                onlyImpact: false,
                armor: 'light',
                shield: true,
                noLarge: false,
                weaponSize: 'any'
            },
            archer: {
                onlyImpact: false,
                armor: 'light',
                shield: true,
                noLarge: false,
                weaponSize: 'any'
            },
            outlaw: {
                onlyImpact: false,
                armor: 'light',
                shield: true,
                noLarge: false,
                weaponSize: 'any'
            },
            academic: {
                onlyImpact: true,
                armor: 'none',
                shield: false,
                noLarge: true,
                weaponSize: 'small'
            }
        };
    }

    /**
     * Carrega todas as classes disponíveis do compêndio SRD
     * @returns {Array} Array com todas as classes disponíveis
     */
    async loadAllClasses() {
        try {
            let classPack = game.packs.get('olddragon2e.classes');
            if (!classPack) {
                // Fallback: tenta localizar um compêndio de classes pelo nome
                classPack = Array.from(game.packs).find(p => {
                    const key = `${p.metadata.package}.${p.metadata.name}`.toLowerCase();
                    const label = (p.metadata.label || '').toLowerCase();
                    return key.includes('classes') || label.includes('classe') || label.includes('classes');
                });
            }
            if (!classPack) {
                console.warn('Compêndio de classes não encontrado');
                return [];
            }
            
            const classesAll = await classPack.getDocuments();
            const classes = classesAll.filter(doc => doc.type === 'class');
            return classes;
        } catch (error) {
            console.error('Erro ao carregar classes:', error);
            return [];
        }
    }

    /**
     * Carrega uma classe aleatória do compêndio SRD
     * @returns {Object|null} Classe aleatória ou null se não encontrar
     */
    async loadRandomClass() {
        try {
            const allClasses = await this.loadAllClasses();
            if (allClasses.length === 0) {
                console.warn('Nenhuma classe encontrada no compêndio');
                return null;
            }
            
            const randomIndex = Math.floor(Math.random() * allClasses.length);
            return allClasses[randomIndex];
        } catch (error) {
            console.error('Erro ao carregar classe aleatória:', error);
            return null;
        }
    }

    /**
     * Mapeia nome da classe para arquétipo
     * @param {string} className - Nome da classe
     * @returns {string} Arquétipo da classe
     */
    mapClassToArchetype(className) {
        const n = (className || '').toLowerCase();
        
        // Classes específicas de raça (aventureiro) - devem ser tratadas primeiro
        if (/aventureiro|adventurer/.test(n)) {
            // Anão Aventureiro - herda de Clérigo
            if (/an[aã]o|dwarf/.test(n)) return 'cleric';
            // Elfo Aventureiro - herda de Ladrão
            else if (/elfo|elf/.test(n)) return 'thief';
            // Halfling Aventureiro - herda de Ladrão
            else if (/halfling/.test(n)) return 'thief';
        }
        
        // Busca exata primeiro
        if (this.classArchetypes[n]) {
            return this.classArchetypes[n];
        }
        
        // Busca parcial
        for (const [key, archetype] of Object.entries(this.classArchetypes)) {
            if (n.includes(key)) {
                return archetype;
            }
        }
        
        // Fallback para wizard se não encontrar
        return 'wizard';
    }

    /**
     * Retorna restrições de equipamento para uma classe
     * @param {string} className - Nome da classe
     * @returns {Object} Objeto com restrições de equipamento
     */
    getClassRestrictions(className) {
        const archetype = this.mapClassToArchetype(className);
        return this.classRestrictions[archetype] || this.classRestrictions.wizard;
    }

    /**
     * Carrega uma classe específica pelo nome
     * @param {string} className - Nome da classe
     * @returns {Object|null} Classe encontrada ou null
     */
    async loadClassByName(className) {
        try {
            const classPack = game.packs.get('olddragon2e.classes');
            if (!classPack) {
                console.warn('Compêndio de classes não encontrado');
                return null;
            }
            
            const classesAll = await classPack.getDocuments();
            const classes = classesAll.filter(doc => doc.type === 'class');
            
            // Busca a classe pelo nome (exato ou similar)
            const classDoc = classes.find(doc => 
                doc.name.toLowerCase() === className.toLowerCase() ||
                doc.name.toLowerCase().includes(className.toLowerCase())
            );
            
            return classDoc || null;
        } catch (error) {
            console.error('Erro ao carregar classe por nome:', error);
            return null;
        }
    }

    /**
     * Carrega uma classe aleatória de uma lista específica
     * @param {Array} classNames - Array com nomes de classes
     * @returns {Object|null} Classe aleatória ou null
     */
    async loadRandomClassFromList(classNames) {
        try {
            const classPack = game.packs.get('olddragon2e.classes');
            if (!classPack) {
                console.warn('Compêndio de classes não encontrado');
                return null;
            }
            
            const classesAll = await classPack.getDocuments();
            const classes = classesAll.filter(doc => doc.type === 'class');
            if (classes.length === 0) {
                console.warn('Nenhuma classe encontrada no compêndio');
                return null;
            }
            
            // Filtra classes que estão na lista fornecida
            const availableClasses = classes.filter(doc => 
                classNames.some(name => 
                    doc.name.toLowerCase().includes(name.toLowerCase())
                )
            );
            
            if (availableClasses.length === 0) {
                console.warn('Nenhuma classe da lista encontrada');
                return null;
            }
            
            const randomIndex = Math.floor(Math.random() * availableClasses.length);
            return availableClasses[randomIndex];
        } catch (error) {
            console.error('Erro ao carregar classe aleatória da lista:', error);
            return null;
        }
    }

    /**
     * Retorna todos os arquétipos disponíveis
     * @returns {Array} Array com arquétipos disponíveis
     */
    getAvailableArchetypes() {
        return Object.keys(this.classRestrictions);
    }

    /**
     * Retorna todas as classes mapeadas
     * @returns {Object} Objeto com mapeamento de classes
     */
    getClassArchetypes() {
        return { ...this.classArchetypes };
    }

    /**
     * Verifica se uma classe é específica de raça
     * @param {string} className - Nome da classe
     * @returns {boolean} True se for classe específica de raça
     */
    isRaceSpecificClass(className) {
        const n = (className || '').toLowerCase();
        return /aventureiro|adventurer/.test(n);
    }

    /**
     * Retorna o tipo de classe para cálculos de ataque
     * @param {string} className - Nome da classe
     * @returns {string} Tipo da classe (warrior, priest, rogue, wizard)
     */
    getClassType(className) {
        const archetype = this.mapClassToArchetype(className);
        
        if (['warrior', 'paladin', 'barbarian', 'ranger'].includes(archetype)) {
            return 'warrior';
        }
        if (['cleric', 'druid', 'shaman'].includes(archetype)) {
            return 'priest';
        }
        if (['thief', 'bard', 'assassin', 'archer', 'outlaw'].includes(archetype)) {
            return 'rogue';
        }
        return 'wizard'; // Mago e especializações
    }
}
