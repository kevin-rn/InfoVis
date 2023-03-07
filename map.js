// Set width and height of the svg.
const size = 0.7
const width = 975 * size;
const height = 600 * size;

// State label values.
const state_values = [
    { 'label':'Vermont', 'value': 'VT', 'smaller': true },
    { 'label':'New Hampshire', 'value': 'NH', 'smaller': true },
    { 'label':'Massachusetts', 'value': 'MA', 'smaller': true },
    { 'label':'Rhode Island', 'value': 'RI', 'smaller': true },
    { 'label':'Connecticut', 'value': 'CT', 'smaller': true},
    { 'label':'New Jersey', 'value': 'NJ', 'smaller': true},
    { 'label':'Delaware', 'value': 'DE', 'smaller': true},
    { 'label':'Maryland', 'value': 'MD', 'smaller': true},
    { 'label':'Alabama', 'value': 'AL', 'smaller': false },
    { 'label':'Alaska', 'value': 'AK', 'smaller': false },
    { 'label':'Arizona', 'value': 'AZ', 'smaller': false },
    { 'label':'Arkansas', 'value': 'AR', 'smaller': false },
    { 'label':'California', 'value': 'CA', 'smaller': false },
    { 'label':'Colorado', 'value': 'CO', 'smaller': false },
    { 'label':'District of Columbia', 'value': 'DC', 'smaller': true },
    { 'label':'States of Micronesia', 'value': 'FM', 'smaller': false },
    { 'label':'Florida', 'value': 'FL', 'smaller': false },
    { 'label':'Georgia', 'value': 'GA', 'smaller': false },
    { 'label':'Hawaii', 'value': 'HI', 'smaller': false },
    { 'label':'Idaho', 'value': 'ID', 'smaller': false },
    { 'label':'Illinois', 'value': 'IL', 'smaller': false },
    { 'label':'Indiana', 'value': 'IN', 'smaller': false },
    { 'label':'Iowa', 'value': 'IA', 'smaller': false },
    { 'label':'Kansas', 'value': 'KS', 'smaller': false },
    { 'label':'Kentucky', 'value': 'KY', 'smaller': false },
    { 'label':'Louisiana', 'value': 'LA', 'smaller': false },
    { 'label':'Maine', 'value': 'ME', 'smaller': false },
    { 'label':'Marshall Islands', 'value': 'MH', 'smaller': false },
    { 'label':'Michigan', 'value': 'MI', 'smaller': false },
    { 'label':'Minnesota', 'value': 'MN', 'smaller': false },
    { 'label':'Mississippi', 'value': 'MS', 'smaller': false },
    { 'label':'Missouri', 'value': 'MO', 'smaller': false },
    { 'label':'Montana', 'value': 'MT', 'smaller': false },
    { 'label':'Nebraska', 'value': 'NE', 'smaller': false },
    { 'label':'Nevada', 'value': 'NV', 'smaller': false },
    { 'label':'New Mexico', 'value': 'NM', 'smaller': false },
    { 'label':'New York', 'value': 'NY', 'smaller': false },
    { 'label':'North Carolina', 'value': 'NC', 'smaller': false },
    { 'label':'North Dakota', 'value': 'ND', 'smaller': false },
    { 'label':'Northern Mariana Islands', 'value': 'MP', 'smaller': false },
    { 'label':'Ohio', 'value': 'OH', 'smaller': false },
    { 'label':'Oklahoma', 'value': 'OK', 'smaller': false },
    { 'label':'Oregon', 'value': 'OR', 'smaller': false },
    { 'label':'Palau', 'value': 'PW', 'smaller': false },
    { 'label':'Pennsylvania', 'value': 'PA', 'smaller': false },
    { 'label':'South Carolina', 'value': 'SC', 'smaller': false },
    { 'label':'South Dakota', 'value': 'SD', 'smaller': false },
    { 'label':'Tennessee', 'value': 'TN', 'smaller': false },
    { 'label':'Texas', 'value': 'TX', 'smaller': false },
    { 'label':'Utah', 'value': 'UT', 'smaller': false },
    { 'label':'Virgin Islands', 'value': 'VI', 'smaller': false },
    { 'label':'Virginia', 'value': 'VA', 'smaller': false },
    { 'label':'Washington', 'value': 'WA', 'smaller': false },
    { 'label':'West Virginia', 'value': 'WV', 'smaller': false },
    { 'label':'Wisconsin', 'value': 'WI', 'smaller': false },
    { 'label':'Wyoming', 'value': 'WY', 'smaller': false }
];

