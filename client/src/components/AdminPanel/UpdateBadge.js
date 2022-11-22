import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import * as React from "react";
import CorporateVerified from "../../assets/CorporateVerified.svg";
import RegularVerified from "../../assets/RegularVerified.svg";
import purple from "../../assets/purple.svg";
import gold from "../../assets/gold.svg";
import PremiumVerified from "../../assets/PremiumVerified.svg";
export default function UpdateBadge({badge, setBadge}) {
  const handleChange = (event) => {
    setBadge(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120, m: 3 }}>
        <InputLabel id="demo-simple-select-label">Change Badge</InputLabel>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={badge}
          label="Age"
          onChange={handleChange}
          sx={{ width: 200 }}
        >
          <MenuItem value="Corporate">
            <Avatar sx={{ textAlign: "end" }} src={CorporateVerified} />
            Corporate
          </MenuItem>
          <MenuItem value="Regular">
            <Avatar sx={{ textAlign: "end" }} src={RegularVerified} />
            Regular
          </MenuItem>
          <MenuItem value="Purple">
            <Avatar sx={{ textAlign: "end" }} src={purple} />
            Purple
          </MenuItem>
          <MenuItem value="Premium">
            <Avatar sx={{ textAlign: "end" }} src={PremiumVerified} />
            Premium
          </MenuItem>
          <MenuItem value="Gold">
            <Avatar sx={{ textAlign: "end" }} src={gold} />
            Gold
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
