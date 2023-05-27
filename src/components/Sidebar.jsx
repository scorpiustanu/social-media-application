import React from "react";
import { Stack } from "@mui/material";
import {categories} from '../utils/constants';
import './Sidebar.css'

const Sidebar = ({selectedCategory,setSelectedCategory}) => (
        <Stack
            direction={'row'}
            sx={{
                overflowY:"auto",
                height : {sx:'auto',md : '95%'},
                flexDirection:{md:'column'}
            }}
            
        >
            
            {categories.map((category,index) => (
                 <button key={category.name} 
                 className="category-btn"
                 onClick={() => setSelectedCategory(category.name)}
                 style={{
                    backgroundColor:"#000",
                    background:category.name === selectedCategory && '#FC1503',
                    borderRadius:'13px',
                    margin:'3px'
                 }}

                 >
                    <span  style={{color :'white', marginRight:'15px'}} >{category.icon}</span>
                    <span  style={{opacity: category.name === selectedCategory?'1':'0.8',color:'white'}}>{category.name}</span>
                 </button>
            ))}


        </Stack>
);

export default Sidebar;