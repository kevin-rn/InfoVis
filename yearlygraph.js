// set the dimensions and yg_margins of the graph
const yg_margin = { top: 10, right: 30, bottom: 30, left: 60 },
    yeargraph_width = 600 - yg_margin.left - yg_margin.right,
    yeargraph_height = 500 - yg_margin.top - yg_margin.bottom;

// append the svg object to the body of the page
const yeargraph = d3.select("#yearlygraph")
    .append("svg")
    .attr("width", yeargraph_width + yg_margin.left + yg_margin.right)
    .attr("height", yeargraph_height + yg_margin.top + yg_margin.bottom)
    .attr("position", "relative")
    .append("g")
    .attr("transform", `translate(${yg_margin.left}, ${yg_margin.top})`);

var x = d3.scaleBand()
  .range([ 0, yeargraph_width ])
  .domain(years)
  .padding(0.2);


var y = d3.scaleLinear()
    .domain([-1, 1])
    .range([yeargraph_height, 0])
yeargraph.append("g")
    .attr("id", "y_axis")
    .call(d3.axisLeft().scale(y).tickFormat(d3.format("+.0%")))

yeargraph.selectAll("mybar")
  .data(years)
  .enter()
  .append("rect")
    .attr("id", (d) => "y" + d)
    .attr("x", function(d) { return x(d); })
    .attr("width", x.bandwidth())
    .attr("stroke", "black")
    .attr("stroke-width", "0px")
    .on("click", function(d){
        update_year(this.id.substring(1))
    })
    .on("mouseover", function(d){
        yeargraph.select("#" + this.id).attr("stroke-width", "3px")
        .attr("opacity", this.id.substring(1) == selected_year ? 1 : 0.8);
    })
    .on("mouseleave", function(d){
        yeargraph.select("#" + this.id).attr("stroke-width", "0px")
        .attr("opacity", this.id.substring(1) == selected_year ? 1 : 0.5);
    })


yeargraph.append("g")
    .attr("transform", "translate(0," + yeargraph_height / 2 + ")")
    .call(d3.axisBottom(x).tickValues(years))

function percent_diff(state, year) {
    return data[state][year]["DEMOCRAT"]/data[state][year]["total_votes"] - data[state][year]["REPUBLICAN"]/data[state][year]["total_votes"]
}

function plot_yeargraph() {
    var state = selected_state;
    var maxY = d3.max(years, function (year) {return Math.abs(percent_diff(state, year))});

    var y = d3.scaleLinear()
        .domain([-maxY,maxY])
        .range([yeargraph_height, 0])
    yeargraph.select("#y_axis")
        .call(d3.axisLeft().scale(y).tickFormat(d3.format("+.0%")))


    years.forEach((year) => {
        yeargraph.select("#y" + year)
        .attr("y", function(d) {
            return y(Math.max(percent_diff(state, year), 0));
        })
        .attr("height", function(d) { return  y(maxY - Math.abs(percent_diff(state, year))); })
        .attr("fill", function(d) {
            if (percent_diff(state, year) > 0 && !(state === "US" && (year === 2000 || year === 2016))) {
                return "#0011FF";
            } else {
                return "#FF0000";
            }
        })
        .attr("opacity", year == selected_year ? 1 : 0.5);
    })
}