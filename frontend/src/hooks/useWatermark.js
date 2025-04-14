import { useEffect, useRef } from 'react';

const useWatermark = (text, options = {}) => {
    const {
        opacity = 0.1,
        fontSize = 20,
        color = 'black',
        rotate = -30,
        spacing = 200,
        zIndex = 9999,
        className = '',
        style = {}
    } = options;

    const watermarkRef = useRef(null);

    useEffect(() => {
        const watermarkId = 'custom-watermark';
        let watermark = document.getElementById(watermarkId);

        if (!watermark) {
            watermark = document.createElement('div');
            watermark.id = watermarkId;
            document.body.appendChild(watermark);
        }

        watermarkRef.current = watermark;

        // Apply styles
        Object.assign(watermark.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: zIndex.toString(),
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
                <svg xmlns='http://www.w3.org/2000/svg' width='${spacing}' height='${spacing}' fill-opacity='${opacity}'>
                    <text 
                        x='50%' 
                        y='50%' 
                        dominant-baseline='middle' 
                        text-anchor='middle' 
                        font-size='${fontSize}' 
                        fill='${color}'
                        transform='rotate(${rotate} 100 100)'
                    >
                        ${text}
                    </text>
                </svg>
            `)}")`,
            backgroundRepeat: 'repeat',
            backgroundSize: `${spacing}px ${spacing}px`,
            ...style
        });

        if (className) {
            watermark.className = className;
        }

        return () => {
            if (watermarkRef.current && document.body.contains(watermarkRef.current)) {
                document.body.removeChild(watermarkRef.current);
            }
        };
    }, [text, opacity, fontSize, color, rotate, spacing, zIndex, className, style]);

    return watermarkRef;
};

export default useWatermark;