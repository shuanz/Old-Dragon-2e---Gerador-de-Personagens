/**
 * Old Dragon 2e - Gerador de Personagens
 * Um módulo para gerar personagens automaticamente para o sistema Old Dragon 2e
 */

class OldDragon2eCharacterGenerator {
    constructor() {


        this.attributes = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
        this.attributeNames = {
            strength: 'Força',
            dexterity: 'Destreza',
            constitution: 'Constituição',
            intelligence: 'Inteligência',
            wisdom: 'Sabedoria',
            charisma: 'Carisma'
        };

        // Tabelas para detalhes finais - conforme SRD Old Dragon 2E
        this.appearance = {
            body: ['Alto', 'Baixo', 'Musculoso', 'Franzino', 'Gordo', 'Especial'],
            hair: ['Careca', 'Calvo', 'Cabelos Raspados', 'Cabelos Curtos', 'Cabelos Longos', 'Especial'],
            general: ['Barba ou Bigode', 'Moreno', 'Pálido', 'Jovem', 'Velho', 'Especial'],
            special: ['Horrível', 'Feio', 'Mais um na multidão', 'Bem Afeiçoado', 'Bonito', 'Lindo']
        };

        this.personality = {
            self: ['Alerta', 'Distraído', 'Calmo', 'Agitado', 'Especial', 'Especial'],
            others: ['Gentil', 'Grosso', 'Desconfiado', 'Tímido', 'Especial', 'Especial'],
            world: ['Otimista', 'Pessimista', 'Perfeccionista', 'Teimoso', 'Especial', 'Especial'],
            special: ['Modesto', 'Egoísta', 'Humilde', 'Galanteador', 'Especial', 'Especial']
        };

        // Templates de histórico conforme SRD Old Dragon 2E
        this.backgroundTemplates = [
            "Ainda criança, foi abandonado [LUGAR]. Cresceu sob os cuidados de um [CLASSE] o qual lhe ensinou tudo o que ele sabe. Tornou-se aventureiro para [MOTIVO].",
            "Nascido [LUGAR] em uma [FAMÍLIA], ficou órfão após [TRAGÉDIA]. Tornou-se aventureiro para [MOTIVO].",
            "Vítima de uma [TRAGÉDIA], acabou crescendo desamparado [LUGAR]. Foi empurrado para uma vida de aventuras [MOTIVO].",
            "Sua vida era tranquila e pacífica junto da sua [FAMÍLIA], até que, há alguns anos, você foi vítima [TRAGÉDIA] e foi forçado a aprender sozinho as técnicas de [CLASSE]. Hoje, se aventura para [MOTIVO].",
            "Você é um [SUA RAÇA] que cresceu numa família de [OUTRA RAÇA] depois [TRAGÉDIA]. Isso o fez se sentir pouco acolhido e então resolveu se tornar um aventureiro para [MOTIVO].",
            "Você era um jovem que cresceu [LUGAR]. Acabou virando aventureiro após um [TRAGÉDIA] que matou todos os seus parentes. Seu sonho é acabar sua vida aposentado [LUGAR]."
        ];

        this.background = {
            place: ['numa fazenda nos campos', 'numa pequena e distante vila', 'numa grande e importante cidade', 'numa vila à beira do mar', 'numa aldeia nas montanhas', 'numa pequena cidade no meio da floresta'],
            motive: ['ficar rico e poderoso', 'vingar seu passado', 'trazer glória e fama para você', 'matar a curiosidade sobre o mundo', 'tentar dar uma vida melhor aos seus descendentes', 'realizar seu sonho de ser um herói'],
            family: ['família muito pobre de camponeses', 'família de comerciantes', 'família de fazendeiros', 'família disfuncional', 'família adotiva', 'família de nobres falidos'],
            tragedy: ['de um ataque de criaturas malignas', 'de uma guerra sanguinária', 'de um erro judiciário', 'de um terremoto misterioso', 'de uma experiência mágica', 'de uma epidemia de peste']
        };

        this.alignments = ['Ordem', 'Neutralidade', 'Caos'];

        // Conjunto offline de nomes por raça (estilo "fantasy-names")
        this.fantasyNames = {
            human: {
                first: ['Alden','Aria','Bran','Cael','Dara','Ewan','Faye','Gwen','Hector','Isla','Joran','Kira','Lara','Mira','Nolan','Orin','Pietra','Quinn','Rurik','Selene','Talia','Ulric','Valen','Wren','Xara','Yara','Zara','Aiden','Aria','Brenna','Caleb','Diana','Elena','Finn','Grace','Hannah','Ivan','Jade','Kai','Liam','Maya','Nathan','Olivia','Paige','Quinn','Riley','Sophia','Tyler','Uma','Vera','Wyatt','Xander','Yara','Zoe','Aaron','Bella','Cameron','Delilah','Ethan','Faith','Gabriel','Hope','Isaac','Julia','Kyle','Luna','Mason','Nora','Owen','Penelope','Quentin','Ruby','Samuel','Tessa','Uriah','Victoria','William','Ximena','Yolanda','Zachary','Abigail','Benjamin','Charlotte','Daniel','Emma','Felix','Gabrielle','Henry','Isabella','Jackson','Katherine','Lucas','Madison','Noah','Olivia','Parker','Quinn','Rebecca','Sebastian','Taylor','Ulysses','Valerie','Wesley','Xavier','Yasmine','Zara'],
                last: ['Blackwood','Stormborn','Riverton','Hillcrest','Dawnbreaker','Stonefield','Oakenshield','Whitlock','Ravencrest','Ironwood','Silverhand','Windrider','Brightwater','Ashford','Hawkins','Brightmore','Coldwater','Darkbane','Evergreen','Firestone','Goldleaf','Highwind','Ironheart','Jadevale','Kingsley','Lightbringer','Moonwhisper','Nightfall','Oakheart','Pinecrest','Quickblade','Redwood','Starfall','Thornfield','Underhill','Valebrook','Whitecliff','Yellowstone','Zephyrwind','Brightforge','Cloudwalker','Dragonbane','Earthshaker','Frostborn','Greenleaf','Holloway','Icewind','Jadeblade','Kingsguard','Lightfoot','Meadowbrook','Northwind','Oakenheart','Proudmore','Quickstep','Riverstone','Shadowbane','Thunderclap','Underwood','Valeheart','Westbrook','Yellowleaf','Zephyrheart','Brightwater','Cloudcrest','Dragonheart','Earthborn','Frostwind','Greenbrook','Hollowcrest','Iceborn','Jadeheart','Kingsbrook','Lightborn','Meadowcrest','Northbrook','Oakenbrook','Proudbrook','Quickbrook','Riverbrook','Shadowbrook','Thunderbrook','Underbrook','Valebrook','Westbrook','Yellowbrook','Zephyrbrook']
            },
            elf: {
                first: ['Aelar','Aerith','Belanor','Caladrel','Daenala','Elora','Faelar','Galan','Ilyana','Lethalia','Naeris','Rolen','Syllin','Theren','Vaelis','Aelindra','Aerendil','Belthil','Caladwen','Daenor','Elarion','Faelwen','Galadriel','Ilythia','Lethwen','Naerwen','Rolenor','Syllindra','Therenor','Vaelindra','Aelwen','Aerion','Belthar','Caladion','Daenwen','Elarwen','Faelion','Galadwen','Ilythar','Lethion','Naerion','Rolenwen','Syllion','Therenwen','Vaelion','Aelion','Aerwen','Belthwen','Caladwen','Daenion','Elarion','Faelwen','Galadion','Ilythwen','Lethwen','Naerwen','Rolenion','Syllwen','Therenion','Vaelwen'],
                last: ['Amastacia','Galanodel','Holimion','Ilphelkiir','Liadon','Meliamne','Nailo','Siannodel','Xiloscient','Aelindor','Aerendil','Belthil','Caladwen','Daenor','Elarion','Faelwen','Galadriel','Ilythia','Lethwen','Naerwen','Rolenor','Syllindra','Therenor','Vaelindra','Aelwen','Aerion','Belthar','Caladion','Daenwen','Elarwen','Faelion','Galadwen','Ilythar','Lethion','Naerion','Rolenwen','Syllion','Therenwen','Vaelion','Aelindor','Aerendil','Belthil','Caladwen','Daenor','Elarion','Faelwen','Galadriel','Ilythia','Lethwen','Naerwen','Rolenor','Syllindra','Therenor','Vaelindra']
            },
            dwarf: {
                first: ['Baern','Dain','Einkil','Fargrim','Hilda','Kathra','Mardin','Rurik','Torbera','Traubon','Ulfgar','Balin','Dwalin','Erebor','Fili','Gimli','Halin','Kili','Mim','Nori','Ori','Thorin','Bofur','Bombur','Dori','Frerin','Gloin','Halin','Kili','Mim','Nori','Ori','Thorin','Balin','Dwalin','Erebor','Fili','Gimli','Halin','Kili','Mim','Nori','Ori','Thorin','Bofur','Bombur','Dori','Frerin','Gloin','Halin','Kili','Mim','Nori','Ori','Thorin'],
                last: ['Balderk','Dankil','Fireforge','Ironfist','Loderr','Lutgehr','Rumnaheim','Strakeln','Torunn','Ungart','Balderk','Dankil','Fireforge','Ironfist','Loderr','Lutgehr','Rumnaheim','Strakeln','Torunn','Ungart','Balderk','Dankil','Fireforge','Ironfist','Loderr','Lutgehr','Rumnaheim','Strakeln','Torunn','Ungart','Balderk','Dankil','Fireforge','Ironfist','Loderr','Lutgehr','Rumnaheim','Strakeln','Torunn','Ungart','Balderk','Dankil','Fireforge','Ironfist','Loderr','Lutgehr','Rumnaheim','Strakeln','Torunn','Ungart']
            },
            halfling: {
                first: ['Alton','Andry','Cade','Cora','Eldon','Finnan','Garret','Jillian','Lidda','Milo','Rosie','Perrin','Tegan','Bilbo','Frodo','Samwise','Merry','Pippin','Bilbo','Frodo','Samwise','Merry','Pippin','Bilbo','Frodo','Samwise','Merry','Pippin','Bilbo','Frodo','Samwise','Merry','Pippin','Bilbo','Frodo','Samwise','Merry','Pippin','Bilbo','Frodo','Samwise','Merry','Pippin','Bilbo','Frodo','Samwise','Merry','Pippin','Bilbo','Frodo','Samwise','Merry','Pippin','Bilbo','Frodo','Samwise','Merry','Pippin'],
                last: ['Brushgather','Goodbarrel','Greenbottle','Highhill','Hilltopple','Leagallow','Tealeaf','Thorngage','Underbough','Brushgather','Goodbarrel','Greenbottle','Highhill','Hilltopple','Leagallow','Tealeaf','Thorngage','Underbough','Brushgather','Goodbarrel','Greenbottle','Highhill','Hilltopple','Leagallow','Tealeaf','Thorngage','Underbough','Brushgather','Goodbarrel','Greenbottle','Highhill','Hilltopple','Leagallow','Tealeaf','Thorngage','Underbough','Brushgather','Goodbarrel','Greenbottle','Highhill','Hilltopple','Leagallow','Tealeaf','Thorngage','Underbough','Brushgather','Goodbarrel','Greenbottle','Highhill','Hilltopple','Leagallow','Tealeaf','Thorngage','Underbough']
            },
            gnome: {
                first: ['Alston','Bodrin','Bimpnottin','Donella','Fonkin','Jebeddo','Nissa','Orla','Zanna','Alston','Bodrin','Bimpnottin','Donella','Fonkin','Jebeddo','Nissa','Orla','Zanna','Alston','Bodrin','Bimpnottin','Donella','Fonkin','Jebeddo','Nissa','Orla','Zanna','Alston','Bodrin','Bimpnottin','Donella','Fonkin','Jebeddo','Nissa','Orla','Zanna','Alston','Bodrin','Bimpnottin','Donella','Fonkin','Jebeddo','Nissa','Orla','Zanna','Alston','Bodrin','Bimpnottin','Donella','Fonkin','Jebeddo','Nissa','Orla','Zanna','Alston','Bodrin','Bimpnottin','Donella','Fonkin','Jebeddo','Nissa','Orla','Zanna'],
                last: ['Beren','Daergel','Folkor','Garrick','Nackle','Murnig','Ningel','Raulnor','Scheppen','Beren','Daergel','Folkor','Garrick','Nackle','Murnig','Ningel','Raulnor','Scheppen','Beren','Daergel','Folkor','Garrick','Nackle','Murnig','Ningel','Raulnor','Scheppen','Beren','Daergel','Folkor','Garrick','Nackle','Murnig','Ningel','Raulnor','Scheppen','Beren','Daergel','Folkor','Garrick','Nackle','Murnig','Ningel','Raulnor','Scheppen','Beren','Daergel','Folkor','Garrick','Nackle','Murnig','Ningel','Raulnor','Scheppen','Beren','Daergel','Folkor','Garrick','Nackle','Murnig','Ningel','Raulnor','Scheppen']
            },
        };


        // Categorização de equipamentos para geração dinâmica
        this.equipmentCategories = {
            essential: ['Mochila', 'Ração de viagem', 'Saco de Dormir', 'Corda de Cânhamo', 'Tocha', 'Pederneira'],
            survival: ['Tenda pequena', 'Coberta de Inverno', 'Traje de exploração', 'Vara de exploração', 'Pá ou Picareta'],
            utility: ['Ferramentas de Ladrão', 'Pé de Cabra', 'Cravos/Ganchos', 'Escada', 'Rede', 'Apito'],
            magical: ['Grimório', 'Pergaminho', 'Pena e Tinta', 'Símbolo divino', 'Água Benta'],
            luxury: ['Traje nobre', 'Espelho', 'Lanterna furta-fogo', 'Vela', 'Óleo', 'Lamparina']
        };

    }

