import { createContext,useState,useEffect } from "react";
import { MasterStructure } from "./helpers/master-structure";
import { AvailableStructure } from "./helpers/available-structure";
import { OnHandStructure } from "./helpers/onhand-structure";
import { OPTIONTITLES } from "../../utils/misc.mjs";
/*
Context Purpose:
This context will contain states and functions that pertain to the demand map generation and UI
interaction with the map. This will currently trigger a structure generation when the form is submitted
and the request count is incremented.  Majority of remaining states outside of structures are 
toggles for menus and part information.
*/
const defaultStructure = {attributes:{}};
const defaultStructureOption = OPTIONTITLES.available;

export const PartStructureContext = createContext({
    partNumber: null,
    setPartNumber: ()=>null,
    submittedQty: null,
    setSubmittedQty: ()=>{},
    qty: null,
    setQty: ()=>null,
    reqCount:null, 
    setReqCount:()=>{},
    submittedPartStructure: undefined,
    setSubmittedPartStructure: ()=>{},
    currentPartStructure: undefined,
    setCurrentPartStructure: ()=>{},
    partStructures: [],
    setPartStructures: ()=>{},
    SubmittedStructureType: "",
    setSubmittedStructureType: ()=>{},
    activeStructureType:"",
    setActiveStructureType: ()=>{},




    onHandStructure:{},
    setOnHandStructure:()=>{},
    availableStructure:{},
    setAvailableStructure:()=>{},

    
});

export const addPartStructure = (partStructures,locationArray)=>{
    const partStructuresPast = [...partStructures];
    const startIdx = 0;
    let currentStructure = partStructuresPast[startIdx];
    for (let i=0;i<locationArray.length;i++){
        console.log(locationArray[i]);
        currentStructure = currentStructure.children[locationArray[i]];
        
    }
    return [...partStructuresPast,currentStructure];

}

export const StructureIndexChange = (partStructures,index)=>{
    let counter = 0;
    const newStructures = partStructures.filter(()=>{
        counter++;
        return counter<index;

    })
    return newStructures;
}

export const resetPartStructures = ()=>{

    return []
}

export const PartStructureProvider = ({children}) =>{
    //partNumber for internal build function
    const [submittedQty, setSubmittedQty] = useState(0);
    const [qty,setQty] = useState(null);
    const [submittedPartStructure, setSubmittedPartStructure] = useState(undefined);
    const [currentPartStructure,setCurrentPartStructure] = useState(undefined);
    const [partStructures,setPartStructures] = useState([]);
    const [reqCount, setReqCount] = useState(0);
    const [isLoading,setIsLoading] = useState(false);
    const [submittedStructureType, setSubmittedStructureType] = useState("")
    const [activeStructureType, setActiveStructureType] = useState(defaultStructureOption);
    const [onHandStructure, setOnHandStructure] = useState({});
    const [availableStructure, setAvailableStructure] = useState({});

    //



    const addToStructures = (locationArray)=>{
        setPartStructures(addPartStructure(partStructures,locationArray))
    }

    const changeToStructure = (index) =>{
        setPartStructures(StructureIndexChange(partStructures,index))
    }

    const resetThePartStructures = ()=>{
        setPartStructures(resetPartStructures())
    }

    const changeActiveSetting = (setting)=>{
        setActiveStructureType(setting);
    }



    const updateCurrentPartStructure = (activeStructureSetting)=>{
        console.log(activeStructureSetting)
        switch(activeStructureSetting){
            case OPTIONTITLES.available:
                setPartStructures([availableStructure]);
                setCurrentPartStructure(availableStructure);
                console.log()
                break;
            case OPTIONTITLES.onHand:
                setPartStructures([onHandStructure]);
                setCurrentPartStructure(onHandStructure);
                break;
            default:
                setPartStructures([]);
                setCurrentPartStructure(undefined);
                console.log('Not Found!');
        }

        
  
    }
    useEffect(()=>{
        setActiveStructureType(OPTIONTITLES.available);

    },[])

    useEffect(()=>{
        setIsLoading(true);
        

        const completeBuild = async ()=>{
            //async function to start loading wheel and build structure, append 1st value to partStructures and set currentStructure the end of array
            if (reqCount===0){//return without running since no search requests have been made.
                setIsLoading(false);
                return;
            }
            try{
                if (submittedPartStructure!== currentPartStructure){

                }
                console.log("in comp build", submittedPartStructure);
                const masterStructure = new MasterStructure(submittedPartStructure);
                await masterStructure.generateMasterStructure();

                console.log('master structure created');
                const activeAvailableStructure = new AvailableStructure(masterStructure,submittedQty);
                const activeOnHandStructure = new OnHandStructure(masterStructure, submittedQty);
                console.log('master complete');
                activeAvailableStructure.generateAvailableStructure();
                activeOnHandStructure.generateOnHandStructure();
                console.log('after generation ', activeAvailableStructure.availableStructure);
                setOnHandStructure(activeOnHandStructure.onHandStructure);
                setAvailableStructure(activeAvailableStructure.availableStructure);
                
                console.log("set available structure: ",availableStructure);
  

            }catch (err){
                console.log("error generating map:", err);
                setPartStructures([]);
                setCurrentPartStructure(defaultStructure);
                if (reqCount!== 0){alert("Could not Generate Map");
                    console.log("error of map")
            }
            }finally{
                setIsLoading(false);
            }
            
        }
        completeBuild();

    },[reqCount])
    useEffect(()=>{
        let currentStructure = {}
        const finalIdx = partStructures.length-1;
        if (finalIdx>=0){
            currentStructure = partStructures[finalIdx];
        }else{
            currentStructure = undefined;
        }
        setCurrentPartStructure(currentStructure);
        console.log("partStructures: ",partStructures)
    },[partStructures])

    useEffect(()=>{
        if (reqCount!==0){
            updateCurrentPartStructure(activeStructureType);
        }
        
    }, [activeStructureType, availableStructure,onHandStructure])




    const value = {qty,setQty,currentPartStructure,
        setCurrentPartStructure,partStructures,setPartStructures,addToStructures,resetThePartStructures,changeToStructure,
        isLoading,setIsLoading,reqCount,setReqCount,changeActiveSetting,activeStructureType,setActiveStructureType, setSubmittedQty, setSubmittedPartStructure, setSubmittedStructureType}
    return <PartStructureContext.Provider value = {value}>{children}</PartStructureContext.Provider>

}