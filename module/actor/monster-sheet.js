import {ADNDActorSheet} from "./actor-sheet.js"

export class ADNDMonsterSheet extends ADNDActorSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["adnd1", "sheet", "actor", "monster"],
            template: "systems/adnd1/templates/actor/monster-sheet.handlebars",
            width: 800,
            height: 600,
            tabs: [{
                navSelector: ".sheet-tabs",
                contentSelector: ".sheet-body",
                initial: "description"
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
