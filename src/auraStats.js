/**
 * Explination on how Auras are Structured.
 * 
 * Each value of auras is the name of the aura in Capitals example Hatred -> HATRED
 * each auras has the following attributes 
 * 
 * title: its name
 * level: whatever level its at.
 * quality: whatever quality the aura is at.
 * altQuality: what alternative quality is selected (this should be between 0 and 2 usually)
 * specificAuraEffect: this is where the value of specific aura effect is stored (such as Hatred has #% increased Aura Effect)
 * 
 * effectOfQuality: this is an array of Arrays, it containes whatever quality bonuses a given alt quality provides
 * statPerQuality: for a given index statPerQuality is the bonus per quality given for the same index of effectOfQuality
 * 
 * numberEffects: this contains an array for for each state line an aura gives. if a state has to values (a min and max) they are also in an array themselves
 * Example: 'Adds 16 to 48 Lightning Damage to Attacks' AND '21% more Lightning Damage with spells' at Level 20.
 * will be stored as following an array of length 2(2 mods), index 0 will have the Adds X to Y .. 
 * such that at level 20 index20 will be -> [..,[16, 48]] 
 * while the 2nd effect will be at index 1, and index 20 of that array with [.., 21]
 * 
 * effectOfAura: this is also an array that matches the array of NumberEffects it will have its given effects split into diffrent arrays
 * if some text is split by numbers that line will also be split in the array. 
 * Example: Adds 16 to 48 Lightning Damage to Attacks -> ['Adds ', ' to ', Lightning Damage to Attacks']
 * 
 * printEffect(auraEffect){}: takes in the globalAuraEffect and returns an Array with all Bonuses Given by an Aura.
 * 
 * printQuality(auraEffect){}: takes in the GlobalAuraEffect and returns an Array with all the bonus given by the Auras Quality
 */

var calcStatFloored = function(value, auraEffect){ 
    let auraMultiplier = ((auraEffect/100+1)); 

    return Math.floor(value * auraMultiplier);

}

var calcStat = function(value, auraEffect){ 

    let auraMultiplier = ((auraEffect/100+1)); 

    return Math.floor((value * auraMultiplier)*100)/100; //round down to 2 decimals
}


class Aura {
    constructor(aurakey, title, effectOfQuality, statPerQuality, effectAtLevel, effectOfAura, printEffect, special, buff) {
        this.key = aurakey;
        this.title = title;
        this.level = 0;
        this.quality = 0;
        this.altQuality = 0;
        this.specificAuraEffect = 0;
        this.effectOfQuality = effectOfQuality;
        this.statPerQuality = statPerQuality;
        this.effectAtLevel = effectAtLevel;
        this.effectOfAura = effectOfAura;
        this.special = false || special;
        this.buff = false || buff;

        this.generosityLevel = 0;
        this.generosityType = 0;
        
        this.generosityEffect = [

            [0],

            [   0,
                20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
                30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
                40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
                49, 50, 50, 51, 51, 52, 52, 53, 53, 54
            ],
            [   0,
                41, 43, 45, 47, 49, 51, 53, 55, 57, 59,
                60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
                69, 69, 69, 69, 69, 69, 69, 69, 69, 69,
                69, 69, 69, 69, 69, 69, 69, 69, 69, 69
            ],
        ];

        this.generosityAuraEffect = function(){

            if(this.generosityType > 0 && this.generosityLevel > 0 ){
                return this.generosityEffect[this.generosityType][this.generosityLevel];
            } else return 0;
        };

        this.getTotalAuraEffect = function(globalAuraEffect){
            if (!(this.buff === true))
                return this.specificAuraEffect + this.generosityAuraEffect() + globalAuraEffect;
            else return 0;
        };

        this.printEffect = printEffect || function(globalAuraEffect){
            let auraEffect = this.getTotalAuraEffect(globalAuraEffect);
    
            let finaleAuraBonuses = [];
    
            let tempString;
    
            if(this.level !== 0 && this.level <= 40){
            //Adding Aura Effect
                for (let i = 0; i < this.effectOfAura.length; i++){
                    tempString = this.effectOfAura[i];
                    if(this.effectAtLevel[i][0].length === 2){
                        tempString = tempString.replace('##', calcStatFloored(this.effectAtLevel[i][this.level][0], auraEffect)); //Replace min value
                        tempString = tempString.replace('$$', calcStatFloored(this.effectAtLevel[i][this.level][1], auraEffect)); //Replace max value
                    } else {
                        tempString = tempString.replace('##', calcStatFloored(this.effectAtLevel[i][this.level], auraEffect));
                    }
                    finaleAuraBonuses.push(tempString); 
                }
    
                if(this.quality !== 0 && this.altQuality !== 0){
                    tempString = this.effectOfQuality[this.altQuality]
                    tempString = tempString.replace('##', calcStatFloored( (this.statPerQuality[this.altQuality] * this.quality), auraEffect));
    
                    finaleAuraBonuses.push(tempString);
                }
    
                return finaleAuraBonuses;
            } else return ['']
        };



    }
}


