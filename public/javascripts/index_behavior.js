$(document).ready(function(){
    $(".story").hover(function(){
        //PENDIENTE ATRIBUTO PARA URL
        var id = $(this).attr('data-id');
        var url_delete="/delete/"+id;
        $(this).prepend('<span class="delete_action" style="float:right;margin-left:15px;"><a href="'+url_delete+'"><i class="glyphicon glyphicon-trash"></i></a></span>')
    });
    $(".story").mouseleave(function(){
        $(this).children('.delete_action').remove();
    })
});