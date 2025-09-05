/**
 * Old Dragon 2e - Gerador de Personagens
 * Um módulo para gerar personagens automaticamente para o sistema Old Dragon 2e
 */

class OldDragon2eCharacterGenerator {
    constructor() {
        this.races = [
            { 
                id: 'human', 
                name: 'Humano', 
                namePlural: 'Humanos',
                abilities: [
                    'Aprendizado: +10% de XP em todas as experiências',
                    'Adaptabilidade: +1 em uma JP à escolha',
                    'Movimento: 9 metros',
                    'Infravisão: Não possui'
                ]
            },
            { 
                id: 'elf', 
                name: 'Elfo', 
                namePlural: 'Elfos',
                abilities: [
                    'Percepção Natural: Detecta portas secretas (1 em 1d6)',
                    'Graciosos: +1 em qualquer teste de JPD',
                    'Arma Racial: +1 de dano com arcos',
                    'Imunidades: Sono e paralisia de Ghoul',
                    'Movimento: 9 metros',
                    'Infravisão: 18 metros'
                ]
            },
            { 
                id: 'dwarf', 
                name: 'Anão', 
                namePlural: 'Anões',
                abilities: [
                    'Mineradores: Detecta armadilhas em pedras (1 em 1d6)',
                    'Vigoroso: +1 em qualquer teste de JPC',
                    'Armas Grandes: Usa armas grandes como médias',
                    'Inimigos: Ataques fáceis contra orcs, ogros e hobgoblins',
                    'Movimento: 6 metros',
                    'Infravisão: 18 metros'
                ]
            },
            { 
                id: 'halfling', 
                name: 'Halfling', 
                namePlural: 'Halflings',
                abilities: [
                    'Furtivos: Esconde-se (1-2 em 1d6)',
                    'Destemidos: +1 em qualquer teste de JPS',
                    'Bons de Mira: Ataques fáceis com armas de arremesso',
                    'Pequenos: Ataques de criaturas grandes são difíceis',
                    'Restrições: Apenas armaduras de couro, armas pequenas/médias',
                    'Movimento: 6 metros',
                    'Infravisão: Não possui'
                ]
            }
        ];

        this.classes = [
            { 
                id: 'fighter', 
                name: 'Guerreiro', 
                namePlural: 'Guerreiros',
                abilities: [
                    'Armas: Pode usar todas as armas',
                    'Armaduras: Pode usar todas as armaduras',
                    'Aparar: Sacrifica escudo/arma para absorver dano',
                    'Maestria em Arma: +1 de dano em uma arma escolhida',
                    'Ataque Extra: Segundo ataque no 6º nível'
                ],
                hitDie: 10,
                baseAttack: 1,
                savingThrow: 5
            },
            { 
                id: 'cleric', 
                name: 'Clérigo', 
                namePlural: 'Clérigos',
                abilities: [
                    'Armas: Apenas armas impactantes',
                    'Armaduras: Pode usar todas as armaduras',
                    'Magias Divinas: Conjura magias divinas diariamente',
                    'Afastar Mortos-Vivos: Afasta mortos-vivos 1x/dia',
                    'Cura Milagrosa: Troca magia por Curar Ferimentos'
                ],
                hitDie: 8,
                baseAttack: 1,
                savingThrow: 5
            },
            { 
                id: 'thief', 
                name: 'Ladino', 
                namePlural: 'Ladinos',
                abilities: [
                    'Armas: Apenas pequenas ou médias',
                    'Armaduras: Apenas leves',
                    'Ataque Furtivo: Dano x2 em ataques furtivos',
                    'Ouvir Ruídos: Detecta sons (1-2 em 1d6)',
                    'Talentos: Furtividade, Escalar, Arrombar, etc.'
                ],
                hitDie: 6,
                baseAttack: 1,
                savingThrow: 5
            },
            {
                id: 'mage',
                name: 'Mago',
                namePlural: 'Magos',
                abilities: [
                    'Armas: Apenas pequenas',
                    'Armaduras: Nenhuma',
                    'Magias Arcanas: Conjura magias arcanas diariamente',
                    'Ler Magias: Decifra inscrições mágicas',
                    'Detectar Magias: Percebe presença mágica'
                ],
                hitDie: 4,
                baseAttack: 0,
                savingThrow: 5
            },
            {
                id: 'druid',
                name: 'Druida',
                namePlural: 'Druidas',
                abilities: [
                    'Especialização de Clérigo',
                    'Herbalismo e Transformação em animais'
                ],
                hitDie: 8,
                baseAttack: 1,
                savingThrow: 5
            },
            {
                id: 'paladin',
                name: 'Paladino',
                namePlural: 'Paladinos',
                abilities: [
                    'Especialização de Guerreiro',
                    'Imunidade a doenças',
                    'Cura pelas mãos'
                ],
                hitDie: 10,
                baseAttack: 1,
                savingThrow: 5
            },
            {
                id: 'ranger',
                name: 'Ranger',
                namePlural: 'Rangers',
                abilities: [
                    'Especialização de Ladrão',
                    'Inimigo Mortal',
                    'Combativo'
                ],
                hitDie: 6,
                baseAttack: 1,
                savingThrow: 5
            },
            {
                id: 'dwarf_adventurer',
                name: 'Anão Aventureiro',
                namePlural: 'Anões Aventureiros',
                raceRestriction: 'dwarf',
                abilities: [
                    'Especialização de Anão',
                    'Resistência a venenos',
                    'Conhecimento de pedras e metais'
                ],
                hitDie: 8,
                baseAttack: 1,
                savingThrow: 5
            },
            {
                id: 'elf_adventurer',
                name: 'Elfo Aventureiro',
                namePlural: 'Elfos Aventureiros',
                raceRestriction: 'elf',
                abilities: [
                    'Especialização de Elfo',
                    'Imunidade a sono',
                    'Visão noturna'
                ],
                hitDie: 6,
                baseAttack: 1,
                savingThrow: 5
            },
            {
                id: 'halfling_adventurer',
                name: 'Halfling Aventureiro',
                namePlural: 'Halflings Aventureiros',
                raceRestriction: 'halfling',
                abilities: [
                    'Especialização de Halfling',
                    'Sorte natural',
                    'Habilidade com fundas'
                ],
                hitDie: 6,
                baseAttack: 1,
                savingThrow: 5
            }
        ];

        this.attributes = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
        this.attributeNames = {
            strength: 'Força',
            dexterity: 'Destreza',
            constitution: 'Constituição',
            intelligence: 'Inteligência',
            wisdom: 'Sabedoria',
            charisma: 'Carisma'
        };

        // Tabelas para detalhes finais
        this.appearance = {
            body: ['Alto', 'Baixo', 'Musculoso', 'Franzino', 'Gordo', 'Especial'],
            hair: ['Careca', 'Calvo', 'Cabelos Raspados', 'Cabelos Curtos', 'Cabelos Longos', 'Especial'],
            general: ['Barba ou Bigode', 'Moreno', 'Pálido', 'Jovem', 'Velho', 'Especial'],
            special: ['Horrível', 'Feio', 'Mais um na multidão', 'Bem Afeiçoado', 'Bonito', 'Lindo']
        };

        this.personality = {
            self: ['Alerta', 'Distraído', 'Calmo', 'Agitado', 'Indeciso', 'Especial'],
            others: ['Gentil', 'Grosso', 'Desconfiado', 'Tímido', 'Extrovertido', 'Especial'],
            world: ['Otimista', 'Pessimista', 'Perfeccionista', 'Teimoso', 'Vaidoso', 'Especial'],
            special: ['Modesto', 'Egoísta', 'Humilde', 'Galanteador', 'Idealista', 'Excêntrico']
        };

        this.background = {
            place: ['numa fazenda nos campos', 'numa pequena e distante vila', 'numa grande e importante cidade', 'numa vila à beira do mar', 'numa aldeia nas montanhas', 'numa pequena cidade no meio da floresta'],
            motive: ['ficar rico e poderoso', 'vingar seu passado', 'trazer glória e fama para você', 'matar a curiosidade sobre o mundo', 'tentar dar uma vida melhor aos seus descendentes', 'realizar seu sonho de ser um herói'],
            family: ['família muito pobre de camponeses', 'família de comerciantes', 'família de fazendeiros', 'família disfuncional', 'família adotiva', 'família de nobres falidos'],
            tragedy: ['de um ataque de orcs e goblins', 'de uma guerra sanguinária', 'de um erro judiciário', 'de um terremoto misterioso', 'de uma experiência mágica', 'de uma epidemia de peste']
        };

        this.alignments = ['Ordem', 'Neutralidade', 'Caos'];

        // Conjunto offline de nomes por raça (estilo "fantasy-names")
        this.fantasyNames = {
            human: {
                first: ['Alden','Bran','Cael','Dara','Ewan','Faye','Gwen','Hector','Isla','Joran','Kira','Lara','Mira','Nolan','Orin','Pietra','Quinn','Rurik','Selene','Talia','Ulric','Valen','Wren','Xara','Yara','Zara'],
                last: ['Blackwood','Stormborn','Riverton','Hillcrest','Dawnbreaker','Stonefield','Oakenshield','Whitlock','Ravencrest','Ironwood','Silverhand','Windrider','Brightwater','Ashford','Hawkins']
            },
            elf: {
                first: ['Aelar','Aerith','Belanor','Caladrel','Daenala','Elora','Faelar','Galan','Ilyana','Lethalia','Naeris','Rolen','Syllin','Theren','Vaelis'],
                last: ['Amastacia','Galanodel','Holimion','Ilphelkiir','Liadon','Meliamne','Nailo','Siannodel','Xiloscient']
            },
            dwarf: {
                first: ['Baern','Dain','Einkil','Fargrim','Hilda','Kathra','Mardin','Rurik','Torbera','Traubon','Ulfgar'],
                last: ['Balderk','Dankil','Fireforge','Ironfist','Loderr','Lutgehr','Rumnaheim','Strakeln','Torunn','Ungart']
            },
            halfling: {
                first: ['Alton','Andry','Cade','Cora','Eldon','Finnan','Garret','Jillian','Lidda','Milo','Rosie','Perrin','Tegan'],
                last: ['Brushgather','Goodbarrel','Greenbottle','Highhill','Hilltopple','Leagallow','Tealeaf','Thorngage','Underbough']
            },
            gnome: {
                first: ['Alston','Bodrin','Bimpnottin','Donella','Fonkin','Jebeddo','Nissa','Orla','Zanna'],
                last: ['Beren','Daergel','Folkor','Garrick','Nackle','Murnig','Ningel','Raulnor','Scheppen']
            },
            orc: {
                first: ['Borg','Drog','Ghak','Grish','Karg','Lug','Mog','Oshk','Ragh','Snaga','Urzog'],
                last: ['Skullcleaver','Bonechewer','Bloodfist','Ironjaw','Ragefang']
            }
        };

        // Padrões para identificação simples por nome (pré-exibição do equipamento)
        this.patterns = {
            impactWeapons: /(ma[cç]a|mangual|martelo|porrete|clava|cajado|bast[aã]o|hammer|mace|club|flail)/i,
            twoHandedHints: /(duas m[aã]os|two[- ]hand|alabarda|montante|espad[aã]o|glaive|halberd|lanca longa)/i,
            leatherArmor: /(couro|leather)/i,
            metalArmor: /(malha|escama|placa|cota|chain|scale|plate)/i,
            smallWeapons: /(adaga|punhal|faca|dardo|sling|fund[aã]|clava|porrete|cajado|bast[aã]o)/i
        };
    }

