var clusterNodes = [

    { name: 'Small 3% Aura Effect', affects:[], auraEffect: 3, amount: 0},

    { name: 'Small 4% Aura Effect', affects:[], auraEffect: 4, amount: 0 },
    
    { name: 'First Among Equals', affects: [], auraEffect: 8, amount: 0 },

    { name: 'Replenishing Presence', affects: [], special: true,auraEffect: 8, amount: 0, effect: function(){ return [`Regenerate ${this.amount}% of Life per second`] }},

    { name: 'Vengeful Commander', affects: ['ANGER', 'HATRED', 'WRATH'], auraEffect: 20, amount: 0 },

    { name: 'Stalwart Commander', affects: ['GRACE', 'DISCIPLINE', 'DETERMINATION'], auraEffect: 20, amount: 0 },

    { name: 'Pure Commander', affects:[['PURITY_ICE', 'PURITY_FIRE', 'PURITY_LIGHTNING'], ['PURITY_ELEMENTS']], auraEffect: [10, 30], amount: 0},

    { name: 'Precise Commander', affects: undefined, key:'PRECISE_COMMANDER', special: true, amount: 0, effect: function(){ return [`${25 * this.amount}% increased Critical Strike Chance`,`+${10 * this.amount}% to Critical Strike Multiplier`] }} 
]
export default clusterNodes;