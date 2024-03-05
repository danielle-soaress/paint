const drawArea = document.getElementById('drawArea')
console.log(drawArea)
const context = drawArea.getContext('2d');
var mouseX = 0;
var mouseY = 0;

document.addEventListener('DOMContentLoaded', () => {
    const drawLine = (x,y) => {   
        context.beginPath();
        context.moveTo(x,y)
        context.stroke();
    
    }
    
    drawArea.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        drawLine(mouseX,mouseY);
        console.log()
    })  

})

console.log('oi')