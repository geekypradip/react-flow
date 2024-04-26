import ReactFlow, {
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from "reactflow";
import "reactflow/dist/style.css";

interface IFlow {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (params: Connection) => void;
}

export function Flow(props: IFlow) {
  return (
    <div style={{ height: "100%", width: "70%" }}>
      <ReactFlow
        nodes={props.nodes}
        onNodesChange={props.onNodesChange}
        edges={props.edges}
        onEdgesChange={props.onEdgesChange}
        onConnect={props.onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
