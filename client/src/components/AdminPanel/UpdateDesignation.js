import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import * as React from "react";
import OfficialCheckMark from "../../assets/OfficialCheckMark.svg";

export default function UpdateDesignation({
  designation,
  setDesignation,
  setDesignationUpdate,
}) {
  const handleChange = (event) => {
    setDesignation(event.target.value);
    const time = Date.now();
    setDesignationUpdate(time);
  };
  // const [customInput, setCustomInput] = React.useState(designation);
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
          {/* <Avatar sx={{ textAlign: "end" }} src={OfficialCheckMark} /> */}
          <MenuItem value="Official">Official</MenuItem>
          <MenuItem value="Official Media">Official Media</MenuItem>
          <MenuItem value="Official Club">Official Club</MenuItem>
          <MenuItem value="Adult Content">Adult Content</MenuItem>
          <MenuItem value="Parody Account">Parody Account</MenuItem>
          <MenuItem value="Official Corporate">Official Corporate</MenuItem>
          <MenuItem value={null} style={{color: "red"}} >Remove</MenuItem>
          {/* <MenuItem value={customInput} > */}
          {/* <input
            placeholder="Enter custom designation..."
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          /> */}
          {/* </MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
}
