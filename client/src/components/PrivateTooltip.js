import { Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

export const PrivateTooltip = withStyles(() => ({
    tooltip: {
        backgroundColor: "#8249A0",
        color: "#D9D2FA",
        fontSize: 12,
    },
}))(Tooltip);
