import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import RemaningItems from "../../components/remaining-items";
import { testPart } from "../../data/test-data";
import { tokens } from "../../theme";

const Dashboard = ()=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px" backgroundColor={colors.primary[400]} border="5px" height="100vh" borderRadius="10px">
        </Box>

       
        
    )
  
}
export default Dashboard;