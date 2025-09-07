/**
 * Classe SpellManager - Responsável por gerenciar magias
 * Gerencia carregamento de magias do SRD e geração de magias iniciais
 */
class SpellManager {
    constructor() {
        this.availableInitialSpells = [
            'Abrir/Trancar',
            'Cerrar Portas',
            'Disco Flutuante',
            'Enfeitiçar Pessoas',
            'Escudo Arcano',
            'Ler Idiomas',
            'Luz/Escuridão',
            'Mãos Flamejantes',
            'Mísseis Mágicos',
            'Patas de Aranha',
            'Sono',
            'Ventriloquismo'
        ];

        this.exclusiveSpells = {
            necromante: ['Toque Sombrio', 'Aterrorizar'],
            necromancer: ['Toque Sombrio', 'Aterrorizar'],
            ilusionista: ['Ilusão', 'Som Ilusório'],
            illusionist: ['Ilusão', 'Som Ilusório']
        };
    }

    /**
     * Carrega todas as magias disponíveis do compêndio SRD
     * @returns {Array} Array com todas as magias disponíveis
     */
    async loadAllSpells() {
        try {
            let spellPack = game.packs.get('olddragon2e.spells');
            if (!spellPack) {
                // Fallback: tenta localizar um compêndio de magias pelo nome
                spellPack = Array.from(game.packs).find(p => {
                    const key = `${p.metadata.package}.${p.metadata.name}`.toLowerCase();
                    const label = (p.metadata.label || '').toLowerCase();
                    return key.includes('spells') || label.includes('magia') || label.includes('magias') || label.includes('spells');
                });
            }
            if (!spellPack) {
                console.warn('Compêndio de magias não encontrado');
                return [];
            }
            
            const spellsAll = await spellPack.getDocuments();
            const spells = spellsAll.filter(doc => doc.type === 'spell');
            return spells;
        } catch (error) {
            console.error('Erro ao carregar magias:', error);
            return [];
        }
    }

    /**
     * Gera magias iniciais para uma classe
     * @param {string} className - Nome da classe
     * @returns {Array} Array com magias iniciais
     */
    async generateInitialSpells(className) {
        try {
            const allSpells = await this.loadAllSpells();
            
            // Filtra magias de 1º círculo
            const firstCircleSpells = allSpells.filter(spell => {
                const system = spell.system || {};
                
                // Verifica se qualquer escola tem valor "1" (string)
                return system.necromancer === "1" || 
                       system.illusionist === "1" ||
                       system.cleric === "1" ||
                       system.druid === "1" ||
                       system.wizard === "1" ||
                       system.illusionist === "1";
            });
            
            if (firstCircleSpells.length === 0) {
                console.warn('Nenhuma magia de 1º círculo encontrada');
                return [];
            }

            const initialSpells = [];

            // Filtra as magias disponíveis que existem no sistema e não são exclusivas
            const eligibleSpells = [];
            for (const spellName of this.availableInitialSpells) {
                const spell = firstCircleSpells.find(s => 
                    s.name.toLowerCase().includes(spellName.toLowerCase())
                );
                if (spell && !this.isExclusiveSpell(spell.name, className)) {
                    eligibleSpells.push(spell);
                }
            }

            // Sorteia 3 magias aleatórias da lista elegível
            const shuffledSpells = [...eligibleSpells].sort(() => Math.random() - 0.5);
            const selectedSpells = shuffledSpells.slice(0, 3);
            initialSpells.push(...selectedSpells);

            // Adiciona magias exclusivas da especialização (se aplicável)
            const exclusiveSpells = this.getExclusiveSpells(className, firstCircleSpells);
            initialSpells.push(...exclusiveSpells);

            // Remove duplicatas pelo nome da magia
            const seen = new Set();
            const uniqueSpells = [];
            for (const spell of initialSpells) {
                if (!seen.has(spell.name)) {
                    seen.add(spell.name);
                    uniqueSpells.push(spell);
                }
            }

            return uniqueSpells;

        } catch (error) {
            console.error('Erro ao gerar magias iniciais:', error);
            return [];
        }
    }

    /**
     * Verifica se uma magia é exclusiva de uma especialização
     * @param {string} spellName - Nome da magia
     * @param {string} className - Nome da classe
     * @returns {boolean} True se for magia exclusiva
     */
    isExclusiveSpell(spellName, className) {
        const exclusiveSpells = this.getExclusiveSpellNames(className);
        return exclusiveSpells.some(exclusive => 
            spellName.toLowerCase().includes(exclusive.toLowerCase())
        );
    }