    /**
     * Carrega descrições de equipamentos do SRD de forma assíncrona
     */
    async loadEquipmentDescriptions(equipment, container) {
        // Limpa o container primeiro
        container.empty();
        
        for (const item of equipment) {
            try {
                const description = await this.getEquipmentDescription(item);
                const itemHtml = `
                    <div class="equipment-item">
                        <div class="equipment-name">${item}</div>
                        <div class="equipment-description">${description}</div>
                    </div>
                `;
                container.append(itemHtml);
            } catch (error) {
                console.warn('Erro ao carregar descrição do item:', item, error);
                const itemHtml = `
                    <div class="equipment-item">
                        <div class="equipment-name">${item}</div>
                        <div class="equipment-description">Equipamento de aventura.</div>
                    </div>
                `;
                container.append(itemHtml);
            }
        }
    }

    /**
     * Carrega descrições de equipamentos sem limpar o container (para atualizações)
     */
    async loadEquipmentDescriptionsWithoutClearing(equipment, container) {
        const equipmentItems = container.find('.equipment-item');
        
        for (let i = 0; i < equipment.length && i < equipmentItems.length; i++) {
            const item = equipment[i];
            const itemElement = equipmentItems.eq(i);
            const descriptionElement = itemElement.find('.equipment-description');
            
            try {
                const description = await this.getEquipmentDescription(item);
                descriptionElement.text(description);
            } catch (error) {
                console.warn('Erro ao carregar descrição do item:', item, error);
                descriptionElement.text('Equipamento de aventura.');
            }
        }
    }



    /**
     * Obtém a descrição de um equipamento do SRD
     */
    async getEquipmentDescription(itemName) {
        try {
            // Remove quantidade se houver (ex: "Ração de viagem (3)" -> "Ração de viagem")
            const cleanName = itemName.replace(/\s*\(\d+\)$/, '').trim();
            
            // Busca em todos os packs de equipamentos
            const equipmentPacks = [
                'olddragon2e.equipment',
                'olddragon2e.weapons',
                'olddragon2e.armors',
                'olddragon2e.items'
            ];
            
            for (const packName of equipmentPacks) {
                const pack = game.packs.get(packName);
                if (!pack) {
                    continue;
                }
                
                const items = await pack.getDocuments();
                
                // Busca exata primeiro
                let item = items.find(i => i.name.toLowerCase() === cleanName.toLowerCase());
                
                // Se não encontrar, busca parcial
                if (!item) {
                    item = items.find(i => i.name.toLowerCase().includes(cleanName.toLowerCase()));
                }
                
                if (item) {
                    const description = item.system?.description?.value || 
                                     item.system?.description || 
                                     item.description?.value || 
                                     item.description || 
                                     'Equipamento de aventura.';
                    return description;
                }
            }
            
            return 'Equipamento de aventura.';
        } catch (error) {
            console.warn('Erro ao buscar descrição do equipamento:', error);
            return 'Equipamento de aventura.';
        }
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
            
            
            const firstCircleSpells = allSpells.filter(spell => {
                // No Old Dragon 2e, as magias de 1º círculo têm valor "1" nos campos de escola
                const system = spell.system || {};
                
                
                // Verifica se qualquer escola tem valor "1" (string)
                return system.arcane === "1" || 
                       system.divine === "1" || 
                       system.necromancer === "1" || 
                       system.illusionist === "1";
            });

            

            if (firstCircleSpells.length === 0) {
                console.warn('Nenhuma magia de 1º círculo encontrada');
                return [];
            }

            const initialSpells = [];

            // 1. Lista das 12 magias de 1º círculo que podem ser sorteadas como iniciais
            const availableInitialSpells = [
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

            // 2. Filtra as magias disponíveis que existem no sistema e não são exclusivas
            const eligibleSpells = [];
            for (const spellName of availableInitialSpells) {
                const spell = firstCircleSpells.find(s => 
                    s.name.toLowerCase().includes(spellName.toLowerCase())
                );
                if (spell && !this.isExclusiveSpell(spell.name, characterClass)) {
                    eligibleSpells.push(spell);
                }
            }

            // 3. Sorteia 3 magias aleatórias da lista elegível
            const shuffledSpells = [...eligibleSpells].sort(() => Math.random() - 0.5);
            const selectedSpells = shuffledSpells.slice(0, 3);
            initialSpells.push(...selectedSpells);

            // 4. Adiciona magias exclusivas da especialização (se aplicável)
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
            } else {
            }
        }

