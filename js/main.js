var locale = "sv";
var test;

fetch("./data/data.json")
    .then(function(response) {
	return response.json();
    })
    .then(function(json) {
	test = json;
    })
    .then(function() {
	$(document).ready(function() {
	    genNavbar(test["navbar"]);
		var page = "about";
		if(window.location.href.split("#")[1]) {
			page = window.location.href.split("#")[1];
		}
	    init({"page": page});
	});
    });

function init(obj) {
    empty();
	  console.log(obj);
	  window.location.href = window.location.href.split("#")[0] + "#" + obj["page"];
    genPageContent(test["pages"][obj["page"]], "left");
    genPageContent(test["pages"][obj["page"]], "right");
    $("#right").append(generateFooter());
    $("#left").append(generateFooter());
}

function empty() {
    $("#left").remove();
    $("#right").remove();
  	sliderInit();
}

function genList(list) {
	console.log(list);
}

function generateFooter() {
  var fo = test["footer"]["objects"]; // Footer Objects
  var footer = $("<div/>", {class: "footer"});
  for (var i = 0; i < fo.length; i++) {
      var fi = fo[i]; // Footer Item
      if("text" in fi) {
    footer.append($("<div/>", {class: "footer-text"}).html(fi["text"][locale]));
      }
  }
  return footer;
}

function genPageContent(json, side) {
	var elemsObj = {"left": [], "right": []};
    if("title" in json[side]) {
	elemsObj[side].push($("<div/>").addClass("header-container").append($("<div/>").addClass("header").append($("<div/>").addClass("header-text").text(json[side]["title"][locale]))));
	document.title = "NG Elevkår - " + json[side]["title"][locale];
    }
    for (var i = 0; i < json[side]["content"].length; i++) {
	var ci = json[side]["content"][i];
	var elems = elemsObj[side];
	if(ci == "schedule") {
	    elems.push(genSchedule(getCookie()));
	}
	else if ("calendar" in ci) {
	    var calendarRoot = $("<ul/>", {
		class: "calendar"
	    });
	    for(var i = 0; i < ci["calendar"]["entries"].length; i++) {
		calendarRoot.append($("<li/>", {class: "entry"}).append(
		    $("<span/>", {
			class: "date"
		    }).text(ci["calendar"]["entries"][i]["date"])
		).append($("<span/>", {class: "text"}).html(ci["calendar"]["entries"][i]["text"][locale])).append(
		    $("<span/>", {class: "time"}).text(ci["calendar"]["entries"][i]["time"])
		).append($("<span/>", {class: "description"}).html(ci["calendar"]["entries"][i]["description"][locale]))
		);
	    }
	    elems.push(calendarRoot);
	}
	else if("sections" in ci) {
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
			    l.append($("<div/>").addClass("person-title").text(ck["title"][locale])); var isPerson = true;
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
    }
    for (var i = 0; i < elems.length; i++) {
	$("#" + side).append(elems[i][0]);
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
	    tmp.attr("onclick", "init({\"page\": \"" + cj["id"] + "\"})");
	} else if ("src" in cj) {
	    tmp.addClass("navbar-logo");
	    tmp.append($("<img/>").attr("src", cj["src"]).addClass("navbar-logo-img"));
	}
	if("float" in cj) {
	    tmp.addClass(cj["float"]);
	}
	rootBar.append(tmp);
    }
	$(document.body).prepend(rootBar);
    }

function getImage(classId) {
  var url = [];
}

function genSchedule(uid) {
    var scheduleContainer = $("<div/>", {class: "schedule-container"});
    var scheduleSettings = $("<div/>", {class: "schedule-settings"});
    var scheduleImg = $("<img/>", {id: "schedule-img", src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}).one("load", function() {
          $("#schedule-img").attr("src", getSchedule($("#class-id").val()));
        });;
    scheduleSettings.append($("<input/>", {type: "text", placeholder: "Class ID", id: "class-id"}).val(uid));
    scheduleSettings.append($("<input/>", {type: "submit", value: "Submit"}).on("click", function() {
      $("#schedule-img").attr("src", getSchedule($("#class-id").val()));
    }));
    scheduleContainer.append(scheduleSettings);
    scheduleContainer.append(scheduleImg);
    return scheduleContainer;
}