// (simplified) party with corresponding color.
const party_info = [
    { name: 'DEMOCRAT', color: 'blue' },
    { name: 'REPUBLICAN', color: 'red' },
    { name: 'LIBERTARIAN', color: 'yellow' },
    { name: 'OTHER', color: 'gray' }
  ];

const party_info_light = [
    { name: 'DEMOCRAT', color: 'lightblue' },
    { name: 'REPUBLICAN', color: 'LightCoral' },
    { name: 'LIBERTARIAN', color: 'LemonChiffon' },
    { name: 'OTHER', color: 'lightgray' }
  ];


function get_max_votes(votes) {
    var party_state;
    var party_votes = 0;
    parties.forEach((party) => {
        if (votes.hasOwnProperty(party)) {
            if (votes[party] > party_votes) {
                party_state = party;
                party_votes = votes[party];
            }
        }
    })
    return party_state;
}

function state_party_color(statename, data, election_year) {
    var statename = statename.toUpperCase()
    if (!state_pos.hasOwnProperty(statename))  {
        return 'white';
    }
    var info_election = data[state_pos[statename]][election_year]
    //var info_election = data.filter(election => election.year == election_year && election.state == statename.toUpperCase())
    if (true) {
        // Look which party has the most votes and get its corresponding color.
        var lookup = state_values.find(o => o.label.toLowerCase() === statename.toLowerCase())
        var state_abbr = lookup ? lookup['value'] : '';
        //var party_state = info_election.reduce((max_votes, state_votes) => parseInt(max_votes.candidatevotes, 10) > parseInt(state_votes.candidatevotes, 10) ? max_votes : state_votes)
        var party_state = get_max_votes(info_election)
        var part_col = ((selected_state === "US" || selected_state === state_abbr)?party_info:party_info_light)
        return  part_col[part_col.findIndex(idx => idx.name == party_state)].color
    } else {
        return 'white'
    }
}

// SVG containing the map and other elements.
const svg = d3.select('#map')
    .append('svg')
    .attr('height', height)
    .attr('width', width);

// Tooltip - hoverbox providing information on vote count per party
// Use absolution position on body as we cannot append div to SVG.
const Tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip');

// Project US Map
function ready(geo, data) {
    // Add election years from dataset to the dropdown selection.
    d3.select('#dropdown')
      .selectAll('myOptions')
     	.data(years)
      .enter()
    	.append('option')
      .text(function (d) { return d; })
      .attr('value', function (d) { return d; })
      .property('selected', function(d){ return d === 2020; })

    // Draw initial map.
    drawmap(geo, data, '2020')

    // Change map colors and tooltip information based on selected year.
    d3.select('#dropdown').on('change', function(d) {
        svg.selectAll('*').remove();
        update_year(d3.select(this).property('value'))
    })

    // Switch from Map to List or vice versa
    d3.select('#switchbutton').on('click', function(button) {
        if (this.value == 'map') {
            svg.selectAll('*').remove();
            this.value = 'list';
            drawlist(data, selected_year);
          } else {
            svg.selectAll('*').remove();
            this.value = 'map';
            drawmap(geo, data, selected_year);
          }
    })

    // Legend for displaying what party corresponds to what color.
    var maplegend = d3.select('#map-items-legend')
    var dot_size = 15
    maplegend.selectAll('dot-items')
      .data(party_info)
      .enter()
      .append('rect')
        .attr('x', function(d, i) { return i * 110 })
        .attr('y', 5)
        .attr('width', dot_size)
        .attr('height', dot_size)
        .style('fill', function(d){ return d.color})
        .attr('class', 'dot-items')

    maplegend.selectAll('dot-labels')
    .data(party_info)
    .enter()
    .append('text')
        .attr('x', function(d, i) { return i * 110 + 20 })
        .attr('y', dot_size + 2)
        .style('fill', 'white')
        .text(function(d){ return d.name.charAt(0) + d.name.substring(1).toLowerCase(); })
        .attr('class', 'dot-labels')
    }

var map_geo;
var map_data;

function capitalize(string) {
    var words = string.split(" ");
    var res = ""
    for (let i = 0; i < words.length; i++) {
        res += " " + words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
    }
    return res.substring(1);
}

