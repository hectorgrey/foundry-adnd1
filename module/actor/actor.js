/**
 * Extend the base Actor entity by defining a custom roll data
 * structure which is ideal for the Simple system.
 * @extends {Actor}
 */

// Ability tables as dictionaries
const strTable = {
    3:  {toHit: -3, damage: -1, weight:  150, openDoor: 1, forceLock: 0, bendBars:  0},
    4:  {toHit: -2, damage: -1, weight:  250, openDoor: 1, forceLock: 0, bendBars:  0},
    5:  {toHit: -2, damage: -1, weight:  250, openDoor: 1, forceLock: 0, bendBars:  0},
    6:  {toHit: -1, damage:  0, weight:  350, openDoor: 1, forceLock: 0, bendBars:  0},
    7:  {toHit: -1, damage:  0, weight:  350, openDoor: 1, forceLock: 0, bendBars:  0},
    8:  {toHit:  0, damage:  0, weight:  500, openDoor: 2, forceLock: 0, bendBars:  1},
    9:  {toHit:  0, damage:  0, weight:  500, openDoor: 2, forceLock: 0, bendBars:  1},
    10: {toHit:  0, damage:  0, weight:  500, openDoor: 2, forceLock: 0, bendBars:  2},
    11: {toHit:  0, damage:  0, weight:  500, openDoor: 2, forceLock: 0, bendBars:  2},
    12: {toHit:  0, damage:  0, weight:  600, openDoor: 2, forceLock: 0, bendBars:  4},
    13: {toHit:  0, damage:  0, weight:  600, openDoor: 2, forceLock: 0, bendBars:  4},
    14: {toHit:  0, damage:  0, weight:  700, openDoor: 2, forceLock: 0, bendBars:  7},
    15: {toHit:  0, damage:  0, weight:  700, openDoor: 2, forceLock: 0, bendBars:  7},
    16: {toHit:  0, damage:  1, weight:  850, openDoor: 3, forceLock: 0, bendBars: 10},
    17: {toHit:  1, damage:  1, weight: 1000, openDoor: 3, forceLock: 0, bendBars: 13},
    18: {toHit:  1, damage:  2, weight: 1250, openDoor: 3, forceLock: 0, bendBars: 16}
};

const intTable = {
    3:  {langs: 0, maxLevel: 0, spellChance:  0, minSpells:  0, maxSpells:  0},
    4:  {langs: 0, maxLevel: 0, spellChance:  0, minSpells:  0, maxSpells:  0},
    5:  {langs: 0, maxLevel: 0, spellChance:  0, minSpells:  0, maxSpells:  0},
    6:  {langs: 0, maxLevel: 0, spellChance:  0, minSpells:  0, maxSpells:  0},
    7:  {langs: 0, maxLevel: 0, spellChance:  0, minSpells:  0, maxSpells:  0},
    8:  {langs: 1, maxLevel: 0, spellChance:  0, minSpells:  0, maxSpells:  0},
    9:  {langs: 1, maxLevel: 4, spellChance: 35, minSpells:  4, maxSpells:  6},
    10: {langs: 2, maxLevel: 5, spellChance: 45, minSpells:  5, maxSpells:  7},
    11: {langs: 2, maxLevel: 5, spellChance: 45, minSpells:  5, maxSpells:  7},
    12: {langs: 3, maxLevel: 6, spellChance: 45, minSpells:  5, maxSpells:  7},
    13: {langs: 3, maxLevel: 6, spellChance: 55, minSpells:  6, maxSpells:  9},
    14: {langs: 4, maxLevel: 7, spellChance: 65, minSpells:  6, maxSpells:  9},
    15: {langs: 4, maxLevel: 7, spellChance: 65, minSpells:  7, maxSpells: 11},
    16: {langs: 5, maxLevel: 8, spellChance: 65, minSpells:  7, maxSpells: 11},
    17: {langs: 6, maxLevel: 8, spellChance: 75, minSpells:  8, maxSpells: 14},
    18: {langs: 7, maxLevel: 9, spellChance: 85, minSpells:  9, maxSpells: 18},
    19: {langs: 7, maxLevel: 9, spellChance: 95, minSpells: 10, maxSpells: 99}
};

