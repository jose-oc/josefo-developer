$(function() {
  if ($("#table-of-contents").length > 0) {
    $(".remark-slide-content").css("font-size", "12px");
  }

  $("code.text.remark-code").addClass("hljs");

  $(".file-open").each(function(i, f) {
    let $f = $(f);
    $f.on("click", function(e) {
      e.preventDefault();
      $.get($f.attr("href"));
    });
  });
});
