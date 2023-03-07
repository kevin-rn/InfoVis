// set the dimensions and margins of the graph
const graph_margin = {top: 10, right: 30, bottom: 30, left: 60},
graph_width = 600 - graph_margin.left - graph_margin.right,
graph_height = 450 - graph_margin.top - graph_margin.bottom;

// append the svg object to the body of the page

var x_desc = document.createElement("div")
x_desc.id = "x_desc"
document.getElementById("graph").appendChild(x_desc)

var y_desc = document.createElement("div")
y_desc.id = "y_desc"
document.getElementById("graph").appendChild(y_desc)


const graph = d3.select("#graph")
.append("svg")
.attr("width", graph_width + graph_margin.left + graph_margin.right)
.attr("height", graph_height + graph_margin.top + graph_margin.bottom)
.attr("position", "relative")
.append("g")
.attr("transform", `translate(${graph_margin.left}, ${graph_margin.top})`)

//Read the data
var xAxisSvg;
var yAxisSvg;
var xScale;
var yScale;
function build_graph() {
    xAxisSvg = graph.append("g")
    .attr("id", "x-axis")

    yAxisSvg = graph.append("g")
    .attr("id", "y-axis")

    var rect_d = 13
    // Add dots
    graph.selectAll("scatterPoints")
    .data(Object.values(data).slice(1))
    .enter()
    .append("g")
    .attr("id", (d) => d.po)
    .style("cursor", "pointer")
    .on("click", function(d){
        update_state(this.id)
    })
    .on("mouseover", function(d){
        var x = this.getElementsByTagName("rect")[0].getAttribute("data-xvalue");
        var y = this.getElementsByTagName("rect")[0].getAttribute("data-yvalue");
        this.parentNode.appendChild(this);
        graph.select("#" + this.id).select("rect")
        .attr("x", (d) => xScale(x) - rect_d)
        .attr("y", (d) => yScale(y) - rect_d)
        .attr("stroke", "red")
        .attr("width", rect_d * 2)
        .attr("height", rect_d * 2)

        graph.select("#" + this.id).select("text")
        .attr("fill", "red")
        .attr("font-size", "1em")
    })
    .on("mouseleave", function(d){
        var x = this.getElementsByTagName("rect")[0].getAttribute("data-xvalue");
        var y = this.getElementsByTagName("rect")[0].getAttribute("data-yvalue");
        this.parentNode.appendChild(this);
        graph.select("#" + this.id).select("rect")
        .attr("stroke", ((selected_state === "US")? "black" : (selected_state === this.id)?"red":"grey"))
        .attr("width", rect_d)
        .attr("height", rect_d)
        .attr("x", (d) => xScale(x) - rect_d/2)
        .attr("y", (d) => yScale(y) - rect_d/2)

        graph.select("#" + this.id).select("text")
        .attr("fill", ((selected_state === "US")? "black" : (selected_state === this.id)?"red":"grey"))
        .attr("font-size", ".5em")
    })

    Object.values(data).forEach((d) => {
        graph.select("#" + d.po).append(("rect"))
        .attr("width", rect_d)
        .attr("height", rect_d)
        .attr("fill", "white")
        .attr("class", "square")
        .attr("stroke", "black")
    })
    
    Object.values(data).forEach((d) => {
        graph.select("#" + d.po).append(("text"))
        .attr("fill", "black")
        .attr("class", "graph_po")
        .attr("font-size", ".5em")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-weight", "bold")
        .html((d) => d.po)
    })

    x_desc.style. position = "relative";
    x_desc.style.top = graph_height + graph_margin.top + 40 + "px"
    x_desc.style.left =  (graph_width + graph_margin.left) / 2 + "px"

    var x_dropdown = document.createElement("select");
    x_dropdown.id = "x_desc_dropdown";
    
    x_desc.appendChild(x_dropdown);

    [["density", "population density"], ["population", "population"], ["change", "population change"]].forEach(x_option => {
        var opt = document.createElement("option");
        opt.value = x_option[0];
        opt.innerHTML = x_option[1];
        x_dropdown.appendChild(opt);
    })

    x_desc.onchange = (() => {
        plot(d3.select('#dropdown').property('value'), x_dropdown.value, y_dropdown.value)
    })

    y_desc.style.position = "relative";
    y_desc.style.top = (graph_height - graph_margin.bottom - graph_margin.top)/2 + "px"
    y_desc.style.left =   graph_margin.left/4 + "px"

    var y_dropdown = document.createElement("select");
    y_dropdown.style.rotate = "-90deg";
    y_dropdown.id = "y_desc_dropdown";
    
    y_desc.appendChild(y_dropdown);

    [["DEMOCRAT", "Democrat"], ["REPUBLICAN", "Republican"], ["LIBERTARIAN", "Libertarian"], ["OTHER", "Other"]].forEach(x_option => {
        var opt = document.createElement("option");
        opt.value = x_option[0];
        opt.innerHTML = x_option[1];
        y_dropdown.appendChild(opt);
    })

    y_desc.onchange = (() => {
        plot(d3.select('#dropdown').property('value'), x_dropdown.value, y_dropdown.value)
    })



    plot("2020", "density", "DEMOCRAT")
};