function draw_mouseover(statename) {
    var state_info = data[state_pos[statename.toUpperCase()]][selected_year]

    // add 'votes: 0' property
    var summed_votes = party_info.map(obj => ({ ...obj, votes: 0 }))

    // Sum up total vote count for each (simplified) party (Democrat, Republican, Liberarian, Other).
    parties.forEach(e => { 
        summed_votes[summed_votes.findIndex(idx => idx.name == e)].votes += parseInt(state_info[e], 10) 
    });

    // For displaying each party with their total vote count
    return summed_votes.map(d => '<tr class="tooltip-table"><td>' + capitalize(d.name)
    + ' votes: </td><td>' + get_party_votes(state_pos[statename.toUpperCase()], selected_year, d.votes) + '</td></tr>')
}

function drawmap(geo, data, selection_year) {
    // Projection using topojson file for purposes such as scaling.
    map_geo = geo;
    map_data = data;
    var projection = d3.geoAlbersUsa()
        .scale(1000 * size)
        .translate([width / 2 - 50, height / 2]);
    var path = d3.geoPath().projection(projection);
    var statesCollection = topojson.feature(geo, geo.objects.states);

    // Draw states on the map.
    svg.selectAll('.states')
        .data(statesCollection.features)
        .join('path')
        .attr('d', path)
        .attr('class', 'states')
        .attr('fill', function(d) { return state_party_color(d.properties.name, data, selection_year) });
    
    // Adds state labels to map (e.g. Arizona -> AZ).
    svg.selectAll('text')
        .data(statesCollection.features)
        .enter()
        .append('svg:text')
        .text(function(d){
            var lookup = state_values.find(o => o.label === d.properties.name)
            var state_abbr = lookup ? lookup['value'] : '';
            return state_abbr;
        })
        .attr('x', function(d){
            var x_coordinate = path.centroid(d)[0]
            return isNaN(x_coordinate) ? 0 : x_coordinate;
        })
        .attr('y', function(d){
            var y_coordinate = path.centroid(d)[1]
            return  isNaN(y_coordinate) ? 0 : y_coordinate;
        })
        .attr('class', 'state-names');


    // Small boxes on the right of the map for easier selection of smaller states.
    var box = svg.selectAll('g')
    .data(state_values.filter(x => x.smaller ))
    .enter().append('g');

    // Draw boxes next to the map.
    box.append('rect')
    .attr('x', width - 100 )
    .attr('y', function(d, i){ return i * 40 + height / 10 })
    .attr('class', 'smallerstates')
    .attr('fill', function(d,i) { return state_party_color(d.label, data, selection_year) });

    // Text for states names.
    box.append('svg:text')
    .text(function(d){
        return d['value'];
    })
    .attr('x', width - 75)
    .attr('y', function(d, i){ return i * 40 + height / 10 + 20 })
    .attr('class', 'state-names');

    // Draws lines connecting the boxes to their corresponding states on the map.
    box.append('line')
    .attr('class', 'line')
    .attr('x1', width - 100)
    .attr('y1', function(d, i) { return i * 40 + height / 10 + 20 })
    .attr('x2', function(d) {
        var x_state = d3.selectAll('.states')
            .filter(function(state) {
                return (state.properties.name == d.label)
            })
        var bbox = x_state.node().getBBox()
        return bbox.x + bbox.width / 2
    })
    .attr('y2', function(d) {
        var y_state = d3.selectAll('.states')
            .filter(function(state) {
                return (state.properties.name == d.label)
            })
        var bbox = y_state.node().getBBox()
        return bbox.y + bbox.height / 2
    });

    // Mouse effect for formatting the tooltip and correct information for the selected state.
    function mousemove(event, statename) {
        var party_votes = draw_mouseover(statename)

        Tooltip
            .html('<b>State: ' + statename + '</b><br><br><table class="tooltip-table">' + party_votes.join('') + '</table>')
            .style('left', event.x + 10 + 'px')
            .style('top', event.y + 10 + 'px')
    }

    // Mouse effects when hover over boxes next to the map e.g. box highlights corresponding state on the map
    svg.selectAll('.smallerstates')
    .on('mousemove', function(event, d) { return mousemove(event, d['label'], selection_year) })
    .on('mouseover', function(smallstate){
        Tooltip
            .style('opacity', 1)
            .style('z-index', 1);

        d3.selectAll('.states')
            .filter(function(state){ 
                return (smallstate.srcElement.__data__.label == state.properties.name) 
            }).transition()
            .style('opacity', '0.5')
            .style('stroke-width', '3px');
      })
    .on('mouseout', function(smallstate, i){
        Tooltip
            .style('opacity', 0)
            .style('z-index', null);

        d3.selectAll('.states')
            .filter(function(state){ 
                return (smallstate.srcElement.__data__.label == state.properties.name) 
            })
            .transition()
            .style('opacity', null)
            .style('stroke-width', null);
    })
    .on('click', function(d){
        var lookup = state_values.find(o => o.label === d.target.__data__.label)
        var state_abbr = lookup ? lookup['value'] : '';
        update_state(state_abbr)
    });

    // Mouse effects when hover over state on the map e.g. state highlights the corresponding box
    svg.selectAll('.states')
    .on('mousemove', function(event, d) { return mousemove(event, d.properties.name, selection_year) })
    .on('mouseover', function(state){
        Tooltip
            .style('opacity', 1)
            .style('z-index', 1);

        d3.selectAll('.smallerstates')
            .filter(function(smallstate){ 
                return (state.srcElement.__data__.properties.name == smallstate.label) 
            })
            .transition()
            .style('opacity', '0.5')
            .style('stroke-width', '3px');
    })
    .on('mouseout', function(state, i){
        Tooltip.style('opacity', 0).style('z-index', null)

        d3.selectAll('.smallerstates')
            .filter(function(smallstate){ 
                return (state.srcElement.__data__.properties.name == smallstate.label) 
            })
            .transition()
            .style('opacity', null)
            .style('stroke-width', null);
    })
    .on('click', function(d){
        var lookup = state_values.find(o => o.label === d.target.__data__.properties.name)
        var state_abbr = lookup ? lookup['value'] : '';
        update_state(state_abbr)
      });

    // Zoom in function for the map
    const zoom = d3.zoom()
        .scaleExtent([1, 4])
        .translateExtent([[0, 0], [width, height]])
        .on('zoom', function(event) {
            svg.selectAll('path').attr('transform', event.transform); 
            svg.selectAll('.smallerstates').attr('transform', event.transform);
            svg.selectAll('line').attr('transform', event.transform);
            svg.selectAll('.state-names').attr('transform', event.transform);
        });
    svg.call(zoom)
}

