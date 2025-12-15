
export function convertZonesToJson(zones) {
    let annotations = []
    try {
        for (let i = 0; i < zones.length; i++) {
            let zone = zones[i];
            let annotation = { target: { selector: [{ type: 'SvgSelector' }] } };

            let points = zone.getAttribute('points');
            if (!points) {
                const path = zone.querySelector('path');
                if (path) {
                    let rawPoints = path.getAttribute('points').trim();

                    // Flip coordinate order back to x,y
                    let flippedPoints = rawPoints
                        .split(/\s+/)
                        .map(pair => {
                            let [y, x] = pair.split(',').map(Number);
                            return `${x},${y}`;
                        })
                        .join(' ');

                    points = flippedPoints;
                }
            }

            annotation.target.selector[0].value = `<svg><polygon points="${points}"></polygon></svg>`;
            annotation.id = zone.getAttribute('xml:id');
            annotations.push(annotation);
        }
    }
    catch (e) {
        console.error(e)
    }

    return annotations;
}
