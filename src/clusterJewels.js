var clusterNodes = [

    { name: 'Small 6% Aura Effect', affects:[], auraEffect: 6, amount: 0},

    { name: 'Small 7% Aura Effect', affects:[], auraEffect: 7, amount: 0 },

    { name: 'Small 8% Aura Effect', affects:[], auraEffect: 8, amount: 0 },
    
    { name: 'First Among Equals', affects: [], auraEffect: 10, amount: 0 },

    { name: 'Replenishing Presence', affects: [], auraEffect: 8, amount: 0 },

    { name: 'Vengeful Commander', affects: ['ANGER', 'HATRED', 'WRATH'], auraEffect: 20, amount: 0 },

    { name: 'Stalwart Commander', affects: ['GRACE', 'DISCIPLINE', 'DETERMINATION'], auraEffect: 30, amount: 0 },

    { name: 'Pure Commander', affects:[['PURITY_ICE', 'PURITY_FIRE', 'PURITY_LIGHTNING'], ['PURITY_ELEMENTS']], auraEffect: [10, 30], amount: 0},

    { name: 'Precise Commander', key:'PRECISE_COMMANDER', special: true, amount: 0, effect: function(){ return [`${25 * this.amount}% increased Critical Strike Chance`,`+${10 * this.amount}% to Critical Strike Multiplier`] }} 
]
export default clusterNodes;