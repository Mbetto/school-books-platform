// watermark.js

/**
 * Adds a watermark to a given HTML element.
 * @param {HTMLElement} element - The element to apply the watermark to.
 * @param {string} text - The watermark text.
 * @param {Object} [options] - Optional configuration for the watermark.
 * @param {string} [options.color='#ccc'] - The color of the watermark text.
 * @param {string} [options.font='16px Arial'] - The font of the watermark text.
 * @param {number} [options.opacity=0.5] - The opacity of the watermark text.
 * @param {number} [options.angle=-45] - The rotation angle of the watermark text.
 */
export function addWatermark(element, text, options = {}) {
    const {
        color = '#ccc',
        font = '16px Arial',
        opacity = 0.5,
        angle = -45,
    } = options;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const rect = element.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.translate(centerX, centerY);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);

    ctx.fillText(text, centerX, centerY);

    element.style.backgroundImage = `url(${canvas.toDataURL()})`;
    element.style.backgroundRepeat = 'no-repeat';
    element.style.backgroundSize = 'cover';
}