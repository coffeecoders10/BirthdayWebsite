
function readURLs(input,ele) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      ele.attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  } else {
    alert('Select a file to see preview');
    ele.attr('src', '');
  }
}

$(document).on('change', '.uploading', function () {
  readURLs(this,$(this).parent().parent().find(".preview-holder"));
});

$(document).on('change', '.attr-value', function () {
  console.log($(this).prop("title"));
  console.log($(this).val());
  var property = $(this).prop("title");
  var value = $(this).val();
  console.log($(this).closest(".container").find('.text-input').first().css(property,value));
  // $(this).closest(".container").find(".text-input").prop(property,value);
});

$(document).on('click', '.remove-btn', function () {
  $(this).closest(".item").remove()
});

$(document).ready(function(){
  function readURL(input,ele) {
    console.log("HELLOOOOO");
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        ele.attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    } else {
      alert('select a file to see preview');
      ele.attr('src', '');
    }
  }
  
  console.log("HELLO Akruti");
  
  $(".preview").click(function(){
    $(".text-input").each(function(){
      if($(this).prop("readonly") == true){
        $(this).prop("readonly",false);
      }
      else{
        $(this).prop("readonly",true);
      }
    });
    if($(".preview").html() == "Preview"){
      $(".preview-remove").hide()
      $(".preview").html("Edit")
    }
    else{
      $(".preview-remove").show()
      $(".preview").html("Preview")
    }
  });
  
  $(".text-input").on('input', function () { 
        this.style.height = 'auto'; 
        this.style.height = (this.scrollHeight) + 'px'; 
    });
    
  $(".uploading").change(function() {
    readURL(this,$(this).parent().parent().find(".preview-holder"));
  });
  
  $("#add-text-box").click(function(){
    var clone = $("#text-box").clone()
    clone.removeAttr("id");
    clone.removeClass("d-none");
    $("#profile-container").append(clone)
  });
  
  $("#add-img-box").click(function(){
    var clone = $("#img-box").clone()
    clone.removeAttr("id");
    clone.removeClass("d-none");
    $("#profile-container").append(clone)
  });
  
});