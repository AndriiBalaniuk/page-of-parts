$(document).ready(function () {

    $(".dropdown-toggle").click(function () {
        var condition = $(this).parents(".button-dropdown").children(".dropdown-menu").is(":hidden");
        $(".button-dropdown .dropdown-menu").slideUp();
        $(".button-dropdown .dropdown-toggle").removeClass("active");
        if (condition) {
            $(this).parents(".button-dropdown").children(".dropdown-menu").slideDown().parents(".button-dropdown").children(".dropdown-toggle").addClass("active")
        }
    });

    $(document).bind("click", function (e) {
        var target = $(e.target);
        if (!target.parents().hasClass("button-dropdown")) $(".button-dropdown .dropdown-menu").slideUp();
    });

    $(document).bind("click", function (e) {
        var target = $(e.target);
        if (!target.parents().hasClass("button-dropdown")) $(".button-dropdown .dropdown-toggle").removeClass("active");
        if (!target.parents().hasClass("menu-toggle") && !target.parents().hasClass("button-dropdown")) {
          $("nav").removeClass("nav-active");
          $("body").css("overflow","visible");
        }
    });

    $(".deep-menu").on("click", function () {
      $(this).children(".submenu").toggleClass("active-submenu");
    });

    $(".menu-toggle").on("click", function () {
      $("nav").toggleClass("nav-active");
      $("nav").hasClass("nav-active") ? $("body").css("overflow","hidden") : $("body").css("overflow","visible")
    });

    $(".search-toggle").on("click", function () {
      $(".actions form").is(":hidden") ? $(".actions form").show() : $(".actions form").hide();
    });

    $("footer nav h3").on("click", function () {
      $(this).parents("div").children("ul").slideToggle();
      $(this).children("span").toggleClass("rotate");
    });

    //signup block, actions with form
    $(".form-item input").on("focus", function(){
      $(this).parents(".form-item").children("label").css({ opacity: 0.5 })
    });

    $(".form-item input").on("input", function(e){
      $(this).parents(".form-item").children("label").hide();
      if (e.target.value == "") {
        $(".form-item label").fadeIn(1000);
      }
    });

    $(".form-item input").on("blur", function(){
      $(this).parents(".form-item").children("label").css({ opacity: 1 })
    });

});
