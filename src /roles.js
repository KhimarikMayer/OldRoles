// roles.js
export const GRADIENT_SELECTOR = '[fill^="url(#dotGradient"]';

export function processGradientElement(gradientElement, settings) {
    const role = gradientElement.closest('.role_af3987, .role__48c1c, .role__5d7c9');
    if (!role) return false;
    if (role.hasAttribute('data-gradient-processed')) return false;
    
    const fill = gradientElement.getAttribute('fill');
    const gradientMatch = fill.match(/url\(#([^)]+)\)/);
    if (!gradientMatch) return false;
    
    const gradientId = gradientMatch[1];
    const gradient = document.getElementById(gradientId);
    if (!gradient) return false;
    
    const stops = gradient.querySelectorAll('stop');
    if (stops.length < 2) return false;
    
    const getStopColor = (stop) => {
        let color = stop.getAttribute('stop-color');
        if (!color) return null;
        
        const match = color.match(/#([0-9a-fA-F]{6})/);
        if (match) return '#' + match[1];
        
        if (color.startsWith('#')) return color;
        
        return null;
    };
    
    let color1 = getStopColor(stops[0]);
    let color2 = getStopColor(stops[1]);
    let color3 = stops[2] ? getStopColor(stops[2]) : color1;
    
    if (!color1 || !color2) return false;
    
    const toRgba = (hex, opacity) => {
        if (hex && hex.startsWith('#')) {
            const r = parseInt(hex.slice(1,3), 16);
            const g = parseInt(hex.slice(3,5), 16);
            const b = parseInt(hex.slice(5,7), 16);
            if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
                return `rgba(${r}, ${g}, ${b}, ${opacity})`;
            }
        }
        return hex;
    };
    
    role.style.setProperty('border', `1px solid ${toRgba(color2, 0.6)}`, 'important');
    if (settings.enableBackground) {
        role.style.setProperty('background', `linear-gradient(to right, ${toRgba(color1, 0.153)}, ${toRgba(color2, 0.153)}, ${toRgba(color3, 0.153)})`, 'important');
    }
    role.setAttribute('data-gradient-processed', 'true');
    
    return true;
}

export class RoleManager {
    constructor(settings) {
        this.roleSelector = '.role_af3987, .role__5d7c9, .roleTag__9e177, .tag__0e476, .role__48c1c';
        this.settings = settings;
        this.gradientStyles = [];
    }

    getRoleColor(role) {
        const colorElement = role.querySelector('[class*="roleCircle"] rect, [class*="roleColor"] rect, [class*="tagRoleColor"] rect, [class*="roleDot"] rect') ||
                            role.querySelector('[class*="roleCircle"], [class*="roleColor"], [class*="tagRoleColor"], [class*="roleDot"]');
        
        if (colorElement) {
            let color;
            if (colorElement.tagName === 'RECT') {
                color = colorElement.getAttribute('fill');
            } else {
                color = window.getComputedStyle(colorElement).backgroundColor;
            }
            
            if (color && color !== 'rgba(0, 0, 0, 0)') {
                const match = color.match(/[\d\.]+/g);
                if (match && match.length >= 3) {
                    return {
                        border: `1px solid rgba(${match[0]}, ${match[1]}, ${match[2]}, 0.6)`,
                        background: `rgba(${match[0]}, ${match[1]}, ${match[2]}, 0.153)`
                    };
                }
                if (color.startsWith('#')) {
                    const r = parseInt(color.slice(1,3), 16);
                    const g = parseInt(color.slice(3,5), 16);
                    const b = parseInt(color.slice(5,7), 16);
                    return {
                        border: `1px solid rgba(${r}, ${g}, ${b}, 0.6)`,
                        background: `rgba(${r}, ${g}, ${b}, 0.153)`
                    };
                }
            }
        }
        
        const dotBorder = role.querySelector('.dotBorderColor__4f569');
        if (dotBorder) {
            const gradient = window.getComputedStyle(dotBorder, '::before').backgroundImage;
            if (gradient && gradient !== 'none') {
                return {
                    border: `1px solid transparent`,
                    background: gradient
                };
            }
        }
        
        const gradientElement = role.querySelector('.twoColorGradient_e5de78, .gradientDotAnimation_e5de78');
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
                
                return {
                    border: `1px solid transparent`,
                    background: `linear-gradient(to right, ${c1}, ${c2}, ${c3})`
                };
            }
        }
        
        return null;
    }

    processRectColors() {
        const gradientElements = document.querySelectorAll(GRADIENT_SELECTOR);
        gradientElements.forEach(el => processGradientElement(el, this.settings));
        
        const roles = document.querySelectorAll('.role_af3987, .role__48c1c');
        
        roles.forEach(role => {
            if (role.hasAttribute('data-border-colorful')) return;
            
            const gradientElement = role.querySelector('[fill^="url(#dotGradient"]');
            if (gradientElement) return;
            
            const colorElement = role.querySelector('rect[fill]:not([fill="black"]), circle[fill]:not([fill="black"])');
            if (colorElement) {
                let fill = colorElement.getAttribute('fill');
                if (fill && !fill.includes('url(')) {
                    const rgbMatch = fill.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                    if (rgbMatch) {
                        const r = parseInt(rgbMatch[1]);
                        const g = parseInt(rgbMatch[2]);
                        const b = parseInt(rgbMatch[3]);
                        role.style.border = `1px solid rgba(${r}, ${g}, ${b}, 0.6)`;
                        if (this.settings.enableBackground) {
                            role.style.background = `rgba(${r}, ${g}, ${b}, 0.153)`;
                        }
                        role.setAttribute('data-border-colorful', 'true');
                    } else if (fill.startsWith('#')) {
                        const r = parseInt(fill.slice(1,3), 16);
                        const g = parseInt(fill.slice(3,5), 16);
                        const b = parseInt(fill.slice(5,7), 16);
                        role.style.border = `1px solid rgba(${r}, ${g}, ${b}, 0.6)`;
                        if (this.settings.enableBackground) {
                            role.style.background = `rgba(${r}, ${g}, ${b}, 0.153)`;
                        }
                        role.setAttribute('data-border-colorful', 'true');
                    }
                }
            }
        });
    }

    applyBorders() {
        const roles = document.querySelectorAll(this.roleSelector);
        roles.forEach(role => {
            if (!role.hasAttribute('data-border-colorful')) {
                const colors = this.getRoleColor(role);
                if (colors) {
                    role.style.border = colors.border;
                    
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
        
        const gradientRoles = document.querySelectorAll('.role__48c1c');
        gradientRoles.forEach(role => {
            if (!this.settings.enableBackground) {
                role.style.background = '';
                role.style.backgroundColor = '';
                role.style.backgroundImage = '';
            }
        });
    }

    processGradients() {
        const elements = document.querySelectorAll('[fill^="url(#dotGradient"]');
        
        elements.forEach(el => {
            let role = el.closest('.role_af3987, .role__48c1c, .role__5d7c9');
            
            if (!role && el.ownerSVGElement) {
                role = el.ownerSVGElement.closest('.role_af3987, .role__48c1c, .role__5d7c9');
            }
            
            if (!role) return;
            
            const fill = el.getAttribute('fill');
            const idMatch = fill.match(/url\(#([^)]+)\)/);
            if (!idMatch) return;
            
            const gradient = document.getElementById(idMatch[1]);
            if (!gradient) return;
            
            const stops = gradient.querySelectorAll('stop');
            if (stops.length < 2) return;
            
            const getColor = (stop) => {
                const style = stop.getAttribute('style');
                if (style) {
                    const rgbMatch = style.match(/stop-color:\s*rgb\((\d+),\s*(\d+),\s*(\d+)\)/i);
                    if (rgbMatch) {
                        return { r: parseInt(rgbMatch[1]), g: parseInt(rgbMatch[2]), b: parseInt(rgbMatch[3]) };
                    }
                }
                let color = stop.getAttribute('stop-color');
                if (color) {
                    const hexMatch = color.match(/#([0-9a-fA-F]{6})/);
                    if (hexMatch) {
                        const hex = hexMatch[0];
                        return {
                            r: parseInt(hex.slice(1,3), 16),
                            g: parseInt(hex.slice(3,5), 16),
                            b: parseInt(hex.slice(5,7), 16)
                        };
                    }
                }
                return null;
            };
            
            let c1 = getColor(stops[0]);
            let c2 = getColor(stops[1]);
            let c3 = stops[2] ? getColor(stops[2]) : c1;
            
            if (!c1 || !c2) return;
            
            role.style.setProperty('border', `1px solid rgba(${c1.r}, ${c1.g}, ${c1.b}, 0.6)`, 'important');
            if (this.settings.enableBackground) {
                role.style.setProperty('background', `linear-gradient(to right, rgba(${c1.r}, ${c1.g}, ${c1.b}, 0.153), rgba(${c2.r}, ${c2.g}, ${c2.b}, 0.153), rgba(${c3.r}, ${c3.g}, ${c3.b}, 0.153))`, 'important');
            } else {
                role.style.setProperty('background', 'rgba(0, 0, 0, 0)', 'important');
                role.style.setProperty('background-color', 'transparent', 'important');
                role.style.setProperty('background-image', 'none', 'important');
            }
            
            role.setAttribute('data-gradient-processed', 'true');
        });
    }

    destroy() {
        if (this.gradientStyles) {
            this.gradientStyles.forEach(style => style.remove());
            this.gradientStyles = [];
        }
        
        const roles = document.querySelectorAll(this.roleSelector);
        roles.forEach(role => {
            role.style.border = '';
            role.style.backgroundColor = '';
            role.style.background = '';
            role.removeAttribute('data-border-colorful');
            role.removeAttribute('data-gradient-processed');
        });
    }
}
