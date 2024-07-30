import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import RemaningItems from "../../components/remaining-items";
import { testPart } from "../../data/test-data";
import { tokens } from "../../theme";

const Dashboard = ()=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px">
            <Box display="flex" justifyContent= "space-between" alignItems="centers"></Box>
        </Box>
    )
  
}
export default Dashboard;