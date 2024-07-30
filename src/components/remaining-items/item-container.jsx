import * as React from 'react';
import { Box , Typography, useTheme, withStyles} from "@mui/material";
import { tokens } from "../../theme";
import LinearProgress from '@mui/material/LinearProgress';
import zIndex from '@mui/material/styles/zIndex';
import { red } from '@mui/material/colors';


const ItemContaioner = ({component})=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleClick = ()=>{
        let location = component.attributes.location
    }
    

    if (!component || !('attributes' in component)){
        return null;
    }
    let hasChildren = false;
    if (component.children){
        hasChildren = true
    }

    return(
        <Box  onClick={handleClick} sx={{
            border: 1,
            borderColor: "grey.500",
            borderRadius: "15px",
            m: .5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
            

    
        }}>
            <Typography>{component.name}</Typography>
            <Typography variant="h7">{component.attributes.description}</Typography>
            {component.attributes.childProgress !== undefined &&  
            <Box sx={{ width: '100%', mt: 1, height: 20 ,display: "flex", color: red, flexDirection: "column", alignItems: "center", position: "relative", borderRadius: "20px"}}>
                <LinearProgress sx={{
                    width: "95%",
                    borderRadius: "40px",
                    
            '& .MuiLinearProgress-bar': {
                backgroundColor: colors.blueAccent[500],
                borderRadius: "20px"
            },
            backgroundColor: colors.primary[200], // Customize the background color
          }} variant = "determinate" value={70 }/>
                <Typography sx={{zIndex: 10, position:"absolute", top: "-25%", color: red}} variant='h7'>{component.attributes.childProgress}</Typography>
            </Box>
            }
            {component.attributes.childProgress === undefined&& 
            <Typography variant='h7' >PurchasePart</Typography>}

                

            
        </Box>
  
    )

}
export default ItemContaioner;