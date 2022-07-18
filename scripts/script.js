let tv_data;

var avgPlatformRatingsSvg;
let barChartSvg;
var lineWidth;
var lineHeight;
var lineInnerHeight;
var lineInnerWidth;
var lineMargin = { top: 20, right: 60, bottom: 60, left: 100 };
var barchart;

document.addEventListener('DOMContentLoaded', () => {
    avgPlatformRatingsSvg = d3.select('#avgPlatformRatings')
    barChartSvg = d3.select('#barchartSvg');

    lineWidth = +avgPlatformRatingsSvg.style('width').replace('px', '');
    lineHeight = +avgPlatformRatingsSvg.style('height').replace('px', '');;
    lineInnerWidth = lineWidth - lineMargin.left - lineMargin.right;
    lineInnerHeight = lineHeight - lineMargin.top - lineMargin.bottom;
    // console.log(lineInnerHeight)

    Promise.all([d3.csv('data/tv_shows.csv')])
        .then((values) => {
            tv_data = values[0];
            // console.log(tv_data)


            // call to make graph
            drawAvgPlatformRatings()
            drawBarChart()
            drawPieChart();

        })
    
})

const bundleData = (ratingSelection, filteredShows) => {
    // console.log(platform)



    // the returned shows after the filter
    // console.log(tv_data)

    // key: year, value: array of scores
    const yearToRatings = {}

    // We're going through the filtered shows and 
    filteredShows.forEach(show => {
        // get the year and the rating of the platform we've chosen
        const year = parseInt(show.Year)
        const rawRating = show[ratingSelection]
        // d[ratingSelection]
        console.log(show[ratingSelection])
        // make sure there's not a key with the year and that the rating we get is a number
        if (!yearToRatings[year] && parseInt(rawRating)) {
            // intialize the new item in map with key of year (int)
            // and empty array for scores
            yearToRatings[year] = [];
        }

        const showRating = ratingSelection == 'IMDb' ? parseFloat(rawRating) : parseInt(rawRating)
        if (showRating)
            yearToRatings[year].push(showRating)
    })

    console.log(yearToRatings)


    // get the min and max year
    var yearKeys = Object.keys(yearToRatings)
    yearKeys = yearKeys.map(year => parseInt(year))


    // function for getting the average of an array
    const average = (array) => array.reduce((a, b) => a + b) / array.length;

    // this is the arrray we use for the data and follows the format [year, avg_rating]
    const yearToAvgRating = yearKeys.map((year) => [year, average(yearToRatings[year])])
    return yearToAvgRating
}
const drawAvgPlatformRatings = () => {
    // remove the previous lines and dots if any
    avgPlatformRatingsSvg.selectAll("*").remove();

    // get the value of the selection
    const platformSelection = document.getElementById("platSelection").value;
    // const ratingSelection = document.getElementById("ratingSelection").value;
    const ratingSelection = "IMDb"
    console.log(ratingSelection)


    const imdbMax = 10;
    const rTMax = 100;

    // filter the data based on the platform
    const filteredShows = tv_data.filter(show => show[platformSelection] == "1");
    
    // the returned shows after the filter
    console.log(filteredShows)
    
    // key: year, value: array of scores
    const yearToRatings = {}

    // We're going through the filtered shows and 
    filteredShows.forEach(show => {
        // get the year and the rating of the platform we've chosen
        const year = parseInt(show.Year)
        const rawRating = show[ratingSelection]

        // make sure there's not a key with the year and that the rating we get is a number
        if(!yearToRatings[year] && parseInt(rawRating)){
            // intialize the new item in map with key of year (int)
            // and empty array for scores
            yearToRatings[year] = [];
        }

        const showRating = ratingSelection == 'IMDb' ? parseFloat(rawRating) : parseInt(rawRating)
        if(showRating)
            yearToRatings[year].push(showRating)
    })

    console.log(yearToRatings)
    

    // get the min and max year
    var yearKeys = Object.keys(yearToRatings)
    yearKeys = yearKeys.map(year => parseInt(year))
    const minYear = Math.min(...yearKeys);
    const maxYear = Math.max(...yearKeys);

    // function for getting the average of an array
    const average = (array) => array.reduce((a, b) => a + b) / array.length;
    
    // this is the arrray we use for the data and follows the format [year, avg_rating]
    const yearToAvgRating = yearKeys.map((year) => [year, average(yearToRatings[year])])
    console.log(yearToAvgRating)



    const g = avgPlatformRatingsSvg.append('g')
        .attr('transform', `translate(${lineMargin.left}, ${lineMargin.top})`)


    // creating the xscale  
    const xScale = d3.scaleLinear()
        .domain([minYear, maxYear])
        .range([0, lineInnerWidth-20])


    // creating the yscale
    const yScale = d3.scaleLinear()
        .domain([0, rTMax])
        .range([lineInnerHeight - 20, 0]);


    // adding the y-scale to the left side
    g.append('g')
        .call(d3.axisLeft(yScale))


    // need to add range
    const axisBottom = g => g   
        .attr('transform', `translate(0, ${lineInnerHeight})`)

        .call(d3.axisBottom(xScale)
            .ticks(10)
            .tickSize(0)
        )


    // adding the x-axis
    g.append('g')
        .call(axisBottom)

    let RottenData = bundleData('Rotten Tomatoes', filteredShows)
    console.log(RottenData)

    // g.selectAll('circle')
    //     .data(RottenData)
    //     .enter()
    //     .append('circle')
    //     .attr('class', 'singleCircles')
    //     .attr('id', d => `d2${d[0]}`)
    //     .style('fill', 'transparent')
    //     .attr('cx', d => xScale(d[0]))
    //     .attr('cy', d => yScale(d[1]))
    //     .attr('r', 10)

    //     .on('mouseover', function (d) {
    //         const tooltip = d3.select("#lineHoverTip2")
    //             .style('visibility', 'visible')
    //             .style("top", (d3.event.pageY - 28) + 'px')
    //             .style("left", (d3.event.pageX + 30) + 'px')
    //             .html(`
    //       <div>Year: ${d[0]}</div>
    //       <div>Rotten Tomatoes: ${d[1]}</div>
    //       <div>Rotten IMDb: ${yearToAvgRating.filter(x => x[0] == d[0])[0][1]} </div>
    //     `)
    //         avgPlatformRatingsSvg.selectAll(`#d${d[0]}`)
    //             .attr("fill", "black")
    //     })

    //     .on('mouseout', function (d) {
    //         avgPlatformRatingsSvg.selectAll(`#d${d[0]}`)
    //             .attr("stroke", "transparent")
    //         d3.select("#lineHoverTip2")
    //             .style('visibility', 'hidden')
    //     })







    g.selectAll('circle')
        .data(yearToAvgRating)
        .enter()
        .append('circle')
        .attr('class', 'singleCircles')
        .attr('id', d => `d${d[0]}`)
        .style('fill', 'transparent')
        .attr('cx', d => xScale(d[0]))
        .attr('cy', d => yScale(d[1]))
        .attr('r', 10)

        .on('mouseover', function (d) {
            const tooltip = d3.select("#lineHoverTip")
                .style('visibility', 'visible')
                .style("top", (d3.event.pageY - 28) + 'px')
                .style("left", (d3.event.pageX + 30) + 'px')
                .html(`
          <div>Year: ${d[0]}</div>
          <div>IMDb: ${d[1]}</div>
          <div>Rotten Tomatoes: ${RottenData.filter(x => x[0] == d[0])[0][1]} </div>
        `)
            avgPlatformRatingsSvg.selectAll(`#d${d[0]}`)
                .attr("fill", "black")
        })
        // .on('mouseover', function (d) {
        //     avgPlatformRatingsSvg.selectAll(`#d${d[0]}`)
        //         .attr("stroke", "black")
        // })
        .on('mouseout', function (d) {
            avgPlatformRatingsSvg.selectAll(`#d${d[0]}`)
                .attr("stroke", "transparent")
            d3.select("#lineHoverTip")
                .style('visibility', 'hidden')
        })
    
    // adding paths (lines) to the svg
    avgPlatformRatingsSvg.append('path')
        .datum(yearToAvgRating)
        .attr('fill', 'none')
        .attr('stroke', "grey")
        .attr("stroke-width", 2)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "join")
        .attr("d", d3.line()
            .x(d => xScale(d[0]))
            .y(d => yScale(d[1]))
        )

        .attr('transform', `translate(${lineMargin.left}, ${lineMargin.top})`)

    // console.log(bundleData('Rotten Tomatoes', filteredShows))
    RottenData = RottenData.filter(x => x[0] >= minYear)
    avgPlatformRatingsSvg.append('path')
        .datum(RottenData)
        .attr('fill', 'none')
        .attr('stroke', "#c2c2c2")
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "join")
        .attr("d", d3.line()
            .x(d => xScale(d[0]))
            .y(d => yScale(d[1]))
        )
        .attr('transform', `translate(${lineMargin.left}, ${lineMargin.top})`)



    d3.select('body')
        .append('div')
        .attr('id', 'lineHoverTip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('padding', '10px')
        .style('border-radius', '10px')
        .style('background', 'white')

    
    d3.select('body')
        .append('div')
        .attr('id', 'lineHoverTip2')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('padding', '10px')
        .style('border-radius', '10px')
        .style('background', 'white')

    g.append('text')
        .attr('transform', 'rotate(-90)')
        .text('Average Rating')
        .style('transform', `translate(-50px, ${lineInnerHeight / 2 + lineMargin.top}px) rotate(-90deg) `)
    
    g.append('text')
        .text('Years')
        .style('transform', `translate( ${lineInnerWidth / 2}px, ${lineInnerHeight + lineMargin.top + 20}px)`)

}

