
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
  $('.color-input').ColorPicker({
	onSubmit: function(hsb, hex, rgb, el) {
		$(el).val("#" + hex);
		$(el).ColorPickerHide();
    $(el).trigger("change");
    console.log("Change");
  	},
  	onBeforeShow: function () {
  		$(this).ColorPickerSetColor(this.value);
  	}
  })
  .bind('keyup', function(){
  	$(this).ColorPickerSetColor(this.value);
  });
}

$(document).on("input",".text-input",function(){
  this.style.height = 'auto'; 
  this.style.height = (this.scrollHeight) + 'px'; 
});

$(document).on('change', '.uploading', function () {
  readURLs(this,$(this).parent().parent().find(".preview-holder"));
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
  // function readURL(input,ele) {
  //   if (input.files && input.files[0]) {
  //     var reader = new FileReader();
  //     reader.onload = function(e) {
  //       ele.attr('src', e.target.result);
  //     }
  //     reader.readAsDataURL(input.files[0]);
  //   } else {
  //     alert('select a file to see preview');
  //     ele.attr('src', '');
  //   }
  // }
  
  var order_id = $('#data-length').val() - 1;
  
  $(".attr-value").each(function(){
    var property = $(this).prop("title");
    var value = $(this).val();
    console.log(property);
    console.log(value);
    console.log($(this).closest(".container").find(".text-input").html());
    $(this).closest(".container").find(".text-input").css(property,value);
  })
  
  console.log("HELLO Akruti");
  
  colorPickers();
  
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
  
  $("#bg-change").click(function(){
    $("#page").css("background-color",$("#bg-color").val());
  });
  
});