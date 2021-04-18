//document.body.style.border = "5px solid red";

const doc=document;

if(doc != null) {
	console.log("doc ain't null, let's rock");
	const issuesListsIds = ["issues-list-unassigned","issues-list-ongoing","issues-list-closed"];
	for(listId of issuesListsIds) {
		let totalStoryPoints = 0;
		for (const listElement of document.querySelectorAll('#'+listId+'>li')) {
    		//console.log(li);
    		let innerAnchors = Array.from(listElement.getElementsByTagName("a"));
    		//let innerSpans = innerAnchors.getElementsByTagName("span");
    		//console.log(innerAnchors);
    		let relevantAnchors = innerAnchors.filter(anchor => {
    			const innerSpan = anchor.getElementsByTagName("span").item(0);
    			return innerSpan && innerSpan.getAttribute("title") && innerSpan.getAttribute("title").includes("story point");
    		});
    		//console.log("relevantAnchors.length = " + relevantAnchors.length);
    		let relevantAnchor = (relevantAnchors && relevantAnchors.length>0)
    			? relevantAnchors[0]
    			: null;
    		if(relevantAnchor) {
    			let spanContent = relevantAnchor.getElementsByTagName("span").item(0).innerHTML;
    			//console.log("processing " + spanContent);
    				try {
    					if(!isNaN(spanContent)) {
    						//console.log("Adding " + parseInt(spanContent) + " to total for " + listId);
    						totalStoryPoints += parseInt(spanContent);
    					}
    				}
    				catch(e) {
    					console.debug("Not a number or some other problem, not adding");
    				}
    		}
		}
		//console.log("At the end of the day, totalStoryPoints = " + totalStoryPoints + " for section " + listId);
		const cardHeader = document.querySelector('#'+listId).previousElementSibling;
		const cardHeaderTitle = cardHeader.getElementsByClassName("title")[0]; //unsafe as fuck
		//cardHeaderTitle.innerHTML += (" <span class='badge color-label has-tooltip'>" + totalStoryPoints + " SP</span>");
		let preExistingSpLabels = cardHeaderTitle.querySelector("#sp-total");

		if(!preExistingSpLabels) {
			cardHeaderTitle.innerHTML += " <b id='sp-total'>" + totalStoryPoints + " SP <\/b>";
		}
		else {
			console.log("not adding label");	//TODO: update it instead
		}
		//console.log(cardHeaderTitle);
	}
}
else {
	console.log("doc is null, can't rock");
}