        return exclusiveSpells;
    }

    async loadSrdEquipment() {
        if (!this.srdEquipment) {
            const moduleData = await import('./srd-equipment.json', { with: { type: 'json' } });
            this.srdEquipment = moduleData.default;
        }
        return this.srdEquipment;
    }

    /**
     * Gera equipamento básico baseado na classe
     */
    async generateEquipment(characterClass) {
        console.log(`CharacterGenerator: Gerando equipamento para classe "${characterClass}"`);
        console.log(`CharacterGenerator: EquipmentManager disponível:`, typeof EquipmentManager);
        
        // Verifica se EquipmentManager está disponível antes de tentar usá-lo
        if (typeof EquipmentManager !== 'undefined') {
            try {
                // Usa o EquipmentManager para gerar equipamentos apropriados para a classe
                const equipmentManager = new EquipmentManager();
                const equipment = await equipmentManager.generateBasicEquipment(characterClass);
                
                // Converte os objetos de equipamento para nomes de strings para compatibilidade
                const equipmentNames = equipment.map(item => item.name || item);
                console.log(`CharacterGenerator: Equipamentos finais para "${characterClass}":`, equipmentNames);
                
                return equipmentNames;
            } catch (error) {
                console.error('Erro ao usar EquipmentManager:', error);
                console.log(`CharacterGenerator: Usando fallback devido a erro no EquipmentManager`);
                return this.generateEquipmentFallback(characterClass);
            }
        } else {
            // EquipmentManager não está disponível, usa fallback diretamente
            console.log(`CharacterGenerator: EquipmentManager não disponível, usando fallback`);
            return this.generateEquipmentFallback(characterClass);
        }
    }

    /**
     * Método fallback para gerar equipamento quando EquipmentManager não está disponível
     * Implementa restrições detalhadas baseadas nas tabelas de armas e armaduras
     */
    async generateEquipmentFallback(characterClass) {
        const className = characterClass.toLowerCase();
        const equipment = [];
        
        // Define equipamentos por classe seguindo as restrições específicas
        
        // GUERREIRO (Bárbaro, Paladino, Anão Aventureiro, Arqueiro)
        if (/guerreiro|warrior|bárbaro|barbarian|paladino|paladin/.test(className)) {
            if (/bárbaro|barbarian/.test(className)) {
                // Bárbaro: todas as armas, só armaduras leves
                const weapons = ['Adaga', 'Alabarda', 'Arco Curto', 'Arco Longo', 'Azagaia', 'Besta de Mão', 'Besta', 'Bordão/Cajado', 'Cimitarra', 'Espada Bastarda', 'Espada Curta', 'Espada Longa', 'Funda', 'Lança', 'Lança Montada', 'Maça', 'Machado', 'Machado de Batalha', 'Mangual', 'Martelo', 'Martelo de Batalha', 'Montante', 'Pique', 'Porrete/Clava'];
                const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
                equipment.push(randomWeapon, 'Adaga', 'Armadura de Couro', 'Kit de Sobrevivência');
            } else if (/arqueiro|archer/.test(className)) {
                // Arqueiro: armas específicas, só couro
                const weapons = ['Arco Curto', 'Arco Longo', 'Adaga', 'Azagaia', 'Funda', 'Bordão/Cajado', 'Espada Curta'];
                const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
                equipment.push(randomWeapon, 'Adaga', 'Armadura de Couro', 'Flecha de Guerra', 'Kit de Rastreamento');
            } else if (/anão|anao|dwarf/.test(className)) {
                // Anão Aventureiro: todas as armas e armaduras
                const weapons = ['Adaga', 'Alabarda', 'Arco Curto', 'Arco Longo', 'Azagaia', 'Besta de Mão', 'Besta', 'Bordão/Cajado', 'Cimitarra', 'Espada Bastarda', 'Espada Curta', 'Espada Longa', 'Funda', 'Lança', 'Lança Montada', 'Maça', 'Machado', 'Machado de Batalha', 'Mangual', 'Martelo', 'Martelo de Batalha', 'Montante', 'Pique', 'Porrete/Clava'];
                const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
                equipment.push(randomWeapon, 'Adaga', 'Armadura de Couro', 'Escudo', 'Kit de Escalada');
            } else {
                // Guerreiro/Paladino padrão: todas as armas e armaduras
                const weapons = ['Adaga', 'Alabarda', 'Arco Curto', 'Arco Longo', 'Azagaia', 'Besta de Mão', 'Besta', 'Bordão/Cajado', 'Cimitarra', 'Espada Bastarda', 'Espada Curta', 'Espada Longa', 'Funda', 'Lança', 'Lança Montada', 'Maça', 'Machado', 'Machado de Batalha', 'Mangual', 'Martelo', 'Martelo de Batalha', 'Montante', 'Pique', 'Porrete/Clava'];
                const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
                equipment.push(randomWeapon, 'Adaga', 'Armadura de Couro', 'Escudo', 'Kit de Escalada');
            }
        }
        
        // CLÉRIGO (Druida, Acadêmico, Xamã, Proscrito)
        else if (/clérigo|cleric|druida|druid|xamã|xama|shaman|acadêmico|academic|proscrito|outlaw/.test(className)) {
            if (/druida|druid/.test(className)) {
                // Druida: armas não metálicas, armaduras leves
                const weapons = ['Bordão/Cajado', 'Porrete/Clava', 'Lança', 'Azagaia', 'Funda'];
                const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
                equipment.push(randomWeapon, 'Adaga', 'Armadura de Couro', 'Escudo', 'Símbolo Druídico');
            } else if (/xamã|xama|shaman/.test(className)) {
                // Xamã: armas não metálicas, armaduras leves
                const weapons = ['Bordão/Cajado', 'Porrete/Clava', 'Lança', 'Azagaia', 'Funda'];
                const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
                equipment.push(randomWeapon, 'Adaga', 'Armadura de Couro', 'Escudo', 'Símbolo Xamânico');
            } else if (/acadêmico|academic/.test(className)) {
                // Acadêmico: apenas armas impactantes, todas armaduras
                const weapons = ['Bordão/Cajado', 'Maça', 'Mangual', 'Martelo', 'Martelo de Batalha', 'Porrete/Clava'];
                const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
                equipment.push(randomWeapon, 'Adaga', 'Armadura de Couro', 'Escudo', 'Kit de Estudos');
            } else if (/proscrito|outlaw/.test(className)) {
                // Proscrito: pode usar todas as armas e armaduras
                const weapons = ['Adaga', 'Alabarda', 'Arco Curto', 'Arco Longo', 'Azagaia', 'Besta de Mão', 'Besta', 'Bordão/Cajado', 'Cimitarra', 'Espada Bastarda', 'Espada Curta', 'Espada Longa', 'Funda', 'Lança', 'Lança Montada', 'Maça', 'Machado', 'Machado de Batalha', 'Mangual', 'Martelo', 'Martelo de Batalha', 'Montante', 'Pique', 'Porrete/Clava'];
                const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
                equipment.push(randomWeapon, 'Adaga', 'Armadura de Couro', 'Escudo', 'Kit de Sobrevivência');
            } else {
                // Clérigo padrão: apenas armas impactantes, todas armaduras
                const weapons = ['Bordão/Cajado', 'Maça', 'Mangual', 'Martelo', 'Martelo de Batalha', 'Porrete/Clava'];
                const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
                equipment.push(randomWeapon, 'Adaga', 'Armadura de Couro', 'Escudo', 'Símbolo Sagrado');
            }
        }
        
        // LADRÃO (Ranger, Bardo, Assassino, Halfling Aventureiro)
        else if (/ladino|thief|ladrão|ranger|bardo|bard|assassino|assassin|halfling/.test(className)) {
            if (/ranger/.test(className)) {
                // Ranger: armas específicas + escudo, armaduras leves
                const weapons = ['Adaga', 'Arco Curto', 'Azagaia', 'Besta de Mão', 'Besta', 'Bordão/Cajado', 'Cimitarra', 'Espada Bastarda', 'Espada Curta', 'Espada Longa', 'Funda', 'Lança', 'Maça', 'Machado', 'Martelo', 'Porrete/Clava', 'Alabarda', 'Arco Longo', 'Machado de Batalha', 'Martelo de Batalha', 'Montante', 'Pique', 'Lança Montada'];
                const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
                equipment.push(randomWeapon, 'Adaga', 'Armadura de Couro', 'Escudo', 'Kit de Sobrevivência', 'Kit de Rastreamento');
            } else if (/bardo|bard/.test(className)) {
                // Bardo: armas específicas, armaduras leves, sem escudo
                const weapons = ['Adaga', 'Arco Curto', 'Azagaia', 'Besta de Mão', 'Besta', 'Bordão/Cajado', 'Cimitarra', 'Espada Bastarda', 'Espada Curta', 'Espada Longa', 'Funda', 'Lança', 'Maça', 'Machado', 'Martelo', 'Porrete/Clava'];
                const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
                equipment.push(randomWeapon, 'Adaga', 'Armadura de Couro', 'Instrumento Musical', 'Kit de Entretenimento');
            } else if (/halfling/.test(className)) {
                // Halfling Aventureiro: armas específicas, armaduras leves
                const weapons = ['Adaga', 'Azagaia', 'Funda', 'Lança', 'Bordão/Cajado', 'Porrete/Clava'];
                const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
                equipment.push(randomWeapon, 'Adaga', 'Armadura de Couro', 'Ferramentas de Ladrão', 'Kit de Disfarces');
            } else {
                // Ladino/Assassino padrão: armas específicas, armaduras leves
                const weapons = ['Adaga', 'Arco Curto', 'Azagaia', 'Besta de Mão', 'Besta', 'Bordão/Cajado', 'Cimitarra', 'Espada Bastarda', 'Espada Curta', 'Espada Longa', 'Funda', 'Lança', 'Maça', 'Machado', 'Martelo', 'Porrete/Clava'];
                const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
                equipment.push(randomWeapon, 'Adaga', 'Armadura de Couro', 'Ferramentas de Ladrão', 'Kit de Disfarces');
            }
        }
        
        // MAGO (Ilusionista, Necromante, Bruxo, Elfo Aventureiro)
        else if (/mago|wizard|bruxo|feiticeiro|sorcerer|warlock|necromante|necromancer|ilusionista|illusionist|elfo|elf/.test(className)) {
            if (/bruxo|feiticeiro|sorcerer|warlock/.test(className)) {
                // Bruxo: armas específicas por nível (1º nível)
                const weapons = ['Adaga', 'Azagaia', 'Bordão/Cajado', 'Espada Curta', 'Funda', 'Cimitarra', 'Espada Longa', 'Maça', 'Machado'];
                const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
                equipment.push(randomWeapon, 'Adaga', 'Armadura de Couro', 'Túnica', 'Pergaminhos');
            } else if (/elfo|elf/.test(className)) {
                // Elfo Aventureiro: pode usar todas as armas e armaduras
                const weapons = ['Adaga', 'Alabarda', 'Arco Curto', 'Arco Longo', 'Azagaia', 'Besta de Mão', 'Besta', 'Bordão/Cajado', 'Cimitarra', 'Espada Bastarda', 'Espada Curta', 'Espada Longa', 'Funda', 'Lança', 'Lança Montada', 'Maça', 'Machado', 'Machado de Batalha', 'Mangual', 'Martelo', 'Martelo de Batalha', 'Montante', 'Pique', 'Porrete/Clava'];
                const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
                equipment.push(randomWeapon, 'Adaga', 'Armadura de Couro', 'Escudo', 'Túnica', 'Pergaminhos');
            } else {
                // Mago/Ilusionista/Necromante padrão: armas específicas, sem armadura
                const weapons = ['Adaga', 'Azagaia', 'Bordão/Cajado', 'Espada Curta', 'Funda'];
                const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
                equipment.push(randomWeapon, 'Adaga', 'Túnica', 'Pergaminhos', 'Kit de Alquimia');
            }
        }
        
        // Fallback genérico
        else {
            equipment.push('Espada Longa', 'Adaga', 'Armadura de Couro', 'Escudo', 'Kit de Escalada');
        }
        
        console.log(`CharacterGenerator: Equipamentos fallback para "${characterClass}":`, equipment);
        return equipment;
    }

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
        
        // Classes normais
        if (/mago|bruxo|feiticeiro|wizard|warlock|necromante|ilusionista/.test(n)) return 'wizard';
        if (/clérigo|clerigo|acadêmico|academico/.test(n)) return 'cleric';
        if (/druida|xamã|xama/.test(n)) return 'druid';
        if (/guerreiro|fighter/.test(n)) return 'warrior';
        if (/paladino/.test(n)) return 'paladin';
        if (/bárbaro|barbaro|barbarian/.test(n)) return 'barbarian';
        if (/ladrão|ladrao|ladino|thief/.test(n)) return 'thief';
        if (/bardo|bard/.test(n)) return 'bard';
        if (/ranger/.test(n)) return 'ranger';
        if (/assassino|assassin/.test(n)) return 'assassin';
        return 'warrior';
    }

    getClassRestrictions(className) {
        const n = (className || '').toLowerCase();
        const r = { 
            armor: 'any', 
            shield: true, 
            onlyImpact: false, 
            onlySmall: false, 
            noLarge: false, 
            leatherOnly: false,
            noMetal: false,
            weaponSize: 'any' // 'small', 'medium', 'large', 'any'
        };
        
        // Classes Arcanas (Mago e especializações)
        if (/mago|bruxo|feiticeiro|wizard|warlock|necromante|ilusionista|necromancer|illusionist/.test(n)) { 
            r.armor = 'none'; 
            r.shield = false; 
            r.onlySmall = true; 
            r.weaponSize = 'small';
            
            // Bruxo tem restrições especiais por nível
            if (/bruxo|warlock/.test(n)) {
                r.armor = 'light'; // Pode usar armaduras leves desde o 1º nível
                r.weaponSize = 'medium'; // Pode usar armas médias desde o 1º nível
            }
        }
        // Classes Divinas (Clérigo e especializações)
        else if (/cl[eê]rigo|cleric|druida|druid|acad[eê]mico|academic|xam[aã]|shaman|proscrito|outcast/.test(n)) { 
            r.onlyImpact = true; 
            r.armor = 'any'; 
            r.shield = true; 
            r.weaponSize = 'any';
            
            if (/druida|druid/.test(n)) {
                r.leatherOnly = true;
                r.noLarge = true;
                r.noMetal = true;
                r.weaponSize = 'medium';
            }
            
            if (/xam[aã]|shaman/.test(n)) {
                r.noMetal = true;
            }
            
            if (/acad[eê]mico|academic/.test(n)) {
                r.onlyImpact = true; // Não pode usar cortantes/perfurantes
            }
            
            if (/proscrito|outcast/.test(n)) {
                r.onlyImpact = false; // Proscrito pode usar qualquer arma
            }
        }
        // Classes de Combate (Guerreiro e especializações) - DEVE VIR ANTES das outras
        else if (/guerreiro|fighter|b[aá]rbaro|barbarian|paladino|paladin|arqueiro|archer/.test(n)) { 
            r.armor = 'any'; 
            r.shield = true; 
            r.weaponSize = 'any';
            
            if (/b[aá]rbaro|barbarian/.test(n)) {
                r.armor = 'light';
            }
            
            if (/arqueiro|archer/.test(n)) {
                r.armor = 'light'; // Só couro, outras removem habilidades
            }
        }
        // Classes de Habilidade (Ladrão e especializações)
        else if (/ladr[aã]o|ladino|thief|bardo|bard|assassino|assassin/.test(n)) { 
            r.armor = 'light'; 
            r.shield = false; 
            r.noLarge = true; 
            r.weaponSize = 'medium';
        }
        // Ranger (especialização de Ladrão com algumas diferenças)
        else if (/ranger/.test(n)) { 
            r.armor = 'light'; 
            r.shield = true; 
            r.noLarge = false; 
            r.weaponSize = 'any';
        }
        // Classes específicas de raça (herdam restrições da classe base)
        else if (/aventureiro|adventurer/.test(n)) {
            // Anão Aventureiro - herda de Clérigo
            if (/an[aã]o|dwarf/.test(n)) {
                r.onlyImpact = true;
                r.armor = 'any';
                r.shield = true;
                r.weaponSize = 'any';
            }
            // Elfo Aventureiro - herda de Ladrão mas pode usar qualquer arma/armadura
            else if (/elfo|elf/.test(n)) {
                r.armor = 'any';
                r.shield = true;
                r.weaponSize = 'any';
            }
            // Halfling Aventureiro - herda de Ladrão
            else if (/halfling/.test(n)) {
                r.armor = 'light';
                r.shield = false;
                r.noLarge = true;
                r.weaponSize = 'medium';
            }
        }
        
        return r;
    }


    /**
     * Calcula pontos de vida baseado na classe e constituição
     */
    calculateHitPoints(characterClass, constitution) {
        const archetype = this.mapClassToArchetype(characterClass);
        const hitDie = { warrior: 10, cleric: 8, thief: 6, wizard: 4 };
        const die = hitDie[archetype] || 6;
        const modifier = this.calculateModifiers({ constitution }).constitution;
        // Para o primeiro nível, usa o valor máximo do dado + modificador
        return Math.max(1, die + modifier);
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
     * Calcula Bases de Ataque (BAC e BAD) conforme fórmulas do Old Dragon 2e
     * BAC = BASE DE ATAQUE + MOD. FOR + OUTROS
     * BAD = BASE DE ATAQUE + MOD. DES + OUTROS
     */
    calculateBaseAttack(characterClass, level, attributes) {
        const archetype = this.mapClassToArchetype(characterClass);
        
        // Tabela base de ataque por classe e nível
        const baseAttackTable = {
            warrior: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            cleric: [1, 1, 1, 3, 3, 3, 5, 5, 5, 7],
            thief: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
            wizard: [0, 1, 1, 1, 2, 2, 2, 3, 3, 3]
        };
        
        const baseAttack = (baseAttackTable[archetype] || baseAttackTable.warrior)[level - 1] ?? 1;
        
        // Calcula modificadores de atributos
        const modifiers = this.calculateModifiers(attributes);
        
        // BAC = Base de Ataque + Modificador de Força
        const bac = baseAttack + modifiers.strength;
        
        // BAD = Base de Ataque + Modificador de Destreza
        const bad = baseAttack + modifiers.dexterity;
        
        
        return {
            base: baseAttack,
            bac: bac,
            bad: bad,
            modifiers: {
                strength: modifiers.strength,
                dexterity: modifiers.dexterity
            }
        };
    }

    /**
     * Calcula Jogadas de Proteção baseadas apenas na classe e nível
     */
    calculateSavingThrows(characterClass, level) {
        const archetype = this.mapClassToArchetype(characterClass);
        const baseTable = {
            warrior: [5, 5, 6, 6, 8, 8, 10, 10, 11, 11],
            cleric: [5, 5, 5, 7, 7, 7, 9, 9, 9, 11],
            thief: [5, 5, 5, 5, 8, 8, 8, 8, 11, 11],
            wizard: [5, 5, 5, 5, 7, 7, 7, 7, 7, 10]
        };
        const value = (baseTable[archetype] || baseTable.warrior)[level - 1] || 5;
        let JPD = value;
        let JPC = value;
        let JPS = value;
        if (archetype === 'cleric') JPS = value - 2;
        if (archetype === 'thief') { JPD = value - 2; JPS = value - 2; }
        if (archetype === 'wizard') JPS = value - 2;
        return { JPD, JPC, JPS };
    }


    /**
     * Calcula movimento baseado na raça
     */
    calculateMovement(race) {
        // Se race é um objeto (documento do SRD), usa o nome
        const raceName = typeof race === 'object' ? race.name : race;
        
        const movement = {
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

        return movement[raceName] || 9;
    }

    /**
     * Calcula idiomas conhecidos baseado na inteligência e raça
     * Conforme regras oficiais do Old Dragon 2e:
     * - 2 idiomas iniciais (normalmente da raça ou local de origem)
     * - Idiomas adicionais baseados no modificador de Inteligência
     * - Capacidade de ler/escrever baseada na Inteligência
     */
    calculateLanguages(intelligence, race) {
        // Se race é um objeto (documento do SRD), usa o nome
        const raceName = typeof race === 'object' ? race.name : race;
        
        // Regras de idiomas baseadas em Inteligência
        let totalLanguages = 2; // Base: 2 idiomas iniciais
        
        // Adiciona idiomas baseados no modificador de Inteligência
        const intModifier = this.calculateModifiers({ intelligence }).intelligence;
        if (intModifier > 0) {
            totalLanguages += intModifier;
        }
        
        // Regras especiais para Inteligência muito baixa
        if (intelligence <= 3) {
            totalLanguages = 0; // Não consegue falar nenhum idioma
        } else if (intelligence >= 4 && intelligence <= 8) {
            totalLanguages = Math.max(1, totalLanguages); // Mínimo 1 idioma falado
        }
        
        // Idiomas disponíveis no Old Dragon 2e
        const availableLanguages = [
            'Comum', 'Élfico', 'Anão', 'Halfling', 'Gnomo', 
            'Gigante', 'Dragão', 'Abissal', 'Infernal', 'Celestial',
            'Druídico', 'Thieves\' Cant', 'Dracônico', 'Primordial'
        ];
        
        // Idiomas base por raça (normalmente os idiomas da raça ou local de origem)
        // Humanos sempre têm acesso ao Comum, outras raças só se tiverem Inteligência suficiente
        const raceLanguages = {
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
        
        // Começa com idiomas da raça
        const raceKey = raceName.toLowerCase();
        const raceSpecificLanguages = raceLanguages[raceKey];
        
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
            const availableForRandom = availableLanguages.filter(lang => !knownLanguages.includes(lang));
            if (availableForRandom.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableForRandom.length);
                knownLanguages.push(availableForRandom[randomIndex]);
            } else {
                break; // Não há mais idiomas disponíveis
            }
        }
        
        // Se ainda tem slots disponíveis para idiomas adicionais (por modificador de Inteligência)
        const remainingSlots = totalLanguages - knownLanguages.length;
        if (remainingSlots > 0) {
            const availableForRandom = availableLanguages.filter(lang => !knownLanguages.includes(lang));
            
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
     * Gera histórico aleatório usando templates da SRD
     */
    generateBackground(characterRace = 'Humano', characterClass = 'Guerreiro') {
        const roll = () => Math.floor(Math.random() * 6);
        
        // Seleciona um template aleatório
        const templateIndex = roll();
        let template = this.backgroundTemplates[templateIndex];
        
        // Preenche as lacunas do template
        const place = this.background.place[roll()];
        const motive = this.background.motive[roll()];
        const family = this.background.family[roll()];
        const tragedy = this.background.tragedy[roll()];
        
        // Substitui as lacunas no template
        template = template.replace(/\[LUGAR\]/g, place);
        template = template.replace(/\[MOTIVO\]/g, motive);
        template = template.replace(/\[FAMÍLIA\]/g, family);
        template = template.replace(/\[TRAGÉDIA\]/g, tragedy);
        template = template.replace(/\[CLASSE\]/g, characterClass);
        template = template.replace(/\[SUA RAÇA\]/g, characterRace.toLowerCase());
        
        // Para o template 5, precisa de outra raça
        if (templateIndex === 4) {
            const otherRaces = ['humano', 'elfo', 'anão', 'halfling', 'gnomo', 'meio-elfo'];
            const filteredRaces = otherRaces.filter(race => race !== characterRace.toLowerCase());
            const otherRace = filteredRaces[Math.floor(Math.random() * filteredRaces.length)];
            template = template.replace(/\[OUTRA RAÇA\]/g, otherRace);
        }

        return { 
            template: templateIndex + 1,
            text: template,
            place, 
            motive, 
            family, 
            tragedy 
        };
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
        

        return {
            name: '', // Será preenchido depois com dados do SRD
            race: '', // Será preenchido depois com dados do SRD
            class: '', // Será preenchido depois com dados do SRD
            attributes,
            modifiers,
            equipment: [], // Será preenchido depois com dados do SRD
            hitPoints: 0, // Será calculado depois com dados do SRD
            armorClass: 0, // Será calculado depois com dados do SRD
            baseAttack: 0, // Será calculado depois com dados do SRD
            savingThrows: {}, // Será calculado depois com dados do SRD
            movement: 0, // Será calculado depois com dados do SRD
            languages: { count: 0, languages: [] }, // Será calculado depois com dados do SRD
            alignment: this.generateAlignment(),
            appearance: this.generateAppearance(),
            personality: this.generatePersonality(),
            background: this.generateBackground('Humano', 'Guerreiro'),
            level: 1,
            experience: 0,
            initialSpells: [] // Será preenchido depois com dados do SRD
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
                    jp: characterData.savingThrows.base?.JPD || characterData.savingThrows.JPD, // Base da classe
                    jpd_race_bonus: characterData.savingThrows.raceBonus?.JPD || 0,
                    jpc_race_bonus: characterData.savingThrows.raceBonus?.JPC || 0,
                    jps_race_bonus: characterData.savingThrows.raceBonus?.JPS || 0,
                    jpd_mod: characterData.savingThrows.modifiers?.JPD || characterData.modifiers.dexterity,
                    jpc_mod: characterData.savingThrows.modifiers?.JPC || characterData.modifiers.constitution,
                    jps_mod: characterData.savingThrows.modifiers?.JPS || characterData.modifiers.wisdom,
                    
                    // Combate
                    ca: characterData.armorClass,
                    bac: characterData.baseAttack.bac,
                    bad: characterData.baseAttack.bad,
                    
                    // Vida e Movimento
                    hp: {
                        value: characterData.hitPoints,
                        max: characterData.hitPoints
                    },
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
                        canReadWrite: characterData.languages?.canReadWrite || false,
                        reputation: 0,
                        appearance: characterData.appearance
                            ? `${characterData.appearance.body}; ${characterData.appearance.hair}; ${characterData.appearance.general}`
                            : '',
                        personality: characterData.personality
                            ? `${characterData.personality.self}; ${characterData.personality.others}; ${characterData.personality.world}`
                            : '',
                        background: characterData.background
                            ? characterData.background.text
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
                
                // Mapeia classe -> escola de magia
                let school = null;
                if (/mago|bruxo|feiticeiro|sorcerer|wizard|warlock/.test(className)) school = 'arcane';
                else if (/clérigo|clerigo|cleric|druida|xam[aã]|acad[eê]mico/.test(className)) school = 'divine';
                else if (/necromante|necromancer/.test(className)) school = 'necromancer';
                else if (/ilusionista|illusionist/.test(className)) school = 'illusionist';
                
                
                // Para classes arcanas (Mago e especializações), não importa magias do SRD
                // pois elas já são adicionadas via generateInitialSpells
                if (/mago|bruxo|feiticeiro|sorcerer|wizard|warlock|necromante|necromancer|ilusionista|illusionist/.test(className)) {
                    school = null;
                }

                if (school) {
                    const maxCircle = Math.max(1, Math.ceil(level / 2));

                    let spellPack = game.packs.get('olddragon2e.spells');
                    if (!spellPack) {
                        spellPack = Array.from(game.packs).find(p => {
                            const key = `${p.metadata.package}.${p.metadata.name}`.toLowerCase();
                            const label = (p.metadata.label || '').toLowerCase();
                            return p.documentName === 'Item' && (key.includes('spells') || label.includes('magia'));
                        });
                    }

                    if (spellPack) {
                        const allSpells = await spellPack.getDocuments();
                        
                        const toCreate = [];
                        const existing = new Set(actor.items.filter(i => i.type === 'spell').map(i => i.name));
                        
                        let processedCount = 0;
                        let validCount = 0;
                        
                        for (const s of allSpells) {
                            if (s.type !== 'spell') continue;
                            processedCount++;
                            
                            const system = s.system || {};
                            const schoolValue = system[school];
                            const v = parseInt(schoolValue) || 0;
                            
                            // Verifica se a magia tem valor válido para a escola e está dentro do círculo máximo
                            if (schoolValue && schoolValue !== "null" && v > 0 && v <= maxCircle) {
                                validCount++;
                                if (existing.has(s.name)) {
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
                                        continue;
                                    }
                                }
                                
                                const obj = s.toObject();
                                delete obj._id;
                                toCreate.push(obj);
                                existing.add(s.name);
                            }
                        }
                        
                        
                        if (toCreate.length) {
                            await actor.createEmbeddedDocuments('Item', toCreate);
                        } else {
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
                    }
                } catch (error) {
                    console.error('Erro ao adicionar magias iniciais:', error);
                }
            }

            // Adiciona equipamento na descrição (texto)
            await actor.update({
                'description.value': `<h3>Equipamento Inicial</h3><ul>${characterData.equipment.map(item => `<li>${item}</li>`).join('')}</ul>`
            });


            return actor;
        } catch (error) {
            console.error('Erro ao criar personagem:', error);
            throw error;
        }
    }


    /**
     * Carrega todas as raças disponíveis do compêndio SRD
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
     * Carrega todas as classes disponíveis do compêndio SRD
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
     * Filtra classes disponíveis baseado na raça selecionada
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
            const normalizedClassName = className.normalize('NFD').replace(/\p{Diacritic}/gu, '');
            
            // Classes específicas de raça - só aparecem para a raça correspondente
            if (normalizedClassName.includes('anao aventureiro') && (raceName.includes('anão') || raceName.includes('anao') || raceName.includes('dwarf'))) return true;
            if (normalizedClassName.includes('elfo aventureiro') && (raceName.includes('elfo') || raceName.includes('elf'))) return true;
            if (normalizedClassName.includes('halfling aventureiro') && raceName.includes('halfling')) return true;
            
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
        
        
        return filteredClasses;
    }

    /**
     * Atualiza o personagem quando raça ou classe são alteradas
     */
    async updateCharacterFromSelection(character, selectedRace, selectedClass) {
        if (selectedRace) {
            character.race = selectedRace.name;
            character.raceId = selectedRace.id;
            character.raceUUID = selectedRace.uuid;
            character.raceData = selectedRace.system;
            character.name = this.generateRaceName(selectedRace.id);
        }
        
        if (selectedClass) {
            character.class = selectedClass.name;
            character.classId = selectedClass.id;
            character.classUUID = selectedClass.uuid;
            character.classData = selectedClass.system;

            // Ajusta equipamento para respeitar restrições da classe selecionada
            const baseEquip = await this.generateEquipment(selectedClass.name);
            character.equipment = baseEquip;
            
            // Gera magias iniciais apenas para classes arcanas (Mago e especializações)
            const isArcaneClass = /mago|bruxo|feiticeiro|wizard|warlock|necromante|ilusionista|necromancer|illusionist/i.test(selectedClass.name);
            const isDivineClass = /clérigo|cleric|druida|druid|acadêmico|academic|xamã|shaman|proscrito|outcast/i.test(selectedClass.name);
            const isSkillClassWithMagic = /bardo|bard/i.test(selectedClass.name);
            
            if (isArcaneClass || isSkillClassWithMagic) {
                character.initialSpells = await this.generateInitialSpells(selectedClass.name);
            }
        }

        // Recalcula valores que dependem de raça e classe
        if (selectedRace && selectedClass) {
            character.hitPoints = this.calculateHitPoints(this.mapClassToArchetype(selectedClass.name), character.attributes.constitution);
            character.armorClass = this.calculateArmorClass(character.attributes.dexterity, character.equipment);
            character.baseAttack = this.calculateBaseAttack(selectedClass.name, character.level, character.attributes);
            character.movement = this.calculateMovement(selectedRace);
            character.languages = this.calculateLanguages(character.attributes.intelligence, selectedRace);
            
            // Atualiza o background com a raça e classe corretas
            character.background = this.generateBackground(selectedRace.name, selectedClass.name);
        }
        // Se apenas a classe foi alterada, recalcula valores dependentes da classe
        else if (selectedClass && !selectedRace) {
            const archetype = this.mapClassToArchetype(selectedClass.name);
            
            character.hitPoints = this.calculateHitPoints(archetype, character.attributes.constitution);
            character.armorClass = this.calculateArmorClass(character.attributes.dexterity, character.equipment);
            
            character.baseAttack = this.calculateBaseAttack(selectedClass.name, character.level, character.attributes);
            
            // Atualiza o background com a nova classe (mantém a raça atual)
            character.background = this.generateBackground(character.race, selectedClass.name);
        }

        return character;
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
            
            
            const randomClass = classes[Math.floor(Math.random() * classes.length)];
            return randomClass;
        } catch (error) {
            console.error('Erro ao carregar classe:', error);
            return null;
        }
    }

    /**
     * Re-rola apenas os atributos do personagem atual
     */
    async rerollAttributes(dialog, html) {
        try {
            // Mostra indicador de carregamento no botão
            const rerollBtn = html.find('#reroll-attributes');
            const originalContent = rerollBtn.html();
            rerollBtn.html('<i class="fas fa-spinner fa-spin"></i>');
            rerollBtn.prop('disabled', true);

            // Gera novos atributos
            const newAttributes = this.generateAttributes();
            const newModifiers = this.calculateModifiers(newAttributes);
            
            // Atualiza o personagem atual
            dialog.currentCharacter.attributes = newAttributes;
            dialog.currentCharacter.modifiers = newModifiers;
            
            // Recalcula valores que dependem dos atributos
            if (dialog.currentCharacter.race && dialog.currentCharacter.class) {
                dialog.currentCharacter.hitPoints = this.calculateHitPoints(
                    this.mapClassToArchetype(dialog.currentCharacter.class), 
                    newAttributes.constitution
                );
                dialog.currentCharacter.armorClass = this.calculateArmorClass(
                    newAttributes.dexterity, 
                    dialog.currentCharacter.equipment
                );
                dialog.currentCharacter.baseAttack = this.calculateBaseAttack(
                    dialog.currentCharacter.class, 
                    dialog.currentCharacter.level, 
                    newAttributes
                );
                dialog.currentCharacter.languages = this.calculateLanguages(
                    newAttributes.intelligence, 
                    dialog.currentCharacter.race
                );
            }

            // Atualiza apenas os atributos no HTML
            this.updateAttributesInModal(html, dialog.currentCharacter);
            
            // Atualiza informações básicas que dependem dos atributos
            this.updateBasicInfoInModal(html, dialog.currentCharacter);

            // Restaura o botão
            rerollBtn.html(originalContent);
            rerollBtn.prop('disabled', false);

        } catch (error) {
            console.error('Erro ao re-rolar atributos:', error);
            ui.notifications.error('Erro ao re-rolar atributos: ' + error.message);
            
            // Restaura o botão mesmo em caso de erro
            const rerollBtn = html.find('#reroll-attributes');
            rerollBtn.html('<i class="fas fa-redo"></i>');
            rerollBtn.prop('disabled', false);
        }
    }

    /**
     * Atualiza apenas os atributos no modal
     */
    updateAttributesInModal(html, character) {
        const attributeItems = html.find('.attribute-item');
        this.attributes.forEach((attr, index) => {
            const attributeItem = attributeItems.eq(index);
            attributeItem.find('.attribute-value').text(character.attributes[attr]);
            const modifier = character.modifiers[attr];
            attributeItem.find('.attribute-modifier').text(modifier >= 0 ? `+${modifier}` : modifier);
        });
    }

    /**
     * Atualiza informações básicas que dependem dos atributos
     */
    updateBasicInfoInModal(html, character) {
        const infoItems = html.find('.info-item');
        
        // Atualiza PV
        infoItems.eq(4).find('span').text(character.hitPoints);
        
        // Atualiza CA
        infoItems.eq(5).find('span').text(character.armorClass);
        
        // Atualiza BAC e BAD
        let bacUpdated = false;
        const bacBadElement = infoItems.filter((index, element) => {
            return $(element).text().includes('BAC:');
        });
        
        if (bacBadElement.length > 0) {
            const spanElement = bacBadElement.find('span');
            if (spanElement.length > 0) {
                spanElement.html(`${character.baseAttack.bac} <strong>BAD:</strong> ${character.baseAttack.bad}`);
                bacUpdated = true;
            }
        }
        
        if (!bacUpdated) {
            const bacElement = infoItems.eq(6);
            if (bacElement.length > 0) {
                const spanElement = bacElement.find('span');
                if (spanElement.length > 0) {
                    spanElement.html(`${character.baseAttack.bac} <strong>BAD:</strong> ${character.baseAttack.bad}`);
                }
            }
        }
        
        // Atualiza idiomas
        const languageText = character.languages.languages.join(', ');
        const readWriteText = character.languages.canReadWrite ? ' (Lê/Escreve)' : ' (Apenas fala)';
        infoItems.eq(8).find('span').text(languageText + readWriteText);
    }

    /**
     * Re-rola apenas os detalhes do personagem atual (aparência, personalidade, histórico)
     */
    async rerollDetails(dialog, html) {
        try {
            // Mostra indicador de carregamento no botão
            const rerollBtn = html.find('#reroll-details');
            const originalContent = rerollBtn.html();
            rerollBtn.html('<i class="fas fa-spinner fa-spin"></i>');
            rerollBtn.prop('disabled', true);

            // Gera novos detalhes
            const newAppearance = this.generateAppearance();
            const newPersonality = this.generatePersonality();
            const newBackground = this.generateBackground(dialog.currentCharacter.race, dialog.currentCharacter.class);
            
            // Atualiza o personagem atual
            dialog.currentCharacter.appearance = newAppearance;
            dialog.currentCharacter.personality = newPersonality;
            dialog.currentCharacter.background = newBackground;

            // Atualiza apenas os detalhes no HTML
            this.updateDetailsInModal(html, dialog.currentCharacter);

            // Restaura o botão
            rerollBtn.html(originalContent);
            rerollBtn.prop('disabled', false);

        } catch (error) {
            console.error('Erro ao re-rolar detalhes:', error);
            ui.notifications.error('Erro ao re-rolar detalhes: ' + error.message);
            
            // Restaura o botão mesmo em caso de erro
            const rerollBtn = html.find('#reroll-details');
            rerollBtn.html('<i class="fas fa-dice"></i>');
            rerollBtn.prop('disabled', false);
        }
    }

    /**
     * Atualiza apenas os detalhes no modal
     */
    updateDetailsInModal(html, character) {
        // Atualiza aparência
        html.find('.detail-section').eq(0).find('p').text(
            `${character.appearance.body}, ${character.appearance.hair}, ${character.appearance.general}`
        );
        
        // Atualiza personalidade
        html.find('.detail-section').eq(1).find('p').text(
            `${character.personality.self}, ${character.personality.others}, ${character.personality.world}`
        );
        
        // Atualiza histórico
        html.find('.detail-section').eq(2).find('p').text(
            character.background.text
        );
    }

    /**
     * Re-rola apenas o equipamento do personagem atual respeitando restrições da classe
     */
    async rerollEquipment(dialog, html) {
        try {
            // Mostra indicador de carregamento no botão
            const rerollBtn = html.find('#reroll-equipment');
            const originalContent = rerollBtn.html();
            rerollBtn.html('<i class="fas fa-spinner fa-spin"></i>');
            rerollBtn.prop('disabled', true);

            // Preserva a posição da rolagem de forma mais robusta
            const windowContent = html.find('.window-content');
            const scrollTop = windowContent.length > 0 ? windowContent.scrollTop() : 0;
            
            // Também preserva a posição relativa ao equipamento
            const equipmentSection = html.find('.equipment-section');
            const equipmentOffset = equipmentSection.length > 0 ? equipmentSection.offset() : null;
            const relativeScrollPosition = equipmentOffset ? scrollTop - equipmentOffset.top : 0;

            // Gera novo equipamento respeitando a classe atual
            const characterClass = dialog.currentCharacter.class;
            const newEquipment = await this.generateEquipment(characterClass);
            
            // Atualiza o personagem atual
            dialog.currentCharacter.equipment = newEquipment;

            // Recalcula valores que dependem do equipamento
            dialog.currentCharacter.armorClass = this.calculateArmorClass(
                dialog.currentCharacter.attributes.dexterity, 
                newEquipment
            );

            // Atualiza apenas o equipamento no HTML
            await this.updateEquipmentInModal(html, dialog.currentCharacter);
            
            // Atualiza informações básicas que dependem do equipamento
            this.updateBasicInfoInModal(html, dialog.currentCharacter);

            // Restaura a posição da rolagem de forma mais robusta
            setTimeout(() => {
                if (windowContent.length > 0) {
                    // Primeira tentativa: restaura posição absoluta
                    windowContent.scrollTop(scrollTop);
                    
                    // Segunda tentativa: restaura posição relativa ao equipamento
                    setTimeout(() => {
                        const newEquipmentSection = html.find('.equipment-section');
                        if (newEquipmentSection.length > 0 && equipmentOffset) {
                            const newEquipmentOffset = newEquipmentSection.offset();
                            if (newEquipmentOffset) {
                                const targetScrollTop = newEquipmentOffset.top + relativeScrollPosition;
                                windowContent.scrollTop(targetScrollTop);
                            }
                        }
                    }, 100);
                }
            }, 50);

            // Restaura o botão
            rerollBtn.html(originalContent);
            rerollBtn.prop('disabled', false);

        } catch (error) {
            console.error('Erro ao re-rolar equipamento:', error);
            ui.notifications.error('Erro ao re-rolar equipamento: ' + error.message);
            
            // Restaura o botão mesmo em caso de erro
            const rerollBtn = html.find('#reroll-equipment');
            rerollBtn.html('<i class="fas fa-sack"></i>');
            rerollBtn.prop('disabled', false);
        }
    }

    /**
     * Preserva a posição da rolagem usando múltiplos seletores
     */
    preserveScrollPosition(html) {
        const positions = {};
        
        // Tenta diferentes seletores para encontrar o container de rolagem
        const selectors = [
            '.window-app .window-content',
            '.window-app',
            '.dialog .window-content',
            '.dialog',
            'body'
        ];
        
        selectors.forEach(selector => {
            const element = html.find(selector);
            if (element.length > 0) {
                positions[selector] = element.scrollTop();
            }
        });
        
        return positions;
    }

    /**
     * Restaura a posição da rolagem
     */
    restoreScrollPosition(html, positions) {
        // Aguarda múltiplos frames para garantir que o DOM foi completamente atualizado
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                Object.entries(positions).forEach(([selector, scrollTop]) => {
                    const element = html.find(selector);
                    if (element.length > 0) {
                        element.scrollTop(scrollTop);
                        
                        // Força uma segunda tentativa após um pequeno delay para garantir
                        setTimeout(() => {
                            element.scrollTop(scrollTop);
                        }, 50);
                    }
                });
            });
        });
    }

    /**
     * Atualiza apenas o equipamento no modal
     */
    async updateEquipmentInModal(html, character) {
        const equipmentItems = html.find('.equipment-items');
        
        // Preserva a altura atual para evitar mudanças na rolagem
        const currentHeight = equipmentItems.height();
        
        // Limpa e recria o conteúdo sem animação para evitar problemas de rolagem
        equipmentItems.empty();
        
        // Adiciona os novos itens de equipamento
        character.equipment.forEach(item => {
            const itemHtml = `
                <div class="equipment-item">
                    <div class="equipment-name">${item}</div>
                    <div class="equipment-description">Carregando descrição...</div>
                </div>
            `;
            equipmentItems.append(itemHtml);
        });
        
        // Carrega descrições de forma assíncrona sem limpar o container
        await this.loadEquipmentDescriptionsWithoutClearing(character.equipment, equipmentItems);
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
            
            // Carrega todas as raças e classes disponíveis
            const allRaces = await this.loadAllRaces();
            const allClasses = await this.loadAllClasses();
            
            // Seleciona raça e classe aleatórias
            const selectedRace = allRaces.length > 0 ? allRaces[Math.floor(Math.random() * allRaces.length)] : null;
            const availableClasses = selectedRace ? this.filterClassesByRace(allClasses, selectedRace.id) : allClasses;
            const selectedClass = availableClasses.length > 0 ? availableClasses[Math.floor(Math.random() * availableClasses.length)] : null;
            
            // Atualiza o personagem com as seleções
            await this.updateCharacterFromSelection(character, selectedRace, selectedClass);

            // Atualiza a referência do personagem no dialog
            dialog.currentCharacter = character;
            dialog.allRaces = allRaces;
            dialog.allClasses = allClasses;

            // Atualiza os dropdowns
            const raceSelect = html.find('#race-select');
            const classSelect = html.find('#class-select');
            
            // Atualiza dropdown de raças
            raceSelect.val(selectedRace ? selectedRace.id : '');
            
            // Atualiza dropdown de classes
            classSelect.empty();
            availableClasses.forEach(cls => {
                classSelect.append(`<option value="${cls.id}" ${selectedClass && selectedClass.id === cls.id ? 'selected' : ''}>${cls.name}</option>`);
            });

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
        
        // Atualiza informações básicas - usando seletores mais específicos
        const infoItems = html.find('.info-item');
        
        
        // Atualiza cada informação básica na ordem correta
        infoItems.eq(0).find('span').text(character.name);
        // Os dropdowns de raça e classe são atualizados pelos event listeners
        infoItems.eq(3).find('span').text(character.level);
        infoItems.eq(4).find('span').text(character.hitPoints);
        infoItems.eq(5).find('span').text(character.armorClass);
        
        // Atualiza BAC e BAD - usando seletor mais robusto
        let bacUpdated = false;
        
        // Tenta encontrar por texto "BAC:"
        const bacBadElement = infoItems.filter((index, element) => {
            return $(element).text().includes('BAC:');
        });
        
        if (bacBadElement.length > 0) {
            const spanElement = bacBadElement.find('span');
            if (spanElement.length > 0) {
                spanElement.html(`${character.baseAttack.bac} <strong>BAD:</strong> ${character.baseAttack.bad}`);
                bacUpdated = true;
            }
        }
        
        // Se não funcionou, usa o índice 6
        if (!bacUpdated) {
            const bacElement = infoItems.eq(6);
            if (bacElement.length > 0) {
                const spanElement = bacElement.find('span');
                if (spanElement.length > 0) {
                    spanElement.html(`${character.baseAttack.bac} <strong>BAD:</strong> ${character.baseAttack.bad}`);
                    bacUpdated = true;
                }
            }
        }
        
        // Se ainda não funcionou, força a atualização usando todos os elementos
        if (!bacUpdated) {
            infoItems.each((index, element) => {
                const $element = $(element);
                if ($element.text().includes('BAC:')) {
                    const span = $element.find('span');
                    if (span.length > 0) {
                        span.html(`${character.baseAttack.bac} <strong>BAD:</strong> ${character.baseAttack.bad}`);
                        bacUpdated = true;
                    }
                }
            });
        }
        
        
        
        infoItems.eq(7).find('span').text(`${character.movement}m`);
        const languageText = character.languages.languages.join(', ');
        const readWriteText = character.languages.canReadWrite ? ' (Lê/Escreve)' : ' (Apenas fala)';
        infoItems.eq(8).find('span').text(languageText + readWriteText);
        infoItems.eq(9).find('span').text(character.alignment);
        

        // Atualiza atributos - usando os seletores corretos baseados no HTML atual
        const attributeItems = html.find('.attribute-item');
        this.attributes.forEach((attr, index) => {
            const attributeItem = attributeItems.eq(index);
            attributeItem.find('.attribute-value').text(character.attributes[attr]);
            const modifier = character.modifiers[attr];
            attributeItem.find('.attribute-modifier').text(modifier >= 0 ? `+${modifier}` : modifier);
        });

        // Atualiza equipamento com descrições do SRD
        const equipmentItems = html.find('.equipment-items');
        equipmentItems.empty();
        
        // Carrega descrições de forma assíncrona
        this.loadEquipmentDescriptions(character.equipment, equipmentItems);



        // Atualiza detalhes do personagem
        html.find('.detail-section').eq(0).find('p').text(
            `${character.appearance.body}, ${character.appearance.hair}, ${character.appearance.general}`
        );
        html.find('.detail-section').eq(1).find('p').text(
            `${character.personality.self}, ${character.personality.others}, ${character.personality.world}`
        );
        html.find('.detail-section').eq(2).find('p').text(
            character.background.text
        );
    }

    /**
     * Mostra o modal de geração de personagem
     */
    async showGeneratorModal() {
        const character = await this.generateCharacter();
        
        // Carrega todas as raças e classes disponíveis
        const allRaces = await this.loadAllRaces();
        const allClasses = await this.loadAllClasses();
        
        
        // Seleciona raça e classe aleatórias iniciais
        const selectedRace = allRaces.length > 0 ? allRaces[Math.floor(Math.random() * allRaces.length)] : null;
        const availableClasses = selectedRace ? this.filterClassesByRace(allClasses, selectedRace.id) : allClasses;
        const selectedClass = availableClasses.length > 0 ? availableClasses[Math.floor(Math.random() * availableClasses.length)] : null;
        
        // Atualiza o personagem com as seleções iniciais
        await this.updateCharacterFromSelection(character, selectedRace, selectedClass);
        
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
                        <!-- Primeira linha: Informações Básicas e Atributos lado a lado -->
                        <div class="top-row">
                            <div class="character-basic-info">
                                <h4><i class="fas fa-info-circle"></i> Informações Básicas</h4>
                                <div class="info-grid">
                                    <div class="info-item">
                                        <strong>Nome:</strong> 
                                        <span>${character.name}</span>
                                    </div>
                                    <div class="info-item selection-item">
                                        <strong>Raça:</strong> 
                                        <select id="race-select" class="inline-select race-select">
                                            ${allRaces.map(race => `<option value="${race.id}" ${selectedRace && selectedRace.id === race.id ? 'selected' : ''}>${race.name}</option>`).join('')}
                                        </select>
                                    </div>
                                    <div class="info-item selection-item">
                                        <strong>Classe:</strong> 
                                        <select id="class-select" class="inline-select class-select">
                                            ${availableClasses.map(cls => `<option value="${cls.id}" ${selectedClass && selectedClass.id === cls.id ? 'selected' : ''}>${cls.name}</option>`).join('')}
                                        </select>
                                    </div>
                                    <div class="info-item">
                                        <strong>Nível:</strong> 
                                        <span>${character.level}</span>
                                    </div>
                                    <div class="info-item">
                                        <strong>PV:</strong> 
                                        <span>${character.hitPoints}</span>
                                    </div>
                                    <div class="info-item">
                                        <strong>CA:</strong> 
                                        <span>${character.armorClass}</span>
                                    </div>
                                    <div class="info-item">
                                        <strong>BAC:</strong> 
                                        <span>${character.baseAttack.bac} <strong>BAD:</strong> ${character.baseAttack.bad}</span>
                                    </div>
                                    <div class="info-item">
                                        <strong>MV:</strong> 
                                        <span>${character.movement}m</span>
                                    </div>
                                    <div class="info-item">
                                        <strong>Idiomas:</strong> 
                                        <span>${character.languages.languages.join(', ')} ${character.languages.canReadWrite ? '(Lê/Escreve)' : '(Apenas fala)'}</span>
                                    </div>
                                    <div class="info-item">
                                        <strong>Alinhamento:</strong> 
                                        <span>${character.alignment}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="attributes-grid">
                                <h4><i class="fas fa-dice btn-reroll-attributes" id="reroll-attributes" title="Clique para re-rolar todos os atributos"></i> Atributos</h4>
                                ${this.attributes.map(attr => `
                                    <div class="attribute-item">
                                        <div class="attribute-name">${this.attributeNames[attr]}</div>
                                        <div class="attribute-value">${character.attributes[attr]}</div>
                                        <div class="attribute-modifier">${character.modifiers[attr] >= 0 ? '+' : ''}${character.modifiers[attr]}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Segunda linha: Detalhes -->
                        <div class="bottom-row">
                            <div class="character-details">
                                <h4><i class="fas fa-user btn-reroll-details" id="reroll-details" title="Clique para re-rolar aparência, personalidade e histórico"></i> Detalhes</h4>
                                
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
                                    <p>${character.background.text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                            
                    <div class="equipment-section">
                    <div class="equipment-list">
                        <h4><i class="fas fa-sack btn-reroll-equipment" id="reroll-equipment" title="Clique para re-rolar equipamento respeitando restrições da classe"></i> Equipamento</h4>
                            <div class="equipment-items">
                                ${character.equipment.map(item => `
                                    <div class="equipment-item">
                                        <div class="equipment-name">${item}</div>
                                        <div class="equipment-description">Carregando descrição...</div>
                                    </div>
                                `).join('')}
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
                dialog.allRaces = allRaces;
                dialog.allClasses = allClasses;
                
                // Event listener para mudança de raça
                html.find('#race-select').change(async (event) => {
                    const selectedRaceId = event.target.value;
                    const selectedRace = allRaces.find(race => race.id === selectedRaceId);
                    
                    if (selectedRace) {
                        // Filtra classes disponíveis para a raça selecionada
                        const availableClasses = this.filterClassesByRace(allClasses, selectedRace.id);
                        
                        // Atualiza o dropdown de classes com as classes filtradas
                        const classSelect = html.find('#class-select');
                        const currentClassId = classSelect.val();
                        const currentClass = allClasses.find(cls => cls.id === currentClassId);
                        
                        // Verifica se a classe atual ainda está disponível para a nova raça
                        const isCurrentClassAvailable = availableClasses.some(cls => cls.id === currentClassId);
                        
                        // Limpa e repopula o dropdown
                        classSelect.empty();
                        availableClasses.forEach(cls => {
                            classSelect.append(`<option value="${cls.id}">${cls.name}</option>`);
                        });
                        
                        // Mantém a classe atual se ela ainda estiver disponível, senão seleciona a primeira disponível
                        if (isCurrentClassAvailable && currentClass) {
                            classSelect.val(currentClassId);
                        } else if (availableClasses.length > 0) {
                            classSelect.val(availableClasses[0].id);
                        }
                        
                        // Atualiza o personagem com a raça e classe selecionadas
                        const selectedClassId = classSelect.val();
                        const selectedClass = allClasses.find(cls => cls.id === selectedClassId);
                        await this.updateCharacterFromSelection(dialog.currentCharacter, selectedRace, selectedClass);
                        this.updateModalHTML(html, dialog.currentCharacter);
                    }
                });
                
                // Event listener para mudança de classe
                html.find('#class-select').change(async (event) => {
                    const selectedClassId = event.target.value;
                    const selectedClass = allClasses.find(cls => cls.id === selectedClassId);
                    
                    
                    if (selectedClass) {
                        // Atualiza apenas a classe, sem alterar a raça ou nome
                        await this.updateCharacterFromSelection(dialog.currentCharacter, null, selectedClass);
                        this.updateModalHTML(html, dialog.currentCharacter);
                        
                    }
                });
                
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

                html.find('#reroll-attributes').click(async () => {
                    await this.rerollAttributes(dialog, html);
                });

                html.find('#reroll-details').click(async () => {
                    await this.rerollDetails(dialog, html);
                });

                html.find('#reroll-equipment').click(async () => {
                    await this.rerollEquipment(dialog, html);
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
        
        // Carrega descrições dos equipamentos após o modal ser renderizado
        setTimeout(async () => {
            const equipmentItems = dialog.element.find('.equipment-items');
            if (equipmentItems.length > 0) {
                await this.loadEquipmentDescriptions(character.equipment, equipmentItems);
            }
        }, 100);
        
        // Removido hook de re-centralização forçada
    }
}

globalThis.OldDragon2eCharacterGenerator = OldDragon2eCharacterGenerator;
export default OldDragon2eCharacterGenerator;

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

