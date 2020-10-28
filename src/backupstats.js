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
 * statePerQuality: for a given index statePerQuality is the bonus per quality given for the same index of effectOfQuality
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


var auras = {
  //-----------------------------------------------------
  //Anger Stats
  ANGER: { title: "Anger",  level: 0, quality: 0, altQuality: 0, specificAuraEffect: 0,

    effectOfQuality: [
      [""],
      ["% increased Burning Damage"],
      ["% increased Movement Speed"],
    ],
    statePerQuality: [0, 1, 0.25],

    numberEffects: [
      [[0, 0], [16, 23], [19, 27], [22, 31],[25, 36], [29, 41]],
      [[0, 0], [15, 21], [17, 24], [20, 28], [23, 32], [26, 37]],
    ],
    effectOfAura: [
      ["Adds ", " to ", " Fire Damage to Attacks"],
      ["Adds ", " to ", " Fire Damage to Spells"],
    ],

    printEffect(auraEffect) {
        let tempArray = [];
        if (this.level !== 0 && this.level <= 40){
            tempArray = printAuraEffect(this.effectOfAura, this.numberEffects, this.level, (this.specificAuraEffect+auraEffect));   
            console.log(tempArray);
            return tempArray;

        } else return null;

    },
    printQuality(auraEffect) {
        let tempArray = [];
        if (this.altQuality !== 0 && this.quality !== 0){
            tempArray = printQualityEffect(this.effectOfQuality[this.altQuality], this.statePerQuality[this.altQuality], this.quality, (this.specificAuraEffect+auraEffect));   
            console.log(tempArray);
            return tempArray;

        } else return null;

    },
  },

  //-----------------------------------------------------
  //Hatred
  HATRED: { title: 'Hatred', level: 0, quality: 0, altQuality: 0, specificAuraEffect: 0,

    qualityEffect: [
      [''],
      ['% increased Chill and Freeze Duration'],
      ['% increased Movement Speed while on Chilled Ground'],
    ],
    numberQualityEffect: [0, 1, 0.25],

    numberEffects: [
      [16, 16, 17, 17, 18, 18],
      [14, 14, 14, 14, 15, 15],
    ],
    effectOfAura: [
      ['Gain ', ' of Physical Damage as Extra Cold Damage'],
      ['% more Cold Dmage'],
    ],

    printEffect(auraEffect) {
        let tempArray = [];
        if (this.level !== 0 && this.level <= 40){
            tempArray = printAuraEffect(this.effectOfAura, this.numberEffects, this.level, (this.specificAuraEffect+auraEffect));   
            console.log(tempArray);
            return tempArray;

        } else return null;

    },
    
    printQuality(auraEffect) {
        let tempArray = [];
        if (this.altQuality !== 0 && this.quality !== 0){
            tempArray = printQualityEffect(this.effectOfQuality[this.altQuality], this.statePerQuality[this.altQuality], this.quality, (this.specificAuraEffect+auraEffect));   
            console.log(tempArray);
            return tempArray;

        } else return null;
    },
  },


  //-------------------------------
  //Wrath
  WRATH: { title: 'Wrath', level: 0, quality: 0, altQuality: 0, specificAuraEffect: 0,

    qualityEffect: [
      [''],
      [''],
      [''],
    ],
    numberQualityEffect: [0, 0, 0],

    numberEffects: [
      [[2, 37], [3, 43], [3, 50], [4, 57], [4, 66], [5, 75]],
      [15, 15, 15, 16, 16, 16],
    ],
    effectOfAura: [
      ['Adds ', ' to ', ' Lightning Damage to Attacks'],
      ['% more Lightning Damage with spells'],
    ],

    printEffect(auraEffect) {
        let tempArray = [];
        if (this.level !== 0 && this.level <= 40){
            tempArray = printAuraEffect(this.effectOfAura, this.numberEffects, this.level, (this.specificAuraEffect+auraEffect));   
            console.log(tempArray);
            return tempArray;

        }else  return null;
    },
    
    printQuality(auraEffect) {
        let tempArray = [];
        if (this.altQuality !== 0 && this.quality !== 0){
            tempArray = printQualityEffect(this.effectOfQuality[this.altQuality], this.statePerQuality[this.altQuality], this.quality, (this.specificAuraEffect+auraEffect));   
            console.log(tempArray);
            return tempArray;

        } else return null;
    },
  }
};

export default auras;