/**
 * A commit history / DAG graph mockup. The graph rail is drawn with a small
 * inline SVG so the lanes and merge curves look intentional rather than faked
 * with stacked divs.
 */
const commits = [
  { lane: 0, msg: "Merge feature/boss-ai into main", author: "rook", hash: "b3f9c1a", merge: true },
  { lane: 1, msg: "Tune boss aggro radius", author: "nyx", hash: "7a21de4" },
  { lane: 1, msg: "Add boss encounter state machine", author: "rook", hash: "c40f8b2" },
  { lane: 0, msg: "Bump engine to 5.4", author: "elena", hash: "19ad77e" },
  { lane: 0, msg: "Lock Hero_Diffuse.png for retouch", author: "you", hash: "f02c5aa" },
  { lane: 0, msg: "Initial asset import (3,182 files)", author: "magnus", hash: "0091b6d" },
];

const laneColor = ["#3b82f6", "#8b5cf6"];

export function HistoryMockup() {
  const rowH = 44;
  const railX = [20, 44];
  return (
    <div className="bg-gradient-to-br from-brand-surface to-brand-deep-light p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-sm font-semibold text-brand-text-bright">
          History
        </h3>
        <span className="font-mono text-xs text-brand-muted">main</span>
      </div>
      <div className="relative">
        <svg
          className="absolute left-0 top-0"
          width="64"
          height={rowH * commits.length}
          aria-hidden="true"
        >
          {/* lane lines */}
          <line x1={railX[0]} y1={rowH / 2} x2={railX[0]} y2={rowH * commits.length - rowH / 2} stroke={laneColor[0]} strokeWidth="2" opacity="0.7" />
          <line x1={railX[1]} y1={rowH * 1.5} x2={railX[1]} y2={rowH * 2.5} stroke={laneColor[1]} strokeWidth="2" opacity="0.7" />
          {/* merge curves: lane1 branches off main at row3 and merges at row0 */}
          <path d={`M ${railX[0]} ${rowH * 0.5} C ${railX[0]} ${rowH * 1.1}, ${railX[1]} ${rowH * 0.9}, ${railX[1]} ${rowH * 1.5}`} stroke={laneColor[1]} strokeWidth="2" fill="none" opacity="0.7" />
          <path d={`M ${railX[1]} ${rowH * 2.5} C ${railX[1]} ${rowH * 3.1}, ${railX[0]} ${rowH * 2.9}, ${railX[0]} ${rowH * 3.5}`} stroke={laneColor[1]} strokeWidth="2" fill="none" opacity="0.7" />
          {/* commit nodes */}
          {commits.map((c, i) => (
            <circle
              key={i}
              cx={railX[c.lane]}
              cy={rowH * i + rowH / 2}
              r={c.merge ? 6 : 4.5}
              fill={c.merge ? "#0e1525" : laneColor[c.lane]}
              stroke={laneColor[c.lane]}
              strokeWidth="2"
            />
          ))}
        </svg>

        <ul className="ml-16">
          {commits.map((c, i) => (
            <li
              key={i}
              className="flex items-center gap-3 border-b border-brand-muted/10 last:border-0"
              style={{ height: `${rowH}px` }}
            >
              <span className="truncate text-[13px] text-brand-text">
                {c.msg}
              </span>
              <span className="ml-auto hidden shrink-0 text-xs text-brand-muted sm:inline">
                {c.author}
              </span>
              <span className="shrink-0 rounded bg-brand-deep/60 px-2 py-0.5 font-mono text-[11px] text-brand-muted">
                {c.hash}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
