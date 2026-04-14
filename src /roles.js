function getRoleColor(role) {
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

function applyBorders(roleSelector, settings, gradientStyles) {
    const roles = document.querySelectorAll(roleSelector);
    roles.forEach(role => {
        if (!role.hasAttribute('data-border-colorful')) {
            const colors = getRoleColor(role);
            if (colors) {
                role.style.border = colors.border;
                
                if (role.classList.contains('role__48c1c')) {
                    if (settings.enableBackground) {
                        role.style.background = colors.background;
                    } else {
                        role.style.background = '';
                        role.style.backgroundColor = '';
                        role.style.backgroundImage = '';
                    }
                } else {
                    if (settings.enableBackground) {
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

function updateGradients(settings, gradientStyles) {
    const gradientRoles = document.querySelectorAll('.role__48c1c');
    
    if (gradientStyles.value) {
        gradientStyles.value.forEach(style => style.remove());
        gradientStyles.value = [];
    }
    
    if (!settings.enableBackground) return;
    
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
    
    gradientStyles.value = styles;
}

function resetAllBackgrounds(roleSelector, settings) {
    const allRoles = document.querySelectorAll(roleSelector);
    allRoles.forEach(role => {
        if (!settings.enableBackground) {
            role.style.background = '';
            role.style.backgroundColor = '';
        }
    });
    
    const gradientRoles = document.querySelectorAll('.role__48c1c');
    gradientRoles.forEach(role => {
        if (!settings.enableBackground) {
            role.style.background = '';
            role.style.backgroundColor = '';
            role.style.backgroundImage = '';
        }
    });
}

module.exports = { getRoleColor, applyBorders, updateGradients, resetAllBackgrounds };
