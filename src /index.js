const { settings, loadSettings, saveSettings } = require('./settings.js');
const { applyBorders, updateGradients, resetAllBackgrounds } = require('./roleManager.js');

const betterdiscord = new BdApi("OldRoles");
const react = BdApi.React;

let FormSwitch;
let styleElement = null;
let gradientStyles = [];

module.exports = class ColorfulRoleBorders {
    constructor() {
        this.roleSelector = '.role_af3987, .role__5d7c9, .roleTag__9e177, .tag__0e476';
        this.observer = null;
        this.settings = loadSettings();
        this.gradientStyles = [];
    }

    start() {
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'oldroles-styles';
            styleElement.textContent = baseCSS;
            document.head.appendChild(styleElement);
        }
        
        setTimeout(() => {
            applyBorders(this.roleSelector, this.settings, { value: this.gradientStyles });
            updateGradients(this.settings, { value: this.gradientStyles });
            resetAllBackgrounds(this.roleSelector, this.settings);
        }, 2000);
        
        this.observer = new MutationObserver(() => {
            applyBorders(this.roleSelector, this.settings, { value: this.gradientStyles });
            updateGradients(this.settings, { value: this.gradientStyles });
            resetAllBackgrounds(this.roleSelector, this.settings);
        });
        this.observer.observe(document.body, { childList: true, subtree: true });
    }

    stop() {
        if (this.gradientStyles) {
            this.gradientStyles.forEach(style => style.remove());
            this.gradientStyles = [];
        }
        if (styleElement) styleElement.remove();
        if (this.observer) this.observer.disconnect();
        const roles = document.querySelectorAll(this.roleSelector);
        roles.forEach(role => {
            role.style.border = '';
            role.style.backgroundColor = '';
            role.style.background = '';
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
                        saveSettings(this.settings);
                        
                        document.querySelectorAll(this.roleSelector).forEach(role => {
                            role.style.border = '';
                            role.style.backgroundColor = '';
                            role.style.background = '';
                            role.removeAttribute('data-border-colorful');
                        });
                        
                        applyBorders(this.roleSelector, this.settings, { value: this.gradientStyles });
                        updateGradients(this.settings, { value: this.gradientStyles });
                        resetAllBackgrounds(this.roleSelector, this.settings);
                    }
                })
            );
        });
    }
};
