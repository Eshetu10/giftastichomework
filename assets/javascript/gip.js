   
$(document).ready(function () {
    $("body").hide();
    $("body").show(1500);

    var animatedTelev = ["animals", "movie", "funny", "car", "arsenal", "code", "mad", "goat", "tears", "water", "lion", "computer", "flag"];

    function renderButtons() {
        $('#buttons-view').empty();

        for (var i = 0; i < animatedTelev.length; i++) {
           
            var a = $('<button>');
            a.addClass('anim-tv');
            a.attr('data-name', animatedTelev[i]);
            a.text(animatedTelev[i]);
            $('#buttons-view').append(a);
        }
    }
    renderButtons();

    $(document).on('click', '.anim-tv', function () {

        var animTv = $(this).html();
      ;

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animTv + "&api_key=B16B3UHEjIdWBAh5GZHcisLB7D4HsiQ6";
       
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            var results = response.data;
            console.log(results);
            $('.gifcontainer').empty();
            for (var j = 0; j < results.length; j++) {
                var imageDiv = $('<div>');
                var imageView = results[j].images.fixed_height.url;
                var still = results[j].images.fixed_height_still.url;
                 
                var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                gifImage.attr('data-state', 'still');

                var imageAndrating = $("<div>").addClass('imgAndRating')

                imageAndrating.prepend(gifImage);

                gifImage.on('click', playGif);

                var rating = results[j].rating;

                var displayRated = $('<p>').text("Rating: " + rating);
                imageAndrating.prepend(displayRated)
                $(".gifcontainer").prepend(imageAndrating);
                $('').prepend(displayRated);
                imageAndrating.hide();
                imageAndrating.show(1000);;
            }

        });

        function playGif() {
            var state = $(this).attr('data-state');
           
            if (state == 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }

        }

    }); 
    
    $(document).on('click', '#add-movie', function () {
        if ($('#movie-input').val().trim() == '') {
            alert('Input can not be left blank');
        }
        else {
            var movies = $('#movie-input').val().trim();
            animatedTelev.push(movies);
            $('#movie-input').val('');
            renderButtons();
            return false;

        }

    });


});