    /**
     * Gera atributos aleatórios usando 3d6
     */
    generateAttributes() {
        const attributes = {};
        this.attributes.forEach(attr => {
            attributes[attr] = this.roll3d6();
        });
        return attributes;
    }

    /**
     * Rola 3d6 (simula 3 dados de 6 faces)
     */
    roll3d6() {
        let total = 0;
        for (let i = 0; i < 3; i++) {
            total += Math.floor(Math.random() * 6) + 1;
        }
        return total;
    }

    rollDie(sides) {
        return Math.floor(Math.random() * sides) + 1;
    }

    /**
     * Calcula modificadores de atributos (seguindo tabela oficial do Old Dragon 2e)
     */
    calculateModifiers(attributes) {
        const modifiers = {};
        this.attributes.forEach(attr => {
            const value = attributes[attr];
            if (value >= 2 && value <= 3) modifiers[attr] = -3;
            else if (value >= 4 && value <= 5) modifiers[attr] = -2;
            else if (value >= 6 && value <= 8) modifiers[attr] = -1;
            else if (value >= 9 && value <= 12) modifiers[attr] = 0;
            else if (value >= 13 && value <= 14) modifiers[attr] = +1;
            else if (value >= 15 && value <= 16) modifiers[attr] = +2;
            else if (value >= 17 && value <= 18) modifiers[attr] = +3;
            else if (value >= 19 && value <= 20) modifiers[attr] = +4;
            else modifiers[attr] = 0; // Fallback para valores fora do range
        });
        return modifiers;
    }

    /**
     * Gera um nome completo por raça (offline)
     */
    generateRaceName(raceId) {
        const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const data = this.fantasyNames[raceId] || this.fantasyNames.human;
        const first = pick(data.first);
        const last = pick(data.last);
        return `${first} ${last}`;
    }

    /**
     * Define restrições de equipamento por classe (Old Dragon 2e)
     */
    getClassEquipmentRestrictions(characterClass) {
        const restrictions = {
            fighter: {
                weapons: ['espada', 'machado', 'martelo', 'lança', 'arco', 'best', 'adaga', 'clava', 'maça'],
                armor: ['couro', 'cota de malha', 'placa'],
                forbidden: []
            },
            mage: {
                weapons: ['cajado', 'adaga', 'clava', 'maça'],
                armor: ['túnica', 'couro'],
                forbidden: ['espada', 'machado', 'martelo', 'lança', 'arco', 'best', 'cota de malha', 'placa']
            },
            cleric: {
                weapons: ['martelo', 'clava', 'maça', 'cajado'],
                armor: ['couro', 'cota de malha', 'placa'],
                forbidden: ['espada', 'machado', 'lança', 'arco', 'best', 'adaga']
            },
            thief: {
                weapons: ['adaga', 'espada curta', 'arco curto', 'best'],
                armor: ['couro'],
                forbidden: ['espada longa', 'machado', 'martelo', 'lança', 'arco longo', 'cota de malha', 'placa']
            },
            druid: {
                weapons: ['bastão', 'clava', 'maça', 'adaga'],
                armor: ['couro'],
                forbidden: ['espada', 'machado', 'martelo', 'lança', 'arco', 'best', 'cota de malha', 'placa']
            },
            // Especializações de Guerreiro
            paladin: {
                weapons: ['espada', 'martelo', 'lança', 'arco'],
                armor: ['couro', 'cota de malha', 'placa'],
                forbidden: ['machado', 'adaga', 'best']
            },
            bárbaro: {
                weapons: ['machado', 'martelo', 'lança', 'arco'],
                armor: ['couro'],
                forbidden: ['espada longa', 'best', 'cota de malha', 'placa']
            },
            arqueiro: {
                weapons: ['arco longo', 'arco curto', 'besta', 'adaga'],
                armor: ['couro'],
                forbidden: ['espada longa', 'machado', 'martelo', 'lança', 'cota de malha', 'placa']
            },
            // Especializações de Ladrão
            ranger: {
                weapons: ['espada curta', 'arco longo', 'lança', 'adaga'],
                armor: ['couro'],
                forbidden: ['espada longa', 'machado', 'martelo', 'best', 'cota de malha', 'placa']
            },
            bardo: {
                weapons: ['espada curta', 'adaga', 'arco curto'],
                armor: ['couro'],
                forbidden: ['espada longa', 'machado', 'martelo', 'lança', 'arco longo', 'best', 'cota de malha', 'placa']
            },
            assassino: {
                weapons: ['adaga', 'espada curta', 'besta'],
                armor: ['couro'],
                forbidden: ['espada longa', 'machado', 'martelo', 'lança', 'arco', 'cota de malha', 'placa']
            },
            // Especializações divinas (herdam restrições do Clérigo)
            proscrito: {
                weapons: ['martelo', 'clava', 'maça', 'cajado'],
                armor: ['couro', 'cota de malha', 'placa'],
                forbidden: ['espada', 'machado', 'lança', 'arco', 'best', 'adaga']
            },
            xamã: {
                weapons: ['martelo', 'clava', 'maça', 'cajado'],
                armor: ['couro', 'cota de malha', 'placa'],
                forbidden: ['espada', 'machado', 'lança', 'arco', 'best', 'adaga']
            },
            acadêmico: {
                weapons: ['martelo', 'clava', 'maça', 'cajado'],
                armor: ['couro', 'cota de malha', 'placa'],
                forbidden: ['espada', 'machado', 'lança', 'arco', 'best', 'adaga']
            }
        };

        return restrictions[characterClass] || restrictions.fighter;
    }

    /**
     * Verifica se um item é permitido para a classe
     */
    isItemAllowedForClass(itemName, characterClass) {
        const restrictions = this.getClassEquipmentRestrictions(characterClass);
        const itemLower = itemName.toLowerCase();
        
        // Verifica se o item contém alguma palavra proibida
        for (const forbidden of restrictions.forbidden) {
            if (itemLower.includes(forbidden)) {
                return false;
            }
        }
        
        // Verifica se o item contém alguma palavra permitida
        for (const allowed of restrictions.weapons.concat(restrictions.armor)) {
            if (itemLower.includes(allowed)) {
                return true;
            }
        }
        
        // Itens gerais (mochila, rações, etc.) são sempre permitidos
        const generalItems = ['mochila', 'rações', 'corda', 'tocha', 'vela', 'garrafa', 'saco', 'pote', 'tenda', 'símbolo', 'pergaminho', 'tinta', 'pena', 'gancho'];
        for (const general of generalItems) {
            if (itemLower.includes(general)) {
                return true;
            }
        }
        
        return true; // Por padrão, permite itens não categorizados
    }

    /**
     * Gera magias iniciais para o Mago (3 escolhidas + 1 aleatória) + magias exclusivas se especializado
     */
    async generateInitialSpells(characterClass) {
        // Verifica se é uma classe arcana (Mago e especializações)
        const isMageClass = /mago|bruxo|feiticeiro|wizard|warlock|necromante|ilusionista|necromancer|illusionist/i.test(characterClass);
        
        // Verifica se é uma classe divina (Clérigo e especializações)
        const isDivineClass = /clérigo|cleric|druida|druid|acadêmico|academic|xamã|shaman|proscrito|outcast/i.test(characterClass);
        
        // Verifica se é uma classe de habilidade (Ladrão e especializações que recebem magias)
        const isSkillClassWithMagic = /bardo|bard/i.test(characterClass);
        
        // Classes divinas (Clérigo, Druida, Acadêmico, Xamã, Proscrito) recebem todas as magias via importação do SRD
        // Classes arcanas recebem magias iniciais limitadas
        // Bardo recebe magias arcanas limitadas
        if (!isMageClass && !isDivineClass && !isSkillClassWithMagic) {
            return [];
        }

        try {
            const spellPack = game.packs.get('olddragon2e.spells');
            if (!spellPack) {
                console.warn('Compêndio de magias não encontrado');
                return [];
            }

            const allSpells = await spellPack.getDocuments();
            console.log('Total de magias encontradas:', allSpells.length);
            
            // Debug: mostra algumas magias para entender o formato
            console.log('Exemplos de magias disponíveis:', allSpells.slice(0, 3).map(s => ({ 
                name: s.name, 
                circle: s.system?.circle, 
                system: s.system,
                type: s.type,
                systemKeys: Object.keys(s.system || {})
            })));
            
            const firstCircleSpells = allSpells.filter(spell => {
                // No Old Dragon 2e, as magias de 1º círculo têm valor "1" nos campos de escola
                const system = spell.system || {};
                
                // Debug: mostra algumas magias para entender o formato
                if (spell.name === 'Lama em Pedra' || spell.name === 'Simulacro' || spell.name === 'Disco Flutuante') {
                    console.log(`Debug magia ${spell.name}:`, {
                        arcane: system.arcane,
                        divine: system.divine,
                        necromancer: system.necromancer,
                        illusionist: system.illusionist
                    });
                }
                
                // Verifica se qualquer escola tem valor "1" (string)
                return system.arcane === "1" || 
                       system.divine === "1" || 
                       system.necromancer === "1" || 
                       system.illusionist === "1";
            });

            console.log('Magias de 1º círculo encontradas:', firstCircleSpells.length);
            console.log('Exemplos de magias de 1º círculo:', firstCircleSpells.slice(0, 3).map(s => ({ name: s.name, circle: s.system?.circle })));
            
            // Debug: mostra todas as magias de 1º círculo para verificar se as exclusivas estão lá
            if (firstCircleSpells.length > 0) {
                console.log('Todas as magias de 1º círculo disponíveis:', firstCircleSpells.map(s => s.name));
            }

            if (firstCircleSpells.length === 0) {
                console.warn('Nenhuma magia de 1º círculo encontrada');
                return [];
            }

            const initialSpells = [];

            // 1. Adiciona 3 magias escolhidas pelo Mago (conforme documentação oficial)
            const recommendedSpells = [
                'Mísseis Mágicos',
                'Escudo Arcano', 
                'Luz'
            ];

            // Adiciona as 3 magias escolhidas se existirem
            for (const spellName of recommendedSpells) {
                const spell = firstCircleSpells.find(s => 
                    s.name.toLowerCase().includes(spellName.toLowerCase())
                );
                if (spell) {
                    initialSpells.push(spell);
                }
            }

            // 2. Adiciona 1 magia aleatória da lista de 1º círculo (conforme documentação oficial)
            const remainingSpells = firstCircleSpells.filter(spell => 
                !initialSpells.some(initial => initial.id === spell.id) &&
                !this.isExclusiveSpell(spell.name, characterClass)
            );

            if (remainingSpells.length > 0) {
                const randomSpell = remainingSpells[Math.floor(Math.random() * remainingSpells.length)];
                initialSpells.push(randomSpell);
            }

            // 3. Adiciona magias exclusivas da especialização (se aplicável)
            const exclusiveSpells = this.getExclusiveSpells(characterClass, firstCircleSpells);
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

            console.log(`Magias iniciais para ${characterClass}:`, uniqueSpells.map(s => s.name));
            return uniqueSpells;

        } catch (error) {
            console.error('Erro ao gerar magias iniciais:', error);
            return [];
        }
    }