function drawBarChart(){
    barChartSvg.selectAll("*").remove();
    const ratSelection = document.getElementById("ratSelection").value;

    const width = +barChartSvg.style('width').replace('px', '');
    const height = +barChartSvg.style('height').replace('px', '');

    const margin = { top: 20, bottom: 90, right: 20, left: 160 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    let data = tv_data;
    data.sort(function (a, b) {
        return +a["ID"] - +b["ID"];
    });

    data = data.slice(0, 10);
    console.log(data)

    data.forEach(d => {
        d.rating = d[ratSelection];
        d.title = d["Title"];
    });

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return d.rating; })])
        .range([0, innerWidth]);
    const yScale = d3.scaleBand()
        .domain(data.map(function (d) { return d.title; }))
        .range([0, innerHeight])
        .padding(0.1);

    const g = barChartSvg.append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    barchart = g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('y', d => yScale(d.title))
        .attr('height', yScale.bandwidth())
        .attr('width', function (d) {
            return xScale(d.rating);
        });

    const yAxis = d3.axisLeft(yScale);
    g.append('g').call(yAxis);

    const xAxis = d3.axisBottom(xScale);
    g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-10px")
        .attr("dy", "0px")
        .attr("transform", "rotate(-45)");

    g.append('text')
        .attr('class', 'axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('y', '-140px')
        .attr('x', -innerHeight / 2)
        .attr('text-anchor', 'middle')
        .text('Show')
    g.append('text')
        .attr('class', 'axis-label')
        .attr('text-anchor', 'middle')
        .attr('x', innerWidth / 2)
        .attr('y', innerHeight + 70)
        .text('Rating (Out of 100)')
}

