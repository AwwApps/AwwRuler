function createPDF(){

	//Get DPI Value	
	console.log ("manual Value:"+document.getElementById("manualdpi").value);
	var dotsPerInch = document.getElementById("manualdpi").value;
	var pixelInCentimeter =  (1/dotsPerInch) * 2.54;

	//Create PDF
	var doc = new jsPDF("portrait","cm","a4");
		
	//Config	
	doc.setLineWidth(0.01);
	doc.setFont("helvetica");
	doc.setFontStyle("bold");
	doc.setFontSize(8);

	var offSetX = 1.5;
	var offSetY = 3;
	var lineShort = 0.5;
	var lineLong = 1;

	var textOffsetY = 0.4;
	var textOffsetX = -0.05;	

	var maxWidth = 15;

	var markX = pixelInCentimeter;
	var markXshort = pixelInCentimeter;
	var markText;

	//Ruler Marks
	var i = 0;

	var lineStartX = offSetX;
	var lineEndX;
	
	while (markX < maxWidth){

		markX = pixelInCentimeter * i * 100;
		doc.line(offSetX + markX, offSetY + lineLong, offSetX + markX, offSetY);	
		
		if (pixelInCentimeter * i * 100 > maxWidth){
			markText = ((i * 100)+ "px")
		} else {
			markText = i * 100;	
		}

		doc.text (offSetX + textOffsetX + markX, offSetY + textOffsetY + lineLong, markText.toString());		
		lineEndX = offSetX + markX;
		i++;
	}

	i = 1;

	while (markXshort < maxWidth - pixelInCentimeter * 100){

		markXshort = pixelInCentimeter * i * 50;
		doc.line(offSetX + markXshort, offSetY + lineShort, offSetX + markXshort, offSetY);	
		i = i+2;
	}

	//Ruler Box
	doc.setFontStyle("bold");
	var textAnchorY = offSetY + 2.5;
	var textAnchorOne = (offSetX + maxWidth) / 2;
	doc.text (textAnchorOne, textAnchorY, "Aww Apps");		
		
	doc.setFontStyle("normal");
	var titleText = ("Pixel Ruler "+ dotsPerInch + " dpi");
	doc.text (textAnchorOne + 1.6, textAnchorY, titleText.toString());

	doc.text (offSetX, 28, "Happily built for you by Aww Apps - awwapps.com");
	doc.rect(lineStartX-0.5, offSetY, maxWidth + offSetX + 2.5, textAnchorY - offSetY + 1);

	//Save File
	doc.save("AwwRuler_"+dotsPerInch+"_dpi.pdf");
}