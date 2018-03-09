var giphyAnimals = ["walrus","dog", "cat", "bird", "elephant", "monkey", "narwhal"];

// =================================================================================

function createButtons() {
    $('#button-holder').empty();
    for (var i = 0; i < giphyAnimals.length; i++) {
        var animalButton = $('<button>');
        animalButton.text(giphyAnimals[i]);
        animalButton.addClass('animal-button')
        $('#button-holder').append(animalButton)
    }
}

// ==================================================================================


function addbutton(event) {
    event.preventDefault();
    var newAnimalSearch = $('#giphy-input').val().trim()
    if (newAnimalSearch) {
        giphyAnimals.push(newAnimalSearch);
        createButtons();
        $('#giphy-input').val('');
    }

}

// ==================================================================================
function makeAjaxCall(animal) {
    var APIKey = "HYYQ5hYpRzGj4v2P3BhIHObX0HfvGTqv";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + animal.text() + "&limit=10&offset=0&rating=PG-13&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (responseFromAjax) {
        formatResponse(responseFromAjax.data);

    })
}

// ===================================================================================

function formatResponse(ThisCanBeAnyArray) {
    $('#giphy-images').empty();
    for (var i = 0; i < ThisCanBeAnyArray.length; i++) {
        var div = $('<div>');
        div.addClass('gif');
        div.append('<p> Rating: ' + ThisCanBeAnyArray[i].rating + '</p>');
        div.append('<img class= "imgSrc" src= ' + ThisCanBeAnyArray[i].images.original_still.url + '>');
        $('#giphy-images').append(div);

    }

}

// ====================================================================================

function getResponse() {
    makeAjaxCall($(this))
}
// ====================================================================================

function unfreeze() {
    var source = $(this).attr('src')
    var newSrc = '';
    if (source.includes('_s.gif')) {
        newSrc = source.replace('_s.gif', '.gif');
    } else {
        newSrc = source.replace('.gif', '_s.gif');

    }

    $(this).attr('src', newSrc)

    // console.log(source);
}


// ============================================================================


$('#search-giphy').on("click", addbutton);
$('#button-holder').on('click', '.animal-button', getResponse)
$('#giphy-images').on('click', '.imgSrc', unfreeze)




createButtons();