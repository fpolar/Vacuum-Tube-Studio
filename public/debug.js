function debugOnSite(s){
	$("#debug").html(s);
}

function objectPropertiesString(o){
	var out = '';
	var propValue;
	for(var propName in o) {
    	propValue = o[propName]
    	out+=propName+" = "+propValue+"<br/>";
    	if(typeof propValue === 'object' && propValue !== null){
			var propValue;
			for(var propName2 in propValue) {
		    	propValue2 = o[propName2]
		    	out+="     "+propName2+" = "+propValue2+"<br/>";
			}
    	}
	}
	return out;
}