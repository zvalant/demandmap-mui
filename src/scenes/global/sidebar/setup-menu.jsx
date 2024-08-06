import { Box, Button ,Autocomplete, TextField,useTheme} from "@mui/material";
import Quantity from "../../../components/quantity";
//needs to be an array of part numbers later
import { testPart } from "../../../data/test-data";
import { tokens } from "../../../theme";
import { useContext, useState } from "react";
import { PartStructureContext } from "../../../context/part-structure-context/part-structure-context";



const SetupMenu = ()=>{
    const structures = testPart;
    const STRUCTUREOPTIONS = ["Available", "On Hand"]
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isSelectedPartStructure, setIsSelectedPartStructure] = useState("");
    const [isPartStructure,setIsPartStructure] = useState("");
    const [isStructureType, setIsStructureType] = useState("");
    const[isQuantity, setIsQuantity] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {qty,setActiveStructureType,reqCount,setReqCount,setSubmittedQty,setSubmittedPartStructure, setSubmittedStructureType} = useContext(PartStructureContext);
    //field changes for qty strucutre type and part structure

    const handlePartStructureChange = (event)=>{
        setIsPartStructure(event.target.value);
        console.log(isPartStructure, "current Part Srtucutre");
    }

    const handleStructureTypeChange = (event)=>{
        setIsStructureType(event.target.value);

    }

    const handleQuantityChange = (event)=>{
        setIsQuantity(event.target.value);

    }
    // form submission handle function

    const handleSubmit = async(event)=>{

        let pulledStruture = isSelectedPartStructure;
        let parsedStructure = "";
        let idx = 0;
        try {
            while( idx< pulledStruture.length && pulledStruture[idx]+pulledStruture[idx+1]!== "||"){
                console.log(pulledStruture[idx]+pulledStruture[idx+1])
                idx++;

            }

            parsedStructure = pulledStruture.slice(0,idx-1);
            console.log("parsed structure: ",parsedStructure);
            setIsPartStructure(parsedStructure);

        }catch(err){
            console.log(err)
        }finally{


        }
        setIsSubmitted(true);
        setSubmittedQty(isQuantity)
        setSubmittedPartStructure(parsedStructure);
        setSubmittedStructureType(isStructureType);
        setReqCount(reqCount +1);
        


    }

    return (
        <Box minHeight="25vh" 
            overflow="hidden" 
            display="flex" flexDirection="column" 
            alignItems="center">
            <Box sx={{
                width: "180px", 
                height: "60px",
                m:1
             }}>
                
                {structures && 
                <Autocomplete 
                    id="free-solo-demo" //need to change this after context implementation
                    onChange={(event, value) => {setIsSelectedPartStructure(value); setIsSubmitted(false)}}
                    getOptionLabel={(option) => option.toString()} 
                    options={structures.map((option) =>`${option.name} || ${option.attributes.description}`)}
                    renderInput={(params) => <TextField {...params} label="Part Structure" />}
                />              
                }
            </Box>
            <Box sx={{width: "180px", height: "60px",m:1
        
        
                }}>
                {STRUCTUREOPTIONS && 
                <Autocomplete 
                    id="free-solo-demo"
                    onChange={(event, value) => {setIsStructureType(value);setIsSubmitted(false)}}
                    options={STRUCTUREOPTIONS.map((option) =>`${option}`)}
                    renderInput={(params) => <TextField {...params} label="Structure Type" />}
                />}
            </Box>
            
            <Box sx={{mb: 5, height: "20px",width: "180px", m:1}}>
            <TextField
                id="filled-search"
                label="Quantity"
                type="search"
                value={isQuantity}
                onChange={(event, value) => {setIsQuantity(event.target.value); setIsSubmitted(false);}}
            />
            </Box>
            <Button sx={{
            width: "180px",
            backgroundColor: colors.greenAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            mt: 4
        }}
        disabled = {isSubmitted}
        onClick={handleSubmit}>Submit</Button>
        </Box>
    )



    
}
export default SetupMenu;