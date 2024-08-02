import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";

import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";


import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SelectOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import StructureTypeIcon from "@mui/icons-material/TuneOutlined";
import QuantityIcon from "@mui/icons-material/Inventory2Outlined";
import RemainingItemsIcon from "@mui/icons-material/FeedOutlined";
import PurchasePartTimelineIcon from "@mui/icons-material/ViewTimelineOutlined";
import PartInfoIcon from "@mui/icons-material/NoteOutlined";

import PartInfo from "../../components/part-info";
import RemainingItems from "../../components/remaining-items";
import { testPart } from "../../data/test-data";
import Quantity from "../../components/quantity";
import StructureSelection from "../../components/structure-selection";
import StructureType from "../../components/structure-type";
import AddPartStructure from "../../components/add-part-structure";

const STRUCTUREOPTIONS = ["Available", "On Hand"]
const SIDEBARSUBMENUS = {
  collapsed: "Collapsed",
  partInfo: "Part Info",
  remainingItems: "Remaining Items",
  structureType: "Structure Type",
  quantity: "Quantity",
  setup: "Setup",
  data: "Data",
  AddPartStructure: "Add Part Structure",

}

const selectionToggle = ({title, selected})=>{
  const oldSelect = selected;
  if (title in oldSelect){
    oldSelect.pop(title);
  }else{
    oldSelect.push(title);
  }
  return new Set(oldSelect);

}


const Sidebar = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);


  const [selected, setSelected] = useState(new Set());
  const [isAddPartStructure, setIsAddPartStructure] = useState(false);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isDataOpen, setIsDataOpen] = useState(false);
  const [activeMainMenu, setActiveMainMenu] = useState("")
  const [isRemainingOpen, setIsRemainingOpen] = useState(false);
  const [isPartInfoOpen, setIsPartInfoOpen] = useState(false);
  const [isStructureTypeOpen, setIsStructureTypeOpen] = useState(false);
  const [isQuantityOpen, setIsQuantityOpen] = useState(false);
  

  const HandleSubmenuToggle = ({toggle, menu})=>{
    console.log("Add Part", isAddPartStructure);
    console.log("setup", isSetupOpen);
    console.log("data", isDataOpen);
    
    if(toggle){
    setIsSetupOpen(false);
    setIsDataOpen(false);
    setIsAddPartStructure(false);
    }
    

    switch(menu){
      case SIDEBARSUBMENUS.AddPartStructure:
        setIsAddPartStructure(!toggle);
        break;
      case SIDEBARSUBMENUS.setup:
        setIsSetupOpen(!toggle);
        break;
      case SIDEBARSUBMENUS.data:
        setIsDataOpen(!toggle);
        break;

      default:
        console.log("Default Hit");
    }

  }

  return (
    <Box
    //background and scrollbar overrides to convert sidebar to current theme
      sx={{
        overflowX: "hidden",

        minWidth: "100px",
        "& .pro-sub-menu": {
          overflowX: "hidden",

        },
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          minWidth: "100px",
          overflowX: "hidden",

        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#313bf9 !important",
        },
        "& .pro-menu-item.active": {
          color: "#313bf9 !important",

        },
        "& .pro-sidebar-collapsed": {
        },
        "& .pro-sidebar-layout": {
          '&::-webkit-scrollbar': { display: 'scroll', overflowX: "hidden" },
            '::-webkit-scrollbar' :{
              width: "5px", 
              overflowX: "hidden",
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

        },
        //update boxes in sidebar to have custom scrollbar
        "& .MuiBox-root": {
          '&::-webkit-scrollbar': { display: 'scroll', overflowx:"hidden"},
            '::-webkit-scrollbar' :{
              //0 width makes scrollbar hidden w/o losing functionality
              width: "0px", 
              overflowX: "hidden",
            },
            '& ::-webkit-scrollbar-track':{
              background: `${colors.primary[400]}`, 
              borderRadius: "10px", 
            },
            
            '&::-webkit-scrollbar-thumb': {
              background: "#888",
              borderRadius: "10px" 
            },
            
            '&::-webkit-scrollbar-thumb:hover': {
              background: "#555", 
            },
          }
        
              
            
               
        }}
        display="flex"
        flexDirection="column">
      <ProSidebar collapsed={isCollapsed} >
        <Menu iconShape="square" 
        > 
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => HandleSubmenuToggle({toggle: isCollapsed, menu: SIDEBARSUBMENUS.collapsed})}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
              top: "0",
              position: "-webkit-sticky",
              minWidth: "200px",
              overflowX: "hidden"
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                ml="0px"
              >
                <Typography sx = {{m: .5}} variant="h3" color={colors.grey[100]} title="BAADER ////">
                
                  BAADER 
                </Typography>
                <Typography  sx={{m: .5}} variant="h2" color={colors.grey[100]} title="////"> ////
                </Typography>
              </Box>
            )}
          </MenuItem>


          <Box paddingLeft={isCollapsed ? undefined : "0%"} sx={{  

      }}
           
          ><SubMenu
          title="Add Part Structure"
          ><Box overflow="hidden" display="flex" flexDirection="column" alignItems="center">
            <AddPartStructure/>
          </Box>
          </SubMenu>
            <SubMenu 
              title="Setup"
            >
            <Box minHeight="25vh" overflow="hidden" display="flex" flexDirection="column" alignItems="center">

              <StructureSelection structures = {testPart}/>
              <StructureType StructureOptions={STRUCTUREOPTIONS}/>
              <Quantity/>
            </Box>
            </SubMenu>

            <SubMenu title="Data"
              >
              <Box display="flex" flexDirection= "column" alignItems="center">
              <Typography variant="h5">REMAINING ITEMS</Typography>
              <Box sx={{
              mt: 2,
              maxHeight: "30vh",
              overflow: "scroll",
            }}>
              <RemainingItems part={testPart[1]}/>
            </Box>
                
            </Box>
            
 
            <Box display="flex" flexDirection= "column" alignItems="center"
              >
              <Typography variant="h5">PART INFO</Typography>
              <PartInfo part={testPart[1]}/>
            </Box>
  
  
            
            </SubMenu>
            </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;