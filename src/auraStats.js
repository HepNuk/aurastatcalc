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

var auraEffectCalc = function(value, auraPercent){ 
    let auraMultiplier = ((auraPercent/100+1)); 

    return Math.floor(value * auraMultiplier);

}

var printQualityEffect = function(effectOfQuality, statPerQuality, quality, auraEffect){

    let tempArray = [];
        if (effectOfQuality.length === 1)
            tempArray.push(printPercentEffect(effectOfQuality, statPerQuality*quality, auraEffect));
        
        else if (effectOfQuality.length === 2)
            
            tempArray.push(printGainEffect(effectOfQuality, statPerQuality*quality, auraEffect));
        
        else if (effectOfQuality.length === 3)
            tempArray.push(printAddsEffect(effectOfQuality, statPerQuality*quality, auraEffect));


    return tempArray;
}

var printAuraEffect = function(effectOfAura, numberEffects, level, auraEffect){

    let tempArray = [];
    for (let i = 0; i < effectOfAura.length; i++){
        if (effectOfAura[i].length === 1)
            tempArray.push(printPercentEffect(effectOfAura[i], numberEffects[i][level], auraEffect));
        
        else if (effectOfAura[i].length === 2)
            
            tempArray.push(printGainEffect(effectOfAura[i], numberEffects[i][level], auraEffect));
        
        else if (effectOfAura[i].length === 3)
            tempArray.push(printAddsEffect(effectOfAura[i], numberEffects[i][level], auraEffect));

    }

    return tempArray;
}
/*
    Prints Adds type Aura Effects

    examples: effect -> Array [Adds, to, Something]
              minToMax -> Array [min, max]
              
              returns calculated values based on aura effect in format

              Adds min to max Something     
*/
var printAddsEffect = function (effect, minToMax, auraEffect) {

    //let auraEffectMultiplier = Math.floor((auraEffect/100)+1);

    let min = auraEffectCalc(minToMax[0], auraEffect);
    let max = auraEffectCalc(minToMax[1], auraEffect);

    return effect[0] + min + effect[1] + max + effect[2];
};

//print Text Value Text Effects 
//Example: Gain X Physical as...
var printGainEffect = function (effect, value, auraEffect){

    let newValue = auraEffectCalc(value, auraEffect);

    return effect[0] + newValue + effect[1];
}

//print Value Text Effects
//Example: X% more damage
var printPercentEffect = function(effect, value, auraEffect){

    let newValue = auraEffectCalc(value, auraEffect);

    return newValue + effect;
}

class Aura {
    constructor(aurakey, title, effectOfQuality, statPerQuality, numberEffects, effectOfAura) {
        this.key = aurakey;
        this.title = title;
        this.level = 0;
        this.quality = 0;
        this.altQuality = 0;
        this.specificAuraEffect = 0;
        this.effectOfQuality = effectOfQuality;
        this.statPerQuality = statPerQuality;
        this.numberEffects = numberEffects;
        this.effectOfAura = effectOfAura;

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
        }

        this.printEffect = function (auraEffect) {
            let tempArray = [];
            if (this.level !== 0 && this.level <= 40) {
                tempArray = printAuraEffect(this.effectOfAura, this.numberEffects, this.level, 
                                                (this.specificAuraEffect + auraEffect + this.generosityAuraEffect()));
                return tempArray;

            } else
                return [''];

        };

        this.printQuality = function (auraEffect) {
            let tempArray = [];
            if (this.altQuality !== 0 && this.quality !== 0) {
                tempArray = printQualityEffect(this.effectOfQuality[this.altQuality], 
                                                this.statPerQuality[this.altQuality],  this.quality, 
                                                (this.specificAuraEffect + auraEffect +  this.generosityAuraEffect()));
                return tempArray;

            } else
                return [''];

        };
    }
}

/* Template for new Aura.

AURA: new Aura(
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
        [],
        [],
    ],
    //Aura Bonuses
    [
        [''],
        [''],
    ]
),    

*/


