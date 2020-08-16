// @TODO: YOUR CODE HERE!

var svgWidth = 900;
var svgheigth = 500;

var margin = {top: 20, right: 40, bottom: 80, left: 100};

var width = svgWidth - margin.left - margin.right;
var heigth = svgheight -margin.top - margin.bottom;

const svg = d3
    .select ("#scatter")
    .append ("svg")
    .attr ("width", svgWidth)
    .attr ("height", svgHeight + 50);

const chart = svg.append("g")
    .attr("transform", 'translate(${margin.left}, ${margin.top})');

let chooseXAxis = "poverty";
let chooseYAxis = "healthcare";

(async function(){
    
    const state = await d3.csv("../assets/data/data.csv");

    state.forEach(function(data) {
        data.poverty    = +data.poverty;
        data.healthcare = +data.healthcare;
        data.age        = +data.age;
        data.smokes     = +data.smokes;
        data.obesity    = +data.obesity;
        data.income     = +data.income;
    });

    let xLinScale = xScale(state, chooseXAxis);
    let yLinScale = yScale(state, chooseYAxis);

    let bottomAxis = d3.axisBottom(xLinScale);
    let leftAxis = d3.axisLeft(yLinscale);

    let xAxis = chart.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    let yAxis = chart.append("g")
        .call(leftAxis);

    let circle = chart.selectAll("g circle")
        .data(state)
        .enter()
        .append("g");

    let circlesXY = circle.append("circle")
        .attr("cx", d => xLinScale(d[chooseXAxis]))
        .attr("cy", d => yLinScale(d[chooseYAxis]))
        .attr("r", 15)
        .classed("stateCircle", true);

    let circleTxt = circle.append("text")
        .text(d => d.abbr)
        .attr("dx", d => xLinScale(d[chooseXAxis]))
        .attr("dy", d => yLinScale(d[chooseYAxis]) + 5)
        .classed("stateText", true);

    const xlabel = chart.append("g")
        .attr("transform", `translate(${width / 2}, ${height})`);
    
    const poverty_Label = xlabel.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "poverty") 
        .text("In Poverty (%)")
        .classed("active", true);
    
    const age_Label = xlabel.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "age") 
        .text("Age (Median)")
        .classed("inactive", true);
    
    const income_Label = xlabel.append("text")
        .attr("x", 0)
        .attr("y", 80)
        .attr("value", "income") 
        .text("Household Income (Median)")
        .classed("inactive", true);
    
    const ylabel = chart.append("g");

    const healthcare_Label = ylabel.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height / 2))
        .attr("y", -40)
        .attr("value", "healthcare") 
        .text("Lacks Healthcare (%)")
        .classed("active", true);
      
    const smokes_Label = ylabel.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height / 2))
        .attr("y", -60)
        .attr("value", "smokes") 
        .text("Smokes (%)")
        .classed("inactive", true);
      
    const obese_Label = ylabel.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height / 2))
        .attr("y", -80)
        .attr("value", "obesity") 
        .text("Obese (%)")
        .classed("inactive", true);

    circle = updateToolTip(circle, chooseXAxis, chooseYAxis);

    xlabel.selectAll("text")
        .on("click", function() {
        const value = d3.select(this).attr("value");
        if (value !== chooseXAxis) {

            chooseXAxis = value;

        xLinScale = xScale(state, chooseXAxis);

        xAxis = renderXAxes(xLinScale, xAxis);

        circlesXY = renderXCircles(circlesXY, xLinScale, chooseXAxis);

        circleTxt = renderXText(circleTxt, xLinScale, chooseXAxis);

        circle = updateToolTip(circle, chooseXAxis, chooseYAxis);

        if (chooseXAxis === "age") {
            poverty_Label
                .classed("active", false)
                .classed("inactive", true);
            age_Label
                .classed("active", true)
                .classed("inactive", false);
            income_Label
                .classed("active", false)
                .classed("inactive", true);
        }
        else if (chooseXAxis === "income") {
            poverty_Label
                .classed("active", false)
                .classed("inactive", true);
            age_Label
                .classed("active", false)
                .classed("inactive", true);
            income_Label
                .classed("active", true)
                .classed("inactive", false);
        }
        else {
            poverty_Label
                .classed("active", true)
                .classed("inactive", false);
            age_Label
                .classed("active", false)
                .classed("inactive", true);
            income_Label
                .classed("active", false)
                .classed("inactive", true);
        }
    }
  });

});