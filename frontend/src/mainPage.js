import React, {useRef, useEffect, useState} from 'react';
// import {BrowserRouter as Router, Routes, Route, Link, Switch} from 'react-router-dom';  // eslint-disable-line no-unused-vars 
import axios from 'axios';
import Button from '@mui/material/Button';
import './mainPage.css';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import SchoolIcon from '@mui/icons-material/School';
import { width } from '@mui/system';
import { select} from "d3";  

function MainPage(){
    const [jsonData, setHello] = useState('')
    const badge = localStorage.getItem('badge');
    const svgRef = useRef();
    const d3 = require("d3");
    const width = 640;
    const radius = width / 2;

    //const csv = async() => d3.csvParseRows(await fetch("visit-sequences@1.csv").text());
    const csv = [
        ["account-account-account-account-account-account","22781"],
        ["account-account-account-account-account-end", "3311"],
        ["account-account-account-account-account-home", "906"],
    ];


    console.log('csv: ',csv);

    function buildHierarchy(csv) {
        // Helper function that transforms the given CSV into a hierarchical format.
        const root = { name: "root", children: [] };
        for (let i = 0; i < csv.length; i++) {
          const sequence = csv[i][0];
          const size = +csv[i][1];
          if (isNaN(size)) {
            // e.g. if this is a header row
            continue;
          }
          const parts = sequence.split("-");
          let currentNode = root;
          for (let j = 0; j < parts.length; j++) {
            const children = currentNode["children"];
            const nodeName = parts[j];
            let childNode = null;
            if (j + 1 < parts.length) {
              // Not yet at the end of the sequence; move down the tree.
              let foundChild = false;
              for (let k = 0; k < children.length; k++) {
                if (children[k]["name"] == nodeName) {
                  childNode = children[k];
                  foundChild = true;
                  break;
                }
              }
              // If we don't already have a child node for this branch, create it.
              if (!foundChild) {
                childNode = { name: nodeName, children: [] };
                children.push(childNode);
              }
              currentNode = childNode;
            } else {
              // Reached the end of the sequence; create a leaf node.
              childNode = { name: nodeName, value: size };
              children.push(childNode);
            }
          }
        }
        return root;
      }

    //const data = buildHierarchy(csv);

    const data ={name: "root",
         children: [{name: "account",
                    children: [
                        {name: "account",
                        children: []},
                        {name: "end",
                        value: 202885},
                        {name: "home",
                        children: []},
                        {name: "search",
                        children: []}
                    ]},
                    {name: "home",
                    children: [{name: "account",
                    children: []},
                    {name: "end",
                    value: 202885},
                    {name: "home",
                    children: []},
                    {name: "search",
                    children: []}]},
                    {name: "other",
                    children: [{name: "account",
                    children: []},
                    {name: "end",
                    value: 202885},
                    {name: "home",
                    children: []},
                    {name: "search",
                    children: []}]},
                    {name: "product",
                    children: [{name: "account",
                    children: []},
                    {name: "end",
                    value: 202885},
                    {name: "home",
                    children: []},
                    {name: "search",
                    children: []}]}]
        };
    console.log(data);

    const partition = data =>
        d3.partition().size([2 * Math.PI, radius * radius])(
        d3
            .hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value)
        );

    const color = d3
        .scaleOrdinal()
        .domain(["home", "product", "search", "account", "other", "end"])
        .range(["#5d85cf", "#7c6561", "#da7847", "#6fb971", "#9e70cf", "#bbbbbb"])

    const arc = d3
        .arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(1 / radius)
        .padRadius(radius)
        .innerRadius(d => Math.sqrt(d.y0))
        .outerRadius(d => Math.sqrt(d.y1) - 1)

    const mousearc = d3
        .arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .innerRadius(d => Math.sqrt(d.y0))
        .outerRadius(radius)


    useEffect(() => {
        const svg = select(svgRef.current);
    
        const root = partition(data);
        console.log(root);
        // Make this into a view, so that the currently hovered sequence is available to the breadcrumb
        const element = svg.node();
        element.value = { sequence: [], percentage: 0.0 };

        
        const label = svg
            .append("text")
            .attr("text-anchor", "middle")
            .attr("fill", "#888")
            .style("visibility", "hidden");

        label
            .append("tspan")
            .attr("class", "percentage")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", "-0.1em")
            .attr("font-size", "3em")
            .text("");

        label
            .append("tspan")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", "1.5em")
            .text("of visits begin with this sequence");

        svg
            .attr("viewBox", `${-radius} ${-radius} ${width} ${width}`)
            .style("max-width", `${width}px`)
            .style("font", "12px sans-serif");

        const path = svg
            .append("g")
            .selectAll("path")
            .data(
            root.descendants().filter(d => {
                // Don't draw the root node, and for efficiency, filter out nodes that would be too small to see
                return d.depth && d.x1 - d.x0 > 0.001;
            })
            )
            .join("path")
            .attr("fill", d => color(d.data.name))
            .attr("d", arc);

        svg
            .append("g")
            .attr("fill", "none")
            .attr("pointer-events", "all")
            .on("mouseleave", () => {
            path.attr("fill-opacity", 1);
            label.style("visibility", "hidden");
            // Update the value of this view
            element.value = { sequence: [], percentage: 0.0 };
            element.dispatchEvent(new CustomEvent("input"));
            })
            .selectAll("path")
            .data(
            root.descendants().filter(d => {
                // Don't draw the root node, and for efficiency, filter out nodes that would be too small to see
                return d.depth && d.x1 - d.x0 > 0.001;
            })
            )
            .join("path")
            .attr("d", mousearc)
            .on("mouseenter", (event, d) => {
            // Get the ancestors of the current segment, minus the root
            const sequence = d
                .ancestors()
                .reverse()
                .slice(1);
            // Highlight the ancestors
            path.attr("fill-opacity", node =>
                sequence.indexOf(node) >= 0 ? 1.0 : 0.3
            );
            const percentage = ((100 * d.value) / root.value).toPrecision(3);
            label
                .style("visibility", null)
                .select(".percentage")
                .text(percentage + "%");
            // Update the value of this view with the currently hovered sequence and percentage
            element.value = { sequence, percentage };
            element.dispatchEvent(new CustomEvent("input"));
            });
        }, [data]
    );



    const Logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("nickName");
        localStorage.removeItem("email");
        localStorage.removeItem("badge");
    }

    return(
        <div>
            <div className='container-right'>
                <div>
                    <div>
                    {
                        localStorage.getItem("accessToken") == null
                        ?<div className="sign-container"><Link href ="./SignIn" color='#000000'>Sign In</Link>
                        <Link href="./SignUp" color='#000000'>Sign Up</Link></div>
                        :<div className="sign-container">
                            <div>
                            <SchoolIcon style={{ color: badge > 5 ? '#F15F5F' : '#6B66FF', verticalAlign: 'bottom', marginRight: 8}}/> 
                            <Link href ="./Account" color='#000000'>          
                                {localStorage.getItem('nickName')}
                            </Link>
                            </div>
                            <Link href="./" onClick={Logout} color='#000000'>logout</Link>
                        </div>
                    }
                    </div>
                </div>
            </div>
            <div className="container">
                {/*logo*/}
                <Link href ="/">    
                    <Button startIcon={<img src="/img/armoury_logo.png" alt="Armoury" width={60} height={60}/>} sx={{
                    mr:1
                    ,fontSize:30
                    ,color:"black"
                    }}>
                    <strong>0xARMOURY</strong>
                    </Button>
                </Link>

                <div className='container-right'>
                    <div className='outline-container'>
                        <div className="button-container">
                            <Link href ="./Matrix" color='#000000'>Matrix</Link>
                            <Link href="./Tools" color='#000000'>Tools</Link>
                            <Link href ="./Training" color='#000000'>Training</Link>
                            <Link href ="./Gallery" color='#000000'>Gallery</Link>
                            <Link href ="./Mytools" color='#000000'>My tool</Link>
                        </div>
                    </div>
                    
                    <Box sx={{ '& > :not(style)': { m: 1 } , justifyContent: "flex-end"}}>
                        <TextField
                            id="input-with-icon-textfield"
                            
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="end">
                                <SearchIcon/>
                                </InputAdornment>
                            )
                            ,
                            }}
                            variant="standard"
                        />
                    </Box>
                </div>
            </div>
            <div className = 'division-line'></div>
            <div className='container-body1' >
                <div className='container-body2'>
                    <svg ref={svgRef}></svg>
                </div>
            </div>
        </div>
    );
}

export default MainPage;

