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
import Notable from "../../assets/RegularVerified.svg";
import General from "../../assets/purple.svg";
import Media from "../../assets/MediaVerified.svg";
import PremiumVerified from "../../assets/PremiumVerified.svg";
export default function UpdateBadge({ badge, setBadge, setBadgeUpdate }) {
  const handleChange = (event) => {
    setBadge(event.target.value);
    const date = Date.now();
    setBadgeUpdate(date);
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
          <MenuItem value="Notable">
            <Avatar sx={{ textAlign: "end" }} src={Notable} />
            Notable
          </MenuItem>
          <MenuItem value="General">
            <Avatar sx={{ textAlign: "end" }} src={General} />
            General
          </MenuItem>
          <MenuItem value="Premium">
            <Avatar sx={{ textAlign: "end" }} src={PremiumVerified} />
            Premium
          </MenuItem>
          <MenuItem value="Media">
            <Avatar sx={{ textAlign: "end" }} src={Media} />
            Media
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
