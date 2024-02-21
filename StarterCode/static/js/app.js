const samples = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function plotData(id){

    d3.json(samples).then(data =>{
        console.log(data)

        var sampleValues = data.samples[0].sample_values.slice(0,10).reverse();
        var top_ids = data.samples[0].otu_ids.slice(0,10).reverse();
        var final_top_ids = top_ids.map(x => "OTU" + x);
        var top_labels = data.samples[0].otu_labels.slice(0,10).reverse();
        
        let trace = {
            x: sampleValues,
            y: final_top_ids,
            text: top_labels,
            marker: {
                color:"blue"},
                type:"bar",
                orientation: "h",
            };
    
        var data = [trace];
    
        let layout = {
            title: " Top 10 OTUs",
            margin: {
                l: 200,
                r: 200,
                t: 200,
                b: 50,
    
            }
        };
        
        Plotly.newPlot("bar", data, layout);
    });

    d3.json(samples).then(data => {

        var x_values = data.samples[0].otu_ids;
        var y_values = data.samples[0].sample_values;
        let bubble_labels = data.samples[0].otu_labels;
        let bubble_colors = data.samples[0].otu_ids;
        
        var trace1 = {
            x: x_values,
            y: y_values,
            mode:"markers",
            marker: {
                color: bubble_colors,
                size: y_values
            },
            text: bubble_labels
        };

        var data1 = [trace1];

        var layout1 = {
            title:"Bubble Chart",
            height: 500,
            width: 1000
        };

        Plotly.newPlot("bubble", data1, layout1);
    })

}

function demoInfo(){

    d3.json(samples).then(data =>{

        var ethnicity = data.metadata[0].ethnicity;
        var gender = data.metadata[0].gender;
        var age = data.metadata[0].age;
        var location = data.metadata[0].location;
        var bbtype = data.metadata[0].bbtype;
        var wfreq = data.metadata[0].wfreq;
        var id = data.metadata[0].id;

        var demoInfo = {"id": id, "ethnicity": ethnicity, "gender": gender, "age": age, "location": location, "bbtype": bbtype, "wfreq": wfreq};

        var demoPanel = d3.select("#sample-metadata");

        Object.entries(demoInfo).forEach((key) => {
            demoPanel.append("h5").text(key[0] + ": " + key[1] + "\n");
        });
    })

}


function init() {
    var selection = d3.select("selDataset");

    d3.json(samples).then((data_value) => {
        data_value.names.forEach(function(name){
            selection.append("option").text(name).property("value");
        });

        plotData(data_value.names[0]);
    })

}

init();