import { Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnSelectionChangeParams,
} from "reactflow";
import { Flow } from "./features/flow-renderer";
import { PanelWrapper } from "./features/node-panel";
const initialNodes = [
  {
    id: "1",
    data: {
      label:
        "Hello I am root node create more node and connect with me , or click me to edit ",
    },
    position: { x: 0, y: 0 },
    type: "input",
  },
];

const initialEdges: Edge[] = [];
function App() {
  const { enqueueSnackbar } = useSnackbar();
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onNodesChange = useCallback(
    (changes: NodeChange[], forDrag?: boolean) => {
      forDrag
        ? setNodes((prev) => [...prev, changes as unknown as Node])
        : setNodes((nds) => applyNodeChanges(changes, nds));
    },

    []
  );
  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onSelectionChange = useCallback(
    (selected: OnSelectionChangeParams) => setSelectedNode(selected.nodes[0]),
    []
  );

  const updateSelectedNode = useCallback(
    (value: string) => {
      if (!value.trim())
        return enqueueSnackbar("Can't update! please write something", {
          variant: "error",
        });
      const newNodes = nodes.map((node) => {
        if (node.id === selectedNode?.id) {
          return {
            ...node,
            data: {
              label: value,
            },
          };
        }
        return node;
      });
      setNodes(newNodes);
      setSelectedNode(null);
    },
    [nodes, selectedNode]
  );

  //Save button press will show an error if there are more than one Nodes and more than one Node has empty target handles
  const handleSaveFlow = () => {
    const nodeIds = nodes.map((node) => node.id);
    const edgeNodeIds = edges.flatMap((edge) => [edge.source, edge.target]);

    const unconnectedNodeIds = nodeIds.filter(
      (id) => !edgeNodeIds.includes(id)
    );

    if (unconnectedNodeIds.length > 0) {
      enqueueSnackbar("Can't Save the flow , Please connect all the nodes ", {
        variant: "error",
      });
    } else {
      //save the flow into local storage
      const flow = { nodes, edges };
      localStorage.setItem("flow", JSON.stringify(flow));
      enqueueSnackbar("Flow Saved Successfully", {
        variant: "success",
      });
    }
  };

  useEffect(() => {
    const savedFlow = localStorage.getItem("flow");
    if (savedFlow) {
      const { nodes, edges } = JSON.parse(savedFlow);
      setNodes(nodes);
      setEdges(edges);
    }
  }, []);

  return (
    <>
      <Box
        bgcolor={"#F3F3F3"}
        height={"50px"}
        alignContent={"center"}
        textAlign={"right"}
      >
        <Button sx={{ mr: 2 }} variant="outlined" onClick={handleSaveFlow}>
          Save changes
        </Button>
      </Box>
      <Box display="flex" width={"100%"} height={"calc(100vh - 50px)"}>
        <Flow
          edges={edges}
          nodes={nodes}
          onConnect={onConnect}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          onSelectionChange={onSelectionChange}
        />
        <PanelWrapper
          key={selectedNode?.id}
          value={selectedNode?.data.label}
          onTextPanelChange={updateSelectedNode}
        />
      </Box>
    </>
  );
}

export default App;
