$(document).ready(function() {
    $(document.body).append($("<div/>", {
	id: "left"
    }).append($("<div/>", {
	class: "content"
    })).append($("<div/>", {
	class: "separator",
	onclick: "toggleSide(this)",
	"data-side": "left"
    }).append($("<span/>", {
	class: "label",
	text: "«"
    })))).append($("<div/>", {
	id: "right"
    }).append($("<div/>", {
	class: "content"
    })).append($("<div/>", {
	class: "separator",
	onclick: "toggleSide(this)",
	"data-side": "right"
    }).append($("<span/>", {
	class: "label",
	text: "»"
    }))));
    hideRight($("#right"));
});
function toggleSide(obj) {
    var sideToToggle = obj.dataset.side;
    if(sideToToggle == "left") {
	hideLeft($("#left"), "left");
	show($("#right"), "right");
    } else {
	hideRight($("#right"));
	show($("#left"));
    }
}
function hideRight(element, side) {
    element.animate({"right": "-100%"}, "1000", "swing", function() {
	element.hide();
    });
}
function show(element) {
    element.show();
    element.animate({"right": "0%"}, "1000");
}
function hideLeft(element) {
    element.animate({"right": "100%"}, "1000", "swing", function() {
	element.hide();
    });
}
