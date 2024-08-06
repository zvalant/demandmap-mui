import { Box, colors, Typography } from "@mui/material";
import ItemContaioner from "./item-container";
const RemaningItems = ({part})=>{
    const incompleteParts = [];
    console.log(part);
if (!part){
    return ;
}
if ('children' in part){
    for (const child of part.children){
        if (!child.attributes.isDemandMet){

        incompleteParts.push(child);
        }
    }
}
if (incompleteParts.length<1){
    return (
    <Box><Typography variant="h5">No Remaining Items</Typography></Box>
)
}
    return (
        <Box 
        >
            {incompleteParts.map(component=><ItemContaioner component={component}/>)}
        </Box>
    )


}


export default RemaningItems;