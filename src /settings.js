// settings.js
const betterdiscord = new BdApi("OldRoles");

export const Settings = {
    defaults: {
        enableBackground: false
    },

    load() {
        try {
            const saved = betterdiscord.Data.load('settings');
            if (saved) return Object.assign({}, this.defaults, saved);
        } catch(e) {}
        return Object.assign({}, this.defaults);
    },

    save(settings) {
        try {
            betterdiscord.Data.save('settings', settings);
        } catch(e) {}
    },

    reset() {
        try {
            betterdiscord.Data.save('settings', this.defaults);
        } catch(e) {}
        return Object.assign({}, this.defaults);
    }
};
