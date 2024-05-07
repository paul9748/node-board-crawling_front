import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface DateRangeDialogProps {
  open: boolean;
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onClose: () => void;
}

const DateRangeDialog: React.FC<DateRangeDialogProps> = ({
  open,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Date Range</DialogTitle>
      <DialogContent>
        <TextField
          label="Start Date"
          type="datetime-local"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          fullWidth
          style={{ marginBottom: "10px" }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          type="datetime-local"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          fullWidth
          style={{ marginBottom: "10px" }}
          InputLabelProps={{
            shrink: true,
          }}
        />
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

export default DateRangeDialog;
