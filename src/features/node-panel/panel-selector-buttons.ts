import { InsertComment } from "@mui/icons-material";

//currently only text is supported , but will be extended to support other types of messages
export enum messageType {
  text = "text",
}
export const panelSelectorButtons = [
  {
    id: messageType.text,
    icon: InsertComment,
    label: "Message",
  },
];
