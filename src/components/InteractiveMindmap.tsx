import React, { useState, useMemo, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'motion/react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, Maximize, Search } from 'lucide-react';

interface MindmapNodeData {
  name: string;
  children?: MindmapNodeData[];
}

interface InteractiveMindmapProps {
  data: MindmapNodeData;
}

export const InteractiveMindmap: React.FC<InteractiveMindmapProps> = ({ data }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set([]));
  const [isMagnifyMode, setIsMagnifyMode] = useState(false);

  // We need to assign unique IDs to the data nodes.
  const processedData = useMemo(() => {
    let idCounter = 0;
    const addIds = (node: MindmapNodeData, isRoot: boolean): any => {
      const id = isRoot ? 'root' : `node-${idCounter++}`;
      return {
        ...node,
        id,
        children: node.children ? node.children.map(c => addIds(c, false)) : undefined
      };
    };
    return addIds(data, true);
  }, [data]);

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        // We could also recursively delete children, but simply removing it from expandedNodes hides them
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Generate D3 tree structure based on expanded state
  const treeData = useMemo(() => {
    const filterNodes = (node: any): any => {
      if (!expandedNodes.has(node.id) || !node.children) {
        return { ...node, children: undefined, _children: node.children };
      }
      return {
        ...node,
        children: node.children.map(filterNodes),
        _children: node.children
      };
    };
    return filterNodes(processedData);
  }, [processedData, expandedNodes]);

  const width = 800;
  const height = 600;
  const nodeWidth = 160;
  const nodeHeight = 60;
  const horizontalSpacing = 220;
  const verticalSpacing = 80;

  const root = useMemo(() => {
    const hierarchy = d3.hierarchy(treeData);
    // Flexible tree size based on depth and number of nodes
    const treeLayout = d3.tree<any>()
        .nodeSize([verticalSpacing, horizontalSpacing]);
    return treeLayout(hierarchy);
  }, [treeData]);

  // Find min/max bounds for proper centering (not strictly needed with zoom-pan-pinch centerOnInit but good for layout)
  let minX = 0;
  let maxX = 0;
  let minY = 0;
  let maxY = 0;
  root.each(d => {
    if (d.x < minX) minX = d.x;
    if (d.x > maxX) maxX = d.x;
    if (d.y < minY) minY = d.y;
    if (d.y > maxY) maxY = d.y;
  });

  const layoutWidth = Math.max(width, maxY - minY + horizontalSpacing * 2);
  const layoutHeight = Math.max(height, maxX - minX + verticalSpacing * 2);

  // Offset to center the tree
  const offsetX = -minY + 50;
  const offsetY = -minX + layoutHeight / 2;

  const links = root.links();
  const nodes = root.descendants();

  return (
    <div 
      className="w-full h-full relative bg-[#fbf9f8] rounded-xl overflow-hidden border border-[#c2c6d5]/20"
      style={{ cursor: isMagnifyMode ? 'zoom-in' : 'default' }}
    >
      <TransformWrapper initialScale={1} minScale={0.2} maxScale={4} centerOnInit={true}>
        {({ zoomIn, zoomOut, resetTransform, zoomToElement }) => (
          <>
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 bg-white p-2 rounded-lg shadow-sm border border-[#c2c6d5]/40">
              <button onClick={() => zoomIn()} className="p-1 hover:bg-[#f6f3f2] rounded text-[#424753]" title="Zoom In"><ZoomIn className="w-5 h-5" /></button>
              <button onClick={() => zoomOut()} className="p-1 hover:bg-[#f6f3f2] rounded text-[#424753]" title="Zoom Out"><ZoomOut className="w-5 h-5" /></button>
              <button onClick={() => resetTransform()} className="p-1 hover:bg-[#f6f3f2] rounded text-[#424753]" title="Reset View"><Maximize className="w-5 h-5" /></button>
              <button 
                onClick={() => setIsMagnifyMode(!isMagnifyMode)} 
                className={`p-1 rounded transition-colors ${isMagnifyMode ? 'bg-[#d7e2ff] text-[#0059b9]' : 'hover:bg-[#f6f3f2] text-[#424753]'}`}
                title="Magnify Tool"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%" }}>
               <div style={{ width: layoutWidth, height: layoutHeight, position: 'relative' }}>
                  {/* Draw links */}
                  <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <g transform={`translate(${offsetX}, ${offsetY})`}>
                        {links.map((link, i) => {
                          const linkGenerator = d3.linkHorizontal<any, any>()
                            .x(d => d.y)
                            .y(d => d.x);
                          const d = linkGenerator(link as any) || undefined;
                          return (
                             <path 
                                key={link.target.data.id}
                                d={d}
                                fill="none"
                                stroke="#c2c6d5"
                                strokeWidth={2}
                                className="transition-all duration-300 ease-in-out"
                             />
                          );
                        })}
                    </g>
                  </svg>
                  
                  {/* Draw nodes */}
                  <div className="absolute top-0 left-0 w-full h-full" style={{ transform: `translate(${offsetX}px, ${offsetY}px)`}}>
                    <AnimatePresence>
                        {nodes.map((node) => {
                            const isRoot = node.depth === 0;
                            const hasChildren = node.data._children && node.data._children.length > 0;
                            const isExpanded = expandedNodes.has(node.data.id);
                            
                            return (
                              <motion.div
                                id={node.data.id}
                                key={node.data.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ 
                                  opacity: 1, 
                                  scale: 1,
                                  x: node.y - nodeWidth / 2, 
                                  y: node.x - nodeHeight / 2 
                                }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className={`absolute flex items-center justify-center p-3 rounded-xl border-2 shadow-sm text-center cursor-pointer transition-colors
                                  ${isRoot ? 'bg-[#0059b9] border-[#0059b9] text-white font-bold z-10' : 'bg-white border-[#0059b9] text-[#1b1c1c] hover:bg-[#f6f3f2]'}
                                `}
                                style={{ width: nodeWidth, minHeight: nodeHeight }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (isMagnifyMode) {
                                    zoomToElement(node.data.id, 2.5, 500);
                                    setIsMagnifyMode(false);
                                  } else {
                                    if (hasChildren) {
                                      toggleNode(node.data.id);
                                    }
                                  }
                                }}
                              >
                                <span className="text-sm select-none break-words w-full px-2">{node.data.name}</span>
                                {hasChildren && !isRoot && (
                                   <div className={`absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold ${isExpanded ? 'bg-[#ba1a1a]' : 'bg-[#0059b9]'}`}>
                                      {isExpanded ? '-' : '+'}
                                   </div>
                                )}
                                {hasChildren && isRoot && (
                                  <div className={`absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center bg-white border text-xs font-bold ${isExpanded ? 'text-[#ba1a1a] border-[#ba1a1a]' : 'text-[#0059b9] border-[#0059b9]'}`}>
                                    {isExpanded ? '-' : '+'}
                                  </div>
                                )}
                              </motion.div>
                            );
                        })}
                    </AnimatePresence>
                  </div>
               </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};
