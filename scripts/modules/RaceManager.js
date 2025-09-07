/**
 * Classe RaceManager - Responsável por gerenciar raças e idiomas
 * Gerencia carregamento de raças do SRD e cálculos de idiomas
 */
class RaceManager {
    constructor() {
        this.raceLanguages = {
            humano: ['Comum'], // Humano sempre fala Comum
            elfo: ['Élfico'], // Elfo fala apenas Élfico (Comum só se Int >= 4)
            'half-elf': ['Élfico'], // Meio-Elfo fala apenas Élfico (Comum só se Int >= 4)
            anao: ['Anão'], // Anão fala apenas Anão (Comum só se Int >= 4)
            'anão': ['Anão'], // Anão fala apenas Anão (Comum só se Int >= 4)
            halfling: ['Halfling'], // Halfling fala apenas Halfling (Comum só se Int >= 4)
            meio_elfo: ['Élfico'], // Meio-Elfo fala apenas Élfico (Comum só se Int >= 4)
            gnome: ['Gnomo'], // Gnomo fala apenas Gnomo (Comum só se Int >= 4)
            'gnomo': ['Gnomo'] // Gnomo fala apenas Gnomo (Comum só se Int >= 4) - variação com acento
        };

        this.availableLanguages = [
            'Comum', 'Élfico', 'Anão', 'Halfling', 'Gnomo', 
            'Gigante', 'Dragão', 'Abissal', 'Infernal', 'Celestial',
            'Druídico', 'Thieves\' Cant', 'Dracônico', 'Primordial'
        ];

        this.movementRates = {
            'Humano': 9,
            'Elfo': 9,
            'Meio-Elfo': 9,
            'Anão': 6,
            'Halfling': 6,
            'Gnomo': 6,
            // Fallbacks para nomes em inglês
            'Human': 9,
            'Elf': 9,
            'Half-Elf': 9,
            'Dwarf': 6,
            'Gnome': 6
        };
    }

    /**
     * Carrega todas as raças disponíveis do compêndio SRD
     * @returns {Array} Array com todas as raças disponíveis
     */
    async loadAllRaces() {
        try {
            let racePack = game.packs.get('olddragon2e.races');
            if (!racePack) {
                // Fallback: tenta localizar um compêndio de raças pelo nome
                racePack = Array.from(game.packs).find(p => {
                    const key = `${p.metadata.package}.${p.metadata.name}`.toLowerCase();
                    const label = (p.metadata.label || '').toLowerCase();
                    return key.includes('races') || label.includes('raça') || label.includes('raças') || label.includes('races');
                });
            }
            if (!racePack) {
                console.warn('Compêndio de raças não encontrado');
                return [];
            }
            
            const racesAll = await racePack.getDocuments();
            const races = racesAll.filter(doc => doc.type === 'race');
            return races;
        } catch (error) {
            console.error('Erro ao carregar raças:', error);
            return [];
        }
    }

    /**
     * Carrega uma raça aleatória do compêndio SRD
     * @returns {Object|null} Raça aleatória ou null se não encontrar
     */
    async loadRandomRace() {
        try {
            const allRaces = await this.loadAllRaces();
            if (allRaces.length === 0) {
                console.warn('Nenhuma raça encontrada no compêndio');
                return null;
            }
            
            const randomIndex = Math.floor(Math.random() * allRaces.length);
            return allRaces[randomIndex];
        } catch (error) {
            console.error('Erro ao carregar raça aleatória:', error);
            return null;
        }
    }

    /**
     * Calcula idiomas conhecidos baseado na inteligência e raça
     * Conforme regras oficiais do Old Dragon 2e
     * @param {number} intelligence - Valor de inteligência
     * @param {Object|string} race - Dados da raça ou nome da raça
     * @returns {Object} Objeto com idiomas e capacidades
     */
    calculateLanguages(intelligence, race) {
        // Se race é um objeto (documento do SRD), usa o nome
        const raceName = typeof race === 'object' ? race.name : race;
        
        // Regras de idiomas baseadas em Inteligência
        let totalLanguages = 2; // Base: 2 idiomas iniciais
        
        // Adiciona idiomas baseados no modificador de Inteligência
        const intModifier = this.getIntModifier(intelligence);
        if (intModifier > 0) {
            totalLanguages += intModifier;
        }
        
        // Regras especiais para Inteligência muito baixa
        if (intelligence <= 3) {
            totalLanguages = 0; // Não consegue falar nenhum idioma
        } else if (intelligence >= 4 && intelligence <= 8) {
            totalLanguages = Math.max(1, totalLanguages); // Mínimo 1 idioma falado
        }
        
        // Começa com idiomas da raça
        const raceKey = raceName.toLowerCase();
        const raceSpecificLanguages = this.raceLanguages[raceKey];
        
        // Se não encontrar a raça, usa fallback baseado na Inteligência
        let knownLanguages = [];
        if (raceSpecificLanguages) {
            knownLanguages = [...raceSpecificLanguages];
        } else {
            // Fallback: se não encontrar a raça, usa Comum apenas se Inteligência >= 4
            knownLanguages = intelligence >= 4 ? ['Comum'] : [];
        }
        
        // Adiciona "Comum" se a Inteligência for suficiente (>= 4) e não for humano
        // Humanos sempre têm Comum, outras raças só se tiverem Inteligência suficiente
        if (raceKey !== 'humano' && intelligence >= 4 && !knownLanguages.includes('Comum')) {
            knownLanguages.push('Comum');
        }
        
        // Garante que todas as raças tenham pelo menos 2 idiomas iniciais (se Inteligência permitir)
        // Se a raça tem menos de 2 idiomas, adiciona idiomas aleatórios até completar 2
        const initialLanguagesNeeded = Math.min(2, totalLanguages);
        while (knownLanguages.length < initialLanguagesNeeded) {
            const availableForRandom = this.availableLanguages.filter(lang => !knownLanguages.includes(lang));
            if (availableForRandom.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableForRandom.length);
                knownLanguages.push(availableForRandom[randomIndex]);
                availableForRandom.splice(randomIndex, 1);
            } else {
                break; // Não há mais idiomas disponíveis
            }
        }
        
