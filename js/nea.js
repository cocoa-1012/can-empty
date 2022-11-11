$(document).ready(function () {
  let headerHeight = $(".header").height();
  $(".after-header").css({
    height: headerHeight,
    position: "relative",
    width: "100%",
  });
  $(".toggle__button").click(function () {
    $(this).toggleClass("active");
    $(".main-nav, .search__bar").slideToggle();
    $(".btn--volunteer").fadeToggle();
  });

  $(".select-search-menu").select2({
    width: "100%",
  });


  $("#select-checked-select2").select2({
    placeholder: "e.g. plastic bottle, tissue paper",
    tags: true,
    // minimumInputLength: 2,
    maximumSelectionSize: 1,
    dropdownPosition: 'below',
    language: {
      // inputTooShort: function(args) {
      //     return "";
      // }
    }
  });


  $("#select-checked-select2").on('select2:open', (e) => {
    setTimeout(removeListOption, 100);

    document.querySelector('.select2-search__field').focus();
  });

  function removeListOption () {
    var listListChildren = $('.select2-results__options li:last-child');
    var dataSelect2Id = listListChildren.data('select2-id');
    var arrayDataSelect = dataSelect2Id.split('-');
    var getLastName = arrayDataSelect[arrayDataSelect.length - 1];

    if (getLastName !== 'YES!' ||
    getLastName !== 'NO!' || 
    getLastName !== 'NOT IN ME!') {
      listListChildren.remove()
    }
  }

  $("#select-checked-select2").on("change", function (e) {
    let val = e.target.value;
    let description = $('#select-checked-select2').find(":selected").data('description');
    let item_name = $('#select-checked-select2').find(":selected").text();
    if(val == "YES!"){
      $(".icon-trash").addClass("d-none");
      $(".item-trash-yes").removeClass("d-none");
      if(description == ""){
        description = "Remember to clean and rinse before recycling.";
      }
      $(".item-trash-yes").find(".card-body").empty().append(description);
    }
    else if(val == "NO!"){
      $(".icon-trash").addClass("d-none");
      $(".item-trash-no").removeClass("d-none");
      
      if (item_name.toLowerCase() == 'plant waste' || 
          item_name.toLowerCase() == 'horticultural waste' ||
          item_name.toLowerCase() == 'cigarettes' ||
          item_name.toLowerCase() == 'joss sticks') {
            description = `
            <div class="">
              ${description}
            </div>
          `;
        } else if ((description.toLowerCase()).includes('should be disposed')) {
          description = `
            <div class="">
              ${item_name} ${description}
            </div>
          `;

        }
        else {
        description = `
          <div class="">
            ${item_name} should be ${description.toLowerCase()}
          </div>
        `;
      }

      $(".item-trash-no").find(".card-body").empty().append(description);
    }
    else if(val == "NOT IN ME!"){
      $(".icon-trash").addClass("d-none");
      $(".item-trash-not-in-me").removeClass("d-none");

      var firstWords = '';

      var words = description.split(" ");
      firstWords = words[0] + ' ' + words[1] + ' ' + words[2];

      if ((firstWords.toLowerCase()).includes('can be')) {
      
        description = `
          <div class="">
            ${item_name} ${description}
          </div>
        `;
      } else if ((firstWords.toLowerCase()).includes('should be donated')) {
        console.log(item_name)
        if (item_name == 'Clothes' ||
        item_name == 'Shoes' ||
        item_name == 'Toys' ||
        item_name == 'Luggage bag') {
          description = `
          <div class="">
            ${item_name} ${description}
          </div>
        `;
        } else {
          description = `
            <div class="">
              Old ${item_name.toLowerCase()} ${description}
            </div>
          `;

        }

      } else if ((firstWords.toLowerCase()).includes('should be disposed')) {
        description = `
          <div class="">
            ${item_name} ${description}
          </div>
        `;

      } else if ((firstWords.toLowerCase()).includes('while the')) {
        description = `
          <div class="">
            ${description}
          </div>
        `;

      }

      $(".item-trash-not-in-me").find(".card-body").empty().append(description);
    } else {
      $(".icon-trash").addClass("d-none");
      $(".item-trash-not-found").removeClass("d-none");
    }
  });


  $.getJSON('nea.json', function(datas) {
    var options = '<option value="" disabled selected>e.g. plastic bottle, tissue paper</option>';
    console.log("ADSFADF", options)
    datas.forEach((data, index) => {
      options += `<option value="${data.canBePlaced}" data-description="${data.description}">${data.itemName}</option>`;
    })

    $('#select-checked-select2').html(options);
 });

  $(".search__button").click(function () {
    $(".main-nav, .search__bar").toggleClass("is_active");
    $(this).toggleClass("active");
  });

  $(".arrow__toggle").click(function () {
    $(this).next(".nav-sub").slideToggle();
    $(this).parent().toggleClass("open");
  });
});
