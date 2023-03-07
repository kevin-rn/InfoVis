var selected_state = "US";
var selected_year = "2020";

function update_state(state) {
    if (state == selected_state) {
        selected_state = "US";

    } else {
        selected_state = state;
    }
    update_all();
}

function update_year(year) {
    selected_year = year;
    document.getElementById("dropdown").value = year;
    plot(selected_year, d3.select('#x_desc_dropdown').property('value'), d3.select('#y_desc_dropdown').property('value'));
    update_all();
}

function update_all() {
    Object.values(data).forEach((d) => {
        graph.select("#" + d.po).select(("text"))
        .attr("fill", ((selected_state === "US")? "black" : (selected_state === d.po)?"red":"grey"));

        graph.select("#" + d.po).select(("rect"))
        .attr("stroke", ((selected_state === "US")? "black" : (selected_state === d.po)?"red":"grey"));
    })
    svg.selectAll('g').remove();

    if (d3.select('#switchbutton').property('value') == 'map') {
        drawmap(map_geo, map_data, selected_year);
    } else {
        drawlist(map_data, selected_year);
    }
    update_stats(selected_year);
    plot_yeargraph(selected_state);
}