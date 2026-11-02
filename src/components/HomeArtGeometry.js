// Generates the flow art as SVG path strings from a seed.
// Same seed in, same drawing out. Works in a 900 x 760 coordinate space.

// Small seeded random number generator (mulberry32).
// Returns a function that gives a number between 0 and 1.
function createRandom(seed) {
    let a = seed >>> 0 || 1;
    return function random() {
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const round = Math.round;

// A full circle written as a path, so many circles fit in one <path>.
function circle(x, y, r) {
    return `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
}

// Turns a list of points into one smooth curve (Catmull-Rom spline as cubic Béziers).
function smoothPath(points) {
    let d = `M${round(points[0][0])} ${round(points[0][1])}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i - 1] || points[i];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2] || p2;
        const c1x = p1[0] + (p2[0] - p0[0]) / 6;
        const c1y = p1[1] + (p2[1] - p0[1]) / 6;
        const c2x = p2[0] - (p3[0] - p1[0]) / 6;
        const c2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += `C${round(c1x)} ${round(c1y)} ${round(c2x)} ${round(c2y)} ${round(p2[0])} ${round(p2[1])}`;
    }
    return d;
}

// Points for one stream: starts off the left edge at y0, waves,
// and eases into (endX, endY). The wave fades out as it arrives.
function streamPoints(y0, endY, endX, amplitude, phase, frequency) {
    const points = [];
    const steps = 8;
    for (let k = 0; k <= steps; k++) {
        const t = k / steps;
        const ease = t * t * (3 - 2 * t); // smoothstep
        const x = -20 + (endX + 20) * t;
        const y = y0 + (endY - y0) * ease + amplitude * Math.sin(phase + t * frequency) * (1 - t);
        points.push([x, y]);
    }
    return points;
}

function buildFlowArt(seed) {
    const random = createRandom(seed);
    const between = (min, max) => min + random() * (max - min);

    // 1. The neural net: 3 to 5 layers, 2 to 7 nodes each.
    const layerCount = 3 + Math.floor(random() * 3);
    const layers = [];
    for (let i = 0; i < layerCount; i++) {
        const isLast = i === layerCount - 1;
        const count = isLast ? 2 + Math.floor(random() * 3) : 3 + Math.floor(random() * 5);
        const x = 440 + (380 * i) / (layerCount - 1);
        const spacing = between(56, 76);
        const nodes = [];
        for (let j = 0; j < count; j++) {
        nodes.push([
            round(x + between(-10, 10)),
            round(380 + (j - (count - 1) / 2) * spacing + between(-12, 12)),
        ]);
        }
        layers.push(nodes);
    }

    // 2. Connections between neighbouring layers, as S-curves.
    //    About a quarter are skipped; a few are drawn heavier.
    let weakLinks = "";
    let strongLinks = "";
    for (let i = 0; i < layerCount - 1; i++) {
        for (const [x1, y1] of layers[i]) {
        for (const [x2, y2] of layers[i + 1]) {
            const roll = random();
            if (roll < 0.25) continue;
            const mx = round((x1 + x2) / 2);
            const d = `M${x1} ${y1}C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
            if (roll > 0.84) strongLinks += d;
            else weakLinks += d;
        }
        }
    }

    let nodes = "";
    layers.forEach((layer) => layer.forEach(([x, y]) => (nodes += circle(x, y, 9))));

    // 3. Streams flowing into each input node, with 1 to 3 companions
    //    that stop short and end in a small "via" circle.
    let streams = "";
    let vias = "";
    for (const [nx, ny] of layers[0]) {
        const y0 = between(40, 720);
        const amplitude = between(20, 70);
        const phase = between(0, Math.PI * 2);
        const frequency = between(2, 5);
        streams += smoothPath(streamPoints(y0, ny, nx - 11, amplitude, phase, frequency));

        const companions = 1 + Math.floor(random() * 3);
        for (let k = 1; k <= companions; k++) {
        const offset = Math.ceil(k / 2) * 12 * (k % 2 ? 1 : -1);
        const pts = streamPoints(y0 + offset, ny + offset * 1.6, nx - 48 - k * 22, amplitude, phase, frequency);
        streams += smoothPath(pts);
        const [ex, ey] = pts[pts.length - 1];
        vias += circle(round(ex), round(ey), 5);
        }
    }

    // 4. Extra bundles that end before the net, for texture.
    const extraBundles = 4 + Math.floor(random() * 4);
    for (let i = 0; i < extraBundles; i++) {
        const y0 = between(20, 740);
        const endY = between(60, 700);
        const endX = between(220, 400);
        const amplitude = between(15, 60);
        const phase = between(0, Math.PI * 2);
        const frequency = between(2, 5);
        const lines = 2 + Math.floor(random() * 2);
        for (let k = 0; k < lines; k++) {
        const pts = streamPoints(y0 + k * 12, endY + k * 12, endX - k * 14, amplitude, phase, frequency);
        streams += smoothPath(pts);
        const [ex, ey] = pts[pts.length - 1];
        vias += circle(round(ex), round(ey), 5);
        }
    }

    // 5. Output curves leaving the last layer off the right edge.
    for (const [x, y] of layers[layerCount - 1]) {
        const endY = round(y + between(-90, 90));
        streams += `M${x + 11} ${y}C${x + 60} ${y} ${x + 70} ${endY} 960 ${endY}`;
    }

    return { streams, vias, weakLinks, strongLinks, nodes };
}

export default buildFlowArt;