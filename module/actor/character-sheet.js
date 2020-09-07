import {ADNDActorSheet} from "./actor-sheet.js"

export class ADNDCharacterSheet extends ADNDActorSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["adnd1", "sheet", "actor", "character"],
            template: "systems/adnd1/templates/actor/character-sheet.handlebars",
            width: 1100,
            height: 600,
            tabs: [{
                navSelector: ".sheet-tabs",
                contentSelector: ".sheet-body",
                initial: "abilities"
            }]
        });
    }

    /* -------------------------------------------- */

    /** @override */
    getData() {
        const data = super.getData();
        return data;
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);
    }
}
