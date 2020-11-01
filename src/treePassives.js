class TreeCluster{
    constructor(key, name, notableAuraEffect, numSmallPassives){

        let tempArray = []

        for (let i = 0; i < numSmallPassives; i++){
            tempArray.push([false]) //all small nodes grant 6% aura effect
        }

        this.key = key;
        this.name = name;
        this.notable = new Notable(name, notableAuraEffect);
        this.smallPassives = tempArray;
        this.motm = false;

        this.clusterAuraEffect = function(){
            
            let sum = 0;

            for (let i = 0; i < this.smallPassives.length; i++){
                if(this.smallPassives[i][0] === true){
                    if(this.motm === true){
                        sum += 9;
                    } else sum += 6;
                }
            }
            
            if(this.notable.isActive && this.motm === false){
                sum += this.notable.auraEffect;
            }

            return sum;
        }
    }
}

class Notable{
    constructor(name, auraEffect){
        this.name = name;
        this.auraEffect = auraEffect;
        this.isActive = false;
    }
}

//new TreeCluster(key, name, notableAuraEffect, numSmallPassives)
var treePassives = [
    new TreeCluster('SOVEREIGNTY',      'Sovereignty',            10, 1),
    new TreeCluster('LEADERSHIP',       'Leadership',            6,  1),
    new TreeCluster('INFLUENCE',        'Influence',             14, 1),
    new TreeCluster('CHARISMA',         'Charisma',              6,  0),
    new TreeCluster('CHAMPION_OF_THE_CAUSE',   'Champion of the Cause', 6,  1),
    new TreeCluster('DEVOTION',         'Devotion',              3,  0),
    new TreeCluster('POTENCY',          'Conqueror\'s Pontency', 3,  0)
]

export default treePassives;