function plot(year, x, y){
    // set the dimensions and margins of the graph
    const width = graph_width,
        height = graph_height;

    var xMin = d3.min(Object.values(data).slice(1), (d) => d[year][x]);
    var xMax = d3.max(Object.values(data).slice(1), (d) => d[year][x]);

    // var yMin = d3.min(data, (d) => d[year][y]);
    var yMin = 0;
    var yMax = d3.max(Object.values(data).slice(1), (d) => d[year][y]/d[year]["total_votes"]);
    if (y === "DEMOCRAT" || y === "REPUBLICAN") {
        yMax = 1
    }

    var axisOffset = 5

    // Add X axis
    xScale = d3.scaleLinear()
    .domain([Math.min(xMin, 0), xMax])
    .range([graph_margin.left + axisOffset, width -graph_margin.right])

    // Add Y axis
    // if (yMin > 0 && yMax < 1) {
    //     yMin = 0;
    //     yMax = 1;
    // }
    yScale = d3.scaleLinear()
    .domain([yMin, yMax])
    .range([height - graph_margin.bottom - axisOffset, graph_margin.top]);
    
    var xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("~s"))
    var yAxis = d3.axisLeft().scale(yScale).tickFormat(d3.format(".1%"))
    
    
    if (x == "density") {
        xScale = d3.scaleLog()
        .domain([xMin, xMax])
        .range([graph_margin.left + axisOffset, width -graph_margin.right]);
        xAxis = d3.axisBottom().scale(xScale);
    } else if (x == "change") {
        xAxis.tickFormat(d3.format("+.0%"))
    }



    xAxisSvg
    .attr("transform", "translate(0, "+ (height - graph_margin.bottom) + ")")
    .call(xAxis);

    yAxisSvg
    .attr("transform", "translate("+ (graph_margin.left)+", 0)")
    .call(yAxis)


    var rect_d = 13

    function get_y(d) {
        if (y in d[year]) {
            return d[year][y] / d[year]["total_votes"];
        } else {
            return 0;
        }
    }

    Object.values(data).forEach((d) => {
        graph.select("#" + d.po).select("rect")
        .attr("x", (d) => xScale(d[year][x]) - rect_d/2)
        .attr("y", (d) => yScale(get_y(d)) - rect_d/2)
        .attr("data-xvalue", (d) => d[year][x])
        .attr("data-yvalue", (d) => get_y(d))
    })

    
    Object.values(data).forEach((d) => {
        graph.select("#" + d.po).select("text")
        .attr("transform", (d) => "translate("+xScale(d[year][x])+","+yScale(get_y(d))+")")
        .attr("id", (d) => d.po)
        .attr("fill", "black")
        .attr("class", "graph_po")
        .attr("data-xvalue", (d) => d[year][x])
        .attr("data-yvalue", (d) => get_y(d))
        .attr("font-size", ".5em")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-weight", "bold")
        .html((d) => d.po)
    })
}
