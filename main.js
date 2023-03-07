var data;
var years = [1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020];
var parties = ['DEMOCRAT', 'REPUBLICAN', 'LIBERTARIAN', 'OTHER'];
var state_pos;
Promise.all([
    d3.json('data/counties-10m.json'),
    d3.json('data/data.json')
]).then( ([geo, d]) => {
    data = d;
    state_pos = {}
    for(var key in data){
        state_pos[data[key]["state"]] = key;
    }
    build_graph();
    update_stats(2020);
    plot_yeargraph();
    ready(geo, data)
});