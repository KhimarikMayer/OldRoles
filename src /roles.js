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
                
                if (this.settings.enableBackground) {
                    role.style.background = colors.background;
                }
                
                role.setAttribute('data-border-colorful', 'true');
            }
        }
    });
}
