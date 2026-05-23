/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface TopologyNode {
  id: string;
  label: string;
  x: number; // percentage
  y: number; // percentage
  type: 'source' | 'broker' | 'worker' | 'storage';
}

interface TopologyConnection {
  from: string;
  to: string;
  label?: string;
}

interface NetworkTopologyProps {
  nodes: TopologyNode[];
  connections: TopologyConnection[];
  accentColor?: string;
}

export default function NetworkTopology({ nodes, connections, accentColor = "#ef4444" }: NetworkTopologyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 260 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        // Keep height responsive but bounded
        setDimensions({
          width: width || 600,
          height: Math.max(260, height || 260)
        });
      }
    });

    resizeObserver.observe(containerRef.current);
    // Initial size
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width) {
      setDimensions({
        width: rect.width,
        height: Math.max(260, rect.height || 260)
      });
    }

    return () => resizeObserver.disconnect();
  }, []);

  // Helper to find node positions
  const getNodePos = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };
    return {
      x: (node.x / 100) * dimensions.width,
      y: (node.y / 100) * dimensions.height
    };
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'source': return 'fill-emerald-500/10 stroke-emerald-400';
      case 'broker': return 'fill-rose-500/10 stroke-rose-400';
      case 'worker': return 'fill-sky-500/10 stroke-sky-400';
      case 'storage': return 'fill-amber-500/10 stroke-amber-400';
      default: return 'fill-zinc-500/10 stroke-zinc-400';
    }
  };

  const getNodeBadgeColor = (type: string) => {
    switch (type) {
      case 'source': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'broker': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'worker': return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
      case 'storage': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
    }
  };

  return (
    <div id="project-topology-container" className="relative w-full h-80 bg-zinc-950/60 rounded-xl border border-zinc-800/80 overflow-hidden flex flex-col justify-between" ref={containerRef}>
      {/* Background Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950/40 to-transparent pointer-events-none" />
      
      {/* Topology Header Info */}
      <div className="p-3 bg-zinc-900/40 border-b border-zinc-900 flex justify-between items-center text-xs font-mono text-zinc-400 z-10 backdrop-blur-xs select-none">
        <span className="flex items-center gap-1.5 font-semibold text-zinc-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: accentColor }}></span>
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: accentColor }}></span>
          </span>
          ACTIVE BACKEND TOPOLOGY MAP
        </span>
        <span className="opacity-60 text-[10px]">TAP NODES TO FILTER PIPELINE FLOW</span>
      </div>

      {/* SVG Canvas */}
      <div className="flex-1 w-full relative min-h-[220px]">
        <svg 
          width={dimensions.width} 
          height={dimensions.height} 
          className="absolute inset-0 w-full h-full select-none overflow-visible"
        >
          {/* Definitions for arrow markers and glow filters */}
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#3f3f46" />
            </marker>
            <marker
              id="arrow-active"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill={accentColor} />
            </marker>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Draw Connection Edges */}
          {connections.map((conn, idx) => {
            const start = getNodePos(conn.from);
            const end = getNodePos(conn.to);
            const isActive = hoveredNode === conn.from || hoveredNode === conn.to || hoveredNode === null;
            const isDirectPath = hoveredNode === conn.from;

            // Generate nice control points for organic curved Bezier paths
            const dx = end.x - start.x;
            const dy = end.y - start.y;
            const cx1 = start.x + dx * 0.4;
            const cy1 = start.y;
            const cx2 = start.x + dx * 0.6;
            const cy2 = end.y;

            const pathData = `M ${start.x} ${start.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${end.x} ${end.y}`;

            return (
              <g key={`edge-${idx}`} className="transition-opacity duration-300">
                {/* Secondary thick glow pathway */}
                {isDirectPath && (
                  <path
                    d={pathData}
                    fill="none"
                    stroke={accentColor}
                    strokeWidth="3.5"
                    className="opacity-25"
                    filter="url(#glow)"
                  />
                )}

                {/* Main connector line */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={isDirectPath ? accentColor : isActive ? "#27272a" : "#18181b"}
                  strokeWidth="1.5"
                  markerEnd={isDirectPath ? "url(#arrow-active)" : "url(#arrow)"}
                  className="transition-all duration-300"
                />

                {/* Animated Pulsing Packet along active paths */}
                {isDirectPath && (
                  <circle r="4.5" fill={accentColor} filter="url(#glow)">
                    <animateMotion
                      path={pathData}
                      dur="1.8s"
                      repeatCount="indefinite"
                      rotate="auto"
                    />
                  </circle>
                )}
                {/* Secondary organic packet flow */}
                {isActive && !isDirectPath && (
                  <circle r="2" fill="#52525b" className="opacity-40">
                    <animateMotion
                      path={pathData}
                      dur="3.5s"
                      repeatCount="indefinite"
                      rotate="auto"
                      begin={`${idx * 0.4}s`}
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Draw Interactive Nodes */}
          {nodes.map((node) => {
            const pos = getNodePos(node.id);
            const isHovered = hoveredNode === node.id;
            const isRelated = hoveredNode === null || 
              isHovered || 
              connections.some(c => (c.from === hoveredNode && c.to === node.id) || (c.to === hoveredNode && c.from === node.id));

            return (
              <g 
                key={`node-${node.id}`}
                transform={`translate(${pos.x}, ${pos.y})`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onTouchStart={() => setHoveredNode(node.id)}
              >
                {/* Hover Aura Bloom */}
                {isHovered && (
                  <circle
                    r="24"
                    fill="none"
                    stroke={accentColor}
                    strokeWidth="1"
                    className="opacity-20 animate-pulse"
                  />
                )}

                {/* Core Interactive Circle */}
                <circle
                  r="13"
                  className={`transition-all duration-300 ${getNodeColor(node.type)}`}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                />

                {/* Inner dot indicator */}
                <circle
                  r="4"
                  fill={isHovered ? accentColor : "#ffffff"}
                  className="transition-all duration-300 opacity-80"
                />
              </g>
            );
          })}
        </svg>

        {/* Text Positioning Labels rendered outside SVG for absolute crisp HTML design rendering */}
        {nodes.map((node) => {
          const pos = getNodePos(node.id);
          const isHovered = hoveredNode === node.id;
          const isRelated = hoveredNode === null || 
            isHovered || 
            connections.some(c => (c.from === hoveredNode && c.to === node.id) || (c.to === hoveredNode && c.from === node.id));

          return (
            <div
              key={`label-${node.id}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none transition-all duration-300"
              style={{ 
                left: `${pos.x}px`, 
                top: `${pos.y - 30}px`,
                opacity: isRelated ? 1 : 0.25,
                scale: isHovered ? 1.05 : 1
              }}
            >
              <div className={`px-2 py-0.5 rounded border text-[9px] font-mono font-semibold tracking-wide whitespace-nowrap shadow-xs select-none uppercase ${getNodeBadgeColor(node.type)}`}>
                {node.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer System Logs Legend */}
      <div className="p-2.5 bg-zinc-900/40 border-t border-zinc-900/80 flex flex-wrap gap-x-4 gap-y-1 justify-center items-center text-[9px] font-mono text-zinc-500 z-10 select-none">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full border border-emerald-500/50 bg-emerald-500/10" /> INGRESS CLIENT</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full border border-rose-500/50 bg-rose-500/10" /> BROKER / ROUTER</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full border border-sky-500/50 bg-sky-500/10" /> WORKER SERVICE</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full border border-amber-500/50 bg-amber-500/10" /> PERSISTENCE STORE</span>
      </div>
    </div>
  );
}
