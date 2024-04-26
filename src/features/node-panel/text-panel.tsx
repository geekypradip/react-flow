import { ArrowBack } from "@mui/icons-material";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { IPanelWrapper } from "./panel-wrapper";

interface ITextPanel extends IPanelWrapper {
  onClose: () => void;
}

export const TextPanel: FC<ITextPanel> = (props) => {
  const [text, setText] = useState(props.value || "");

  const onDragStart = (event: any) => {
    const nodeData = { value: text };
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(nodeData)
    );
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        borderBottom={"1px solid #eee"}
      >
        <IconButton onClick={props.onClose}>
          <ArrowBack />
        </IconButton>
        <Typography ml={"25%"}>Message</Typography>
      </Box>

      <Box mt={2}>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          onDragStart={onDragStart}
          draggable
          variant="outlined"
          fullWidth
          multiline
          minRows={3}
          label="Text"
          helperText={
            props.value
              ? "Press Update button to update the selected node or drag into the canvas to create a node "
              : "Drag this text box into the canvas to create a node"
          }
        />
        {props.value && (
          <Button
            sx={{ mt: 1 }}
            variant="outlined"
            onClick={() => props?.onTextPanelChange?.(text)}
          >
            Update
          </Button>
        )}
      </Box>
    </Box>
  );
};
