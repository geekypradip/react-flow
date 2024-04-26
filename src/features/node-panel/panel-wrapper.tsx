import { Box, Button } from "@mui/material";
import { Children, FC, useState } from "react";
import { messageType, panelSelectorButtons } from "./panel-selector-buttons";
import { TextPanel } from "./text-panel";

export interface IPanelWrapper {
  value?: string;
  onTextPanelChange?: (value: string) => void;
}

export const PanelWrapper: FC<IPanelWrapper> = (props) => {
  const [selectedPanel, setSelectedPanel] = useState<messageType | null>(
    props.value ? messageType.text : null
  );
  const handleResetPanel = () => setSelectedPanel(null);

  return (
    <Box flexBasis={"30%"} border="1px solid #918f8f" p={1}>
      {!selectedPanel &&
        Children.toArray(
          panelSelectorButtons.map((button) => (
            <Button
              variant="outlined"
              startIcon={<button.icon />}
              onClick={() => setSelectedPanel(button.id)}
            >
              {button.label}
            </Button>
          ))
        )}

      {selectedPanel === messageType.text && (
        <TextPanel
          onClose={handleResetPanel}
          onTextPanelChange={props.onTextPanelChange}
          value={props.value}
        />
      )}
    </Box>
  );
};
