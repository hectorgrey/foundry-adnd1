// Import Modules
import { ADNDActor } from "./actor/actor.js";
import { ADNDActorSheet } from "./actor/actor-sheet.js";
import { ADNDItem } from "./item/item.js";
import { ADNDItemSheet } from "./item/item-sheet.js";

Hooks.once('init', async function() {

  game.adnd1 = {
    ADNDActor,
    ADNDItem
  };

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };

  // Define custom Entity classes
  CONFIG.Actor.entityClass = ADNDActor;
  CONFIG.Item.entityClass = ADNDItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("adnd1", ADNDActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("adnd1", ADNDItemSheet, { makeDefault: true });

  // If you need to add Handlebars helpers, here are a few useful examples:
  Handlebars.registerHelper('concat', function() {
    var outStr = '';
    for (var arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });
});