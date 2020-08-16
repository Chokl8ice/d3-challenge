// function used for updating x-scale const upon click on axis label
function xScale(csvData, chooseXAxis) {
    // create scales
    let xLinScale = d3.scaleLinear()
      .domain([d3.min(csvData, d => d[chooseXAxis]) * 0.9,
        d3.max(csvData, d => d[chooseXAxis]) * 1.1
      ])
      .range([0, width]);
  
    return xLinScale;
  }
  
  // function used for updating y-scale const upon click on axis label
  function yScale(csvData, chooseAxis) {
    // create scales
    let yLinScale = d3.scaleLinear()
      .domain([d3.min(csvData, d => d[chooseYAxis]) - 1,
        d3.max(csvData, d => d[chooseYAxis]) + 1
      ])
      .range([height, 0]);
  
    return yLinScale;
  }
  
  // function used for updating xAxis const upon click on axis label
  function renderXAxes(newXScale, xAxis) {
    let bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }
  
  // function used for updating yAxis const upon click on axis label
  function renderYAxes(newYScale, yAxis) {
    let leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
  }
