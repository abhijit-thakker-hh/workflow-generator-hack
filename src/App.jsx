import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes = [];
const initialEdges = [];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [xValue, setX] = useState(0);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const addNode = useCallback(() => {
    setX(xValue + 200);
    setNodes((els) => {
      console.log(els);
      return [
        ...els,
        {
          id: `state-${Math.random()}`,
          position: { x: xValue, y: 100 },
          data: { label: "yo" }
        }
      ];
    });
  }, [xValue]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ width: '80vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
      <div style={{ width: '20vw', height: '100vh', padding: '20px' }}>
        <button onClick={addNode}>Add node</button>
      </div>
    </div>
    
  );
}
