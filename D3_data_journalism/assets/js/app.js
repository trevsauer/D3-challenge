// You need to create a scatter plot between two of the data variables such as Healthcare vs. Poverty or Smokers vs. Age.
// Using the D3 techniques we taught you in class, create a scatter plot that represents each state with circle elements. 
// You'll code this graphic in the app.js file of your homework directory—make sure you pull in the data from data.csv by using the d3.csv function. 
// Your scatter plot should ultimately appear like the image at the top of this section.
//         Include state abbreviations in the circles.
//         Create and situate your axes and labels to the left and bottom of the chart.
//         Note: You'll need to use python -m http.server to run the visualization. This will host the page at localhost:8000 in your web browser.

// set up container size
var svgWidth = 1000; 
var svgHeight = 700;

// set up the margins
var margin = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40
};

// set up the area for the chart, minus the margins that have been created 
var width  = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom; 

// create a wrapper for the SVG, and append an SVG group that will hold the chart 
// & shift the svg group by the left and top margins 
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);  

// plug in the data and set up graph
d3.csv("./assets/data/data.csv").then(function(demographicsData){

    // parse data
    demographicsData.forEach(function(data) {
        data.healthcare = +data.healthcare;
        data.poverty =+data.poverty;
    });

    var chartGroup = svg.selectAll("g myCircleText")
        .data(demographicsData);

    var chartEnter = chartGroup.enter()
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // create scale functions
    // create x axis scale to represent poverty data
    var xLinearScale = d3.scaleLinear()
        .domain([10, d3.max(demographicsData, d => d.poverty)])
        .range([0,width]);

    // create y axis scale to represent healthcare data
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(demographicsData, d => d.healthcare)])
        .range([height,0]);

    // create x(bottom) and y(left) axis functions 
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    // set the x to the bottom of chart
    chartEnter.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    // set the y to the left of the chart 
    chartEnter.append("g")
        .call(yAxis);
    

    var circles = chartEnter.append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("class", "stateCircle");
        
    var text = chartEnter.append("text")
    .text(d => d.abbr)
    .attr("dx", d => xLinearScale(d.poverty))
    .attr("dy", d => (yLinearScale(d.healthcare)) + 5)
    .attr("class", "stateText");

    // create the labels for the axes 
    chartEnter.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left -5)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "aText")
    .text("Lacks Healthcare (%)");
    
    chartEnter.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 0})`)
    .attr("class", "aText")
    .text("In Poverty (%)");

});