function drawlist(data, selection_year) {
    map_data = data;
    const states_current_year = Object.keys(state_pos).slice(1)

    // Container for the three column list of states
    var list = svg.selectAll('g')
    .data(states_current_year)
    .enter().append('g');

    // Draw boxes for each state with corresponding most voted party color
    list.append('rect')
    .attr('x', function(d, i) { return 200 * Math.floor(i/17) + 50})
    .attr('y', function(d, i) { return 22 * (i % 17) + 45 })
    .attr('class', 'states-list')
    .attr('fill', function(d,i) { return state_party_color(d, map_data, selection_year) });

    // Add state name to their boxes
    list.append('svg:text')
    .text(function(d) { return capitalize(d); })
    .attr('x', function(d,i){ return 200 * Math.floor(i/17) + 125})
    .attr('y', function(d,i){return 22 * (i % 17) + 60  })
    .attr('class', 'states-list-names');

    // Mouse effect for formatting the tooltip and correct information for the selected state.
    function mousemove(event, statename) {
        var party_votes = draw_mouseover(statename)

        Tooltip
            .html('<b>State: ' + capitalize(statename) + '</b><br><br><table>' + party_votes.join('') + '</table>')
            .style('left', event.x + 10 + 'px')
            .style('top', event.y + 10 + 'px')
    }

    // Mouse actions for the boxes
    svg.selectAll('.states-list')
    .on('mousemove', function(event, d) { return mousemove(event, d)})
    .on('mouseover', function(d) { Tooltip.style('opacity', 1).style('z-index', 1); })
    .on('mouseout', function(d) { Tooltip.style('opacity', 0).style('z-index', null) })
    .on('click', function(d){
        var lookup = state_values.find(o => o.label.toUpperCase() === d.target.__data__)
        var state_abbr = lookup ? lookup['value'] : '';
        update_state(state_abbr)
    });

    // Mouse actions for the text.
    svg.selectAll('.states-list-names')
    .on('mousemove', function(event, d) { return mousemove(event, d)})
    .on('mouseover', function(d) { Tooltip.style('opacity', 1).style('z-index', 1); })
    .on('mouseout', function(d) { Tooltip.style('opacity', 0).style('z-index', null) })
    .on('click', function(d){
        var lookup = state_values.find(o => o.label.toUpperCase() === d.target.__data__)
        var state_abbr = lookup ? lookup['value'] : '';
        update_state(state_abbr)
    });

}