    /**
     * Verifica se uma magia é exclusiva de uma especialização
     */
    isExclusiveSpell(spellName, characterClass) {
        const exclusiveSpells = this.getExclusiveSpellNames(characterClass);
        return exclusiveSpells.some(exclusive => 
            spellName.toLowerCase().includes(exclusive.toLowerCase())
        );
    }

    /**
     * Retorna os nomes das magias exclusivas para cada especialização
     */
    getExclusiveSpellNames(characterClass) {
        const exclusiveSpells = {
            necromante: ['Toque Sombrio', 'Aterrorizar'],
            necromancer: ['Toque Sombrio', 'Aterrorizar'],
            ilusionista: ['Ilusão', 'Som Ilusório'],
            illusionist: ['Ilusão', 'Som Ilusório']
        };

        for (const [key, spells] of Object.entries(exclusiveSpells)) {
            if (characterClass.toLowerCase().includes(key)) {
                return spells;
            }
        }

        return [];
    }

    /**
     * Busca e retorna as magias exclusivas da especialização
     */
    getExclusiveSpells(characterClass, firstCircleSpells) {
        const exclusiveSpellNames = this.getExclusiveSpellNames(characterClass);
        const exclusiveSpells = [];

        console.log(`Buscando magias exclusivas para ${characterClass}:`, exclusiveSpellNames);

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
                console.log(`  → Encontrada magia exclusiva: ${spell.name}`);
            } else {
                console.log(`  → Magia exclusiva não encontrada: ${spellName}`);
            }
        }

        console.log(`Total de magias exclusivas encontradas: ${exclusiveSpells.length}`);
        return exclusiveSpells;
    }

    /**
     * Gera equipamento básico baseado na classe com restrições
     */
    generateEquipment(characterClass) {
        const baseEquipment = {
            fighter: [
                'Espada Longa', 'Escudo', 'Armadura de Couro', 'Mochila', 'Ração de viagem (3)',
                'Corda de Cânhamo', 'Tocha (6)', 'Pederneira', 'Tenda pequena', 'Saco de Dormir'
            ],
            mage: [
                'Bordão/Cajado', 'Mochila', 'Pergaminho (3)', 'Pena e Tinta',
                'Vela (3)', 'Ração de viagem (2)', 'Odre', 'Saco de Dormir'
            ],
            cleric: [
                'Martelo de Batalha', 'Escudo', 'Armadura de Couro', 'Símbolo divino',
                'Mochila', 'Ração de viagem (3)', 'Odre', 'Vela (3)'
            ],
            thief: [
                'Adaga (2)', 'Arco Curto', 'Flecha de Guerra (20)', 'Armadura de Couro',
                'Mochila', 'Corda de Cânhamo', 'Cravos/Ganchos', 'Ração de viagem (2)'
            ],
            druid: [
                'Bordão/Cajado', 'Armadura de Couro', 'Mochila', 'Símbolo divino',
                'Ração de viagem (3)', 'Odre', 'Saco de Dormir', 'Tocha (3)'
            ],
            paladin: [
                'Espada Longa', 'Escudo', 'Armadura de Couro', 'Símbolo divino',
                'Mochila', 'Ração de viagem (3)', 'Odre', 'Tocha (3)'
            ],
            ranger: [
                'Espada Curta', 'Arco Longo', 'Flecha de Guerra (20)', 'Armadura de Couro',
                'Mochila', 'Ração de viagem (3)', 'Corda de Cânhamo', 'Tocha (3)'
            ]
        };

        const equipment = baseEquipment[characterClass] || baseEquipment.fighter;
        
        // Filtra equipamento baseado nas restrições da classe
        const filteredEquipment = equipment.filter(item => 
            this.isItemAllowedForClass(item, characterClass)
        );
        
        console.log(`Equipamento para ${characterClass}:`, filteredEquipment);
        return filteredEquipment;
    }

    mapClassToArchetype(className) {
        const n = (className || '').toLowerCase();
        if (/mago|bruxo|feiticeiro|wizard|warlock|necromante|ilusionista/.test(n)) return 'mage';
        if (/clerigo|cl[eê]rigo|druida|xam[aã]|acad[eê]mico/.test(n)) return 'cleric';
        if (/paladino|b[aá]rbaro/.test(n)) return 'fighter';
        if (/ladr[aã]o|ladino|thief|bardo|ranger/.test(n)) return 'thief';
        return 'fighter';
    }

    getClassRestrictions(className) {
        const n = (className || '').toLowerCase();
        const r = { armor: 'any', shield: true, onlyImpact: false, onlySmall: false, noLarge: false, leatherOnly: false };
        if (/mago|bruxo|feiticeiro|wizard|warlock/.test(n)) { r.armor = 'none'; r.shield = false; r.onlySmall = true; }
        else if (/necromante|ilusionista/.test(n)) { r.armor = 'none'; r.shield = false; r.onlySmall = true; }
        else if (/ladr[aã]o|ladino|thief|bardo/.test(n)) { r.armor = 'light'; r.shield = false; r.noLarge = true; }
        else if (/ranger/.test(n)) { r.armor = 'light'; r.shield = true; r.noLarge = false; }
        else if (/druida/.test(n)) { r.armor = 'light'; r.leatherOnly = true; r.shield = false; r.noLarge = true; }
        else if (/cl[eê]rigo|cleric/.test(n)) { r.onlyImpact = true; r.armor = 'any'; r.shield = true; }
        else if (/b[aá]rbaro/.test(n)) { r.armor = 'light'; r.shield = true; }
        return r;
    }

    filterEquipmentNamesByRestrictions(list, restrictions) {
        const p = this.patterns;
        return list.filter(name => {
            const lower = (name || '').toLowerCase();
            // armor
            if (/armadura|armor/.test(lower)) {
                if (restrictions.armor === 'none') return false;
                if (restrictions.armor === 'light' && !p.leatherArmor.test(lower)) return false;
                if (restrictions.leatherOnly && !p.leatherArmor.test(lower)) return false;
                return true;
            }
            // shield
            if (/escudo|shield/.test(lower)) return !!restrictions.shield;
            // weapons (heurístico por nome)
            if (/espada|lan[cç]a|adaga|punhal|faca|arco|flecha|ma[cç]a|mangual|martelo|porrete|clava|cajado|bast[aã]o|machado|alabarda|glaive|montante/.test(lower)) {
                if (restrictions.onlyImpact && !p.impactWeapons.test(lower)) return false;
                if (restrictions.onlySmall && p.twoHandedHints.test(lower)) return false;
                if (restrictions.noLarge && p.twoHandedHints.test(lower)) return false;
                return true;
            }
            // outros itens são sempre permitidos
            return true;
        });
    }

    /**
     * Calcula pontos de vida baseado na classe e constituição
     */
    calculateHitPoints(characterClass, constitution) {
        const archetype = this.mapClassToArchetype(characterClass);
        const hitDie = { fighter: 10, cleric: 8, thief: 6, mage: 4 };
        const die = hitDie[archetype] || 6;
        const modifier = this.calculateModifiers({ constitution }).constitution;
        return Math.max(1, this.rollDie(die) + modifier);
    }

    /**
     * Calcula Classe de Armadura baseada na destreza e equipamento
     */
    calculateArmorClass(dexterity, equipment) {
        const dexModifier = this.calculateModifiers({ dexterity }).dexterity;
        let armorBonus = 0;
        let shieldBonus = 0;

        // Verifica se tem armadura no equipamento
        if (equipment.some(item => item.includes('Armadura de couro'))) {
            armorBonus = 2;
        } else if (equipment.some(item => item.includes('Armadura'))) {
            armorBonus = 3; // Assumindo armadura de metal
        }

        // Verifica se tem escudo
        if (equipment.some(item => item.includes('Escudo'))) {
            shieldBonus = 1;
        }

        return 10 + dexModifier + armorBonus + shieldBonus;
    }

    /**
     * Calcula Base de Ataque
     */
    calculateBaseAttack(characterClass, level) {
        const archetype = this.mapClassToArchetype(characterClass);
        const tables = {
            fighter: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            cleric: [1, 1, 1, 3, 3, 3, 5, 5, 5, 7],
            thief: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
            mage: [0, 1, 1, 1, 2, 2, 2, 3, 3, 3]
        };
        const table = tables[archetype] || tables.fighter;
        return table[level - 1] || table[0];
    }

    /**
     * Calcula Jogadas de Proteção
     */
    calculateSavingThrows(characterClass, level) {
        const archetype = this.mapClassToArchetype(characterClass);
        const baseTable = {
            fighter: [5, 5, 6, 6, 8, 8, 10, 10, 11, 11],
            cleric: [5, 5, 5, 7, 7, 7, 9, 9, 9, 11],
            thief: [5, 5, 5, 5, 8, 8, 8, 8, 11, 11],
            mage: [5, 5, 5, 5, 7, 7, 7, 7, 7, 10]
        };
        const value = (baseTable[archetype] || baseTable.fighter)[level - 1] || 5;
        let JPD = value;
        let JPC = value;
        let JPS = value;
        if (archetype === 'cleric') JPS = value - 2;
        if (archetype === 'thief') { JPD = value - 2; JPS = value - 2; }
        if (archetype === 'mage') JPS = value - 2;
        return { JPD, JPC, JPS };
    }

    /**
     * Calcula movimento baseado na raça
     */
    calculateMovement(race) {
        const movement = {
            human: 9,
            elf: 9,
            dwarf: 6,
            halfling: 6
        };

        return movement[race] || 9;
    }

    /**
     * Calcula idiomas conhecidos baseado na inteligência e raça
     */
    calculateLanguages(intelligence, race) {
        const intModifier = this.calculateModifiers({ intelligence }).intelligence;
        const totalLanguages = Math.max(2, 2 + intModifier); // Mínimo 2 idiomas
        
        // Idiomas disponíveis no Old Dragon 2e
        const availableLanguages = [
            'Comum', 'Élfico', 'Anão', 'Halfling', 'Orc', 'Goblin', 
            'Gigante', 'Dragão', 'Abissal', 'Infernal', 'Celestial',
            'Druídico', 'Thieves\' Cant', 'Dracônico', 'Primordial'
        ];
        
        // Idiomas base por raça
        const raceLanguages = {
            humano: ['Comum'],
            elfo: ['Comum', 'Élfico'],
            anao: ['Comum', 'Anão'],
            halfling: ['Comum', 'Halfling'],
            meio_elfo: ['Comum', 'Élfico'],
            meio_orc: ['Comum', 'Orc']
        };
        
        // Começa com idiomas da raça
        let knownLanguages = [...(raceLanguages[race] || ['Comum'])];
        
        // Adiciona idiomas aleatórios se necessário
        const remainingSlots = totalLanguages - knownLanguages.length;
        if (remainingSlots > 0) {
            const availableForRandom = availableLanguages.filter(lang => !knownLanguages.includes(lang));
            
            for (let i = 0; i < remainingSlots && availableForRandom.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * availableForRandom.length);
                knownLanguages.push(availableForRandom[randomIndex]);
                availableForRandom.splice(randomIndex, 1);
            }
        }
        
        return {
            count: totalLanguages,
            languages: knownLanguages
        };
    }

    /**
     * Gera aparência aleatória
     */
    generateAppearance() {
        const roll = () => Math.floor(Math.random() * 6);
        
        let body = this.appearance.body[roll()];
        let hair = this.appearance.hair[roll()];
        let general = this.appearance.general[roll()];

        // Se rolou "Especial", rola na coluna especial
        if (body === 'Especial') body = this.appearance.special[roll()];
        if (hair === 'Especial') hair = this.appearance.special[roll()];
        if (general === 'Especial') general = this.appearance.special[roll()];

        return { body, hair, general };
    }

    /**
     * Gera personalidade aleatória
     */
    generatePersonality() {
        const roll = () => Math.floor(Math.random() * 6);
        
        let self = this.personality.self[roll()];
        let others = this.personality.others[roll()];
        let world = this.personality.world[roll()];

        // Se rolou "Especial", rola na coluna especial
        if (self === 'Especial') self = this.personality.special[roll()];
        if (others === 'Especial') others = this.personality.special[roll()];
        if (world === 'Especial') world = this.personality.special[roll()];

        return { self, others, world };
    }

    /**
     * Gera histórico aleatório
     */
    generateBackground() {
        const roll = () => Math.floor(Math.random() * 6);
        
        const place = this.background.place[roll()];
        const motive = this.background.motive[roll()];
        const family = this.background.family[roll()];
        const tragedy = this.background.tragedy[roll()];

        return { place, motive, family, tragedy };
    }

    /**
     * Gera alinhamento aleatório
     */
    generateAlignment() {
        return this.alignments[Math.floor(Math.random() * this.alignments.length)];
    }

    /**
     * Gera um personagem completo
     */
    async generateCharacter() {
        const attributes = this.generateAttributes();
        const modifiers = this.calculateModifiers(attributes);
        const race = this.races[Math.floor(Math.random() * this.races.length)];
        
        // Filtra classes disponíveis baseado na raça
        const availableClasses = this.classes.filter(cls => {
            // Se a classe tem restrição de raça, só pode ser escolhida pela raça correta
            if (cls.raceRestriction) {
                return cls.raceRestriction === race.id;
            }
            // Classes sem restrição podem ser escolhidas por qualquer raça
            return true;
        });
        
        console.log('Raça selecionada:', race.id, race.name);
        console.log('Classes disponíveis:', availableClasses.map(c => c.name));
        console.log('Total de classes disponíveis:', availableClasses.length);
        
        const characterClass = availableClasses[Math.floor(Math.random() * availableClasses.length)];
        console.log('Classe selecionada:', characterClass.name, 'ID:', characterClass.id);
        const name = this.generateRaceName(race.id);
        const equipment = this.generateEquipment(characterClass.id);
        const hitPoints = this.calculateHitPoints(characterClass.id, attributes.constitution);
        
        // Novos cálculos
        const armorClass = this.calculateArmorClass(attributes.dexterity, equipment);
        const baseAttack = this.calculateBaseAttack(characterClass.id, 1);
        const savingThrows = this.calculateSavingThrows(characterClass.id, 1);
        const movement = this.calculateMovement(race.id);
        const languages = this.calculateLanguages(attributes.intelligence, race.id);
        const alignment = this.generateAlignment();
        const appearance = this.generateAppearance();
        const personality = this.generatePersonality();
        const background = this.generateBackground();
        
        // Magias iniciais serão geradas em showGeneratorModal após carregar classe do SRD

        // Debug: log dos atributos e modificadores
        console.log('Atributos gerados:', attributes);
        console.log('Modificadores calculados:', modifiers);

        return {
            name,
            race: race.name,
            raceAbilities: race.abilities,
            class: characterClass.name,
            classAbilities: characterClass.abilities,
            attributes,
            modifiers,
            hitPoints,
            armorClass,
            baseAttack,
            savingThrows,
            movement,
            languages,
            alignment,
            appearance,
            personality,
            background,
            equipment,
            level: 1,
            experience: 0
        };
    }

    /**
     * Cria um personagem no Foundry VTT
     */
    async createCharacterInFoundry(characterData) {
        try {
            // Define bônus racial de JP (Humano aleatório; demais fixos)
            const raceName = (characterData.race || '').toString().toLowerCase();
            let jpRaceBonus = '';
            const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
            if (raceName.includes('humano')) jpRaceBonus = pick(['jpd','jpc','jps']);
            else if (raceName.includes('elf')) jpRaceBonus = 'jpd';
            else if (raceName.includes('anão') || raceName.includes('anao')) jpRaceBonus = 'jpc';
            else if (raceName.includes('halfling')) jpRaceBonus = 'jps';

            // Cria o personagem com estrutura do sistema Old Dragon 2e
            const actorData = {
                name: characterData.name,
                type: 'character',
                img: 'icons/svg/mystery-man.svg',
                system: {
                    // Atributos
                    forca: characterData.attributes.strength,
                    mod_forca: characterData.modifiers.strength,
                    destreza: characterData.attributes.dexterity,
                    mod_destreza: characterData.modifiers.dexterity,
                    constituicao: characterData.attributes.constitution,
                    mod_constituicao: characterData.modifiers.constitution,
                    inteligencia: characterData.attributes.intelligence,
                    mod_inteligencia: characterData.modifiers.intelligence,
                    sabedoria: characterData.attributes.wisdom,
                    mod_sabedoria: characterData.modifiers.wisdom,
                    carisma: characterData.attributes.charisma,
                    mod_carisma: characterData.modifiers.charisma,
                    
                    // Jogadas de Proteção
                    jpd_total: characterData.savingThrows.JPD,
                    jpc_total: characterData.savingThrows.JPC,
                    jps_total: characterData.savingThrows.JPS,
                    jp: characterData.savingThrows.JPD, // Base da classe
                    jpd_race_bonus: 0,
                    jpc_race_bonus: 0,
                    jps_race_bonus: 0,
                    jpd_mod: characterData.modifiers.dexterity,
                    jpc_mod: characterData.modifiers.constitution,
                    jps_mod: characterData.modifiers.wisdom,
                    
                    // Combate
                    ca: characterData.armorClass,
                    bac: characterData.baseAttack,
                    bad: characterData.baseAttack,
                    
                    // Vida e Movimento
                    pv: characterData.hitPoints,
                    pv_max: characterData.hitPoints,
                    movimento: characterData.movement,
                    
                    // Informações básicas
                    nivel: characterData.level,
                    experiencia: characterData.experience,

                    // Detalhes (aba Detalhes da ficha)
                    details: {
                        alignment: (characterData.alignment || 'Neutralidade')
                            .toString().toLowerCase().includes('ord') ? 'ordeiro'
                            : (characterData.alignment || '').toString().toLowerCase().includes('caos') ? 'caotico'
                            : 'neutro',
                        languages: Array.isArray(characterData.languages?.languages)
                            ? characterData.languages.languages.join(', ')
                            : (characterData.languages || ''),
                        reputation: 0,
                        appearance: characterData.appearance
                            ? `${characterData.appearance.body}; ${characterData.appearance.hair}; ${characterData.appearance.general}`
                            : '',
                        personality: characterData.personality
                            ? `${characterData.personality.self}; ${characterData.personality.others}; ${characterData.personality.world}`
                            : '',
                        background: characterData.background
                            ? `Nascido ${characterData.background.place} em uma ${characterData.background.family}, ficou órfão após ${characterData.background.tragedy}. Tornou-se aventureiro para ${characterData.background.motive}.`
                            : '',
                        notes: ''
                    },

                    // Bônus racial escolhido para JP
                    jp_race_bonus: jpRaceBonus,
                    
                    // Raça e Classe (referências amigáveis)
                    raca: characterData.race,
                    classe: characterData.class,

                    // Dados da raça e classe do SRD
                    raceData: characterData.raceData,
                    classData: characterData.classData,
                    
                }
            };

            const actor = await Actor.create(actorData);
            
            // Importa Raça e Classe do SRD como Itens do Ator
            try {
                const abilityUUIDs = [];
                // Raça
                if (characterData.raceUUID || characterData.raceId || characterData.race) {
                    let raceDoc = null;
                    if (characterData.raceUUID) {
                        raceDoc = await fromUuid(characterData.raceUUID).catch(() => null);
                    }
                    if (!raceDoc) {
                        const racePack = game.packs.get('olddragon2e.races');
                        if (racePack) {
                            if (characterData.raceId) {
                                raceDoc = await racePack.getDocument(characterData.raceId).catch(() => null);
                            }
                            if (!raceDoc && characterData.race) {
                                const index = await racePack.getIndex({ fields: ['name','type'] });
                                const match = index.find(e => e.name === characterData.race && e.type === 'race');
                                if (match) raceDoc = await racePack.getDocument(match._id).catch(() => null);
                            }
                        }
                    }
                    if (raceDoc) {
                        const raceData = raceDoc.toObject();
                        delete raceData._id;
                        await actor.createEmbeddedDocuments('Item', [raceData]);
                        // Coleta habilidades de raça vinculadas (UUIDs)
                        if (Array.isArray(raceDoc.system?.race_abilities)) {
                            abilityUUIDs.push(...raceDoc.system.race_abilities);
                        }
                    } else {
                        console.warn('Não foi possível importar a Raça do compêndio.');
                    }
                }

                // Classe
                if (characterData.classUUID || characterData.classId || characterData.class) {
                    let classDoc = null;
                    if (characterData.classUUID) {
                        classDoc = await fromUuid(characterData.classUUID).catch(() => null);
                    }
                    if (!classDoc) {
                        const classPack = game.packs.get('olddragon2e.classes');
                        if (classPack) {
                            if (characterData.classId) {
                                classDoc = await classPack.getDocument(characterData.classId).catch(() => null);
                            }
                            if (!classDoc && characterData.class) {
                                const index = await classPack.getIndex({ fields: ['name','type'] });
                                const match = index.find(e => e.name === characterData.class && e.type === 'class');
                                if (match) classDoc = await classPack.getDocument(match._id).catch(() => null);
                            }
                        }
                    }
                    if (classDoc) {
                        const classData = classDoc.toObject();
                        delete classData._id;
                        await actor.createEmbeddedDocuments('Item', [classData]);
                        // Coleta habilidades de classe vinculadas (UUIDs)
                        if (Array.isArray(classDoc.system?.class_abilities)) {
                            abilityUUIDs.push(...classDoc.system.class_abilities);
                        }
                    } else {
                        console.warn('Não foi possível importar a Classe do compêndio.');
                    }
                }
                // Resolve UUIDs e adiciona habilidades (raça e classe)
                if (abilityUUIDs.length) {
                    const abilityItems = [];
                    for (const uuid of abilityUUIDs) {
                        try {
                            const doc = await fromUuid(uuid);
                            if (doc) {
                                const obj = doc.toObject();
                                delete obj._id;
                                abilityItems.push(obj);
                            }
                        } catch (e) {
                            console.warn('Não foi possível resolver habilidade por UUID:', uuid, e);
                        }
                    }
                    if (abilityItems.length) {
                        await actor.createEmbeddedDocuments('Item', abilityItems);
                    }
                }
            } catch (importErr) {
                console.warn('Falha ao importar Raça/Classe do SRD:', importErr);
            }

            // Importa Magias do SRD conforme classe e nível
            try {
                const className = (characterData.class || '').toString().toLowerCase();
                const level = characterData.level || 1;
                console.log('=== IMPORTAÇÃO DE MAGIAS ===');
                console.log('Classe detectada:', className);
                console.log('Nível:', level);
                
                // Mapeia classe -> escola de magia
                let school = null;
                if (/mago|bruxo|feiticeiro|sorcerer|wizard|warlock/.test(className)) school = 'arcane';
                else if (/clérigo|clerigo|cleric|druida|xam[aã]|acad[eê]mico/.test(className)) school = 'divine';
                else if (/necromante|necromancer/.test(className)) school = 'necromancer';
                else if (/ilusionista|illusionist/.test(className)) school = 'illusionist';
                
                console.log('Escola de magia detectada:', school);
                
                // Para classes arcanas (Mago e especializações), não importa magias do SRD
                // pois elas já são adicionadas via generateInitialSpells
                if (/mago|bruxo|feiticeiro|sorcerer|wizard|warlock|necromante|necromancer|ilusionista|illusionist/.test(className)) {
                    console.log('Classe arcana detectada, pulando importação de magias do SRD');
                    school = null;
                }

                if (school) {
                    console.log('Iniciando importação de magias para escola:', school);
                    const maxCircle = Math.max(1, Math.ceil(level / 2));

                    let spellPack = game.packs.get('olddragon2e.spells');
                    if (!spellPack) {
                        console.log('Compêndio padrão não encontrado, buscando alternativas...');
                        spellPack = Array.from(game.packs).find(p => {
                            const key = `${p.metadata.package}.${p.metadata.name}`.toLowerCase();
                            const label = (p.metadata.label || '').toLowerCase();
                            return p.documentName === 'Item' && (key.includes('spells') || label.includes('magia'));
                        });
                    }

                    if (spellPack) {
                        console.log('Compêndio de magias encontrado:', spellPack.metadata.name);
                        const allSpells = await spellPack.getDocuments();
                        console.log('Total de magias no compêndio:', allSpells.length);
                        
                        const toCreate = [];
                        const existing = new Set(actor.items.filter(i => i.type === 'spell').map(i => i.name));
                        console.log('Magias já existentes no personagem:', existing.size);
                        
                        let processedCount = 0;
                        let validCount = 0;
                        
                        for (const s of allSpells) {
                            if (s.type !== 'spell') continue;
                            processedCount++;
                            
                            const system = s.system || {};
                            const schoolValue = system[school];
                            const v = parseInt(schoolValue) || 0;
                            console.log(`Magia ${s.name}: ${school}=${schoolValue} (${v}), círculo máximo: ${maxCircle}`);
                            
                            // Verifica se a magia tem valor válido para a escola e está dentro do círculo máximo
                            if (schoolValue && schoolValue !== "null" && v > 0 && v <= maxCircle) {
                                validCount++;
                                if (existing.has(s.name)) {
                                    console.log(`  → Já existe, pulando: ${s.name}`);
                                    continue;
                                }
                                
                                // Evita duplicação de magias que são tanto arcanas quanto divinas
                                // Se a magia já existe com outro tipo, não adiciona novamente
                                const isDualType = s.system?.arcane && s.system?.divine;
                                if (isDualType && school === 'divine') {
                                    // Para classes divinas, só adiciona se não for uma magia que já existe como arcana
                                    const existingArcane = actor.items.find(i => 
                                        i.type === 'spell' && 
                                        i.name === s.name && 
                                        i.system?.arcane
                                    );
                                    if (existingArcane) {
                                        console.log(`  → Já existe como arcana, pulando: ${s.name}`);
                                        continue;
                                    }
                                }
                                
                                const obj = s.toObject();
                                delete obj._id;
                                toCreate.push(obj);
                                existing.add(s.name);
                                console.log(`  → Adicionada: ${s.name}`);
                            }
                        }
                        
                        console.log(`Processadas: ${processedCount}, Válidas: ${validCount}, Para criar: ${toCreate.length}`);
                        
                        if (toCreate.length) {
                            await actor.createEmbeddedDocuments('Item', toCreate);
                            console.log('Magias criadas com sucesso!');
                        } else {
                            console.log('Nenhuma magia válida encontrada para criar');
                        }
                    } else {
                        console.warn('Compêndio de magias não encontrado.');
                    }
                }
            } catch (spellsErr) {
                console.warn('Falha ao importar Magias do SRD:', spellsErr);
            }

            // Importa Itens de Equipamento do SRD como Itens do Ator
            try {
                const itemsToCreate = [];

                // Helpers
                const normalize = (s) => (s || '').toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, ' ').trim();
                const parseEntry = (entry) => {
                    const m = entry.match(/\((\d+)\)$/); // quantidade somente se termina com número
                    const quantity = m ? parseInt(m[1]) : 1;
                    const baseName = m ? entry.replace(/\s*\((\d+)\)$/, '').trim() : entry.trim();
                    return { baseName, quantity };
                };

                // Restrições por classe (básico + algumas especializações comuns)
                const className = (characterData.class || '').toString().toLowerCase();
                const restrictions = (() => {
                    const r = { armor: 'any', shield: true, onlyImpact: false, onlySmall: false, noLarge: false, leatherOnly: false };
                    if (/mago|bruxo|feiticeiro|wizard|warlock/.test(className)) { r.armor = 'none'; r.shield = false; r.onlySmall = true; }
                    else if (/necromante|ilusionista/.test(className)) { r.armor = 'none'; r.shield = false; r.onlySmall = true; }
                    else if (/ladr[aã]o|ladino|thief|bardo/.test(className)) { r.armor = 'light'; r.shield = false; r.noLarge = true; }
                    else if (/ranger/.test(className)) { r.armor = 'light'; r.shield = true; r.noLarge = false; /* pode grandes conforme doc futuro */ }
                    else if (/druida/.test(className)) { r.armor = 'light'; r.leatherOnly = true; r.shield = false; r.noLarge = true; }
                    else if (/cl[eê]rigo|cleric/.test(className)) { r.onlyImpact = true; r.armor = 'any'; r.shield = true; }
                    else if (/b[aá]rbaro/.test(className)) { r.armor = 'light'; r.shield = true; }
                    // Guerreiro e outros: sem restrições
                    return r;
                })();

                const isImpactWeapon = (name, sys) => {
                    const n = normalize(name);
                    const dt = (sys?.damage_type || '').toLowerCase();
                    return dt.includes('impact') || dt.includes('bludge') || /ma[cç]a|mangual|martelo|porrete|clava|cajado|bast[aã]o/.test(n);
                };
                const isTwoHanded = (sys) => !!(sys?.two_handed || sys?.polearm);
                const isLeatherArmor = (name) => /couro|leather/.test(normalize(name));
                const isSmallWeaponByName = (name) => /adaga|punhal|faca|dardo|sling|fund[aã]|clava|porrete|cajado|bast[aã]o/.test(normalize(name));

                // Packs candidatos (preferir o padrão do sistema)
                const candidatePacks = [];
                const preferKeys = ['olddragon2e.equipment'];
                for (const key of preferKeys) {
                    const pack = game.packs.get(key);
                    if (pack) candidatePacks.push(pack);
                }
                if (candidatePacks.length === 0) {
                    for (const p of game.packs) {
                        if (p.metadata?.package === 'olddragon2e') candidatePacks.push(p);
                    }
                }

                // Índices por pack
                const packIndexes = new Map();
                for (const pack of candidatePacks) {
                    try {
                        const index = await pack.getIndex({ fields: ['name','type'] });
                        packIndexes.set(pack, index);
                    } catch {}
                }

                const allowedTypes = new Set(['weapon','armor','shield','misc','container']);

                for (const raw of characterData.equipment) {
                    const { baseName, quantity } = parseEntry(raw);
                    const norm = normalize(baseName);
                    let foundDoc = null;
                    
                    // Busca exata por nome
                    for (const [pack, index] of packIndexes.entries()) {
                        const match = index.find(e => allowedTypes.has(e.type) && normalize(e.name) === norm);
                        if (match) { foundDoc = await pack.getDocument(match._id).catch(()=>null); if (foundDoc) break; }
                    }
                    // Fallback: começa com
                    if (!foundDoc) {
                        for (const [pack, index] of packIndexes.entries()) {
                            const match = index.find(e => allowedTypes.has(e.type) && normalize(e.name).startsWith(norm));
                            if (match) { foundDoc = await pack.getDocument(match._id).catch(()=>null); if (foundDoc) break; }
                        }
                    }

                    if (foundDoc) {
                        const itemData = foundDoc.toObject();
                        delete itemData._id;
                        itemData.system = itemData.system || {};
                        if (quantity > 1) itemData.system.quantity = quantity;

                        // Aplica restrições de classe
                        let allow = true;
                        if (itemData.type === 'armor') {
                            if (restrictions.armor === 'none') allow = false;
                            else if (restrictions.armor === 'light' && !isLeatherArmor(itemData.name)) allow = false;
                            if (restrictions.leatherOnly && !isLeatherArmor(itemData.name)) allow = false;
                            if (allow) itemData.system.is_equipped = true;
                        } else if (itemData.type === 'shield') {
                            allow = !!restrictions.shield;
                            if (allow) itemData.system.is_equipped = true;
                        } else if (itemData.type === 'weapon') {
                            if (restrictions.onlyImpact && !isImpactWeapon(itemData.name, itemData.system)) allow = false;
                            if (restrictions.onlySmall && !isSmallWeaponByName(itemData.name)) allow = false;
                            if (restrictions.noLarge && isTwoHanded(itemData.system)) allow = false;
                        }

                        if (allow) itemsToCreate.push(itemData);
                    } else {
                        console.warn(`Item não encontrado no SRD: ${baseName}`);
                    }
                }

                if (itemsToCreate.length) {
                    await actor.createEmbeddedDocuments('Item', itemsToCreate);
                }
            } catch (equipErr) {
                console.warn('Falha ao importar itens de equipamento:', equipErr);
            }

            // Adiciona magias iniciais se for classe que usa magias
            if (characterData.initialSpells && characterData.initialSpells.length > 0) {
                try {
                    const existingNames = new Set(actor.items.filter(i => i.type === 'spell').map(i => i.name));
                    const spellsToAdd = characterData.initialSpells.filter(spell => !existingNames.has(spell.name));
                    const spellData = spellsToAdd.map(spell => ({
                        name: spell.name,
                        type: 'spell',
                        img: spell.img || 'icons/svg/magic-swirl.svg',
                        system: spell.system
                    }));

                    if (spellData.length) {
                        await actor.createEmbeddedDocuments('Item', spellData);
                        console.log('Magias iniciais adicionadas:', spellsToAdd.map(s => s.name));
                    }
                } catch (error) {
                    console.error('Erro ao adicionar magias iniciais:', error);
                }
            }

            // Adiciona equipamento na descrição (texto)
            await actor.update({
                'description.value': `<h3>Equipamento Inicial</h3><ul>${characterData.equipment.map(item => `<li>${item}</li>`).join('')}</ul>`
            });

            console.log('Personagem criado com sucesso:', characterData.name);
            console.log('Dados do sistema:', actor.system);

            return actor;
        } catch (error) {
            console.error('Erro ao criar personagem:', error);
            throw error;
        }
    }


    /**
     * Carrega uma raça aleatória do compêndio SRD
     */
    async loadRandomRace() {
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
                return null;
            }
            
            const racesAll = await racePack.getDocuments();
            const races = racesAll.filter(doc => doc.type === 'race');
            if (races.length === 0) {
                console.warn('Nenhuma raça encontrada no compêndio');
                return null;
            }
            
            const randomRace = races[Math.floor(Math.random() * races.length)];
            return randomRace;
        } catch (error) {
            console.error('Erro ao carregar raça:', error);
            return null;
        }
    }
    
    /**
     * Carrega uma classe pelo nome do compêndio SRD
     */
    async loadClassByName(className) {
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
                return null;
            }
            
            const classesAll = await classPack.getDocuments();
            const classes = classesAll.filter(doc => doc.type === 'class');
            
            // Busca a classe pelo nome (exato ou similar)
            const classDoc = classes.find(doc => 
                doc.name.toLowerCase() === className.toLowerCase() ||
                doc.name.toLowerCase().includes(className.toLowerCase()) ||
                className.toLowerCase().includes(doc.name.toLowerCase())
            );
            
            return classDoc || null;
        } catch (error) {
            console.error('Erro ao carregar classe por nome:', error);
            return null;
        }
    }

    /**
     * Carrega uma classe aleatória do compêndio SRD
     */
    async loadRandomClass() {
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
                return null;
            }
            
            const classesAll = await classPack.getDocuments();
            const classes = classesAll.filter(doc => doc.type === 'class');
            if (classes.length === 0) {
                console.warn('Nenhuma classe encontrada no compêndio');
                return null;
            }
            
            console.log('Todas as classes disponíveis no SRD:', classes.map(c => c.name));
            
            const randomClass = classes[Math.floor(Math.random() * classes.length)];
            return randomClass;
        } catch (error) {
            console.error('Erro ao carregar classe:', error);
            return null;
        }
    }

    /**
     * Atualiza o conteúdo do modal com um novo personagem
     */
    async updateModalContent(dialog, html) {
        try {
            // Mostra indicador de carregamento
            const regenerateBtn = html.find('#regenerate-character');
            const originalText = regenerateBtn.html();
            regenerateBtn.html('<i class="fas fa-spinner fa-spin"></i> Gerando...');
            regenerateBtn.prop('disabled', true);

            // Gera novo personagem
            const character = await this.generateCharacter();
            
            // Carrega raça e classe aleatórias do SRD
            console.log('Carregando raça e classe do SRD...');
            const selectedRace = await this.loadRandomRace();
            
            // Carrega classe respeitando restrições de raça
            let selectedClass = null;
            if (selectedRace) {
                // Mapeia o nome da raça do SRD para o formato local
                const raceNameMapping = {
                    'gnome': 'gnome',
                    'dwarf': 'dwarf', 
                    'elf': 'elf',
                    'elfo': 'elf',
                    'halfling': 'halfling',
                    'human': 'human',
                    'humano': 'human',
                    'orc': 'orc'
                };
                
                const localRaceId = raceNameMapping[selectedRace.name.toLowerCase()] || selectedRace.name.toLowerCase();
                console.log('Raça do SRD:', selectedRace.id, 'Mapeada para:', localRaceId);
                
                // Carrega todas as classes do SRD
                let classPack = game.packs.get('olddragon2e.classes');
                if (!classPack) {
                    classPack = Array.from(game.packs).find(p => {
                        const key = `${p.metadata.package}.${p.metadata.name}`.toLowerCase();
                        const label = (p.metadata.label || '').toLowerCase();
                        return key.includes('classes') || label.includes('classe') || label.includes('classes');
                    });
                }
                
                const classesAll = await classPack.getDocuments();
                const srdClasses = classesAll.filter(doc => doc.type === 'class');
                console.log('Todas as classes do SRD:', srdClasses.map(c => c.name));
                
                // Filtra classes do SRD baseado na raça
                const availableClasses = srdClasses.filter(srdClass => {
                    // Normaliza o nome da classe para comparação (remove acentos)
                    const className = srdClass.name.toLowerCase();
                    const normalizedClassName = className.normalize('NFD').replace(/\p{Diacritic}/gu, '');
                    
                    // Classes específicas de raça
                    if (localRaceId === 'dwarf' && normalizedClassName.includes('anao aventureiro')) return true;
                    if (localRaceId === 'elf' && normalizedClassName.includes('elfo aventureiro')) return true;
                    if (localRaceId === 'halfling' && normalizedClassName.includes('halfling aventureiro')) return true;
                    
                    // Classes de combate (Guerreiro e especializações)
                    const combatClasses = ['guerreiro', 'bárbaro', 'paladino', 'arqueiro'];
                    if (combatClasses.some(gc => className.includes(gc))) return true;
                    
                    // Classes arcanas (Mago e especializações)
                    const arcaneClasses = ['mago', 'ilusionista', 'necromante', 'bruxo'];
                    if (arcaneClasses.some(gc => className.includes(gc))) return true;
                    
                    // Classes divinas (Clérigo e especializações)
                    const divineClasses = ['clérigo', 'druida', 'acadêmico', 'xamã', 'proscrito'];
                    if (divineClasses.some(gc => className.includes(gc))) return true;
                    
                    // Classes de habilidade (Ladrão e especializações)
                    const skillClasses = ['ladrão', 'ranger', 'bardo', 'assassino'];
                    if (skillClasses.some(gc => className.includes(gc))) return true;
                        
                    return false;
                });
                
                console.log('Classes disponíveis para', localRaceId + ':', availableClasses.map(c => c.name));
                
                // Seleciona uma classe aleatória das disponíveis
                if (availableClasses.length > 0) {
                    selectedClass = availableClasses[Math.floor(Math.random() * availableClasses.length)];
                    console.log('Classe selecionada do SRD:', selectedClass.name);
                } else {
                    console.log('Nenhuma classe disponível para a raça, usando classe aleatória');
                    selectedClass = await this.loadRandomClass();
                }
            } else {
                selectedClass = await this.loadRandomClass();
            }
            
            console.log('Raça selecionada:', selectedRace);
            console.log('Classe selecionada:', selectedClass);
            
            // Atualiza dados do personagem com raça e classe selecionadas
            if (selectedRace) {
                character.race = selectedRace.name;
                character.raceId = selectedRace.id;
                character.raceUUID = selectedRace.uuid;
                character.raceData = selectedRace.system;
                // Gera o nome compatível com a raça selecionada
                character.name = this.generateRaceName(selectedRace.id);
                console.log('Raça aplicada:', character.race);
            }
            if (selectedClass) {
                character.class = selectedClass.name;
                character.classId = selectedClass.id;
                character.classUUID = selectedClass.uuid;
                character.classData = selectedClass.system;
                console.log('Classe aplicada:', character.class);

                // Ajusta equipamento para respeitar restrições da classe selecionada
                const archetype = this.mapClassToArchetype(selectedClass.name);
                const baseEquip = this.generateEquipment(archetype);
                const restrictions = this.getClassRestrictions(selectedClass.name);
                character.equipment = this.filterEquipmentNamesByRestrictions(baseEquip, restrictions);
                
                // Gera magias iniciais apenas para classes arcanas (Mago e especializações)
                const isArcaneClass = /mago|bruxo|feiticeiro|wizard|warlock|necromante|ilusionista|necromancer|illusionist/i.test(selectedClass.name);
                const isDivineClass = /clérigo|cleric|druida|druid|acadêmico|academic|xamã|shaman|proscrito|outcast/i.test(selectedClass.name);
                const isSkillClassWithMagic = /bardo|bard/i.test(selectedClass.name);
                
                if (isArcaneClass || isSkillClassWithMagic) {
                    character.initialSpells = await this.generateInitialSpells(selectedClass.name);
                    console.log('Magias iniciais geradas:', character.initialSpells?.map(s => s.name) || 'Nenhuma');
                } else if (isDivineClass) {
                    console.log('Classe divina detectada, magias serão importadas do SRD');
                }
            }

            // Atualiza a referência do personagem no dialog
            dialog.currentCharacter = character;

            // Atualiza o conteúdo do modal
            this.updateModalHTML(html, character);

            // Restaura o botão
            regenerateBtn.html(originalText);
            regenerateBtn.prop('disabled', false);

        } catch (error) {
            console.error('Erro ao atualizar modal:', error);
            ui.notifications.error('Erro ao gerar novo personagem: ' + error.message);
            
            // Restaura o botão mesmo em caso de erro
            const regenerateBtn = html.find('#regenerate-character');
            regenerateBtn.html('<i class="fas fa-redo"></i> Gerar');
            regenerateBtn.prop('disabled', false);
        }
    }

    /**
     * Atualiza o HTML do modal com os novos dados do personagem
     */
    updateModalHTML(html, character) {
        // Atualiza informações básicas - usando os seletores corretos baseados no HTML atual
        const infoItems = html.find('.info-item');
        
        // Atualiza cada informação básica na ordem correta
        infoItems.eq(0).html(`<strong>Nome:</strong> ${character.name}`);
        infoItems.eq(1).html(`<strong>Raça:</strong> ${character.race || 'Carregando...'}`);
        infoItems.eq(2).html(`<strong>Classe:</strong> ${character.class || 'Carregando...'}`);
        infoItems.eq(3).html(`<strong>Nível:</strong> ${character.level}`);
        infoItems.eq(4).html(`<strong>PV:</strong> ${character.hitPoints}`);
        infoItems.eq(5).html(`<strong>CA:</strong> ${character.armorClass}`);
        infoItems.eq(6).html(`<strong>BA:</strong> ${character.baseAttack}`);
        infoItems.eq(7).html(`<strong>MV:</strong> ${character.movement}m`);
        infoItems.eq(8).html(`<strong>Idiomas:</strong> ${character.languages.languages.join(', ')}`);
        infoItems.eq(9).html(`<strong>Alinhamento:</strong> ${character.alignment}`);

        // Atualiza atributos - usando os seletores corretos baseados no HTML atual
        const attributeItems = html.find('.attribute-item');
        this.attributes.forEach((attr, index) => {
            const attributeItem = attributeItems.eq(index);
            attributeItem.find('.attribute-value').text(character.attributes[attr]);
            const modifier = character.modifiers[attr];
            attributeItem.find('.attribute-modifier').text(modifier >= 0 ? `+${modifier}` : modifier);
        });

        // Atualiza equipamento
        const equipmentList = html.find('#equipment-list');
        equipmentList.empty();
        character.equipment.forEach(item => {
            equipmentList.append(`<li>${item}</li>`);
        });

        // Atualiza habilidades de raça
        const raceAbilities = html.find('.race-abilities ul');
        raceAbilities.empty();
        character.raceAbilities.forEach(ability => {
            raceAbilities.append(`<li>${ability}</li>`);
        });

        // Atualiza habilidades de classe
        const classAbilities = html.find('.class-abilities ul');
        classAbilities.empty();
        character.classAbilities.forEach(ability => {
            classAbilities.append(`<li>${ability}</li>`);
        });

        // Atualiza jogadas de proteção
        html.find('.saving-throw-item').eq(0).find('.saving-throw-value').text(character.savingThrows.JPD);
        html.find('.saving-throw-item').eq(1).find('.saving-throw-value').text(character.savingThrows.JPC);
        html.find('.saving-throw-item').eq(2).find('.saving-throw-value').text(character.savingThrows.JPS);

        // Atualiza detalhes do personagem
        html.find('.detail-section').eq(0).find('p').text(
            `${character.appearance.body}, ${character.appearance.hair}, ${character.appearance.general}`
        );
        html.find('.detail-section').eq(1).find('p').text(
            `${character.personality.self}, ${character.personality.others}, ${character.personality.world}`
        );
        html.find('.detail-section').eq(2).find('p').text(
            `Nascido ${character.background.place} em uma ${character.background.family}, ficou órfão após ${character.background.tragedy}. Tornou-se aventureiro para ${character.background.motive}.`
        );
    }

    /**
     * Mostra o modal de geração de personagem
     */
    async showGeneratorModal() {
        const character = await this.generateCharacter();
        
        // Carrega raça e classe aleatórias do SRD
        console.log('Carregando raça e classe do SRD...');
        const selectedRace = await this.loadRandomRace();
        
        // Carrega classe respeitando restrições de raça
        let selectedClass = null;
        if (selectedRace) {
            // Mapeia o nome da raça do SRD para o formato local
            const raceNameMapping = {
                'gnome': 'gnome',
                'dwarf': 'dwarf', 
                'elf': 'elf',
                'elfo': 'elf',
                'halfling': 'halfling',
                'human': 'human',
                'humano': 'human',
                'orc': 'orc'
            };
            
            const localRaceId = raceNameMapping[selectedRace.name.toLowerCase()] || selectedRace.name.toLowerCase();
            console.log('Raça do SRD:', selectedRace.id, 'Mapeada para:', localRaceId);
            
            // Carrega todas as classes do SRD
            let classPack = game.packs.get('olddragon2e.classes');
            if (!classPack) {
                classPack = Array.from(game.packs).find(p => {
                    const key = `${p.metadata.package}.${p.metadata.name}`.toLowerCase();
                    const label = (p.metadata.label || '').toLowerCase();
                    return key.includes('classes') || label.includes('classe') || label.includes('classes');
                });
            }
            
            const classesAll = await classPack.getDocuments();
            const srdClasses = classesAll.filter(doc => doc.type === 'class');
            console.log('Todas as classes do SRD:', srdClasses.map(c => c.name));
            
            // Filtra classes do SRD baseado na raça
            const availableClasses = srdClasses.filter(srdClass => {
                // Normaliza o nome da classe para comparação (remove acentos)
                const className = srdClass.name.toLowerCase();
                const normalizedClassName = className.normalize('NFD').replace(/\p{Diacritic}/gu, '');
                
                // Debug: mostra classes específicas de raça
                if (srdClass.name.includes('Aventureiro')) {
                    console.log('Classe específica encontrada:', srdClass.name, 'para raça:', localRaceId);
                    console.log('Verificando condições:');
                    console.log('  - localRaceId === "dwarf":', localRaceId === 'dwarf');
                    console.log('  - localRaceId === "elf":', localRaceId === 'elf');
                    console.log('  - localRaceId === "halfling":', localRaceId === 'halfling');
                    console.log('  - normalizedClassName.includes("anao aventureiro"):', normalizedClassName.includes('anao aventureiro'));
                    console.log('  - normalizedClassName.includes("elfo aventureiro"):', normalizedClassName.includes('elfo aventureiro'));
                    console.log('  - normalizedClassName.includes("halfling aventureiro"):', normalizedClassName.includes('halfling aventureiro'));
                }

                // Classes específicas de raça
                if (localRaceId === 'dwarf' && normalizedClassName.includes('anao aventureiro')) return true;
                if (localRaceId === 'elf' && normalizedClassName.includes('elfo aventureiro')) return true;
                if (localRaceId === 'halfling' && normalizedClassName.includes('halfling aventureiro')) return true;
                
                            // Classes de combate (Guerreiro e especializações)
            const combatClasses = ['guerreiro', 'bárbaro', 'paladino', 'arqueiro'];
            if (combatClasses.some(gc => className.includes(gc))) return true;
            
            // Classes arcanas (Mago e especializações)
            const arcaneClasses = ['mago', 'ilusionista', 'necromante', 'bruxo'];
            if (arcaneClasses.some(gc => className.includes(gc))) return true;
            
            // Classes divinas (Clérigo e especializações)
            const divineClasses = ['clérigo', 'druida', 'acadêmico', 'xamã', 'proscrito'];
            if (divineClasses.some(gc => className.includes(gc))) return true;
            
            // Classes de habilidade (Ladrão e especializações)
            const skillClasses = ['ladrão', 'ranger', 'bardo', 'assassino'];
            if (skillClasses.some(gc => className.includes(gc))) return true;
                
                return false;
            });
            
            console.log('Classes disponíveis para', localRaceId + ':', availableClasses.map(c => c.name));
            
            // Seleciona uma classe aleatória das disponíveis
            if (availableClasses.length > 0) {
                selectedClass = availableClasses[Math.floor(Math.random() * availableClasses.length)];
                console.log('Classe selecionada do SRD:', selectedClass.name);
            } else {
                console.log('Nenhuma classe disponível para a raça, usando classe aleatória');
                selectedClass = await this.loadRandomClass();
            }
        } else {
            selectedClass = await this.loadRandomClass();
        }
        
        console.log('Raça selecionada:', selectedRace);
        console.log('Classe selecionada:', selectedClass);
        
        // Atualiza dados do personagem com raça e classe selecionadas
        if (selectedRace) {
            character.race = selectedRace.name;
            character.raceId = selectedRace.id;
            character.raceUUID = selectedRace.uuid;
            character.raceData = selectedRace.system;
            // Gera o nome compatível com a raça selecionada
            character.name = this.generateRaceName(selectedRace.id);
            console.log('Raça aplicada:', character.race);
        }
        if (selectedClass) {
            character.class = selectedClass.name;
            character.classId = selectedClass.id;
            character.classUUID = selectedClass.uuid;
            character.classData = selectedClass.system;
            console.log('Classe aplicada:', character.class);

            // Ajusta equipamento para respeitar restrições da classe selecionada
            const archetype = this.mapClassToArchetype(selectedClass.name);
            const baseEquip = this.generateEquipment(archetype);
            const restrictions = this.getClassRestrictions(selectedClass.name);
            character.equipment = this.filterEquipmentNamesByRestrictions(baseEquip, restrictions);
            
            // Gera magias iniciais apenas para classes arcanas (Mago e especializações)
            const isArcaneClass = /mago|bruxo|feiticeiro|wizard|warlock|necromante|ilusionista|necromancer|illusionist/i.test(selectedClass.name);
            const isDivineClass = /clérigo|cleric|druida|druid|acadêmico|academic|xamã|shaman|proscrito|outcast/i.test(selectedClass.name);
            const isSkillClassWithMagic = /bardo|bard/i.test(selectedClass.name);
            
            if (isArcaneClass || isSkillClassWithMagic) {
                character.initialSpells = await this.generateInitialSpells(selectedClass.name);
                console.log('Magias iniciais geradas:', character.initialSpells?.map(s => s.name) || 'Nenhuma');
            } else if (isDivineClass) {
                console.log('Classe divina detectada, magias serão importadas do SRD');
            }
        }
        
        const modalContent = `
            <div class="old-dragon-generator-modal">
                <h2><i class="fas fa-dice-d20"></i> Gerador de Personagem - Old Dragon 2e</h2>
                
                <div class="buttons">
                    <button class="btn btn-primary" id="create-character">
                        <i class="fas fa-plus"></i> Criar Personagem
                    </button>
                    <button class="btn btn-secondary" id="regenerate-character">
                        <i class="fas fa-redo"></i> Gerar
                    </button>
                    <button class="btn btn-secondary" id="close-modal">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                </div>
                
                <div class="character-preview">
                    <h3>Prévia do Personagem</h3>
                    
                    <div class="main-layout">
                        <div class="left-column">
                    <div class="character-basic-info">
                                <h4><i class="fas fa-info-circle"></i> Informações Básicas</h4>
                                <div class="info-grid">
                                    <div class="info-item"><strong>Nome:</strong> ${character.name}</div>
                                    <div class="info-item"><strong>Raça:</strong> ${character.race || 'Carregando...'}</div>
                                    <div class="info-item"><strong>Classe:</strong> ${character.class || 'Carregando...'}</div>
                                    <div class="info-item"><strong>Nível:</strong> ${character.level}</div>
                                    <div class="info-item"><strong>PV:</strong> ${character.hitPoints}</div>
                                    <div class="info-item"><strong>CA:</strong> ${character.armorClass}</div>
                                    <div class="info-item"><strong>BA:</strong> ${character.baseAttack}</div>
                                    <div class="info-item"><strong>MV:</strong> ${character.movement}m</div>
                                    <div class="info-item"><strong>Idiomas:</strong> ${character.languages.languages.join(', ')}</div>
                                    <div class="info-item"><strong>Alinhamento:</strong> ${character.alignment}</div>
                                </div>
                    </div>
                    
                    <div class="attributes-grid">
                                <h4><i class="fas fa-dice"></i> Atributos</h4>
                        ${this.attributes.map(attr => `
                            <div class="attribute-item">
                                <div class="attribute-name">${this.attributeNames[attr]}</div>
                                <div class="attribute-value">${character.attributes[attr]}</div>
                                <div class="attribute-modifier">${character.modifiers[attr] >= 0 ? '+' : ''}${character.modifiers[attr]}</div>
                            </div>
                        `).join('')}
                    </div>
                            
                            <div class="saving-throws">
                                <h4><i class="fas fa-shield"></i> Jogadas de Proteção</h4>
                                <div class="saving-throws-grid">
                                    <div class="saving-throw-item">
                                        <div class="saving-throw-name">JPD</div>
                                        <div class="saving-throw-value">${character.savingThrows.JPD}</div>
                                    </div>
                                    <div class="saving-throw-item">
                                        <div class="saving-throw-name">JPC</div>
                                        <div class="saving-throw-value">${character.savingThrows.JPC}</div>
                                    </div>
                                    <div class="saving-throw-item">
                                        <div class="saving-throw-name">JPS</div>
                                        <div class="saving-throw-value">${character.savingThrows.JPS}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="character-details">
                                <h4><i class="fas fa-user"></i> Detalhes</h4>
                                
                                <div class="detail-section">
                                    <h5>Aparência:</h5>
                                    <p>${character.appearance.body}, ${character.appearance.hair}, ${character.appearance.general}</p>
                                </div>
                                
                                <div class="detail-section">
                                    <h5>Personalidade:</h5>
                                    <p>${character.personality.self}, ${character.personality.others}, ${character.personality.world}</p>
                                </div>
                                
                                <div class="detail-section">
                                    <h5>Histórico:</h5>
                                    <p>Nascido ${character.background.place} em uma ${character.background.family}, ficou órfão após ${character.background.tragedy}. Tornou-se aventureiro para ${character.background.motive}.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="right-column">
                            <div class="race-abilities">
                                <h4><i class="fas fa-star"></i> Habilidades de Raça</h4>
                                <ul>
                                    ${character.raceAbilities.map(ability => `<li>${ability}</li>`).join('')}
                                </ul>
                            </div>
                            
                            <div class="class-abilities">
                                <h4><i class="fas fa-shield-alt"></i> Habilidades de Classe</h4>
                                <ul>
                                    ${character.classAbilities.map(ability => `<li>${ability}</li>`).join('')}
                                </ul>
                    </div>
                    
                    <div class="equipment-list">
                        <h4><i class="fas fa-sack"></i> Equipamento</h4>
                        <ul>
                            ${character.equipment.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const dialog = new Dialog({
            title: 'Gerador de Personagem - Old Dragon 2e',
            content: modalContent,
            buttons: {},
            default: 'create-character',
            render: (html) => {
                // Armazena a referência do personagem atual no dialog
                dialog.currentCharacter = character;
                
                // Usamos posicionamento/arraste nativos do Foundry; sem forçar transform/left/top
                html.find('#create-character').click(async () => {
                    try {
                        const actor = await this.createCharacterInFoundry(dialog.currentCharacter);
                        ui.notifications.info(`Personagem ${dialog.currentCharacter.name} criado com sucesso!`);
                        actor.sheet.render(true);
                        dialog.close();
                    } catch (error) {
                        ui.notifications.error('Erro ao criar personagem: ' + error.message);
                    }
                });

                html.find('#regenerate-character').click(async () => {
                    await this.updateModalContent(dialog, html);
                });

                html.find('#close-modal').click(() => {
                    dialog.close();
                });
            }
        }, {
            classes: ['od2e-generator'],
            width: 1000,
            resizable: true
        });

        dialog.render(true);
        // Removido hook de re-centralização forçada
    }
}

// Hooks para inicialização do módulo
Hooks.on('init', function() {
    console.log('Old Dragon 2e - Gerador de Personagens | Inicializando...');
});

Hooks.on('ready', function() {
    console.log('Old Dragon 2e - Gerador de Personagens | Pronto!');
    
    // Função para adicionar o botão
    function addGeneratorButton() {
        const actorDirectory = document.querySelector('#actors');
        if (!actorDirectory) return;
        
        // Remove botão existente se houver
        const existingBtn = actorDirectory.querySelector('.old-dragon-generator-btn');
        if (existingBtn) {
            existingBtn.remove();
        }
        
        // Cria o botão
        const button = document.createElement('button');
        button.className = 'old-dragon-generator-btn';
        button.type = 'button';
        button.innerHTML = '<i class="fas fa-dice-d20"></i> Gerar Personagem';
        
        // Adiciona estilos
        Object.assign(button.style, {
        'background': 'linear-gradient(135deg, #8B4513, #A0522D)',
        'color': 'white',
        'border': 'none',
        'padding': '8px 16px',
        'border-radius': '4px',
        'cursor': 'pointer',
        'font-weight': 'bold',
            'margin-left': '10px',
            'display': 'inline-block'
        });
        
        // Adiciona evento de clique
        button.addEventListener('click', async () => {
            console.log('Botão Gerar Personagem clicado!');
            const generator = new OldDragon2eCharacterGenerator();
            await generator.showGeneratorModal();
        });
        
        // Tenta encontrar onde adicionar o botão
        const header = actorDirectory.querySelector('.directory-header');
        if (header) {
            header.appendChild(button);
        } else {
            // Fallback: adiciona no topo
            const firstChild = actorDirectory.firstElementChild;
            if (firstChild) {
                actorDirectory.insertBefore(button, firstChild);
            } else {
                actorDirectory.appendChild(button);
            }
        }
        
        console.log('Botão Gerar Personagem adicionado ao DOM');
    }
    
    // Adiciona o botão quando a aba de atores é renderizada
    Hooks.on('renderActorDirectory', (app, html) => {
        setTimeout(addGeneratorButton, 100); // Pequeno delay para garantir que o DOM esteja pronto
    });
    
    // Também tenta adicionar imediatamente se a aba já estiver aberta
    setTimeout(addGeneratorButton, 1000);
});

