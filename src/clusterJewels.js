var clusterNodes = {
    
    FIRST_AMONG: { name: 'First Among Equals', affects: [], auraEffect: 10, },

    REPLENISHING: { name: 'Replenishing Presence', affects: [], auraEffect: 8, },

    VENGEFUL: {  name: 'Vengeful Commander', affects: ['ANGER', 'HATRED', 'WRATH'], auraEffect: 20, },

    STALWART: { name: 'Stalwart Commander', affects: ['GRACE', 'DISCIPLINE', 'DETERMINATION'], auraEffect: 30, },

    PURE_COMMANDER: { name: 'Vengeful Commander', affects:[['PURITY_ICE', 'PURITY_FIRE', 'PURITY_LIGHTNING'], ['PURITY_ELEMENTS']], auraEffect: [10, 30],},

    SMALL_6:{ name: '6% Aura Effect', affects:[], auraEffect: 6 },

    SMALL_7:{ name: '7% Aura Effect', affects:[], auraEffect: 7 },

    SMALL_8:{ name: '8% Aura Effect', affects:[], auraEffect: 8 },
}

export default clusterNodes;