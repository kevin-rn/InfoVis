function get_party_votes(state, year, party_votes) {
    if (party_votes.toLocaleString() === "NaN") {
        return get_party_votes(state, year, 0);
    }
    return party_votes.toLocaleString() + " (" + (100 * party_votes/data[state][year]["total_votes"]).toLocaleString() + "%)";
}

function update_stats(year) {
    var state = selected_state;
    document.getElementById("state_name")
    .innerHTML = data[state]["state"] + ", " + year;

    var table = document.getElementById("state_stats");
    document.getElementById("population").innerHTML = data[state][year]["population"].toLocaleString();
    document.getElementById("density").innerHTML = data[state][year]["density"];
    var change = ((data[state][year]["change"]) * 100).toFixed(2) + '%'
    document.getElementById("change").innerHTML = (change<0?"":"+") + change
    document.getElementById("democrat").innerHTML = get_party_votes(state, year, data[state][year]["DEMOCRAT"]);
    document.getElementById("republican").innerHTML = get_party_votes(state, year, data[state][year]["REPUBLICAN"]);
    if (data[state][year]["LIBERTARIAN"] !== undefined) {
        document.getElementById("libertarian").innerHTML = get_party_votes(state, year, data[state][year]["LIBERTARIAN"]);
    }else {document.getElementById("libertarian").innerHTML = get_party_votes(state, year, 0)}
    if (data[state][year]["OTHER"] !== undefined) {
        document.getElementById("other").innerHTML = get_party_votes(state, year, data[state][year]["OTHER"]);
    }else {document.getElementById("libertarian").innerHTML = get_party_votes(state, year, 0)}
    document.getElementById("total").innerHTML = data[state][year]["total_votes"].toLocaleString();
}
