let canvas = Snap(200,200)
let circle = canvas.circle(100,100,50)
circle.attr(
    {
        fill: 'pink',
        stroke: 'blue',
        strokeWidth: '3'
    }
)

let arrowSvg = Snap('#discord');
let arrow = arrowSvg.select('path');