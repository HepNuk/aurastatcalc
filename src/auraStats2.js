var calcStatFloored = function(value, auraEffect){ 
    let auraMultiplier = ((auraEffect/100+1)); 

    return Math.floor(value * auraMultiplier);

}

var calcStat = function(value, auraEffect){ 

    let auraMultiplier = ((auraEffect/100+1)); 

    return Math.floor((value * auraMultiplier)*100)/100; //round down to 2 decimals
}


class Aura {
    constructor(aurakey, title, effectOfQuality, statPerQuality, effectAtLevel, effectOfAura, printEffect) {
        this.key = aurakey;
        this.title = title;
        this.level = 5;
        this.quality = 5;
        this.altQuality = 0;
        this.specificAuraEffect = 100;
        this.effectOfQuality = effectOfQuality;
        this.statPerQuality = statPerQuality;
        this.effectAtLevel = effectAtLevel;
        this.effectOfAura = effectOfAura;
        this.special = false;

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

        this.printEffect = printEffect || function(globalAuraEffect){
            let auraEffect = globalAuraEffect + this.specificAuraEffect + this.generosityAuraEffect();
    
            let finaleAuraBonuses = [];
    
            let tempString;
    
            if(this.level !== 0 && this.level <= 40){
            //Adding Aura Effect
                for (let i = 0; i < this.effectOfAura.length; i++){
                    tempString = this.effectOfAura[i];
                    if(this.effectAtLevel.length == 2){
                        console.log(this.effectAtLevel[i][this.level][0]);
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
    }
}

var auras = [
    new Aura ('ANGER', 'Anger', 

    //Effect of Qualitys:
    [
        '',
        '##%increased Burning Damage',
        '##% increased Movement Speed',
    ],
    //Values Per Quality
    [0, 1, 0.25],
    //Values at Each Level
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
    //Effect of Auras
    [
        'Adds ## to $$ Fire Damage to Attacks',
        'Adds ## to $$ Fire Damage to Attacks'
    ],
    )

]

export default auras;