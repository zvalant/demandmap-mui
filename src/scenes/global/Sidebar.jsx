import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, darkScrollbar, IconButton, Typography, useTheme } from "@mui/material";

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


import RemainingItems from "../../components/remaining-items";
import { testPart } from "../../data/test-data";

const selectionToggle = ({title, selected})=>{
  const oldSelect = selected;
  if (title in oldSelect){
    oldSelect.pop(title);
  }else{
    oldSelect.push(title);
  }
  return new Set(oldSelect);

}

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState(new Set());

  return (
    <Box
      sx={{
  
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
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
        "& .pro-sidebar-layout": {
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

        }
        
              
            
               
        }}
        display="flex"
        flexDirection="column">
      <ProSidebar collapsed={isCollapsed} >
        <Menu iconShape="square"> 
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
              top: "0",
              position: "-webkit-sticky",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]} title="BAADER ////">
                  BAADER ////
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>


          <Box paddingLeft={isCollapsed ? undefined : "5%"} sx={{  

            
            
      }}
           
          
          >
   
            <SubMenu title="Setup">
            <Item
              title="Add Structure"
              to="/"
              icon={<AddOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Select Strucutre"
              to="/"
              icon={<SelectOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Update Structure"
              to="/"
              icon={<RefreshOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Structure Type"
              to="/"
              icon={<StructureTypeIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Quantity"
              to="/"
              icon={<QuantityIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            </SubMenu>

            <SubMenu title="Data">
            <SubMenu
              title="Remaining Items"
              to="/"
              icon={<RemainingItemsIcon/>}
              selected={selected}
              setSelected={setSelected}
            >
              
              <Box>
                {!isCollapsed && 
                <RemainingItems testPart={testPart}/>}
                </Box>
            </SubMenu>
            
            <Item
              title="Purchase Parts"
              to="/"
              icon={<PurchasePartTimelineIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Part Info"
              to="/"
              icon={<PartInfoIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            </SubMenu>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;