var auras = [
  //-----------------------------------------------------
  //Anger Stats
    new Aura(
        'ANGER',
        //Title 
        "Anger",
        //AlternateQualityBonuses 
        [
            [""],
            ["% increased Burning Damage"],
            ["% increased Movement Speed"],
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 1, 0.25],
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
            ["Adds ", " to ", " Fire Damage to Attacks"],
            ["Adds ", " to ", " Fire Damage to Spells"],
        ]
    ),

  //-----------------------------------------------------
  //Hatred
    new Aura(
        'HATRED',
        //Title 
        'Hatred',
        //AlternateQualityBonuses 
        [
            [''],
            ['% increased Chill and Freeze Duration'],
            ['% increased Movement Speed while on Chilled Ground'],
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 1, 1],
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
            ['Gain ', ' of Physical Damage as Extra Cold Damage'],
            ['% more Cold Dmage'],
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
            [' '],
            [' '],
            [' '],
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 0, 0], 
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
            ['Adds ', ' to ', ' Lightning Damage to Attacks'],
            ['% more Lightning Damage with spells'],
        ]
    ),

    new Aura(
        'HASTE',
        //Title 
        'Haste',
        //AlternateQualityBonuses 
        [
            [''],
            ['% increased Totem Placement speed'],
            ['% increased Projectile Speed'],
            ['Buffs on You expire ', '% faster']
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
            ['% increased Attack Speed'],
            ['% increased Cast Speed'],
            ['% increased Movement Speed']
        ]
    ),

    new Aura(
        'MALEVOLENCE',
        //Title 
        'Malevolence',
        //AlternateQualityBonuses 
        [
            [''],
            ['% increased Skill Effect Duration'],
            ['% increased Damage with Ailments'],
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 0.5, 0.5],
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
            ['% more Damage over Time'],
            ['% increased Skill Effect Duration'],
        ]
    ),  

    new Aura(
        'ZEALOTRY',
        //Title 
        'Zealotry',
        //AlternateQualityBonuses 
        [
            [''],
            ['% to Critical Strike Multiplier'],
            ['% of Life per second'],
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 0.25, 0.02],
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
            ['% more Spell Damage'],
            ['% increased Spell Critical Strike Chance'],
        ]
    ),

    new Aura(
        'PURITY_FIRE',
        //Title 
        'Purity of Fire',
        //AlternateQualityBonuses 
        [
            [''],
            ['% chance to avoid being Ignited'],
            ['Damage Penetrates ', '% Fire Resistance'],
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 1, 0.2],
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
            ['+', '% to maximum Fire Resistance'],
            ['+', '% to Fire Resistance'],
        ]
    ),    

    new Aura(
        'PURITY_ICE',
        //Title 
        'Purity of Ice',
        //AlternateQualityBonuses 
        [
            [''],
            ['% chance to avoid being Frozen'],
            ['Damage Penetrates ', '% Cold Resistance'],
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 1, 0.2],
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
            ['+', '% to maximum Cold Resistance'],
            ['+', '% to Cold Resistance'],
        ]
    ),
    
    new Aura(
        'PURITY_LIGHTNING',
        //Title 
        'Purity of Lightning',
        //AlternateQualityBonuses 
        [
            [''],
            ['% chance to avoid being Frozen'],
            ['Damage Penetrates ', '% Lightning Resistance'],
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 1, 0.2],
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
            ['+', '% to maximum Lightning Resistance'],
            ['+', '% to Lightning Resistance'],
        ]
    ),

    new Aura(
        'PURITY_ELEMENTS',
        //Title 
        'Purity of Elements',
        //AlternateQualityBonuses 
        [
            [''],
            ['% chance to avoid Elemental Ailments'],
            ['Damage Penetrates ', '% Elemental Resistance'],
        ],
        //Values Per Quality of the diffrent alt Qualities
        [0, 0.5, 0.2],
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
            ['+', '% to all Elemental Resistances']
        ]
    ),

    ];

export default auras;