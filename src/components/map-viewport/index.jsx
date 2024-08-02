import { useContext } from "react";
import {DualRing} from "react-spinners-css";

import React from "react";
import Tree from "react-d3-tree";
import { useCenteredTree } from "../../utils/helpers.jsx"
import "./map-display.styles.scss"
import MapToolbar from "../map-toolbar/map-toolbar.component.jsx";
import { testPart } from "../../data/test-data.js";

const renderCard = ({ nodeDatum, foreignObjectProps = {}, addToStructures,currentPartStructure}) => {

  let currentLocationSize = -1;
  let nodeLocationSize = -1;

  if ( currentPartStructure.attributes.location !== undefined){
    currentLocationSize = currentPartStructure.attributes.location.length;
  }

  if (nodeDatum.attributes.location!== undefined){
    nodeLocationSize = nodeDatum.attributes.location.length;
  }
  const handleClick = ()=>{
    let location = nodeDatum.attributes.location;
    addToStructures(location);
    console.log(foreignObjectProps);


  }

    return (
      <React.Fragment>
        <foreignObject
        //create node container that will have part information
          {...foreignObjectProps}
          width="520"
          height="520"
          x="-210"
          y="-30"
          onClick= {()=>{currentLocationSize!== nodeLocationSize &&  handleClick()}}

        >
          <div
            className={`card ${nodeDatum.attributes.isComponentDemandMet?"componenet-demand-met":""} ${ nodeDatum.attributes.isDemandMet? "demand-met" : ""}     `}
          >
            <h2>{nodeDatum.name}</h2>
            <p>DESC: {nodeDatum.attributes?.description}</p>
            <p>QTY REQ: {Number(nodeDatum.attributes.qty).toFixed(2)}</p>
            <p>ON HAND: {nodeDatum.attributes.onHand.toFixed(2)}</p>
  
          </div>
        </foreignObject>
      </React.Fragment>
    );
  };

const MapDisplay = ()=>{

    const [dimensions, translate] = useCenteredTree();
    const currentPartStructure = testPart[1];

    return (
        <div className="viewer">

            {isLoading &&<div className="loading"><DualRing color="black" size={300}/></div>}
            <MapToolbar/>
            {currentPartStructure!== undefined && !isLoading&&<div className="tree"><Tree
                nodeSize={{x: 110+(JSON.stringify(currentPartStructure).length/1000), y: 750 + (JSON.stringify(currentPartStructure).length/100)
              }}
                pathFunc="beizer curves"
                svgClassName="pathlines"
                scaleExtent={{min:.005,max:1}}
                separation={{ siblings: 4, nonSiblings: 4 }}
                data={currentPartStructure}
                dimensions={dimensions}
                translate={translate}
                orientation = "vertical"
                centeringTransitionDuration={200}
                renderCustomNodeElement={(rd3tProps) =>
                    renderCard({ ...rd3tProps,addToStructures,currentPartStructure})
                    
                }
            /></div>}
            

        </div>

    )
}
export default MapDisplay;