    /**
     * Retorna os nomes das magias exclusivas para cada especialização
     * @param {string} className - Nome da classe
     * @returns {Array} Array com nomes das magias exclusivas
     */
    getExclusiveSpellNames(className) {
        const exclusiveSpells = {
            necromante: ['Toque Sombrio', 'Aterrorizar'],
            necromancer: ['Toque Sombrio', 'Aterrorizar'],
            ilusionista: ['Ilusão', 'Som Ilusório'],
            illusionist: ['Ilusão', 'Som Ilusório']
        };

        for (const [key, spells] of Object.entries(exclusiveSpells)) {
            if (className.toLowerCase().includes(key)) {
                return spells;
            }
        }

        return [];
    }

    /**
     * Busca e retorna as magias exclusivas da especialização
     * @param {string} className - Nome da classe
     * @param {Array} firstCircleSpells - Array com magias de 1º círculo
     * @returns {Array} Array com magias exclusivas encontradas
     */
    getExclusiveSpells(className, firstCircleSpells) {
        const exclusiveSpellNames = this.getExclusiveSpellNames(className);
        const exclusiveSpells = [];

        for (const spellName of exclusiveSpellNames) {
            // Busca exata primeiro
            let spell = firstCircleSpells.find(s => 
                s.name.toLowerCase() === spellName.toLowerCase()
            );
            
            // Se não encontrou, busca por contém
            if (!spell) {
                spell = firstCircleSpells.find(s => 
                    s.name.toLowerCase().includes(spellName.toLowerCase())
                );
            }
            
            // Se ainda não encontrou, busca por palavras-chave
            if (!spell) {
                const keywords = spellName.toLowerCase().split(' ');
                spell = firstCircleSpells.find(s => 
                    keywords.every(keyword => s.name.toLowerCase().includes(keyword))
                );
            }
            
            if (spell) {
                exclusiveSpells.push(spell);
            }
        }

        return exclusiveSpells;
    }

    /**
     * Carrega uma magia específica pelo nome
     * @param {string} spellName - Nome da magia
     * @returns {Object|null} Magia encontrada ou null
     */
    async loadSpellByName(spellName) {
        try {
            const allSpells = await this.loadAllSpells();
            
            // Busca exata primeiro
            let spell = allSpells.find(s => 
                s.name.toLowerCase() === spellName.toLowerCase()
            );
            
            // Se não encontrou, busca por contém
            if (!spell) {
                spell = allSpells.find(s => 
                    s.name.toLowerCase().includes(spellName.toLowerCase())
                );
            }
            
            return spell || null;
        } catch (error) {
            console.error('Erro ao carregar magia por nome:', error);
            return null;
        }
    }

    /**
     * Retorna as magias disponíveis para sorteio inicial
     * @returns {Array} Array com nomes das magias disponíveis
     */
    getAvailableInitialSpells() {
        return [...this.availableInitialSpells];
    }

    /**
     * Retorna as magias exclusivas por especialização
     * @returns {Object} Objeto com magias exclusivas
     */
    getExclusiveSpellsByClass() {
        return { ...this.exclusiveSpells };
    }

    /**
     * Verifica se uma classe usa magias
     * @param {string} className - Nome da classe
     * @returns {boolean} True se a classe usa magias
     */
    isSpellcastingClass(className) {
        const spellcastingClasses = [
            'mago', 'wizard', 'bruxo', 'feiticeiro', 'sorcerer', 'warlock',
            'clérigo', 'clerigo', 'cleric', 'druida', 'druid', 'xamã', 'xama', 'shaman',
            'necromante', 'necromancer', 'ilusionista', 'illusionist',
            'acadêmico', 'academico', 'academic'
        ];
        
        const classNameLower = className.toLowerCase();
        return spellcastingClasses.some(scClass => classNameLower.includes(scClass));
    }

    /**
     * Determina a escola de magia de uma classe
     * @param {string} className - Nome da classe
     * @returns {string|null} Escola de magia ou null
     */
    getSpellSchool(className) {
        const classNameLower = className.toLowerCase();
        
        if (/mago|bruxo|feiticeiro|sorcerer|wizard|warlock/.test(classNameLower)) {
            return 'arcane';
        }
        if (/clérigo|clerigo|cleric|druida|xam[aã]|acad[eê]mico/.test(classNameLower)) {
            return 'divine';
        }
        if (/necromante|necromancer/.test(classNameLower)) {
            return 'necromancer';
        }
        if (/ilusionista|illusionist/.test(classNameLower)) {
            return 'illusionist';
        }
        
        return null;
    }
}
