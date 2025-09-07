/**
 * Classe EquipmentManager - Responsável por gerenciar equipamentos
 * Gerencia carregamento de equipamentos do SRD e geração de equipamentos por classe
 */
class EquipmentManager {
    constructor() {
        this.equipmentByClass = {
            warrior: {
                weapons: ['Espada Longa', 'Adaga'],
                armor: ['Armadura de Couro'],
                shield: true,
                misc: ['Corda de Seda (15m)', 'Saco de Dormir', 'Kit de Escalada']
            },
            wizard: {
                weapons: ['Cajado', 'Adaga'],
                armor: [],
                shield: false,
                misc: ['Túnica', 'Pergaminhos', 'Kit de Alquimia']
            },
            cleric: {
                weapons: ['Martelo de Guerra', 'Adaga'],
                armor: ['Armadura de Couro'],
                shield: true,
                misc: ['Símbolo Sagrado', 'Kit Médico', 'Água Benta']
            },
            thief: {
                weapons: ['Adaga', 'Funda'],
                armor: ['Armadura de Couro'],
                shield: false,
                misc: ['Ferramentas de Ladrão', 'Corda de Seda (15m)', 'Kit de Disfarces']
            },
            druid: {
                weapons: ['Cajado', 'Adaga'],
                armor: ['Armadura de Couro'],
                shield: true,
                misc: ['Símbolo Druídico', 'Kit de Sobrevivência', 'Plantas Medicinais']
            },
            paladin: {
                weapons: ['Espada Longa', 'Adaga'],
                armor: ['Armadura de Couro'],
                shield: true,
                misc: ['Símbolo Sagrado', 'Kit Médico', 'Água Benta']
            },
            ranger: {
                weapons: ['Arco Curto', 'Adaga'],
                armor: ['Armadura de Couro'],
                shield: true,
                misc: ['Kit de Sobrevivência', 'Corda de Seda (15m)', 'Kit de Rastreamento']
            },
            barbarian: {
                weapons: ['Machado de Guerra', 'Adaga'],
                armor: ['Armadura de Couro'],
                shield: true,
                misc: ['Kit de Sobrevivência', 'Corda de Seda (15m)', 'Bebida Forte']
            },
            bard: {
                weapons: ['Adaga', 'Funda'],
                armor: ['Armadura de Couro'],
                shield: false,
                misc: ['Instrumento Musical', 'Kit de Disfarces', 'Kit de Entretenimento']
            },
            shaman: {
                weapons: ['Cajado', 'Adaga'],
                armor: ['Armadura de Couro'],
                shield: true,
                misc: ['Símbolo Xamânico', 'Kit de Sobrevivência', 'Plantas Medicinais']
            },
            necromancer: {
                weapons: ['Cajado', 'Adaga'],
                armor: [],
                shield: false,
                misc: ['Túnica Negra', 'Pergaminhos', 'Kit de Necromancia']
            },
            illusionist: {
                weapons: ['Cajado', 'Adaga'],
                armor: [],
                shield: false,
                misc: ['Túnica', 'Pergaminhos', 'Kit de Ilusões']
            },
            assassin: {
                weapons: ['Adaga', 'Funda'],
                armor: ['Armadura de Couro'],
                shield: false,
                misc: ['Ferramentas de Assassino', 'Kit de Disfarces', 'Venenos']
            },
            archer: {
                weapons: ['Arco Longo', 'Adaga'],
                armor: ['Armadura de Couro'],
                shield: true,
                misc: ['Kit de Sobrevivência', 'Corda de Seda (15m)', 'Kit de Rastreamento']
            },
            outlaw: {
                weapons: ['Adaga', 'Funda'],
                armor: ['Armadura de Couro'],
                shield: false,
                misc: ['Ferramentas de Ladrão', 'Kit de Disfarces', 'Kit de Sobrevivência']
            },
            academic: {
                weapons: ['Cajado', 'Adaga'],
                armor: [],
                shield: false,
                misc: ['Túnica Acadêmica', 'Pergaminhos', 'Kit de Estudos']
            }
        };

        this.patterns = {
            impactWeapons: /(ma[cç]a|mangual|martelo|porrete|clava|cajado|bast[aã]o|hammer|mace|club|flail|martelo de batalha|maça|mangual)/i,
            twoHandedHints: /(duas m[aã]os|two[- ]hand|alabarda|montante|espad[aã]o|glaive|halberd|lanca longa|lança montada|montante|alabarda|pique)/i,
            lightArmor: /(couro|leather|armadura de couro|leather armor)/i,
            mediumArmor: /(cota de malha|chain mail|armadura de malha)/i,
            heavyArmor: /(armadura de placas|plate armor|armadura completa)/i
        };
    }

