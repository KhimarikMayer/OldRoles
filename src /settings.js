const settings = {
    main: {
        enableBackground: {
            name: "Background roles",
            note: "Adds transparent background of roles (opacity 0.153)",
            initial: false
        }
    },
    default: {
        enableBackground: false
    }
};

function loadSettings() {
    try {
        const saved = BdApi.loadData('OldRoles', 'settings');
        if (saved) return Object.assign({}, settings.default, saved);
    } catch(e) {}
    return Object.assign({}, settings.default);
}

function saveSettings(settingsData) {
    try {
        BdApi.saveData('OldRoles', 'settings', settingsData);
    } catch(e) {}
}

module.exports = {
    config: settings,
    default: settings.default,
    load: loadSettings,
    save: saveSettings
};
