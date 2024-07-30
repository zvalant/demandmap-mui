import { Box, colors, darkScrollbar } from "@mui/material";
import ItemContaioner from "./item-container";
import { red } from "@mui/material/colors";
const RemaningItems = ({testPart})=>{
    const incompleteParts = [];
    console.log(testPart);

if ('children' in testPart){
    for (const child of testPart.children){
        if (!child.attributes.isDemandMet){

        incompleteParts.push(child);
        }
    }
}else{
    return (<div>All Parts Complete</div>);
}
    return (
        <Box sx={{"& .pro-sidebar-layout": {
          '&::-webkit-scrollbar': { display: 'scroll' },
            '::-webkit-scrollbar' :{
              width: "10px" 
            },
            '& ::-webkit-scrollbar-track':{
              background: "#f1f1f1", 
              borderRadius: "10px", 
            },
            
            '&::-webkit-scrollbar-thumb': {
              background: "#888",
              borderRadius: "10px" 
            },
            
            '&::-webkit-scrollbar-thumb:hover': {
              background: "#555", 
            },
        }}}
        >
            {incompleteParts.map(component=><ItemContaioner component={component}/>)}
        </Box>
    )


}


export default RemaningItems;