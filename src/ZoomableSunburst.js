import React from 'react';
var d3 = require('d3');
var PropTypes = require('prop-types');

class ZoomableSunburst extends React.Component {
  
  render() {

    var defaultProps = {
      chartClassName: "hello"
    };

    var propTypes =  {
        chartClassName: PropTypes.string,
        dataProp:       PropTypes.array.isRequired,
    };

    var path = {
                  stroke: '#fff'
                };
    var width = 960,
        height = 700,
        radius = (Math.min(width, height) / 2) - 10;

    var formatNumber = d3.format(",d");

    var x = d3.scaleLinear()
              .range([0, 2 * Math.PI]);

    var y = d3.scaleSqrt()
              .range([0, radius]);

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var partition = d3.partition();

    var arc = d3.arc()
                .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
                .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
                .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
                .outerRadius(function(d) { return Math.max(0, y(d.y1)); });


    var svg = d3.select("body").append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

        function click(d) {
          svg.transition()
            .duration(750)
            .tween("scale", function() {
                var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                    yd = d3.interpolate(y.domain(), [d.y0, 1]),
                    yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
                return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
            })
            .selectAll("path")
            .attrTween("d", function(d) { return function() { return arc(d); }; });
        }

        var dataProp = this.props.dataProp;


    return (
        <div className="sb">
          <div>
          { 
              console.log("initialDP:", dataProp),
              dataProp = d3.hierarchy(dataProp),
              console.log("after hierarchyDP:", dataProp),
              dataProp.sum(function(d) { return d.size; }),
              console.log("afterSumDP:", dataProp),
              svg.selectAll("path")
                .data(partition(dataProp).descendants())
                .enter().append("path")
                .attr("d", arc)
                .style("fill", function(d) { return color((d.children ? d : d.parent).data.name); })
                .on("click", click)
                .append("title")
                .text(function(d) { return d.data.name + "\n" + formatNumber(d.value); }),

            d3.select(self.frameElement).style("height", height + "px")
          }
          </div>
          <div>
          { 
            d3.json("https://gist.githubusercontent.com/mbostock/4348373/raw/85f18ac90409caa5529b32156aa6e71cf985263f/flare.json", function(error, root) {
              if (error) throw error;
              console.log("initialR:", root),
              root = d3.hierarchy(root),
              console.log("afterHierarchyR:", root),
              root.sum(function(d) { return d.size; }),
              console.log("afterSumR:", root),
              svg.selectAll("path")
                .data(partition(root).descendants())
                .enter().append("path")
                .attr("d", arc)
                .style("fill", function(d) { return color((d.children ? d : d.parent).data.name); })
                .on("click", click)
                .append("title")
                .text(function(d) { return d.data.name + "\n" + formatNumber(d.value); });
            }),

            d3.select(self.frameElement).style("height", height + "px")
          }
          </div>
       </div>);
  }
}
export default ZoomableSunburst;