        // Se ainda tem slots disponíveis para idiomas adicionais (por modificador de Inteligência)
        const remainingSlots = totalLanguages - knownLanguages.length;
        if (remainingSlots > 0) {
            const availableForRandom = this.availableLanguages.filter(lang => !knownLanguages.includes(lang));
            
            for (let i = 0; i < remainingSlots && availableForRandom.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * availableForRandom.length);
                knownLanguages.push(availableForRandom[randomIndex]);
                availableForRandom.splice(randomIndex, 1);
            }
        }
        
        // Determina capacidade de leitura/escrita baseada na Inteligência
        let canReadWrite = false;
        if (intelligence >= 9) {
            canReadWrite = true; // Capaz de escrever qualquer idioma conhecido
        }
        
        return {
            count: totalLanguages,
            languages: knownLanguages,
            canReadWrite: canReadWrite,
            intelligence: intelligence,
            intModifier: intModifier
        };
    }

    /**
     * Calcula movimento baseado na raça
     * @param {Object|string} race - Dados da raça ou nome da raça
     * @returns {number} Movimento em metros
     */
    calculateMovement(race) {
        // Se race é um objeto (documento do SRD), usa o nome
        const raceName = typeof race === 'object' ? race.name : race;
        
        return this.movementRates[raceName] || 9;
    }

    /**
     * Calcula modificador de inteligência
     * @param {number} intelligence - Valor de inteligência
     * @returns {number} Modificador de inteligência
     */
    getIntModifier(intelligence) {
        if (intelligence <= 3) return -3;
        if (intelligence <= 5) return -2;
        if (intelligence <= 8) return -1;
        if (intelligence <= 12) return 0;
        if (intelligence <= 15) return 1;
        if (intelligence <= 17) return 2;
        return 3; // 18
    }

    /**
     * Filtra classes disponíveis baseado na raça selecionada
     * @param {Array} classes - Array de classes disponíveis
     * @param {string} raceId - ID da raça selecionada
     * @returns {Array} Array de classes filtradas
     */
    filterClassesByRace(classes, raceId) {
        // Busca a raça pelo ID para obter o nome
        const racePack = game.packs.get('olddragon2e.races');
        let raceName = '';
        if (racePack) {
            const raceIndex = racePack.index.find(r => r._id === raceId);
            raceName = raceIndex?.name?.toLowerCase() || '';
        }
        
        const filteredClasses = classes.filter(srdClass => {
            const className = srdClass.name.toLowerCase();
            
            // Classes específicas de raça
            if (className.includes('aventureiro') || className.includes('adventurer')) {
                // Anão Aventureiro - só para Anões
                if (className.includes('anão') || className.includes('anao') || className.includes('dwarf')) {
                    return raceName.includes('anão') || raceName.includes('anao') || raceName.includes('dwarf');
                }
                // Elfo Aventureiro - só para Elfos
                if (className.includes('elfo') || className.includes('elf')) {
                    return raceName.includes('elfo') || raceName.includes('elf');
                }
                // Halfling Aventureiro - só para Halflings
                if (className.includes('halfling')) {
                    return raceName.includes('halfling');
                }
            }
            
            // Classes gerais disponíveis para todas as raças
            return true;
        });
        
        return filteredClasses;
    }

    /**
     * Retorna os idiomas disponíveis
     * @returns {Array} Array com idiomas disponíveis
     */
    getAvailableLanguages() {
        return [...this.availableLanguages];
    }

    /**
     * Retorna os idiomas específicos de uma raça
     * @param {string} raceName - Nome da raça
     * @returns {Array} Array com idiomas específicos da raça
     */
    getRaceLanguages(raceName) {
        const raceKey = raceName.toLowerCase();
        return this.raceLanguages[raceKey] || [];
    }
}
