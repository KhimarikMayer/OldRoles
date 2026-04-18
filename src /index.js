const betterdiscord = new BdApi("OldRoles");
const react = BdApi.React;

import { RoleManager } from './roles.js';
import { Settings } from './settings.js';
import styles from './styles.css';

class OldRoles {
    constructor() {
        this.roleManager = null;
        this.observer = null;
        this.styleElement = null;
        this.settings = null;
    }

    start() {
        // Добавляем стили
        if (!this.styleElement) {
            this.styleElement = document.createElement('style');
            this.styleElement.id = 'oldroles-styles';
            this.styleElement.textContent = styles;
            document.head.appendChild(this.styleElement);
        }

        // Загружаем настройки
        this.settings = Settings.load();

        // Инициализируем менеджер ролей
        this.roleManager = new RoleManager(this.settings);

        // Первичная обработка
        setTimeout(() => {
            this.roleManager.applyBorders();
            this.roleManager.processRectColors();
            this.roleManager.processGradients();
        }, 0);

        // MutationObserver для динамических изменений
        this.observer = new MutationObserver(() => {
            this.roleManager.applyBorders();
            this.roleManager.processRectColors();
            this.roleManager.processGradients();
        });
        this.observer.observe(document.body, { childList: true, subtree: true });
    }

    stop() {
        if (this.roleManager) {
            this.roleManager.destroy();
        }
        if (this.styleElement) {
            this.styleElement.remove();
            this.styleElement = null;
        }
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }

    getSettingsPanel() {
        const FormSwitch = betterdiscord.Webpack.getBulk({
            filter: betterdiscord.Webpack.Filters.byStrings('"data-toggleable-component":"switch"', 'layout:"horizontal"'),
            searchExports: true
        })[0];

        return react.createElement(() => {
            const [state, setState] = react.useState(this.settings.enableBackground);
            
            const handleChange = (value) => {
                setState(value);
                this.settings.enableBackground = value;
                Settings.save(this.settings);
                
                // Применяем изменения
                document.querySelectorAll('.role_af3987, .role__48c1c, .role__5d7c9').forEach(role => {
                    role.style.removeProperty('border');
                    role.style.removeProperty('background');
                    role.removeAttribute('data-gradient-processed');
                    role.removeAttribute('data-border-colorful');
                });
                
                if (this.roleManager.gradientStyles) {
                    this.roleManager.gradientStyles.forEach(style => style.remove());
                    this.roleManager.gradientStyles = [];
                }
                
                this.roleManager.processGradients();
            };
            
            return react.createElement('div', { className: 'settingsContainer', style: { padding: '16px' } },
                react.createElement(FormSwitch, {
                    label: "Background roles",
                    description: "Adds transparent background of roles (opacity 0.153)",
                    checked: state,
                    onChange: handleChange
                })
            );
        });
    }
}

module.exports = OldRoles;
