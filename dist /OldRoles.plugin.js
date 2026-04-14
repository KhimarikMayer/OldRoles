/**
 * @name OldRoles
 * @author KhimarikMayer
 * @description A full accurate restoration of Discord's roles layout
 * @version 1.0
 */

const betterdiscord = new BdApi("OldRoles");
const react = BdApi.React;

let FormSwitch;
let styleElement = null;

const baseCSS = `
.role_af3987.pillButton_af3987,
.role_af3987.pillButton_af3987:hover,
.role_af3987.expandButton_af3987,
.expandButton_fccfdf,
.collapseButton_fccfdf {
    background-color: rgba(0, 0, 0, 0) !important;
    padding: 2px 4px;
}
.role_af3987.pillButton_af3987 {
    border: 1px solid #4f545c !important;
    border-radius: 50px;
}
.expandButton_fccfdf .text-xs\\/medium_cf4812 {
    line-height: 12px;
}
.addButton_af3987,
.overflowButton__48c1c,
.expandButton_fccfdf.pill_fccfdf,
.collapseButton_fccfdf.pill_fccfdf,
.role_af3987.pillButton_af3987 {
    border: 1px solid #4f545c !important;
    border-radius: 50px;
}
.vc-permviewer-role-button,
.button__7d7f7 {
    background-color: rgba(0, 0, 0, 0) !important;
    border: 1px solid #4f545c !important;
    max-height: 22px;
    min-height: 22px;
    height: 22px;
    border-radius: 50px;
}
.vc-permviewer-role-button {
    line-height: 12px;
    font-size: 12px;
}
.vc-permviewer-role-button :where(.buttonInner_fb7f94).icon_fb7f94 {
    min-width: 12px;
    min-height: 12px;
    max-width: 12px;
    max-height: 12px;
}
.pillButton_af3987 svg,
.button__7d7f7 svg,
.addButton_af3987 svg {
    width: 12px;
    height: 12px;
}
.pillButton_af3987,
.addButton_af3987 {
    min-width: 22px;
    height: 22px;
}
.roleName_dfa8b6,
.member-perms .member-perm .name {
    margin-right: 0;
}
.roleCircle__4f569 {
    margin-left: 2px;
}
.removeButton_af3987 {
    margin-right: -4px;
}
.role__48c1c .roleCircle__4f569 {
    margin-left: 0;
}
.role_af3987:has(.roleIcon_af3987) .roleName_af3987 {
    margin-right: -2px;
}
.role_af3987:not(:has(.roleIcon_af3987)) .roleName_af3987 {
    margin-right: -4px !important;
}
.member-perms .member-perm .perm-circle {
    margin-left: 2px !important;
    margin-right: 4px !important;
}
.rolesList [data-text-variant="text-xs/normal"] {
    font-weight: 400;
}
.roleIcon_af3987 {
    margin-top: -6px;
    margin-left: 6px;
    margin-right: -4px;
}
.role_af3987:has(.twoColorGradient_e5de78,.gradientDotAnimation_e5de78) .roleIcon_af3987 {
    margin-left: 4px;
}
.role_af3987 {
    min-height: 22px;
    height: 22px;
}
.role__48c1c:has(.twoColorGradient_e5de78,.gradientDotAnimation_e5de78),
.role_af3987:has(.twoColorGradient_e5de78,.gradientDotAnimation_e5de78) {
    transform: translate(0);
    border: 0 !important;
}
.role__48c1c:has(.twoColorGradient_e5de78,.gradientDotAnimation_e5de78) .roleRemoveButton__48c1c,
.role_af3987:has(.twoColorGradient_e5de78,.gradientDotAnimation_e5de78) .removeButton_af3987 {
    position: static;
    cursor: unset;
    margin-left: -4px;
}
.role__48c1c:has(.twoColorGradient_e5de78,.gradientDotAnimation_e5de78) .roleRemoveButton__48c1c {
    margin-left: -2px;
}
:is(.role__48c1c:has(.twoColorGradient_e5de78,.gradientDotAnimation_e5de78) .roleCircle__4f569):before,
:is(.role_af3987:has(.twoColorGradient_e5de78,.gradientDotAnimation_e5de78) .roleCircle__4f569,.roleFlowerStar_af3987):before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: inherit;
    border-radius: 11px;
    border: 1px solid rgba(0, 0, 0, 0);
    -webkit-mask: linear-gradient(#000, #000) padding-box, linear-gradient(#000, #000);
    -webkit-mask-composite: xor;
    opacity: 0.6;
    content: "";
    z-index: -1;
    pointer-events: none;
}
.role__48c1c:has(.twoColorGradient_e5de78,.gradientDotAnimation_e5de78) .roleCircle__4f569,
.role_af3987:has(.twoColorGradient_e5de78,.gradientDotAnimation_e5de78) .roleCircle__4f569 {
    margin-left: 3px;
}
.role_af3987:has(.twoColorGradient_e5de78,.gradientDotAnimation_e5de78) .roleName_af3987 {
    margin-right: -1px;
}
.tagRoleColor__0e476 {
    margin-left: -2px;
}
.tag__0e476:has(.tagRoleColor__0e476) .tagLabel__0e476 {
    padding-left: 4px;
}
.tag__0e476:has(.tagRoleColor__0e476) {
    padding: 0 6px;
    padding-right: 3px;
}
.tag__0e476:has(.tagRoleColor__0e476) .close__0e476 {
    margin-left: 2px;
}
.roleDot__5d7c9 {
    margin-left: 0;
}
.role__5d7c9 {
    padding-top: 2px !important;
    padding-bottom: 2px !important;
}
.linkIcon_ebf183[style*="1.5px"] {
    margin: 1px !important;
}
.verifiedRoleIcon_e29cd7 {
    margin: 2px !important;
}
.roleText__9e177 {
    font-weight: 500;
    margin-right: 2px;
}
.addButton_af3987.showLabel_af3987 {
    padding-inline-start: 4px;
}
.member-perms {
    gap: 4px;
}
.roleTag__9e177 {
    background-color: var(--background-base-low) !important;
    border-radius: 5px;
    padding: 2px;
}
.roleDot__9e177 {
    margin-right: 4px;
}
.roleDot__9e177 {
    margin-left: 1px !important;
}
.role__5d7c9,
.roleTag__9cd44 {
    padding: 4px;
    background-color: rgba(0, 0, 0, 0);
}
.userPopout .bodyInnerWrapper .rolesList .addButton {
    border: 1px solid #4f545c !important;
}
.userPopout .bodyInnerWrapper .rolesList .addButton svg {
    width: 12px;
    height: 12px;
}
.roleRemoveIcon__48c1c {
    margin-inline: -7px 0 !important;
}
`;

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

