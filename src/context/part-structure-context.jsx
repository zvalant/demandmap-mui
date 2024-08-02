import { createContext,useState,useEffect } from "react";
import { createBuild } from "../utils/bomcreation.mjs";

const defaultStructure = {attributes:{}};

export const MapGenContext = createContext({
    partNumber: null,
    setPartNumber: ()=>null,
    qty: null,
    setQty: ()=>null,
    reqCount:null, 
    setReqCount:()=>{},
    currentPartStructure: defaultStructure,
    setCurrentPartStructure: ()=>{},
    partStructures: [],
    setPartStructures: ()=>{},
    unfBomToggle: null,
    setUnfBomToggle: {},
    partMenuToggle: null,
    setPartMenuToggle: {}
    
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
        return counter<=index+1;

    })
    return newStructures;
}

export const resetPartStructures = ()=>{

    return []
}

export const MapGenProvider = ({children}) =>{
    const [partNumber,setPartNumber] = useState(null);
    const [qty,setQty] = useState(null);
    const [currentPartStructure,setCurrentPartStructure] = useState(undefined);
    const [partStructures,setPartStructures] = useState([]);
    const [reqCount, setReqCount] = useState(0);
    const [isLoading,setIsLoading] = useState(false);
    const [unfBomToggle, setUnfBomToggle] = useState(false);
    const [partMenuToggle, setPartMenuToggle] = useState(false);



    const addToStructures = (locationArray)=>{
        setPartStructures(addPartStructure(partStructures,locationArray))
    }


    const resetThePartStructures = ()=>{
        setPartStructures(resetPartStructures())
    }

    useEffect(()=>{

        const currentPart = partNumber;
        const currentQty = qty;
        setIsLoading(true);

        const completeBuild = async (currentBuild,currentPart,currentQty)=>{
            //async function to start loading wheel and build structure, append 1st value to partStructures and set currentStructure the end of array
            if (reqCount===0){//return without running since no search requests have been made.
                setIsLoading(false);
                return;
            }
            try{
                console.log("part structure by async: ",partStructures)
                const finalBuild = await createBuild(currentBuild,currentPart,currentBuild,currentQty,[]);
                console.log("map complete");
                setPartStructures([finalBuild]);
                setCurrentPartStructure(finalBuild)
              
            }catch (err){
                console.log("error generating map");
                setPartStructures([]);
                setCurrentPartStructure({attributes:{}})
                if (reqCount!== 0){alert("invalid entry")
            }
            }finally{
                setIsLoading(false);
            }
            
        }
        completeBuild({attributes:{}},currentPart,currentQty);

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

    const value = {partNumber,setPartNumber,qty,setQty,currentPartStructure,setCurrentPartStructure,partStructures,setPartStructures,addToStructures,resetThePartStructures,changeToStructure,isLoading,setIsLoading, unfBomToggle,setUnfBomToggle,reqCount,setReqCount, partMenuToggle,setPartMenuToggle}
    return <MapGenContext.Provider value = {value}>{children}</MapGenContext.Provider>

}