    /**
     * Carrega todos os equipamentos disponíveis do compêndio SRD
     * @returns {Array} Array com todos os equipamentos disponíveis
     */
    async loadAllEquipment() {
        try {
            let equipmentPack = game.packs.get('olddragon2e.equipment');
            if (!equipmentPack) {
                // Fallback: tenta localizar um compêndio de equipamentos pelo nome
                equipmentPack = Array.from(game.packs).find(p => {
                    const key = `${p.metadata.package}.${p.metadata.name}`.toLowerCase();
                    const label = (p.metadata.label || '').toLowerCase();
                    return key.includes('equipment') || 
                           key.includes('items') ||
                           label.includes('equipamento') || 
                           label.includes('equipamentos') || 
                           label.includes('itens') ||
                           label.includes('items');
                });
            }
            if (!equipmentPack) {
                console.warn('Compêndio de equipamentos não encontrado');
                return [];
            }
            
            const equipmentAll = await equipmentPack.getDocuments();
            const equipment = equipmentAll.filter(doc => 
                doc.type === 'weapon' || 
                doc.type === 'armor' || 
                doc.type === 'equipment' ||
                doc.type === 'item'
            );
            return equipment;
        } catch (error) {
            console.error('Erro ao carregar equipamentos:', error);
            return [];
        }
    }

    /**
     * Gera equipamento básico para uma classe
     * @param {string} className - Nome da classe
     * @returns {Array} Array com equipamentos gerados
     */
    async generateBasicEquipment(className) {
        try {
            const allEquipment = await this.loadAllEquipment();
            const archetype = this.mapClassToArchetype(className);
            const classEquipment = this.equipmentByClass[archetype] || this.equipmentByClass.warrior;
            
            const generatedEquipment = [];

            // Adiciona armas
            for (const weaponName of classEquipment.weapons) {
                const weapon = await this.findEquipmentByName(allEquipment, weaponName);
                if (weapon) {
                    generatedEquipment.push(weapon);
                }
            }

            // Adiciona armadura
            for (const armorName of classEquipment.armor) {
                const armor = await this.findEquipmentByName(allEquipment, armorName);
                if (armor) {
                    generatedEquipment.push(armor);
                }
            }

            // Adiciona escudo se permitido
            if (classEquipment.shield) {
                const shield = await this.findEquipmentByName(allEquipment, 'Escudo');
                if (shield) {
                    generatedEquipment.push(shield);
                }
            }

            // Adiciona itens diversos
            for (const miscName of classEquipment.misc) {
                const misc = await this.findEquipmentByName(allEquipment, miscName);
                if (misc) {
                    generatedEquipment.push(misc);
                }
            }

            return generatedEquipment;

        } catch (error) {
            console.error('Erro ao gerar equipamento básico:', error);
            return [];
        }
    }

