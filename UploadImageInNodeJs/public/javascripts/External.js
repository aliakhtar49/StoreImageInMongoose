$(document).ready(function(){
   $('#btn').on("click",function(){
       var file = $('#file').val();
       alert(file);
       $.ajax({
           url:"/upload",
           type:"post",
           data:{file:file}
       }).done(function(res){
               alert(res);
           });
   });
});
