$( document ).ready(function() {

    $('#signup').submit( function() {

        $(" #signup-container ").fadeOut('slow', null);

        console.log('clicked')
        $.post($(this).attr('action'), $(this).serialize(), function(res){
            console.log(res);
            $(" #signup-finished ").removeClass('hidden').hide().fadeIn('slow', null);
        });

        return false; // prevent default action
    });
});
