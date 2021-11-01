import { Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

export const SoapboxTooltip = withStyles(() => ({
    tooltip: {
        backgroundColor: "#D9D2FA",
        color: "#8249A0",
        fontSize: 12,
    },
}))(Tooltip);
