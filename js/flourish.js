var scrolly = d3.select("#scrolly__section");
var chart = scrolly.select(".scrolly__chart");
var content = scrolly.select(".scrolly__content");
var step2 = content.selectAll(".step2");

// initialize the scrollama
var scroller2 = scrollama();

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  var stepH = Math.floor(window.innerHeight * 1);
  step2.style("height", stepH + "px");

  var figureHeight = window.innerHeight * 0.75;
  var figureMarginTop = (window.innerHeight - figureHeight) / 2;

  chart
    .style("height", figureHeight + "px")
    .style("top", figureMarginTop + "px");

  // 3. tell scrollama to update new element dimensions
  scroller2.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
  const textblock = step2.select(".text-block");

  // add color to current step only
  textblock.classed("is-active", function (d, i) {
    return i === response.index;
  });

  // update graphic based on step
  const linkHead = "https://public.flourish.studio/story/1072910/embed#slide-";
  const slide = response.index;
  console.log(slide);
  d3.select(".scrolly__chart iframe").attr("src", linkHead + slide);
}

function setupStickyfill() {
  d3.selectAll(".sticky").each(function () {
    Stickyfill.add(this);
  });
}

function init() {
  setupStickyfill();
  handleResize();
  scroller2
    .setup({
      step: "#scrolly__section .scrolly__content .step2",
      offset: 0.7,
      debug: false,
    })
    .onStepEnter(handleStepEnter);

  // setup resize event
  window.addEventListener("resize", handleResize);
}

init();
