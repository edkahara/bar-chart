d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(data) {
  gdp = data.data;//get the relevant gdp data
  var gdpScale = d3.scale.linear()
    .domain([0, d3.max(gdp)[1]])
    .range([0, 500]);//create gdp scale
  var yearScale = d3.scale.ordinal()
    .domain(d3.range(0, gdp.length))
    .rangeBands([0, 800]);//create year scale
  var tooltip = d3.select("body").append("div")
    .style('width', '110px')
    .style('height', '50px')
    .style('position', 'relative')
    .style('background', '#d1e0e0')
    .style('border', '1px solid grey')
    .style('opacity', '0');//create tooltip div
  var canvas = d3.select("#main").append("svg")
    .attr("width", 900)
    .attr("height", 600)
    .attr("transform", "translate(50, 40)");//create canvas
  var bars = canvas.append("g").selectAll("rect").data(gdp).enter().append("rect")
    .attr("transform", "translate(50, 10)")
    .attr("width", yearScale.rangeBand())
    .attr("height", function(d) { return 0; })
    .attr("fill", "steelblue")
    .attr("x", function(d, i) { return yearScale(i); })
    .attr("y", function(d) { return 500; })
    .on('mouseover', function(d) {
      tooltip.transition()
        .style('opacity', '1')
      tooltip.html(d[0] + "<br />$" + d[1] + " billion")
        .style('left', (d3.event.pageX+'px'))
        .style('top', (d3.event.pageY+'px'))
      d3.select(this).style("fill", "white")
    })
    .on('mouseout', function(d) {
      tooltip.transition()
        .style('opacity', '0')
      d3.select(this).style("fill", "steelblue")
    });//draw bars
  bars.transition()
    .attr('height', function(d) {
      return gdpScale(d[1]);
    })
    .attr('y', function (d) {
      return 500-gdpScale(d[1]);
    })
    .duration(400)
    .delay(function(d, i) {
      return i*2;
    })
    .ease('elastic');//create bar transitions
  var yScale = d3.scale.linear()
    .domain([0, d3.max(gdp)[1]])
    .range([500, 0]);//create y-axis scale
  var yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(9).tickFormat(d3.format("d"));//create y-axis
  var yGuide = canvas.append("g")
    yAxis(yGuide)
    yGuide.attr("transform", "translate(50, 10)")
    yGuide.selectAll("path")
      .attr("fill", "none")
      .attr("stroke", "black")
      yGuide.selectAll("line")
        .attr("stroke", "black");//display y-axis
  canvas.append("text")
    .attr("transform", "translate(70, 170) rotate(-90)")
    .style("text-anchor", "middle")
    .text("Gross Domestic Product");//label y-axis
  var xScale = d3.scale.linear()
    .domain([parseInt(d3.min(gdp)[0].slice(0,4)), parseInt(d3.max(gdp)[0].slice(0,4))])
    .range([50, 850]);//create x-axis scale
  var xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(13).tickFormat(d3.format("d"));//create x-axis
  var xGuide = canvas.append("g")
    xAxis(xGuide)
    xGuide.attr("transform", "translate(0, 510)")
    xGuide.selectAll("path")
      .attr("fill", "none")
      .attr("stroke", "black")
      xGuide.selectAll("line")
        .attr("stroke", "black");//display x-axis
});
