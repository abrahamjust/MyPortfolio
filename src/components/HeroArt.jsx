import { useMemo } from 'react';
import { useId } from 'react';
import buildFlowArt from './HomeArtGeometry.js';
import './HomeArt.css';

function HomeArt({ seed = 1027, viewBox = '0 0 900 760', flow = false, className = ''}) {
    const art = useMemo(() => buildFlowArt(seed, [seed]));

    const patternId = "dots-" + useId().replace(/[^a-zA-Z0-9]/g, "");

    return (
            <svg
                className={`flow-art ${className}`}
                viewBox={viewBox}
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
                focusable="false"
            >
            <defs>
                <pattern id={patternId} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
                <circle cx="6" cy="6" r="3" fill="var(--pen-a)" />
                </pattern>
            </defs>
        
            {/* Halftone disc behind the net */}
            <circle cx="630" cy="380" r="240" fill={`url(#${patternId})`} opacity="0.28" />
        
            {/* Blue layer: streams and vias */}
            <path d={art.streams} fill="none" stroke="var(--pen-a)" strokeWidth="2" strokeLinecap="round" />
            <path d={art.vias} fill="var(--paper)" stroke="var(--pen-a)" strokeWidth="2" />
        
            {/* Pink layer, overprinted on the blue */}
            <g className="flow-art__overprint">
                <path d={art.weakLinks} fill="none" stroke="var(--pen-b)" strokeWidth="1" opacity="0.85" />
                <path d={art.strongLinks} fill="none" stroke="var(--pen-b)" strokeWidth="2.4" />
                <path d={art.nodes} fill="var(--pen-b)" />
                {flow && <path className="flow-art__pulses" d={art.streams} />}
            </g>
        </svg>
    )
}

export default HomeArt;