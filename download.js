function downloadChart(format, namefile) {
    const canvas = document.getElementById('chartCanvas');

    if (format === 'png') {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = namefile + '.png';
        link.click();
    } else if (format === 'jpg') {
        const canvasWithBackground = addBackgroundColor(canvas, 'white');
        const link = document.createElement('a');
        link.href = canvasWithBackground.toDataURL('image/jpeg');
        link.download = namefile + '.png';
        link.click();
    } else if (format === 'svg') {
        const svg = canvasToSVG(canvas);
        const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = namefile + '.svg';
        link.click();
    }
}

function addBackgroundColor(canvas, color) {
    const canvasWithBackground = document.createElement('canvas');
    canvasWithBackground.width = canvas.width;
    canvasWithBackground.height = canvas.height;
    const ctx = canvasWithBackground.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvas, 0, 0);
    return canvasWithBackground;
}

function canvasToSVG(canvas) {
    const xmlNs = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(xmlNs, "svg");
    svg.setAttribute("xmlns", xmlNs);
    svg.setAttribute("width", canvas.width);
    svg.setAttribute("height", canvas.height);
    const image = document.createElementNS(xmlNs, "image");
    image.setAttributeNS(null, "width", canvas.width);
    image.setAttributeNS(null, "height", canvas.height);
    image.setAttributeNS("http://www.w3.org/1999/xlink", "href", canvas.toDataURL("image/png"));
    svg.appendChild(image);

    const serializer = new XMLSerializer();
    return serializer.serializeToString(svg);
}

