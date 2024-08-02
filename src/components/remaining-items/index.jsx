import { Box, colors } from "@mui/material";
import ItemContaioner from "./item-container";
const RemaningItems = ({part})=>{
    const incompleteParts = [];
    console.log(part);

if ('children' in part){
    for (const child of part.children){
        if (!child.attributes.isDemandMet){

        incompleteParts.push(child);
        }
    }
}else{
    return (<div>All Parts Complete</div>);
}
    return (
        <Box 
        >
            {incompleteParts.map(component=><ItemContaioner component={component}/>)}
        </Box>
    )


}


export default RemaningItems;