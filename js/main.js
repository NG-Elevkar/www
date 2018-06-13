var locale = "sv";
var test;
function init(obj) {
  fetch("./../data/data.json")
    .then(response => response.json())
    .then(json => {
      $(document.body).empty();
      genNavbar(json["navbar"]);
      genPageContent(json["pages"][obj["page"]]);
    });
}
function genPageContent(json) {
  var elems = [];
  if("title" in json) {
    elems.push($("<div/>").addClass("header-container").append($("<div/>").addClass("header").append($("<div/>").addClass("header-text").text(json["title"][locale]))));
    document.title = "NG Elevkår - " + json["title"][locale];
  }
  for (var i = 0; i < json["content"].length; i++) {
    var ci = json["content"][i];
    if("sections" in ci) {
      for (var j = 0; j < ci["sections"].length; j++) {
        var section = $("<div/>").addClass("section");
        var cj = ci["sections"][j];
        if("paragraphs" in cj) {
          for (var k = 0; k < cj["paragraphs"].length; k++) {
            var ck = cj["paragraphs"][k];
            if("header" in ck) {
              section.append($("<div/>").addClass("paragraph-header").text(ck["header"][locale]))
            } else if("text" in ck) {
              section.append($("<div/>").addClass("paragraph").text(ck["text"][locale]))
            }
          }
        } else if("list" in cj) {
          var pc = $("<div/>").addClass("people-container");
          for (var k = 0; k < cj["list"].length; k++) {
            var ck = cj["list"][k];
            var l = $("<div/>").addClass("person");
            if("header" in ck) {
              section.append($("<div/>").addClass("paragraph-header").text(ck["header"][locale]))
            } else if("title" in ck) {
              l.append($("<div/>").addClass("person-title").text(ck["title"][locale]));
              var isPerson = true;
            }
			else {
              var isPerson = true;
            }
			var personText = $("<div/>").addClass("person-text");
            if("src" in ck) {
              l.append($("<div/>").addClass("person-image").append($("<img/>").attr("src", ck["src"])));
            }
            if("name" in ck) {
              personText.append($("<div/>", {class: "person-name"}).text(ck["name"]));
			}
			if("description" in ck) {
				personText.append($("<div/>", {class: "person-description"}).text(ck["description"][locale]))
			}
			if(isPerson) {
				l.append(personText);
				pc.append(l);
            }
          }
          section.append(pc);
        }
        elems.push(section);
      }
    }
    else if ("footer" in ci) {
      if("objects" in ci["footer"]) {
        var fo = ci["footer"]["objects"];
        var footer = $("<div/>", {class: "footer"});
        for (var i = 0; i < fo.length; i++) {
          fo[i]; // TODO: Parse Footer (data.json:103)
        }
      }
    }
  }
  for (var i = 0; i < elems.length; i++) {
    document.body.append(elems[i][0]);
  }
}
function genNavbar(json) {
  var rootBar = $("<ul/>").addClass("navbar"); // Root navbar element
  for (var i = 0; i < json.length; i++) { // For each button in navbar
    var tmp = $("<li/>");
    var cj = json[i];
    if("text" in cj) { // The button should have a label
      tmp.addClass("navbar-item");
      tmp.text(cj["text"][locale]); // Set the button text
    } else if ("src" in cj) {
      tmp.addClass("navbar-logo");
      tmp.append($("<img/>").attr("src", cj["src"]).addClass("navbar-logo-img"));
    }
    if("float" in cj) {
      tmp.addClass(cj["float"]);
    }
    rootBar.append(tmp);
  }
  $(document.body).append(rootBar);
}
$(document).ready(function() {
  init({"page": "about"});
});
