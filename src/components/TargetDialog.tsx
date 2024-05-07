import React from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

interface TargetDialogProps {
  open: boolean;
  targetList: string[];
  selectedTargets: string[];
  onSelectedTargetsChange: (value: string[]) => void;
  onClose: () => void;
}

const TargetDialog: React.FC<TargetDialogProps> = ({
  open,
  targetList,
  selectedTargets,
  onSelectedTargetsChange,
  onClose,
}) => {
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Target</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel>Select Target</InputLabel>
          <Select
            multiple
            value={selectedTargets}
            onChange={(e) =>
              onSelectedTargetsChange(e.target.value as string[])
            }
            renderValue={(selected) => (selected as string[]).join(", ")}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {targetList.map((target) => (
              <MenuItem key={target} value={target}>
                <Checkbox checked={selectedTargets.indexOf(target) > -1} />
                <ListItemText primary={target} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TargetDialog;
