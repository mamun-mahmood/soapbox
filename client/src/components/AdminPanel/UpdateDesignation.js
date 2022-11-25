import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import * as React from "react";
import OfficialBadge from "../../assets/OfficalBadge.svg";

export default function UpdateDesignation({ designation, setDesignation, setDesignationUpdate }) {
  const handleChange = (event) => {
    setDesignation(event.target.value);
    const time = Date.now();
    setDesignationUpdate(time)
  };
  return (
    <Box sx={{ minWidth: 120, m: 3 }}>
      <InputLabel id="demo-simple-select-label">Change Designation</InputLabel>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={designation}
          label="Age"
          onChange={handleChange}
          sx={{ width: 200 }}
        >
          <MenuItem value="Official">
            <Avatar sx={{ textAlign: "end" }} src={OfficialBadge} />
            Official
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
