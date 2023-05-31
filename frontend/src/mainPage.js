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
import { create, select} from "d3";  

function MainPage(){
    const [jsonData, setHello] = useState('')
    const badge = localStorage.getItem('badge');
    const svgRef1 = useRef();
    const svgRef2 = useRef();
    const d3 = require("d3");
    const width = 640;
    const radius = width / 2;
    const breadcrumbWidth = 250;
    const breadcrumbHeight = 30;

    function breadcrumbPoints(d, i) {
        const tipWidth = 10;
        const points = [];
        points.push("0,0");
        points.push(`${breadcrumbWidth},0`);
        points.push(`${breadcrumbWidth + tipWidth},${breadcrumbHeight / 2}`);
        points.push(`${breadcrumbWidth},${breadcrumbHeight}`);
        points.push(`0,${breadcrumbHeight}`);
        if (i > 0) {
          // Leftmost breadcrumb; don't include 6th vertex.
          points.push(`${tipWidth},${breadcrumbHeight / 2}`);
        }
        return points.join(" ");
      }


    const [data, setData] = useState([]);

    const datalist = async () => {
        try {
          const response = await axios.get('/tools/d3');
          setData(response.data);
        } catch (error) {
          console.error('datalist error:', error);
        }
      };
    
      useEffect(() => {
        datalist();
      }, []);
    

    const partition = data =>
        d3.partition().size([2 * Math.PI, radius * radius])(
        d3
            .hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value)
        );

    const color = d3
        .scaleOrdinal()
        .domain(["Reconnaissance", "Resource Development", "Initial Access", "account", "other", "end"])
        .range(["#EFEEFF", "#CECCFF", "#9C99FF", "#6B66FF"])

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

    //useEffect(() => {sunburst();});

    const sunburst = () => {
        const svg1 = select(svgRef1.current);
        const svg = select(svgRef2.current);

        svg //글자 시각화
            .attr("viewBox", `0 0 ${breadcrumbWidth * 4} ${breadcrumbHeight}`)
            .style("font", "bold 10px sans-serif")
            .style("margin", "5px");
        
        //원 모양 시각화
        const root = partition(data);
        // Make this into a view, so that the currently hovered sequence is available to the breadcrumb
        const element = svg1.node();
        element.value = { sequence: [], percentage: 0.0 };

        
        const label = svg1
            .append("text")
            .attr("text-anchor", "middle")
            .attr("fill", "#888")
            .style("visibility", "hidden");

        label
            .append("tspan")
            .attr("class", "name")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", "1.0em")
            .attr("font-size", "2.3em")
            .attr("font-weight", "bold")
            .text(""); 

        label
            .append("tspan")
            .attr("class", "percentage")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", "-1.0em")
            .attr("font-size", "2.5em")
            .attr("font-weight", "bold")
            .text("");

        svg1
            .attr("viewBox", `${-radius} ${-radius} ${width} ${width}`)
            .style("max-width", `${width}px`)
            .style("font", "12px sans-serif");

        const path = svg1
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

        svg1
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
            label
                .style("visibility", null)
                .select(".name")
                .text(d.data.name);
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
            const g = svg
                .selectAll("g")
                .data(sequence)
                .join("g")
                .attr("transform", (d, i) => `translate(${i * breadcrumbWidth}, 0)`);

            g.append("polygon")
                .attr("points", breadcrumbPoints)
                .attr("fill", d => color(d.data.name))
                .attr("stroke", "white");

            g.append("text")
                .attr("x", (breadcrumbWidth + 10) / 2)
                .attr("y", 15)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .attr("fill", "black")
                .text(d => d.data.name);

            });
            
        return element;
    };

    useEffect(() => {
        const sun = sunburst();
    });

    


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
            <div className='container-svg' >
                <div className='svg-top2'>
                     <div className='svg-text'>Tactic</div>
                     <div className='svg-text'>Technic</div>
                     <div className='svg-text'>Tool</div>
                </div>
                <div className='svg-top'>
                    <svg ref={svgRef2}></svg>
                </div>
                    <div className = 'container-svg2'>
                        
                        <div className='svg-content'>
                            <div className='svg-text1'>mouse over!</div>
                            <svg ref={svgRef1}></svg>
                        </div>
                        <div className='svg-content2'>
                            <div className='svg-text1'>
                                cyber arsenal with <br />MITRE ATT&CK framework
                            </div>
                            <div className='svg-text2'>
                            <strong>0xARMOURY</strong> is a cyber arsenal <br />
                            that is linked to the miter att&ck framework.<br />
                            Try and train with lots of information and tools!<br />
                            You may also share information with users.
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default MainPage;

