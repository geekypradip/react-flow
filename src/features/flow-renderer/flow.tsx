import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import ReactFlow, {
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnSelectionChangeParams,
} from "reactflow";
import "reactflow/dist/style.css";

interface IFlow {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[], isItForDrag?: boolean) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (params: Connection) => void;
  onSelectionChange: (params: OnSelectionChangeParams) => void;
}

export function Flow(props: IFlow) {
  const { enqueueSnackbar } = useSnackbar();
  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const reactFlowBounds = document
      .querySelector(".react-flow__renderer")!
      .getBoundingClientRect();
    const nodeData = JSON.parse(
      event.dataTransfer.getData("application/reactflow")
    );

    if (!nodeData.value.trim())
      return enqueueSnackbar("Can't create empty node", {
        variant: "error",
      });
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode: Node = {
      id: Date.now().toString(),
      position,
      width: 150,
      height: 36,
      data: { label: nodeData.value },
    };

    props.onNodesChange(newNode as unknown as NodeChange[], true);
  };

  return (
    <Box flexBasis={"70%"} height={"100%"}>
      <ReactFlow
        onSelectionChange={props.onSelectionChange}
        nodes={props.nodes}
        onNodesChange={props.onNodesChange}
        edges={props.edges}
        onEdgesChange={props.onEdgesChange}
        onConnect={props.onConnect}
        fitView
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
}
