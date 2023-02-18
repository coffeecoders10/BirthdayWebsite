
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

function colorPickers(){
  $('.colors-input').each( function() {
    console.log("HELLO");
     $(this).minicolors();
  });
}

function lightOrDark(color) {
    var r, g, b, hsp;
    if (color.match(/^rgb/)) {
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        r = color[1];
        g = color[2];
        b = color[3];
    } 
    else {
        color = +("0x" + color.slice(1).replace( 
        color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );
    if (hsp>127.5) {
        return 'light';
    } 
    else {
        return 'dark';
    }
}

$(document).on("input",".text-input",function(){
  this.style.height = 'auto'; 
  this.style.height = (this.scrollHeight) + 'px'; 
});

$(document).on('change', '.uploading', function () {
  readURLs(this,$(this).parent().parent().find(".preview-holder"));
});

$(document).on('change', '#bg-color', function () {
  $("#page").css("background-color",$("#bg-color").val());
  var lumen = lightOrDark($("#bg-color").val());
  if(lumen == 'light'){
    $(".label-text").addClass('text-dark').removeClass('text-white');
  }
  else{
    $(".label-text").addClass('text-white').removeClass('text-dark');
  }
});

$("#bg-color").change(function(){
  
  
  
});

$(document).on('change', '.attr-value', function () {
  // console.log($(this).prop("title"));
  // console.log($(this).val());
  var property = $(this).prop("title");
  var value = $(this).val();
  // console.log($(this).closest(".container").html());
  $(this).closest(".container").find(".text-input").css(property,value);
  // console.log($(this).closest(".container").html());
});

$(document).on('click', '.remove-btn', function () {
  $(this).closest(".item").remove()
});

$(document).ready(function(){

  var order_id = $('#data-length').val() - 1;
  
  $(".attr-value").each(function(){
    var property = $(this).prop("title");
    var value = $(this).val();
    // console.log(property);
    // console.log(value);
    // console.log($(this).closest(".container").find(".text-input").html());
    $(this).closest(".container").find(".text-input").css(property,value);
  })
  
  console.log("HELLO Akruti");
  
  colorPickers();
  
  $(".preview").click(function(){
    console.log("Preview");
    $(".text-input").each(function(){
      if($(this).prop("readonly") == true){
        $(this).prop("readonly",false);
      }
      else{
        $(this).prop("readonly",true);
      }
    });
    if($(".preview").html() == "PREVIEW"){
      $(".preview-remove").hide()
      $(".preview").html("EDIT")
    }
    else{
      $(".preview-remove").show()
      $(".preview").html("PREVIEW")
    }
  });
    
  $(".uploading").change(function() {
    readURL(this,$(this).parent().parent().find(".preview-holder"));
  });
  
  $("#add-text-box").click(function(){
    var clone = $("#text-box").clone()
    clone.removeAttr("id");
    clone.removeClass("d-none");
    clone.find(".ordered").val(order_id);
    order_id++;
    $("#profile-container").append(clone)
    colorPickers();
    
  });
  
  $("#add-img-box").click(function(){
    var clone = $("#img-box").clone()
    clone.removeAttr("id");
    clone.removeClass("d-none");
    clone.find(".ordered").val(order_id);
    order_id++;
    $("#profile-container").append(clone)
  });
  
  
});