    /**
     * Mapeia nome da classe para arquétipo de equipamento
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
        
        // Classes gerais
        if (/guerreiro|warrior/.test(n)) return 'warrior';
        if (/mago|wizard|bruxo|feiticeiro|sorcerer|warlock/.test(n)) return 'wizard';
        if (/clérigo|clerigo|cleric/.test(n)) return 'cleric';
        if (/ladino|thief|ladrão/.test(n)) return 'thief';
        if (/druida|druid/.test(n)) return 'druid';
        if (/paladino|paladin/.test(n)) return 'paladin';
        if (/ranger/.test(n)) return 'ranger';
        if (/bárbaro|barbaro|barbarian/.test(n)) return 'barbarian';
        if (/bardo|bard/.test(n)) return 'bard';
        if (/xamã|xama|shaman/.test(n)) return 'shaman';
        if (/necromante|necromancer/.test(n)) return 'necromancer';
        if (/ilusionista|illusionist/.test(n)) return 'illusionist';
        if (/assassino|assassin/.test(n)) return 'assassin';
        if (/arqueiro|archer/.test(n)) return 'archer';
        if (/proscrito|outlaw/.test(n)) return 'outlaw';
        if (/acadêmico|academico|academic/.test(n)) return 'academic';
        
        // Fallback para warrior se não encontrar
        return 'warrior';
    }

    /**
     * Busca equipamento pelo nome
     * @param {Array} equipmentList - Lista de equipamentos
     * @param {string} name - Nome do equipamento
     * @returns {Object|null} Equipamento encontrado ou null
     */
    async findEquipmentByName(equipmentList, name) {
        // Busca exata primeiro
        let equipment = equipmentList.find(item => 
            item.name.toLowerCase() === name.toLowerCase()
        );
        
        // Se não encontrou, busca por contém
        if (!equipment) {
            equipment = equipmentList.find(item => 
                item.name.toLowerCase().includes(name.toLowerCase())
            );
        }
        
        // Se ainda não encontrou, busca por palavras-chave
        if (!equipment) {
            const keywords = name.toLowerCase().split(' ');
            equipment = equipmentList.find(item => 
                keywords.every(keyword => item.name.toLowerCase().includes(keyword))
            );
        }
        
        return equipment || null;
    }

    /**
     * Carrega um equipamento específico pelo nome
     * @param {string} equipmentName - Nome do equipamento
     * @returns {Object|null} Equipamento encontrado ou null
     */
    async loadEquipmentByName(equipmentName) {
        try {
            const allEquipment = await this.loadAllEquipment();
            return await this.findEquipmentByName(allEquipment, equipmentName);
        } catch (error) {
            console.error('Erro ao carregar equipamento por nome:', error);
            return null;
        }
    }

    /**
     * Retorna equipamentos por classe
     * @param {string} className - Nome da classe
     * @returns {Object} Objeto com equipamentos da classe
     */
    getEquipmentByClass(className) {
        const archetype = this.mapClassToArchetype(className);
        return this.equipmentByClass[archetype] || this.equipmentByClass.warrior;
    }

    /**
     * Retorna todos os padrões de equipamento
     * @returns {Object} Objeto com padrões
     */
    getPatterns() {
        return { ...this.patterns };
    }

    /**
     * Verifica se um equipamento é arma de impacto
     * @param {string} equipmentName - Nome do equipamento
     * @returns {boolean} True se for arma de impacto
     */
    isImpactWeapon(equipmentName) {
        return this.patterns.impactWeapons.test(equipmentName);
    }

    /**
     * Verifica se um equipamento é de duas mãos
     * @param {string} equipmentName - Nome do equipamento
     * @returns {boolean} True se for de duas mãos
     */
    isTwoHandedWeapon(equipmentName) {
        return this.patterns.twoHandedHints.test(equipmentName);
    }

    /**
     * Verifica se uma armadura é leve
     * @param {string} armorName - Nome da armadura
     * @returns {boolean} True se for armadura leve
     */
    isLightArmor(armorName) {
        return this.patterns.lightArmor.test(armorName);
    }

    /**
     * Verifica se uma armadura é média
     * @param {string} armorName - Nome da armadura
     * @returns {boolean} True se for armadura média
     */
    isMediumArmor(armorName) {
        return this.patterns.mediumArmor.test(armorName);
    }

    /**
     * Verifica se uma armadura é pesada
     * @param {string} armorName - Nome da armadura
     * @returns {boolean} True se for armadura pesada
     */
    isHeavyArmor(armorName) {
        return this.patterns.heavyArmor.test(armorName);
    }
}