const wisTable = {
    3:  {magicSave: -3, maxLevel: 0, bonusSpells: {1: 0, 2:0, 3:0, 4:0}, failure: 100},
    4:  {magicSave: -2, maxLevel: 0, bonusSpells: {1: 0, 2:0, 3:0, 4:0}, failure: 100},
    5:  {magicSave: -1, maxLevel: 0, bonusSpells: {1: 0, 2:0, 3:0, 4:0}, failure: 100},
    6:  {magicSave: -1, maxLevel: 0, bonusSpells: {1: 0, 2:0, 3:0, 4:0}, failure: 100},
    7:  {magicSave: -1, maxLevel: 0, bonusSpells: {1: 0, 2:0, 3:0, 4:0}, failure: 100},
    8:  {magicSave:  0, maxLevel: 0, bonusSpells: {1: 0, 2:0, 3:0, 4:0}, failure: 100},
    9:  {magicSave:  0, maxLevel: 5, bonusSpells: {1: 0, 2:0, 3:0, 4:0}, failure:  20},
    10: {magicSave:  0, maxLevel: 5, bonusSpells: {1: 0, 2:0, 3:0, 4:0}, failure:  15},
    11: {magicSave:  0, maxLevel: 5, bonusSpells: {1: 0, 2:0, 3:0, 4:0}, failure:  10},
    12: {magicSave:  0, maxLevel: 5, bonusSpells: {1: 0, 2:0, 3:0, 4:0}, failure:   5},
    13: {magicSave:  0, maxLevel: 5, bonusSpells: {1: 1, 2:0, 3:0, 4:0}, failure:   0},
    14: {magicSave:  0, maxLevel: 5, bonusSpells: {1: 2, 2:0, 3:0, 4:0}, failure:   0},
    15: {magicSave:  1, maxLevel: 5, bonusSpells: {1: 2, 2:1, 3:0, 4:0}, failure:   0},
    16: {magicSave:  2, maxLevel: 5, bonusSpells: {1: 2, 2:2, 3:0, 4:0}, failure:   0},
    17: {magicSave:  3, maxLevel: 6, bonusSpells: {1: 2, 2:2, 3:1, 4:0}, failure:   0},
    18: {magicSave:  4, maxLevel: 7, bonusSpells: {1: 2, 2:2, 3:1, 4:1}, failure:   0}
};

const dexTable = {
    3:  {reaction: -3, defence:  4},
    4:  {reaction: -2, defence:  3},
    5:  {reaction: -1, defence:  2},
    6:  {reaction:  0, defence:  1},
    7:  {reaction:  0, defence:  0},
    8:  {reaction:  0, defence:  0},
    9:  {reaction:  0, defence:  0},
    10: {reaction:  0, defence:  0},
    11: {reaction:  0, defence:  0},
    12: {reaction:  0, defence:  0},
    13: {reaction:  0, defence:  0},
    14: {reaction:  0, defence:  0},
    15: {reaction:  0, defence: -1},
    16: {reaction:  1, defence: -2},
    17: {reaction:  2, defence: -3},
    18: {reaction:  3, defence: -4},
    19: {reaction:  3, defence: -4}
};

const conTable = {
    3:  {hp: -2, systemShock: 35, resurrection:  40},
    4:  {hp: -1, systemShock: 40, resurrection:  45},
    5:  {hp: -1, systemShock: 45, resurrection:  50},
    6:  {hp: -1, systemShock: 50, resurrection:  55},
    7:  {hp:  0, systemShock: 55, resurrection:  60},
    8:  {hp:  0, systemShock: 60, resurrection:  65},
    9:  {hp:  0, systemShock: 65, resurrection:  70},
    10: {hp:  0, systemShock: 70, resurrection:  75},
    11: {hp:  0, systemShock: 75, resurrection:  80},
    12: {hp:  0, systemShock: 80, resurrection:  85},
    13: {hp:  0, systemShock: 85, resurrection:  90},
    14: {hp:  0, systemShock: 88, resurrection:  92},
    15: {hp:  1, systemShock: 91, resurrection:  94},
    16: {hp:  2, systemShock: 95, resurrection:  96},
    17: {hp:  3, systemShock: 97, resurrection:  98},
    18: {hp:  4, systemShock: 99, resurrection: 100},
    19: {hp:  4, systemShock: 99, resurrection: 100}
};

const chaTable = {
    3:  {henchmen:  1, loyalty: -30, reaction: -25},
    4:  {henchmen:  1, loyalty: -25, reaction: -20},
    5:  {henchmen:  2, loyalty: -20, reaction: -15},
    6:  {henchmen:  2, loyalty: -15, reaction: -10},
    7:  {henchmen:  3, loyalty: -10, reaction:  -5},
    8:  {henchmen:  3, loyalty:  -5, reaction:   0},
    9:  {henchmen:  4, loyalty:   0, reaction:   0},
    10: {henchmen:  4, loyalty:   0, reaction:   0},
    11: {henchmen:  4, loyalty:   0, reaction:   0},
    12: {henchmen:  5, loyalty:   0, reaction:   0},
    13: {henchmen:  5, loyalty:   0, reaction:   5},
    14: {henchmen:  6, loyalty:   5, reaction:  10},
    15: {henchmen:  7, loyalty:  15, reaction:  15},
    16: {henchmen:  8, loyalty:  20, reaction:  25},
    17: {henchmen: 10, loyalty:  30, reaction:  30},
    18: {henchmen: 15, loyalty:  40, reaction:  35}
};

export class ADNDActor extends Actor {

    /**
     * Augment the basic actor data with additional dynamic data.
     */
    prepareData() {
	super.prepareData();

	const actorData = this.data;
	const data = actorData.data;
	const flags = actorData.flags;

	// Make separate methods for each Actor type (character, npc,
	// etc.) to keep things organized.
	if (actorData.type === 'character')
	    this._prepareCharacterData(actorData);
    }

    /**
     * Prepare Character type specific data
     */
    _prepareCharacterData(actorData) {
	const data = actorData.data;

	// Each ability draws from a table rather than being easy to
	// calculate.  It would likely be most efficient to hard code
	// the tables, and then to access the data directly from
	// there, rather than to run each ability through a custom
	// switch statement, which would be the quick and dirty
	// option.


    }

}
