
#target Illustrator  

var OPTIONS = {
    size   : 100,
    width  : 100,
    height : 100
};

if (app.documents.length == 0) {
    alert("there are no open documents");
}
else {
    var idoc  = app.activeDocument;
	doc_type = getDocumentType(idoc);
	OPTIONS = getSize(OPTIONS, doc_type);
	generateMarginBox(idoc, OPTIONS);
}

function getDocumentType(idoc) {
	alert(idoc.rulerUnits);
	if (idoc.rulerUnits == RulerUnits.Millimeters){
		return "mm"
	}
	if (idoc.rulerUnits == RulerUnits.Pixels){
		return "px"
	}
}


function getSize(OPTIONS, doc_type) {
	var title = "Enter Margin box size";
    OPTIONS.size = Window.prompt ("Enter box size in pixels as WxH ( Example: 250x300 )", 100, title);
    var in_mm = doc_type == "mm";
	var in_px = doc_type == "px";
	if (in_mm && OPTIONS.size.indexOf('x') != -1) {
		var bits = OPTIONS.size.split('x');
		OPTIONS.size.replace('m', '');
		OPTIONS.size.replace('m', '');
		OPTIONS.width  = parseFloat(parseInt(bits[0])) * 2.83465;
        OPTIONS.height = parseFloat(parseInt(bits[1])) * 2.83465;
	}
	else if (in_px && OPTIONS.size.indexOf('x') != -1) {
        var bits = OPTIONS.size.split('x');
        OPTIONS.width  = parseFloat(parseInt(bits[0]));
        OPTIONS.height = parseFloat(parseInt(bits[1]));
    }
	else if (in_mm && OPTIONS.size.indexOf('х') != -1) {
		var bits = OPTIONS.size.split('х');
		OPTIONS.size.replace('m', '');
		OPTIONS.size.replace('m', '');
		OPTIONS.width  = parseFloat(parseInt(bits[0])) * 2.83465;
        OPTIONS.height = parseFloat(parseInt(bits[1])) * 2.83465;
	}
	else if (in_px && OPTIONS.size.indexOf('х') != -1) {
        var bits = OPTIONS.size.split('х');
        OPTIONS.width  = parseFloat(parseInt(bits[0]));
        OPTIONS.height = parseFloat(parseInt(bits[1]));
    }
    else if (in_mm){
		OPTIONS.width  = parseFloat(OPTIONS.size) * 2.83465;
        OPTIONS.height = parseFloat(OPTIONS.size) * 2.83465;
	}
	else if (in_px) {
        OPTIONS.width  = parseFloat(OPTIONS.size);
        OPTIONS.height = parseFloat(OPTIONS.size);
    }
	return OPTIONS
	
}

function createBox(BoxCoord) {
	var blackColor = new CMYKColor();
	blackColor.black = 100;
	var x = BoxCoord[0];
	var y = BoxCoord[1];
	var width = BoxCoord[2];
	var height = BoxCoord[3];
	var mgbox = idoc.pathItems.rectangle(x, y, width, height);
	mgbox.stroked = false;
	mgbox.fillColor = blackColor;
	
	
}

function generateMarginBox(idoc, OPTIONS) {
	var width = OPTIONS.width
	var height = OPTIONS.height
	var MarginBoxCoord = Array(
			Array(0, 0, width, height),
			Array(idoc.artboards[0].artboardRect[3] + height, 0, width, height),
			Array(0, idoc.artboards[0].artboardRect[2] - width, width, height),
			Array(idoc.artboards[0].artboardRect[3] + height, idoc.artboards[0].artboardRect[2] - width, width, height));

	for (i = 0; i< MarginBoxCoord.length; i++)
	{
		createBox(MarginBoxCoord[i]);
	}
    }