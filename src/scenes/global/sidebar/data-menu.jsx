import { Box, Typography } from "@mui/material"
import RemaningItems from "../../../components/remaining-items";
import PartInfo from "../../../components/part-info";
import { useContext } from "react";
import { PartStructureContext } from "../../../context/part-structure-context/part-structure-context";
/*
Purpose: Contains data sections of the active top node.  Currently RemainingItems & 
PartInfo
*/


const DataMenu = ()=>{
    const {currentPartStructure} = useContext(PartStructureContext);


    return (
        <Box>
            <Box display="flex" flexDirection= "column" alignItems="center">
                <Typography variant="h5">REMAINING ITEMS</Typography>
                <Box sx={{
                    mt: 2,
                    maxHeight: "30vh",
                    overflow: "scroll",
                    overflowX: "hidden",
                }}>
                <RemaningItems part={currentPartStructure}/>
                </Box>
                    
            </Box>
            <Box display="flex" flexDirection= "column" alignItems="center"
              >
              <Typography variant="h5">PART INFO</Typography>
              <PartInfo part={currentPartStructure}/>
            </Box>
        </Box>

    )

}

export default DataMenu;