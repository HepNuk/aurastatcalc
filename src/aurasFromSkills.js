class AurasFromSkills{
    constructor(key, source, statLine, number, floor){
        this.active = true;
        this.key = key
        this.source = source;
        this.statLine = statLine;
        this.number = number;
        this.toFloor = floor;

        this.printEffect = function(auras, globalAuraEffect){
            
            let totalValue = 0;
            let arrayOfStats = [];
            
            //For Each Aura with level > 0 we add 1 + XX% Aura effect to total value 
            auras.forEach((aura) => {

               if (aura.level > 0){

                    //Formula to calculate a multiploer based on a percentague :  XX%/100 +1 or (XX% + 100)/100, using second one and divind at the end to avoid flaoting points.
                   totalValue += aura.getTotalAuraEffect(globalAuraEffect)+100;
               }
            })

            //Divide at the end of all the sums to avoid Floating point numbers.
            totalValue = totalValue/100;
            
            //for each statline from a given source we multiple its value by the multiploer
            for(let i = 0; i < this.statLine.length; i++){
                let toPush;

                if(this.toFloor[i] === true){
                    let value = Math.floor(this.number[i] * totalValue)
                    toPush = this.statLine[i].replace('##', value)
                } else {
                    let value = Math.floor(this.number[i] * totalValue * 100)/100
                    toPush = this.statLine[i].replace('##', value)
                }

                arrayOfStats.push(toPush);
            }

            
            return arrayOfStats;
        }
    } 
}

var aurasFromSkills = [

    new AurasFromSkills ('NECRO', 'Necromancer', ['##% increased Attack and Cast Speed'], [3], [true]),
    new AurasFromSkills ('GUARD', 'Guardian', ['+##% Physical Damage Reduction', '##% of Life Regenerated per second'], [1, 0.2], [true, false]),
    new AurasFromSkills ('SCIONN', 'Scion(Necro)', ['##% increased Attack and Cast Speed'], [2], [true]),
    new AurasFromSkills ('SCIONG', 'Scion(Guardian)', ['+##% Physical Damage Reduction'], [1], [true]),
    new AurasFromSkills ('WEPONE1', 'Weapon One-Hand(1)', ['##% incerased Damage'], [2], [true]),
    new AurasFromSkills ('WEPONE2', 'Weapon One-Hand(2)', ['##% incerased Damage'], [2], [true]),
    new AurasFromSkills ('WEPTWO', 'Weapon Two-Hand', ['##% incerased Damage'], [4], [true]),

]

export default aurasFromSkills;

/*
if (aura.level !== 0 && !aura.buff){
              
                    for(let i = 0; i < this.statLine.length; i++){
                    
                        if(this.toFloor[i] === true && this.key === 'GUARD'){
                            totalValue += calcStatFloored(this.number[i], aura.getTotalAuraEffect(globalAuraEffect));
                        } else {
                            console.log(this.number)
                            totalValue += calcStat(this.number[i], aura.getTotalAuraEffect(globalAuraEffect));
                            console.log(totalValue);
                        }

                        
                        //totalValue = 0;
                    }
                    arrayOfStats.push(this.statLine[0].replace('##', totalValue));
                }
                */