var giphyAnimals = ["dog", "cat", "bird", "elephant", "monkey"];


// function 1 we're naming this renderButtons this will for loop through the animal array and create the buttons for each animal in the array
function renderbuttons (){
// $('#button-holder') will target the button holder id in html and .empty() will empty the button holder box so it starts off clean without any thing in the box.
    $('#button-holder').empty();
// the for will loop through the array "giphyAnimlas"
    for (var i = 0; i < giphyAnimals.length; i++) {
       
        // this will create a button we call it animalButton so we can assign it later, it currently has no value. 
     var animalButton = $('<button>');
    
     //   this will add the text from the array to each button
     animalButton.text(giphyAnimals[i]); 
     
        // adding a class to the animal buttons so that they can be targeted by class if needed.
    animalButton.addClass('animal-button')

    //  this will now add the newly named button to html targeting the button-holder id using $('#button-holder') and then appending using .append(animalButton).
     $('#button-holder').append(animalButton)


    }     
}


// function 2 we're naming this addbutton, we used event inside the () because this is a form and by default forms submit and then refresh so we need to target an event inside this function which will prevent the forms default function of submitting and refreshing. 
function addbutton (event) {
// this is the event entered in the () above note name event .preventDefault() is being called 
    event.preventDefault();

    // here we are targeting the html id giphy-input and we add .val with empty () this captures what the user types in the form box. 
  var newAnimalSearch =  $('#giphy-input').val().trim()
  
//   this targets the predefined giphyAnimals array, then pushes the user input (from the above var newAnimalSearch code) into the array using the .push method

// added this so that blank input can't be submitted.
if (newAnimalSearch){
    // otherwise this will still work to push new content to animal array even if blank.
    giphyAnimals.push(newAnimalSearch);

//   then we use the renderbuttons function which was also predefined as funciton renderbuttons and it will add the new animal button to the already existing buttons. 
  renderbuttons();
//   this resets the value back to blank so whatever you typed isn't just sitting there doing nothing...looking all ugly.
  $('#giphy-input').val('');
}

}

// function 3 makeAjaxCall calling on the ajax
function makeAjaxCall(animal){
    var APIKey = "HYYQ5hYpRzGj4v2P3BhIHObX0HfvGTqv";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+ APIKey+"&q="+animal.text()+"&limit=10&offset=0&rating=PG-13&lang=en";
    
$.ajax({
    url: queryURL,
    method: "GET",
}) .then(function(responseFromAjax){
    formatResponse(responseFromAjax.data);
    // console.log(responseFromAjax.data)

})
}

function formatResponse(ThisCanBeAnyArray){
$('.main-content').empty();
for (var i = 0; i < ThisCanBeAnyArray.length; i++) {
    var div = $('<div>');
    div.addClass('gif');
    div.append('<p> Rating: ' +ThisCanBeAnyArray[i].rating+ '</p>');
    div.append('<img src= ' +ThisCanBeAnyArray[i].images.original_still.url+ '>');
    $('.main-content').append(div);
    
}

}


//  function 4 get response calling on the ajax
function getResponse(){
makeAjaxCall($(this))

}




//  events listens for the click 
 $('#search-giphy').on("click", addbutton);

 $('#button-holder').on('click','.animal-button',getResponse)

//  add another event to targetr the animal-button
// $('.animal-button').on("click", getResponse)


 // this calls the function renderbuttons which was created above NOTICE this is outside of that function in the global scope.
renderbuttons();