function drawPieChart() {
    
    var netflix = 0;
    var hulu = 0;
    var dplus = 0;
    var prime = 0;

    for (var x = 0; x < tv_data.length; x++) {
        var show = tv_data[x]
        if (show["Disney+"] === "1") dplus++;
        if (show['Hulu'] == "1") hulu++;
        if (show['Netflix'] == "1") netflix++;
        if (show['Prime Video'] == "1") prime++;
    }

    console.log(netflix, dplus, prime, hulu)
    var chartDiv = $("#barChart");
    var myChart = new Chart(chartDiv, {
    type: 'pie',
    data: {
        labels: ["Netflix", "Hulu", "Prime Video", "Disney+"],
        datasets:[
        {
            data: [netflix,hulu, prime, dplus],
            backgroundColor: [
            "#E50914",
            "#00FF00",
            "#0099CC",
            "#092bb5",
        
            ]
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Pie Chart'
        },
        responsive: true,
        maintainAspectRatio: false,
        
        onClick(event) {
            index = myChart.getElementsAtEvent(event)[0]._index
            if (index == 0) service = "Netflix";
            else if (index == 1) service = "Hulu"
            else if (index == 2) service = "Prime Video"
            else if (index == 3) service = "Disney+"
            document.getElementById("platSelection").value = service;
            drawAvgPlatformRatings();

            /*if (index == 0){
                
                color = 'E50914';
                barchart.attr("fill","#E50914")
            } 
            
            else if (index == 1){
                color = '00FF00'
                barchart.attr("fill","#00FF00")

            } 
            else if (index == 2){
                color = '0099CC'
                barchart.attr("fill","#0099CC")

            } 
            else if (index == 3){
                color = '092bb5'
                barchart.attr("fill","#092bb5")

            } */


            if (index == 0){
                
                color = 'E50914';
                barchart.attr("fill",(show) =>{
                    console.log(show)
                    //if (show["Disney+"] === "1") return "#092bb5";
                    //if (show['Hulu'] == "1") return "#00FF00";
                    if (show['Netflix'] == "1") return "#E50914";
                    //if (show['Prime Video'] == "1") return "#0099CC";
                })
            }else if (index == 1){
                
                color = '00FF00';
                barchart.attr("fill",(show) =>{
                    console.log(show)
                    //if (show["Disney+"] === "1") return "#092bb5";
                    if (show['Hulu'] == "1") return "#00FF00";
                    //if (show['Netflix'] == "1") return "#E50914";
                    //if (show['Prime Video'] == "1") return "#0099CC";
                })
            }else if (index == 2){
                
                color = '0099CC';
                barchart.attr("fill",(show) =>{
                    console.log(show)
                    //if (show["Disney+"] === "1") return "#092bb5";
                    //if (show['Hulu'] == "1") return "#00FF00";
                    //if (show['Netflix'] == "1") return "#E50914";
                    if (show['Prime Video'] == "1") return "#0099CC";
                })
            }else if (index == 3){
                
                color = '092bb5';
                barchart.attr("fill",(show) =>{
                    console.log(show)
                    if (show["Disney+"] === "1") return "#092bb5";
                    //if (show['Hulu'] == "1") return "#00FF00";
                    //if (show['Netflix'] == "1") return "#E50914";
                    //if (show['Prime Video'] == "1") return "#0099CC";
                })
            }

        }

    }
 });
}