var auras = [
  //-----------------------------------------------------
  //Anger Stats
    new Aura(
        'ANGER',
        //Title 
        "Anger",
        //AlternateQualityBonuses 
        [
            "",
            "##% increased Burning Damage",
            "##% increased Movement Speed",
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 0.25, 0.05],
        //Values at each level for the aura
        [
            [   [0, 0],
                [16, 23],   [19, 27],   [22, 31],   [25, 36],   [29, 41],   [33, 47],   [37, 53],   [42, 60],   [48, 68],   [52, 74],
                [56, 80],   [60, 86],   [65, 93],   [70, 100],  [76, 108],  [82, 116],  [88, 125],  [94, 135],  [101, 145], [109, 155],
                [117, 167], [125, 179], [134, 191], [143, 205], [154, 219], [164, 235], [176, 251], [188, 268], [201, 287], [214, 306],
                [221, 316], [229, 327], [236, 337], [244, 349], [252, 360], [260, 372], [269, 384], [278, 397], [287, 409], [296, 423]
            ],
            [   [0, 0], 
                [15, 21],   [17, 24],   [20, 28],   [23, 32],   [26, 37],   [30, 42],   [34, 48],   [39, 54],   [44, 61],   [47, 66], 
                [51, 72],   [55, 78],   [60, 84],   [64, 90],   [69, 97],   [75, 105],  [80, 113],  [86, 121],  [93, 130],  [99, 140], 
                [107, 150], [114, 161], [122, 172], [131, 184], [140, 197], [150, 211], [161, 226], [172, 241], [183, 258], [196, 275], 
                [202, 285], [209, 294], [216, 304], [223, 314], [230, 324], [238, 335], [246, 346], [254, 357], [262, 368], [270, 380]
            ],
        ],
        //Aura Bonuses
        [
            "Adds ## to $$ Fire Damage to Attacks",
            "Adds ## to $$ Fire Damage to Spells",
        ],

    ),

  //-----------------------------------------------------
  //Hatred
    new Aura(
        'HATRED',
        //Title 
        'Hatred',
        //AlternateQualityBonuses 
        [
            '',
            '##% increased Chill and Freeze Duration',
            '##% increased Movement Speed while on Chilled Ground',
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 0.5, 0.5],
        //Values at each level for the aura
        [
            [   0, 
                16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 
                21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 
                26, 26, 27, 27, 28, 28, 29, 29, 30, 30, 
                30, 31, 31, 31, 31, 32, 32, 32, 32, 33
            ],
            [   0,
                14, 14, 14, 14, 15, 15, 15, 15, 16, 16,
                16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
                19, 19, 19, 19, 20, 20, 20, 20, 21, 21,
                21, 21, 21, 21, 21, 22, 22, 22, 22, 22
            ],
        ],
        //Aura Bonuses
        [
            'Gain ## of Physical Damage as Extra Cold Damage',
            '##% more Cold Dmage',
        ]
    ),
  //-------------------------------
  //Wrath
    new Aura(
        'WRATH',
        //Title 
        'Wrath',
        //AlternateQualityBonuses 
        [
            '', '', ''
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 0.25, 0], 
        //Values at each level for the aura
        [
            [   [0, 0], 
                [2, 37],   [3, 43],   [3, 50],   [4, 57],   [4, 66],   [5, 75],   [5, 85],   [6, 97],   [7, 109],  [7, 118], 
                [8, 128],  [9, 138],  [9, 149],  [10, 161], [11, 173], [12, 186], [13, 200], [13, 215], [14, 231], [16, 248], 
                [17, 267], [18, 286], [19, 306], [20, 328], [22, 351], [23, 375], [25, 401], [27, 429], [29, 458], [31, 490], 
                [32, 506], [33, 523], [34, 540], [35, 558], [36, 576], [37, 595], [38, 614], [40, 634], [41, 655], [42, 676]

            ],
            [   0, 
                15, 15, 15, 16, 16, 16, 17, 17, 17, 18, 
                18, 18, 19, 19, 19, 20, 20, 20, 21, 21, 
                21, 22, 22, 22, 23, 23, 23, 24, 24, 24, 
                24, 25, 25, 25, 25, 25, 25, 26, 26, 26
            ],
        ],
        //Aura Bonuses
        [
            'Adds ## to $$ Lightning Damage to Attacks',
            '##% more Lightning Damage with spells',
        ],

        function(globalAuraEffect){
            let auraEffect = this.getTotalAuraEffect(globalAuraEffect);
    
            

            let finaleAuraBonuses = [];
            
            if(this.altQuality === 1 && this.quality){
                let incEffect = Math.floor(this.statPerQuality[this.altQuality] * this.quality);
                if(incEffect >= 1){
                    auraEffect += incEffect;
                    finaleAuraBonuses.push(`(Has ${incEffect}% increassed effect from Quality)`)
                }
            }

            let tempString;
    
            if(this.level !== 0 && this.level <= 40){
            //Adding Aura Effect
                for (let i = 0; i < this.effectOfAura.length; i++){
                    tempString = this.effectOfAura[i];
                    if(this.effectAtLevel[i][0].length === 2){
                        tempString = tempString.replace('##', calcStatFloored(this.effectAtLevel[i][this.level][0], auraEffect)); //Replace min value
                        tempString = tempString.replace('$$', calcStatFloored(this.effectAtLevel[i][this.level][1], auraEffect)); //Replace max value
                    } else {
                        tempString = tempString.replace('##', calcStatFloored(this.effectAtLevel[i][this.level], auraEffect));
                    }
                    finaleAuraBonuses.push(tempString); 
                }
    
                return finaleAuraBonuses;
            } else return ['']
        }

    ),

    new Aura(
        'HASTE',
        //Title 
        'Haste',
        //AlternateQualityBonuses 
        [
            '',
            '##% increased Totem Placement speed',
            '##% increased Projectile Speed',
            'Buffs on You expire ##% faster'
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 0.5, 0.5, 1],
        //Values at each level for the aura
        [
            [   0,
                9,  10, 10, 10, 11, 11, 11, 12, 12, 12, 
                13, 13, 13, 14, 14, 15, 15, 16, 16, 16,
                17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 
                20, 20, 20, 20, 20, 21, 21, 21, 21, 21
            ],
            [   0,
                9,  9,  10, 10, 10, 11, 11, 11, 12, 12, 
                12, 13, 13, 13, 14, 14, 15, 15, 16, 16, 
                16, 17, 17, 17, 18, 18, 18, 19, 19, 19, 
                19, 20, 20, 20, 20, 20, 20, 21, 21, 21

            ],
            [   0,
                4,  4,  4,  5,  5,  5,  6,  6,  6,  7,
                7,  7,  8,  8,  8,  8,  8,  8,  8,  9,
                9,  9,  10, 10, 10, 11, 11, 11, 12, 12,
                12, 12, 12, 13, 13, 13, 13, 13, 13, 14
            ]
        ],
        //Aura Bonuses
        [
            '##% increased Attack Speed',
            '##% increased Cast Speed',
            '##% increased Movement Speed'
        ]
    ),

    new Aura(
        'MALEVOLENCE',
        //Title 
        'Malevolence',
        //AlternateQualityBonuses 
        [
            '',
            '##% increased Skill Effect Duration',
            '##% increased Damage with Ailments',
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 0.1, 0.25],
        //Values at each level for the aura
        [
            [   0,
                14, 14, 14, 15, 15, 15, 16, 16, 16, 17, 
                17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 
                20, 21, 21, 21, 22, 22, 22, 23, 23, 23, 
                23, 24, 24, 24, 24, 24, 24, 25, 25, 25
            ],
            [   0,
                10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 
                15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 
                20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 
                24, 25, 25, 25, 25, 26, 26, 26, 26, 27
            ],
        ],
        //Aura Bonuses
        [
            '##% more Damage over Time',
            '##% increased Skill Effect Duration',
        ],

        //Malevolances 2nd quality effect is addative to its own effect before any scaling.
        function(globalAuraEffect){
            let auraEffect = this.getTotalAuraEffect(globalAuraEffect);
    
            let finaleAuraBonuses = [];
    
            let tempString;
    
            if(this.level !== 0 && this.level <= 40){
            //Adding Aura Effect
                for (let i = 0; i < this.effectOfAura.length; i++){
                    tempString = this.effectOfAura[i];
                    
                    if(i === 1 && this.altQuality === 1) 
                        tempString = tempString.replace('##', calcStatFloored((this.effectAtLevel[i][this.level] + 
                                                                                (this.statPerQuality[this.altQuality] * 
                                                                                    this.quality)), auraEffect));
                    else 
                        tempString = tempString.replace('##', calcStatFloored((this.effectAtLevel[i][this.level]), auraEffect));

                    finaleAuraBonuses.push(tempString); 
                }
    
                if(this.quality !== 0 && this.altQuality === 2){
                    tempString = this.effectOfQuality[this.altQuality]
                    tempString = tempString.replace('##', calcStatFloored( (this.statPerQuality[this.altQuality] * this.quality), auraEffect));
    
                    finaleAuraBonuses.push(tempString);
                }
    
                return finaleAuraBonuses;
            } else return ['']
        }
    ),  

    new Aura(
        'ZEALOTRY',
        //Title 
        'Zealotry',
        //AlternateQualityBonuses 
        [
            '',
            '##% to Critical Strike Multiplier',
            'Regenerate ##% of Life per second',
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 0.1, 0.005],
        //Values at each level for the aura
        [
            [   0,
                10, 10, 10, 11, 11, 11, 12, 12, 12, 12,
                13, 13, 13, 14, 14, 14, 14, 15, 15, 15,
                16, 16, 16, 16, 17, 17, 17, 18, 18, 18,
                18, 18, 19, 19, 19, 19, 19, 19, 19, 20
            ],
            [   0,
                20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 
                30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 
                40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 
                49, 50, 50, 51, 51, 52, 52, 53, 53, 54
            ],
        ],
        //Aura Bonuses
        [
            '##% more Spell Damage',
            '##% increased Spell Critical Strike Chance',
        ],
        function(globalAuraEffect){
            let auraEffect = this.getTotalAuraEffect(globalAuraEffect);
    
            let finaleAuraBonuses = [];
    
            let tempString;
    
            if(this.level !== 0 && this.level <= 40){
            //Adding Aura Effect
                for (let i = 0; i < this.effectOfAura.length; i++){
                    tempString = this.effectOfAura[i];
                    
                    if(i === 1 && this.altQuality === 1) 
                        tempString = tempString.replace('##', calcStatFloored((this.effectAtLevel[i][this.level] + 
                                                                                (this.statPerQuality[this.altQuality] * 
                                                                                    this.quality)), auraEffect));
                    else 
                        tempString = tempString.replace('##', calcStatFloored((this.effectAtLevel[i][this.level]), auraEffect));

                    finaleAuraBonuses.push(tempString); 
                }
    
                if(this.quality !== 0 && this.altQuality === 2){
                    tempString = this.effectOfQuality[this.altQuality]
                    tempString = tempString.replace('##', calcStatFloored( (this.statPerQuality[this.altQuality] * this.quality), auraEffect));
    
                    finaleAuraBonuses.push(tempString);
                }
    
                return finaleAuraBonuses;
            } else return ['']
        }
    ),

    new Aura(
        'PURITY_FIRE',
        //Title 
        'Purity of Fire',
        //AlternateQualityBonuses 
        [
            '',
            '##% chance to avoid being Ignited',
            'Damage Penetrates ##% Fire Resistance',
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 0.25, 0.05],
        //Values at each level for the aura
        [
            [   0,
                0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
                2, 2, 2, 2, 2, 2, 3, 3, 3, 4,
                4, 4, 5, 5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5, 5, 5, 5
            ],
            [   0,
                22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
                42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
                51, 52, 52, 53, 53, 54, 54, 55, 55, 56
            ],
        ],
        //Aura Bonuses
        [
            '+##% to maximum Fire Resistance',
            '+##% to Fire Resistance',
        ]
    ),    

    new Aura(
        'PURITY_ICE',
        //Title 
        'Purity of Ice',
        //AlternateQualityBonuses 
        [
            '',
            '##% chance to avoid being Frozen',
            'Damage Penetrates ##% Cold Resistance',
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 0.25, 0.05],
        //Values at each level for the aura
        [
            [   0,
                0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
                2, 2, 2, 2, 2, 2, 3, 3, 3, 4,
                4, 4, 5, 5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5, 5, 5, 5
            ],
            [   0,
                22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
                42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
                51, 52, 52, 53, 53, 54, 54, 55, 55, 56
            ],
        ],
        //Aura Bonuses
        [
            '+##% to maximum Cold Resistance',
            '+##% to Cold Resistance',
        ]
    ),
    
    new Aura(
        'PURITY_LIGHTNING',
        //Title 
        'Purity of Lightning',
        //AlternateQualityBonuses 
        [
            '',
            '##% chance to avoid being Frozen',
            'Damage Penetrates ##% Lightning Resistance',
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 0.25, 0.05],
        //Values at each level for the aura
        [
            [   0,
                0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
                2, 2, 2, 2, 2, 2, 3, 3, 3, 4,
                4, 4, 5, 5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5, 5, 5, 5
            ],
            [   0,
                22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
                42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
                51, 52, 52, 53, 53, 54, 54, 55, 55, 56
            ],
        ],
        //Aura Bonuses
        [
            '+##% to maximum Lightning Resistance',
            '+##% to Lightning Resistance',
        ]
    ),

    new Aura(
        'PURITY_ELEMENTS',
        //Title 
        'Purity of Elements',
        //AlternateQualityBonuses 
        [
            '',
            '##% chance to avoid Elemental Ailments',
            'Damage Penetrates ##% Elemental Resistance',
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 0.1, 0.05],
        //Values at each level for the aura
        [
            [   0,
                12, 13, 14, 15, 15, 16, 17, 18, 19, 20,
                20, 21, 22, 23, 24, 25, 25, 26, 27, 27,
                28, 29, 29, 30, 31, 31, 32, 33, 33, 34,
                34, 34, 34, 35, 35, 36, 36, 36, 36, 37
            ],
        ],
        //Aura Bonuses
        [
            '+##% to all Elemental Resistances'
        ]
    ),

    new Aura(
        //KEY
        'WAR_BANNER',
        //Title 
        'War Banner',
        //AlternateQualityBonuses 
        [
            '',
            '##% increased Accuracy Rating',
            '',
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0.5, 0.3, 0],
        //Values at each level for the aura
        [
            [   0,
                15, 15, 15, 16, 16, 16, 17, 17, 17, 18, 
                18, 18, 19, 19, 19, 20, 20, 20, 21, 21, 
                21, 22, 22, 22, 23, 23, 23, 24, 24, 24, 
                25, 25, 25, 26, 26, 26, 27, 27, 27, 28
            ],
            [   0,
                8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 
                10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 
                12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 
                14, 14, 14, 14, 14, 14, 14, 14, 14, 14
            ]
        ],
        //Aura Bonuses
        [
            '##% increased Accuracy Rating',
            'Nearby Enemies take ##% increased Physical Damage'
        ],
        function(globalAuraEffect){
            let auraEffect = this.getTotalAuraEffect(globalAuraEffect);
    
            let finaleAuraBonuses = [];
    
            let tempString;

            if(this.altQuality === 0 && this.quality){
                let incEffect = Math.floor(this.statPerQuality[this.altQuality] * this.quality);
                if(incEffect >= 1){
                    auraEffect += incEffect;
                    finaleAuraBonuses.push(`(Has ${incEffect}% increassed effect from Quality)`)
                }
            }
    
            if(this.level !== 0 && this.level <= 40){
            //Adding Aura Effect
                for (let i = 0; i < this.effectOfAura.length; i++){
                    tempString = this.effectOfAura[i];
                    if(this.effectAtLevel[i][0].length === 2){
                        tempString = tempString.replace('##', calcStatFloored(this.effectAtLevel[i][this.level][0], auraEffect)); //Replace min value
                        tempString = tempString.replace('$$', calcStatFloored(this.effectAtLevel[i][this.level][1], auraEffect)); //Replace max value
                    } else {
                        tempString = tempString.replace('##', calcStatFloored(this.effectAtLevel[i][this.level], auraEffect));
                    }
                    finaleAuraBonuses.push(tempString); 
                }
    
                if(this.quality !== 0 && this.altQuality !== 0){
                    tempString = this.effectOfQuality[this.altQuality]
                    tempString = tempString.replace('##', calcStatFloored( (this.statPerQuality[this.altQuality] * this.quality), auraEffect));
    
                    finaleAuraBonuses.push(tempString);
                }
    
                return finaleAuraBonuses;
            } else return ['']
        }
    ),  

    new Aura(
        //Key
        'DREAD_BANNER',
        //Title 
        'Dread Banner',
        //AlternateQualityBonuses 
        [
            '',
            'Nearby Enemies deal ##% less Damage',
            '##% chance to Impale Enemies on Hit with Attacks',
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0.5, 0.1, 0.25],
        //Values at each level for the aura
        [
            [ 0,
                20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 
                20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 
                20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 
                20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 
            ],
            [   0,
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
                10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 
                20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 
                30, 31, 32, 33, 34, 35, 36, 37, 38, 39
            ]
        ],
        //Aura Bonuses
        [
            '##% chance to Impale Enemies on Hit with Attacks', 
            '##% increased Impale Effect',
        ],
        function(globalAuraEffect){
            let auraEffect = this.getTotalAuraEffect(globalAuraEffect);
    
            let finaleAuraBonuses = [];
    
            let tempString;

            if(this.altQuality === 0 && this.quality){
                let incEffect = Math.floor(this.statPerQuality[this.altQuality] * this.quality);
                if(incEffect >= 1){
                    auraEffect += incEffect;
                    finaleAuraBonuses.push(`(Has ${incEffect}% increassed effect from Quality)`)
                }
            }
    
            if(this.level !== 0 && this.level <= 40){
            //Adding Aura Effect
                for (let i = 0; i < this.effectOfAura.length; i++){
                    tempString = this.effectOfAura[i];
                    if(this.effectAtLevel[i][0].length === 2){
                        tempString = tempString.replace('##', calcStatFloored(this.effectAtLevel[i][this.level][0], auraEffect)); //Replace min value
                        tempString = tempString.replace('$$', calcStatFloored(this.effectAtLevel[i][this.level][1], auraEffect)); //Replace max value
                    } else {
                        tempString = tempString.replace('##', calcStatFloored(this.effectAtLevel[i][this.level], auraEffect));
                    }
                    finaleAuraBonuses.push(tempString); 
                }
    
                if(this.quality !== 0 && this.altQuality !== 0){
                    tempString = this.effectOfQuality[this.altQuality]
                    tempString = tempString.replace('##', calcStatFloored( (this.statPerQuality[this.altQuality] * this.quality), auraEffect));
    
                    finaleAuraBonuses.push(tempString);
                }
    
                return finaleAuraBonuses;
            } else return ['']
        }
    ),    

    new Aura(
        //Key
        'DISCIPLINE',
        //Title 
        'Discipline',
        //AlternateQualityBonuses 
        [
            '',
            '##% increased Damage while on Full Energy Shield',
            ['##% increased Energy Shield Recharge rate', '##% slower start of Energy Shield Recharge']
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 0.25, [2, 0.5]],
        //Values at each level for the aura
        [
            [   0,
                60, 69, 76, 85, 94, 103, 114, 124, 136, 143, 
                147, 156, 165, 171, 179, 185, 192, 200, 205, 217, 
                221, 231, 238, 250, 262, 269, 284, 294, 304, 314, 
                314, 323, 323, 332, 332, 340, 340, 348, 348, 356
            ],
            [
                0,
                30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 
                30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 
                30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 
                30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 
            ]
        ],
        //Aura Bonuses
        [
            '+## to maximum Energy shield',
            '##% increased Energy Shield Recharge rate'
        ],
        function(globalAuraEffect){
            let auraEffect = this.getTotalAuraEffect(globalAuraEffect);
    
            let finaleAuraBonuses = [];
    
            let tempString;
    
            if(this.level !== 0 && this.level <= 40){
            //Adding Aura Effect
                for (let i = 0; i < this.effectOfAura.length; i++){
                    tempString = this.effectOfAura[i];
                    if(this.effectAtLevel[i][0].length === 2){
                        tempString = tempString.replace('##', calcStatFloored(this.effectAtLevel[i][this.level][0], auraEffect)); //Replace min value
                        tempString = tempString.replace('$$', calcStatFloored(this.effectAtLevel[i][this.level][1], auraEffect)); //Replace max value
                    } else {
                        tempString = tempString.replace('##', calcStatFloored(this.effectAtLevel[i][this.level], auraEffect));
                    }
                    finaleAuraBonuses.push(tempString); 
                }
    
                if(this.quality !== 0 && this.altQuality !== 0){

                    
                    if (this.effectOfQuality[this.altQuality].length === 2){

                        for (let i = 0; i < this.effectOfQuality[this.altQuality].length; i++){
                            tempString = this.effectOfQuality[this.altQuality][i]
                            tempString = tempString.replace('##', calcStatFloored( (this.statPerQuality[this.altQuality][i] * this.quality), auraEffect));
                            finaleAuraBonuses.push(tempString);
                        }
                        
                    }else{
                        tempString = tempString.replace('##', calcStatFloored( (this.statPerQuality[this.altQuality] * this.quality), auraEffect));
                        finaleAuraBonuses.push(tempString);
                    }
                }
    
                return finaleAuraBonuses;
            } else return ['']
        }
    ),    

    new Aura(
        //Key
        'GRACE',
        //Title 
        'Grace',
        //AlternateQualityBonuses 
        [
            '',
            '##% chance to avoid Elemental Ailments',
            '##% chance to Avoid Chaos Damage from Hits',
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 0.1, 0.05],
        //Values at each level for the aura
        [
            [   0,
                227, 271, 322, 379, 444, 528, 621, 722, 845, 940, 
                1043, 1155, 1283, 1413, 1567, 1732, 1914, 2115, 2335, 2575, 
                2700, 2835, 2979, 3124, 3279, 3444, 3611, 3795, 3982, 4179, 
                4282, 4386, 4494, 4603, 4716, 4830, 4948, 5067, 5190, 5314     
            ],
        ],
        //Aura Bonuses
        [
            '+## to Evasion rating',
        ]
    ),  

    new Aura(
        //Key
        'DETERMINATION',
        //Title 
        'Determination',
        //AlternateQualityBonuses 
        [
            '',
            '##% chance to Avoid being Stunned',
            '##% of Evasion Rating as Extra Armour',
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 0.25, 0.1],
        //Values at each level for the aura
        [
            [   0,
                32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 
                42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 
                52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 
                61, 62, 62, 63, 63, 64, 64, 65, 65, 66
            ],
        ],
        //Aura Bonuses
        [
            '##% more Armour',
        ]
    ),  

    new Aura(
        //Key
        'CLARITY',
        //Title 
        'Clarity',
        //AlternateQualityBonuses 
        [
            '',
            '##% increased Mana Recovery from Flasks',
            '##% increased Damage while on Full Mana',
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 0.25, 0.25],
        //Values at each level for the aura
        [
            [   0,
                2.9,   4.4,  6.5, 8.4,  10.4, 12.5, 14.5,   16, 17.5,   19, 
                20.5,   22, 23.5,  25,  26.5,   28, 29.5,   31,   32,   33, 
                34,     35,   36,  37,    38,   39,   40,   41,   42, 43.1, 
                43.6, 44.1, 44.6, 45.1, 45.6, 46.1, 46.6, 47.1, 47.6, 48.1
            ],
        ],
        //Aura Bonuses
        [
            '+## Mana Regeneration',
        ],
        function(globalAuraEffect){
            let auraEffect = this.getTotalAuraEffect(globalAuraEffect);
    
            let finaleAuraBonuses = [];
    
            let tempString;
    
            if(this.level !== 0 && this.level <= 40){
            //Adding Aura Effect
                for (let i = 0; i < this.effectOfAura.length; i++){
                    tempString = this.effectOfAura[i];
                    
                    tempString = tempString.replace('##', calcStat(this.effectAtLevel[i][this.level], auraEffect));
                    
                    finaleAuraBonuses.push(tempString); 
                }
    
                if(this.quality !== 0 && this.altQuality !== 0){
                    tempString = this.effectOfQuality[this.altQuality]

                    if(this.altQuality === 1)
                        tempString = tempString.replace('##', calcStatFloored( (this.statPerQuality[this.altQuality] * this.quality), auraEffect));
                    else
                        tempString = tempString.replace('##', calcStatFloored( (this.statPerQuality[this.altQuality] * this.quality), auraEffect));

                    finaleAuraBonuses.push(tempString);
                }
    
                return finaleAuraBonuses;
            } else return ['']
        }
    ),    

    new Aura(
        //Key
        'PRECISION',
        //Title 
        'Precision',
        //AlternateQualityBonuses 
        [
            '',
            '',
            '##% increased Damage',
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 0, 0.1],
        //Values at each level for the aura
        [
            [
                  93,  128,  162,  193,  223,  276,  305,  332,  359,  385, 
                 444,  469,  493,  516,  539,  606,  630,  653,  677,  701, 
                 778,  804,  831,  857,  883,  972, 1000, 1029, 1058, 1087, 
                1172, 1187, 1203, 1218, 1233, 1324, 1340, 1357, 1374, 1390
            ],
            [   0,
                20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 
                40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 
                60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 
                79, 80, 81, 82, 83, 84, 85, 86, 87, 88
            ]
        ],
        //Aura Bonuses
        [
            '+## to Accuracy Rating',
            '##% increased Critical Strike Chance'
        ],

        function(globalAuraEffect){
            let auraEffect = this.getTotalAuraEffect(globalAuraEffect);
    
            let finaleAuraBonuses = [];
    
            let tempString;
    
            if(this.level !== 0 && this.level <= 40){
            //Adding Aura Effect
                for (let i = 0; i < this.effectOfAura.length; i++){
                    tempString = this.effectOfAura[i];
                    if(this.effectAtLevel[i][0].length === 2){
                        tempString = tempString.replace('##', calcStatFloored(this.effectAtLevel[i][this.level][0], auraEffect)); //Replace min value
                        tempString = tempString.replace('$$', calcStatFloored(this.effectAtLevel[i][this.level][1], auraEffect)); //Replace max value
                    } else {
                        tempString = tempString.replace('##', calcStatFloored(this.effectAtLevel[i][this.level], auraEffect));
                    }
                    finaleAuraBonuses.push(tempString); 
                }
    
                if(this.quality !== 0 && this.altQuality !== 0){
                    tempString = this.effectOfQuality[this.altQuality]
                    tempString = tempString.replace('##', calcStatFloored( (this.statPerQuality[this.altQuality] * this.quality), auraEffect));
    
                    finaleAuraBonuses.push(tempString);
                }
    
                return finaleAuraBonuses;
            } else return ['']
        }
    ),  
    
    new Aura(
        //Key
        'VITALITY',
        //Title 
        'Vitality',
        //AlternateQualityBonuses 
        [
            '',
            'Leech ##% of Physical Attack Damage as Life',
            '% increased Damage while on Full Life',
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 0.02, 0.2],
        //Values at each level for the aura
        [
            [   0,
                15, 26.5, 42, 57.5, 73, 88.4, 103.9, 115.5, 127.1, 138.8, 
                150.2, 161.9, 173.5, 185.1, 196.8, 208.2, 219.9, 231.5, 239.2, 247, 
                254.8, 262.5, 270.1, 277.9, 285.6, 293.4, 301.1, 308.9, 316.6, 324.4, 
                328.1, 332, 335.9, 339.8, 343.6, 347.5, 351.4, 355.2, 359.1, 363
            ],
        ],
        //Aura Bonuses
        [
            'Regenerate ## Life per second',
        ],
        function(globalAuraEffect){
            let auraEffect = this.getTotalAuraEffect(globalAuraEffect);
    
            let finaleAuraBonuses = [];
    
            let tempString;
    
            if(this.level !== 0 && this.level <= 40){
            //Adding Aura Effect
                for (let i = 0; i < this.effectOfAura.length; i++){
                    tempString = this.effectOfAura[i];
                    
                    tempString = tempString.replace('##', calcStat(this.effectAtLevel[i][this.level], auraEffect));
                    
                    finaleAuraBonuses.push(tempString); 
                }
    
                if(this.quality !== 0 && this.altQuality !== 0){
                    tempString = this.effectOfQuality[this.altQuality]

                    if(this.altQuality === 1)
                        tempString = tempString.replace('##', calcStat( (this.statPerQuality[this.altQuality] * this.quality), auraEffect));
                    else
                        tempString = tempString.replace('##', calcStatFloored( (this.statPerQuality[this.altQuality] * this.quality), auraEffect));

                    finaleAuraBonuses.push(tempString);
                }
    
                return finaleAuraBonuses;
            } else return ['']
        }
    ),
    

    new Aura(
        //Key
        'ENVY',
        //Title 
        'Envy',
        //AlternateQualityBonuses 
        [
            '',
            '',
            '',
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 0, 0],
        //Values at each level for the aura
        [
            [   [0, 0],
                [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], 
                [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], 
                [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], 
                [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], [101, 141], [101, 141]       
            ],
            [   [0, 0],
                [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], 
                [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], 
                [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], 
                [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], [91, 121], [91, 121] 
            ]
        ],
        //Aura Bonuses
        [
            'Adds ## to $$ additional Chaos Damage with Attacks',
            'Adds ## to $$ additional Chaos Damage with Spells',
        ],

        function(globalAuraEffect){
            let auraEffect = this.getTotalAuraEffect(globalAuraEffect);
    
            let finaleAuraBonuses = [];
    
            let tempString;
    
            if(this.level !== 0 && this.level <= 40){
            //Adding Aura Effect
                for (let i = 0; i < this.effectOfAura.length; i++){
                    tempString = this.effectOfAura[i];
                    
                    tempString = tempString.replace('##', calcStatFloored(this.effectAtLevel[i][1][0], auraEffect)); //Replace min value
                    tempString = tempString.replace('$$', calcStatFloored(this.effectAtLevel[i][this.level][1], auraEffect)); //Replace max value
                    
                    finaleAuraBonuses.push(tempString); 
                }
    
                return finaleAuraBonuses;
            } else return ['']
        },

        true //isSpecial
    ), 
    
    ];

    
/* Template for new Aura.

new Aura(
    //Key
    '',
    //Title 
    '',
    //AlternateQualityBonuses 
    [
        [''],
        [''],
        [''],
    ],
    //Values Per Quality of the diffrent alt Qualities
    [0, 0, 0],
    //Values at each level for the aura
    [
        [

        ],
    ],
    //Aura Bonuses
    [
        [''],
    ]
),    

*/


export default auras;