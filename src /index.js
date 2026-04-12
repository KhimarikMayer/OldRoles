const betterdiscord = new BdApi("OldRoles");
const react = BdApi.React;

let FormSwitch;

module.exports = class ColorfulRoleBorders {
    constructor() {
        this.roleSelector = '.role_af3987, .role__5d7c9, .roleTag__9e177, .tag__0e476';
        this.observer = null;
        this.settings = Object.assign({}, settings.default);
    }

    start() {
        if (!document.getElementById('oldroles-styles')) {
            const style = document.createElement('style');
            style.id = 'oldroles-styles';
            style.textContent = cssStyles;
            document.head.appendChild(style);
        }
        try {
            const saved = betterdiscord.Data.load('settings');
            if (saved) this.settings = Object.assign(this.settings, saved);
        } catch(e) {}
        
        setTimeout(() => this.applyBorders(), 2000);
        this.observer = new MutationObserver(() => this.applyBorders());
        this.observer.observe(document.body, { childList: true, subtree: true });
    }

    stop() {
        const style = document.getElementById('oldroles-styles');
        if (style) style.remove();
        if (this.observer) this.observer.disconnect();
        const roles = document.querySelectorAll(this.roleSelector);
        roles.forEach(role => {
            role.style.border = '';
            role.style.backgroundColor = '';
            role.removeAttribute('data-border-colorful');
        });
    }

    getSettingsPanel() {
        if (!FormSwitch) {
            FormSwitch = betterdiscord.Webpack.getBulk({
                filter: betterdiscord.Webpack.Filters.byStrings('"data-toggleable-component":"switch"', 'layout:"horizontal"'),
                searchExports: true
            })[0];
        }
        
        return react.createElement(() => {
            const [state, setState] = react.useState(this.settings.enableBackground);
            
            return react.createElement(
                'div',
                { className: 'settingsContainer', style: { padding: '16px' } },
                react.createElement(FormSwitch, {
                    label: settings.main.enableBackground.name,
                    description: settings.main.enableBackground.note,
                    checked: state,
                    onChange: (v) => {
                        setState(v);
                        this.settings.enableBackground = v;
                        betterdiscord.Data.save('settings', this.settings);
                        
                        document.querySelectorAll(this.roleSelector).forEach(role => {
                            role.style.border = '';
                            role.style.backgroundColor = '';
                            role.removeAttribute('data-border-colorful');
                        });
                        this.applyBorders();
                    }
                })
            );
        });
    }
};
