import { cn } from '@/lib/utils';

export type RouteKey = 'tram' | 'bus' | 'ferry' | 'walk' | 'home';

interface BroadwaterMapProps {
  /** Route currently highlighted (hovered transport card), or null. */
  activeRoute: RouteKey | null;
}

/**
 * Inline interactive reproduction of `/map-broadwater.svg` (identical artwork)
 * with route-highlighting: hovering a transport card brightens the matching
 * dashed route + pulses its markers, and dims the other routes.
 */
export function BroadwaterMap({ activeRoute }: BroadwaterMapProps) {
  const dim = (route: RouteKey) => (activeRoute && activeRoute !== route ? 'opacity-25' : 'opacity-100');
  const isActive = (route: RouteKey) => activeRoute === route;

  const routePath = (route: RouteKey, d: string) => (
    <path
      d={d}
      stroke="#E8532A"
      strokeWidth={isActive(route) ? 7 : 5}
      strokeDasharray="12 10"
      fill="none"
      className={cn('info-map-route', dim(route), isActive(route) && 'info-map-dash')}
    />
  );

  const pulseRing = (route: RouteKey, cx: number, cy: number, delay = 0) => (
    <circle
      cx={cx}
      cy={cy}
      r={20}
      fill="none"
      stroke="#E8532A"
      strokeWidth={isActive(route) ? 5 : 3}
      className={cn('info-map-pulse', dim(route))}
      style={{ animationDelay: `${delay}s`, animationDuration: isActive(route) ? '1.1s' : '2s' }}
    />
  );

  return (
    <svg
      viewBox="0 0 1400 900"
      role="img"
      aria-label="Illustrated map of the Broadwater Parklands festival area with tram, bus, ferry and walking routes"
      className="h-auto w-full"
    >
      <style>{`
        .info-map-route { transition: opacity .3s ease, stroke-width .3s ease; }
        .info-map-mark { transition: opacity .3s ease; }
        .info-map-dash { animation: info-map-dashmove 1.2s linear infinite; }
        @keyframes info-map-dashmove { to { stroke-dashoffset: -44; } }
        .info-map-pulse {
          transform-box: fill-box;
          transform-origin: center;
          animation: info-map-pulse 2s ease-out infinite;
          transition: opacity .3s ease;
        }
        @keyframes info-map-pulse {
          0% { transform: scale(.55); opacity: .85; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .info-map-pulse, .info-map-dash { animation: none; }
        }
      `}</style>

      <rect width="1400" height="900" fill="#D8B98A" />
      {/* broadwater */}
      <path d="M 900 0 L 1400 0 L 1400 900 L 820 900 Q 900 640 880 420 Q 862 200 900 0 Z" fill="#8FB6C9" />
      <path d="M 905 0 Q 868 210 886 420 Q 906 640 826 900" fill="none" stroke="#F5E9D0" strokeWidth="5" strokeDasharray="18 12" />
      <text x="1130" y="300" fontFamily="monospace" fontWeight="bold" fontSize="34" fill="#F5E9D0" transform="rotate(78 1130 300)">THE BROADWATER</text>
      {/* park green */}
      <path d="M 180 120 L 700 80 Q 860 200 850 400 Q 840 620 700 760 L 200 820 Q 120 500 180 120 Z" fill="#5B5B3A" opacity="0.9" />
      <text x="430" y="220" fontFamily="monospace" fontWeight="bold" fontSize="40" fill="#F5E9D0">BROADWATER</text>
      <text x="460" y="268" fontFamily="monospace" fontWeight="bold" fontSize="40" fill="#F5E9D0">PARKLANDS</text>
      {/* roads */}
      <path d="M 60 0 L 40 900" stroke="#F5E9D0" strokeWidth="26" fill="none" />
      <path d="M 60 0 L 40 900" stroke="#1E323E" strokeWidth="3" strokeDasharray="20 16" fill="none" />
      <text x="18" y="500" fontFamily="monospace" fontWeight="bold" fontSize="26" fill="#1E323E" transform="rotate(-90 18 500)">GOLD COAST HWY</text>
      <path d="M 40 700 L 900 690" stroke="#F5E9D0" strokeWidth="22" fill="none" />
      <text x="420" y="678" fontFamily="monospace" fontWeight="bold" fontSize="24" fill="#1E323E">MARINE PARADE</text>
      {/* Ada Bell Way — highlighted for the WALKING IN route (crossings) */}
      <path
        d="M 100 380 L 880 380"
        stroke="#F5E9D0"
        strokeWidth={isActive('walk') ? 24 : 18}
        fill="none"
        className={cn('info-map-route', dim('walk'))}
      />
      <text x="360" y="368" fontFamily="monospace" fontWeight="bold" fontSize="22" fill="#1E323E">ADA BELL WAY</text>
      {/* walking crossing markers */}
      <g className={cn('info-map-mark', dim('walk'))}>
        <circle cx="52" cy="380" r="12" fill="#E8532A" stroke="#1E323E" strokeWidth="4" />
        <circle cx="45" cy="695" r="12" fill="#E8532A" stroke="#1E323E" strokeWidth="4" />
      </g>
      {pulseRing('walk', 52, 380, 0.2)}
      {pulseRing('walk', 45, 695, 1.1)}
      {/* festival site */}
      <g className={cn('info-map-mark', dim('home'))}>
        <rect x="380" y="420" width="240" height="180" rx="18" fill="#E8532A" stroke="#1E323E" strokeWidth="5" />
        <text x="500" y="500" fontFamily="monospace" fontWeight="bold" fontSize="26" fill="#F5E9D0" textAnchor="middle">FESTIVAL</text>
        <text x="500" y="534" fontFamily="monospace" fontWeight="bold" fontSize="26" fill="#F5E9D0" textAnchor="middle">ENTRY</text>
      </g>
      <path
        d="M 500 380 L 500 420"
        stroke="#E8532A"
        strokeWidth={isActive('home') ? 8 : 6}
        strokeDasharray="10 8"
        className={cn('info-map-route', dim('home'), isActive('home') && 'info-map-dash')}
      />
      {pulseRing('home', 500, 510, 0.5)}
      {/* tram stations */}
      <g stroke="#1E323E" strokeWidth="4" className={cn('info-map-mark', dim('tram'))}>
        <circle cx="52" cy="300" r="18" fill="#F5E9D0" />
        <circle cx="50" cy="640" r="18" fill="#F5E9D0" />
      </g>
      <text x="82" y="292" fontFamily="monospace" fontWeight="bold" fontSize="20" fill="#1E323E">TRAM · PARKLANDS</text>
      <text x="80" y="632" fontFamily="monospace" fontWeight="bold" fontSize="20" fill="#1E323E">TRAM · SOUTHPORT SOUTH</text>
      {routePath('tram', 'M 70 300 L 300 340 L 380 430')}
      {routePath('tram', 'M 68 640 L 330 600 L 420 600')}
      {pulseRing('tram', 52, 300, 0)}
      {pulseRing('tram', 50, 640, 0.9)}
      {/* bus */}
      <g className={cn('info-map-mark', dim('bus'))}>
        <rect x="150" y="440" width="26" height="26" rx="6" fill="#2E4A5E" />
      </g>
      <text x="188" y="462" fontFamily="monospace" fontWeight="bold" fontSize="20" fill="#1E323E">BUS · AUSTRALIA FAIR</text>
      {routePath('bus', 'M 176 470 L 300 480 L 380 490')}
      {pulseRing('bus', 163, 453, 0.4)}
      {/* ferry pier */}
      <path d="M 950 560 L 1100 560" stroke="#F5E9D0" strokeWidth="10" />
      <g className={cn('info-map-mark', dim('ferry'))}>
        <circle cx="1100" cy="560" r="16" fill="#F5E9D0" stroke="#1E323E" strokeWidth="4" />
      </g>
      <text x="960" y="540" fontFamily="monospace" fontWeight="bold" fontSize="20" fill="#1E323E">FERRY · SOUTHPORT PIER</text>
      {routePath('ferry', 'M 950 590 L 700 560 L 620 520')}
      {pulseRing('ferry', 1100, 560, 0.7)}
      {/* car park */}
      <rect x="160" y="120" width="120" height="90" rx="10" fill="#F5E9D0" stroke="#1E323E" strokeWidth="4" />
      <text x="220" y="172" fontFamily="monospace" fontWeight="bold" fontSize="34" fill="#1E323E" textAnchor="middle">P</text>
      <text x="296" y="168" fontFamily="monospace" fontWeight="bold" fontSize="20" fill="#1E323E">CAREY PARK</text>
      <text x="296" y="194" fontFamily="monospace" fontWeight="bold" fontSize="20" fill="#1E323E">CAR PARK</text>
      {/* compass */}
      <g transform="translate(1280 120)">
        <circle r="34" fill="#F5E9D0" stroke="#1E323E" strokeWidth="4" />
        <path d="M 0 -24 L 10 10 L 0 4 L -10 10 Z" fill="#E8532A" />
        <text y="-44" fontFamily="monospace" fontWeight="bold" fontSize="22" fill="#1E323E" textAnchor="middle">N</text>
      </g>
    </svg>
  );
}

export default BroadwaterMap;
