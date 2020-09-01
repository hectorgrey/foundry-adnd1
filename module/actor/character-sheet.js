import {ADNDActorSheet} from "./actor-sheet.js"

export class ADNDCharacterSheet extends ADNDActorSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["adnd1", "sheet", "actor", "character"],
            template: "systems/adnd1/templates/actor/character-sheet.html",
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
        data.dtypes = ["String", "Number", "Boolean"];
        for (let attr of Object.values(data.data.attributes)) {
            attr.isCheckbox = attr.dtype === "Boolean";
        }
        return data;
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;

        // Add Inventory Item
        html.find('.item-create').click(this._onItemCreate.bind(this));

        // Update Inventory Item
        html.find('.item-edit').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.getOwnedItem(li.data("itemId"));
            item.sheet.render(true);
        });

        // Delete Inventory Item
        html.find('.item-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            this.actor.deleteOwnedItem(li.data("itemId"));
            li.slideUp(200, () => this.render(false));
        });

        // Rollable abilities.
        html.find('.resurrection').click(this.onResurrectionRoll.bind(this));
        html.find('.system_shock').click(this.onSystemShockRoll.bind(this));
        html.find('.spell_failure').click(this.onSpellFailureRoll.bind(this));
        html.find('.spell_learning').click(this.onSpellLearningRoll.bind(this));
        html.find('.open_door').click(this.onOpenDoorRoll.bind(this));
        html.find('.force_lock').click(this.onForceLockRoll.bind(this));
        html.find('.bend_bars').click(this.onBendBarsRoll.bind(this));
    }

    /* -------------------------------------------- */

    /**
     * Handle creating a new Owned Item for the actor using initial
     * data defined in the HTML dataset
     * @param {Event} event   The originating click event
     * @private
     */

    onResurrectionRoll(event) {
        let roll = new Roll("1d100ms<@resurrection", this.actor.getRollData("resurrection"));
        roll.roll().toMessage({speaker: ChatMessage.getSpeaker()});
    }

    onSystemShockRoll(event) {
        let roll = new Roll("1d100ms<@system_shock", this.actor.getRollData("system_shock"));
        roll.roll().toMessage({speaker: ChatMessage.getSpeaker()});
    }

    onSpellFailureRoll(event) {
        let roll = new Roll("1d100ms<@spell_failure", this.actor.getRollData("spell_failure"));
        roll.roll().toMessage({speaker: ChatMessage.getSpeaker()});
    }

    onSpellLearningRoll(event) {
        let roll = new Roll("1d100ms<@spell_learning", this.actor.getRollData("spell_learning"));
        roll.roll().toMessage({speaker: ChatMessage.getSpeaker()});
    }

    onOpenDoorRoll(event) {
        let roll = new Roll("1d6ms<@open_door", this.actor.getRollData("open_door"));
        roll.roll().toMessage({speaker: ChatMessage.getSpeaker()});
    }

    onForceLockRoll(event) {
        let roll = new Roll("1d6ms<@force_lock", this.actor.getRollData("force_lock"));
        roll.roll().toMessage({speaker: ChatMessage.getSpeaker()});
    }

    onBendBarsRoll(event) {
        let roll = new Roll("1d100ms<@bend_bars", this.actor.getRollData("bend_bars"));
        roll.roll().toMessage({speaker: ChatMessage.getSpeaker()});
    }
    
    _onItemCreate(event) {
        event.preventDefault();
        const header = event.currentTarget;
        // Get the type of item to create.
        const type = header.dataset.type;
        // Grab any data associated with this control.
        const data = duplicate(header.dataset);
        // Initialize a default name.
        const name = `New ${type.capitalize()}`;
        // Prepare the item object.
        const itemData = {
            name: name,
            type: type,
            data: data
        };
        // Remove the type from the dataset since it's in the
        // itemData.type prop.
        delete itemData.data["type"];

        // Finally, create the item!
        return this.actor.createOwnedItem(itemData);
    }
}
