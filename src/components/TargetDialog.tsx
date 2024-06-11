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
  SelectChangeEvent, // SelectChangeEvent 임포트 추가
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
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    // SelectChangeEvent<string[]> 형식으로 변경
    onSelectedTargetsChange(event.target.value as string[]);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Target</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel style={{ marginTop: 10, marginBottom: 10 }}>
            Select Target
          </InputLabel>
          <Select
            multiple
            value={selectedTargets}
            onChange={handleChange}
            renderValue={(selected) => (selected as string[]).join(", ")}
            input={<Input />}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                  width: 250,
                },
              },
            }}
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
