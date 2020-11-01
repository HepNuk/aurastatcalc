class TreeCluster{
    constructor(key, name, notableAuraEffect, numSmallPassives, hasBorder, canHaveMOTM){

        let tempArray = []

        for (let i = 0; i < numSmallPassives; i++){
            tempArray.push([i, false]) //all small nodes grant 6% aura effect
        }

        this.key = key;
        this.name = name;
        this.notable = new Notable(name, notableAuraEffect, hasBorder);
        this.smallPassives = tempArray;
        this.motm = false;
        this.canHaveMOTM = canHaveMOTM

        this.clusterAuraEffect = function(){
            
            let sum = 0;

            //console.log(this.smallPassives.length);
            for (let i = 0; i < this.smallPassives.length; i++){
                console.log(this.smallPassives[i][1], i);
                if(this.smallPassives[i][1] === true){
                    if(this.motm === true){
                        sum += 9;
                    } else sum += 6;
                }
            }
            
            if(this.notable.isActive && this.motm === false){
                sum += this.notable.auraEffect;
            }
            console.log(sum)
            return sum;
        }
    }
}

class Notable{
    constructor(name, auraEffect, hasBorder){
        this.name = name;
        this.auraEffect = auraEffect;
        this.isActive = false;
        this.hasBorder = hasBorder;
    }
}

//new TreeCluster(key, name, notableAuraEffect, numSmallPassives)
var treePassives = [
    new TreeCluster('SOVEREIGNTY',      'Sovereignty',           10, 1, true, false),
    new TreeCluster('LEADERSHIP',       'Leadership',            6,  1, true, true),
    new TreeCluster('INFLUENCE',        'Influence',             14, 1, true, true),
    new TreeCluster('CHARISMA',         'Charisma',              6,  0, true, true),
    new TreeCluster('CHAMPION_CAUSE',   'Champion of the Cause', 6,  1, true, true),
    new TreeCluster('DEVOTION',         'Devotion',              3,  0, true, true),
    new TreeCluster('POTENCY',          'Conqueror\'s Pontency', 3,  0, false,false),
]

export default treePassives;