module.exports = class ColorfulRoleBorders {
    constructor() {
    this.roleSelector = '.role_af3987, .role__5d7c9, .roleTag__9e177, .tag__0e476';
    this.observer = null;
    this.settings = Object.assign({}, settings.default);
    this.gradientStyles = [];
    }

    getRoleColor(role) {
        const colorElement = role.querySelector('[class*="roleCircle"]') ||
                            role.querySelector('[class*="roleColor"]') || 
                            role.querySelector('[class*="tagRoleColor"]');
        
        if (colorElement) {
            const color = window.getComputedStyle(colorElement).backgroundColor;
            if (color && color !== 'rgba(0, 0, 0, 0)') {
                const match = color.match(/[\d\.]+/g);
                if (match) {
                    return {
                        border: `1px solid rgba(${match[0]}, ${match[1]}, ${match[2]}, 0.6)`,
                        background: `rgba(${match[0]}, ${match[1]}, ${match[2]}, 0.153)`
                    };
                }
            }
        }
        
        const gradientElement = role.querySelector('[class*="twoColorGradient"], [class*="gradientDotAnimation"]');
        if (gradientElement) {
            const computed = window.getComputedStyle(gradientElement);
            const color1 = computed.getPropertyValue('--custom-gradient-color-1').trim();
            const color2 = computed.getPropertyValue('--custom-gradient-color-2').trim();
            const color3 = computed.getPropertyValue('--custom-gradient-color-3').trim();
            
            if (color1 && color2) {
                const toRgba = (color, opacity) => {
                    if (color.startsWith('#')) {
                        const r = parseInt(color.slice(1,3), 16);
                        const g = parseInt(color.slice(3,5), 16);
                        const b = parseInt(color.slice(5,7), 16);
                        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
                    }
                    if (color.startsWith('rgb')) {
                        return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
                    }
                    return color;
                };
                
                const c1 = toRgba(color1, 0.153);
                const c2 = toRgba(color2, 0.153);
                const c3 = color3 ? toRgba(color3, 0.153) : c1;
                
                const gradient = `linear-gradient(to right, ${c1}, ${c2}, ${c3})`;
                
                return {
                    border: `1px solid transparent`,
                    background: gradient
                };
            }
        }
        
        return null;
    }

applyBorders() {
    const roles = document.querySelectorAll(this.roleSelector);
    roles.forEach(role => {
        if (!role.hasAttribute('data-border-colorful')) {
            const colors = this.getRoleColor(role);
            if (colors) {
                role.style.border = colors.border;
                
                // Для role__48c1c отдельная логика
                if (role.classList.contains('role__48c1c')) {
                    if (this.settings.enableBackground) {
                        role.style.background = colors.background;
                    } else {
                        role.style.background = '';
                        role.style.backgroundColor = '';
                        role.style.backgroundImage = '';
                    }
                } else {
                    if (this.settings.enableBackground) {
                        role.style.background = colors.background;
                    } else {
                        role.style.background = '';
                        role.style.backgroundColor = '';
                    }
                }
                
                role.setAttribute('data-border-colorful', 'true');
            }
        }
    });
}

updateGradients() {
    const gradientRoles = document.querySelectorAll('.role__48c1c');
    
    if (this.gradientStyles) {
        this.gradientStyles.forEach(style => style.remove());
        this.gradientStyles = [];
    }
    
    if (!this.settings.enableBackground) return;
    
    const styles = [];
    
    gradientRoles.forEach(role => {
        const gradientElement = role.querySelector('.twoColorGradient_e5de78, .gradientDotAnimation_e5de78');
        if (!gradientElement) return;
        
        const computed = window.getComputedStyle(gradientElement);
        const color1 = computed.getPropertyValue('--custom-gradient-color-1').trim();
        const color2 = computed.getPropertyValue('--custom-gradient-color-2').trim();
        const color3 = computed.getPropertyValue('--custom-gradient-color-3').trim();
        
        if (!color1 || !color2) return;
        
        const toRgba = (color, opacity) => {
            if (color.startsWith('#')) {
                const r = parseInt(color.slice(1,3), 16);
                const g = parseInt(color.slice(3,5), 16);
                const b = parseInt(color.slice(5,7), 16);
                return `rgba(${r}, ${g}, ${b}, ${opacity})`;
            }
            if (color.startsWith('rgb')) {
                return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
            }
            return color;
        };
        
        const c1 = toRgba(color1, 0.153);
        const c2 = toRgba(color2, 0.153);
        const c3 = color3 ? toRgba(color3, 0.153) : c1;
        
        const gradient = `linear-gradient(to right, ${c1}, ${c2}, ${c3})`;
        
        const id = 'grad_' + Math.random().toString(36).substr(2, 9);
        role.setAttribute('data-gradient-id', id);
        
        const style = document.createElement('style');
        style.textContent = `
            .role__48c1c[data-gradient-id="${id}"] {
                background: ${gradient} !important;
                background-color: transparent !important;
            }
        `;
        document.head.appendChild(style);
        styles.push(style);
    });
    
    this.gradientStyles = styles;
}    
resetAllBackgrounds() {
    const allRoles = document.querySelectorAll(this.roleSelector);
    allRoles.forEach(role => {
        if (!this.settings.enableBackground) {
            role.style.background = '';
            role.style.backgroundColor = '';
        }
    });
    
    // ДОПОЛНИТЕЛЬНО: принудительно очищаем background для role__48c1c
    const gradientRoles = document.querySelectorAll('.role__48c1c');
    gradientRoles.forEach(role => {
        if (!this.settings.enableBackground) {
            role.style.background = '';
            role.style.backgroundColor = '';
            role.style.backgroundImage = '';
        }
    });
}

    start() {
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'oldroles-styles';
            styleElement.textContent = baseCSS;
            document.head.appendChild(styleElement);
        }
        
        try {
            const saved = betterdiscord.Data.load('settings');
            if (saved) this.settings = Object.assign(this.settings, saved);
        } catch(e) {}
        
        setTimeout(() => {
            this.applyBorders();
            this.updateGradients();
            this.resetAllBackgrounds();
        }, 2000);
        
        this.observer = new MutationObserver(() => {
            this.applyBorders();
            this.updateGradients();
            this.resetAllBackgrounds();
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
                        betterdiscord.Data.save('settings', this.settings);
                        
                        document.querySelectorAll(this.roleSelector).forEach(role => {
                            role.style.border = '';
                            role.style.backgroundColor = '';
                            role.style.background = '';
                            role.removeAttribute('data-border-colorful');
                        });
                        
                        this.applyBorders();
                        this.updateGradients();
                        this.resetAllBackgrounds();
                    }
                })
            );
        });
    }
};
