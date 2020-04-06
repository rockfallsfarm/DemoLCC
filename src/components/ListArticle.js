import React, {Component} from 'react';

class ListArticle extends Component {

    constructor(props){
	    super(props);
	    
	    this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
	    var id = e.target.id.replace(/\s+/g, '');

	    var htmlArray = document.getElementsByClassName(id);
	    var index = 0;
	    for(index = 0; index < htmlArray.length; index++ ){
		    htmlArray[index].classList.contains("highlighted") ? htmlArray[index].classList.remove("highlighted") : htmlArray[index].classList.add("highlighted")
	    }
    }

    render() {
    
        var allSentences = this.props.sentences;
        var currentSentence;
        
        //Track the string "coordinates" for a concept that cooresponds to tokenStartChars
        //Starting position and ending position (x and y respectively)
        var conceptPosition = {x: 0, y: 0} 

        //Track the "concept" sections of text with in a sentence
        var sentenceConcept = {x: 0, y: 0};

        var conceptString = '';
        
        var buildHtmlDisplay = [];
        
        //keyValue only used to set unique key for <spans> 
        var keyValue = 10;

        var indexOuter, indexInner = 0;
        
        //Build the article/paragraph text display with separate spans/classes to indicate which portion of text should be highlighted 
        for (indexOuter = 0; indexOuter < allSentences.length; indexOuter++) {	//Loop at sentence level
        
	        currentSentence = allSentences[indexOuter];
	        
	        var sLength = currentSentence.representation.length;

            // If no entities exist for the sentence, then display the whole sentence 
	        if (currentSentence.entities.length === 0){
		        buildHtmlDisplay.push(currentSentence.representation)
	        }

            // Loop through entities of each sentence 
	        for(indexInner=0; indexInner < currentSentence.entities.length; indexInner++) {		
		
		        conceptPosition.x = currentSentence.entities[indexInner].startToken;
		        conceptPosition.y = currentSentence.entities[indexInner].tokenLength + conceptPosition.x;


		        sentenceConcept.x = currentSentence.tokenStartChars[conceptPosition.x];

		        // Print the section of a sentence after an entity and before the next entity position 
		        // (uses previous value of sentenceConcept.y)
		        if(indexInner > 0){
			        buildHtmlDisplay.push(currentSentence.representation.substring(sentenceConcept.y, sentenceConcept.x));
		        }

		        sentenceConcept.y = currentSentence.tokenStartChars[conceptPosition.y];

		        //  Print the first part of the sentence [but only once]
		        if(indexInner < 1){
			        buildHtmlDisplay.push(currentSentence.representation.substring(0, sentenceConcept.x));
		        }
		

                // Remove spaces from the concept
		        conceptString = currentSentence.entities[indexInner].concept.replace(/\s+/g, '');
		        
		        // Get the sentence text that corresponds to the concept
		        // Surroud it with an html tag to reference that section of text later
		        // Assign html tag a class of the concept text
			    buildHtmlDisplay.push( <span key={keyValue} className={"entity " + (conceptString)}>
			                            {currentSentence.representation.substring(sentenceConcept.x, sentenceConcept.y)}
			                           </span> );
			                           
		        // Print last section of a sentence after the last entity [but only once] and append some whitespace for readability
		        if(indexInner === currentSentence.entities.length-1){
			        buildHtmlDisplay.push(currentSentence.representation.substring(sentenceConcept.y, sLength).concat('  '));
		        } 
		        
		        keyValue++;
	        }
        }
        
         //Get all entity concepts in the article
        var entityArray = [];

        allSentences.map( sentence => (
	        sentence.entities.map( item => (
			        entityArray.push(item.concept)
		        ))
        ));

        //Remove duplicate entity concepts, count, and sort
        //Use this to display buttons for highlighting text and summarize concepts/entity appearances in the article/text
        //TODO: Generate "word cloud" of concepts within an article of text?
        var uniq = entityArray.map((concept) => {
            					return {count: 1, concept: concept}
						        })
						        .reduce((a, b) => {
						            a[b.concept] = (a[b.concept] || 0) + b.count
						            return a
						          }, {});

        var sortedConcepts = Object.keys(uniq).sort((a, b) => uniq[a] < uniq[b]);


        return (
	        <div className="container-fluid">
                <div className="row">
	                <div className="col-sm-8">
	                
		                <code>{buildHtmlDisplay}</code>

	                </div>
	                <div className="col-sm-4 column right">
	                    <div className="container">
			
		                    {sortedConcepts.map((item, index) => (
			
				                <div className="form-check" key={index}>
				                    <label className="form-check-label">
				                        <input type="checkbox" id={item} className="form-check-input" onClick={this.handleClick}/>
				                        {item}
				                    </label>
				                </div>
				            ))}
	                    </div>	
	                </div>
		        </div>
	        </div>
        );
	}
}

export default ListArticle;
