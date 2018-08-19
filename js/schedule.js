var ta;
function getTime() { // docs:getTime
    Date.prototype.getWeek = function () {
        var oneJan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - oneJan) / 86400000) + oneJan.getDay() + 1) / 7);
    }
    return [new Date().getWeek(), new Date().getDay() - 1, [1, 2, 4, 8, 16, 1, 1][$("#day").val()]];
}
function genSchedLink(ao) { // docs:genSchedLink
    ao["wi"] = Math.round(ao["sc"].width());
    ao["he"] = Math.round(ao["sc"].height());
    console.log(ao);
    ta = getTime();
    var link = [
	"http://www.novasoftware.se/ImgGen/schedulegenerator.aspx", "?format=png",
	"&schoolid=" + ao["sid"], "/sv-se", "&type=-1",
	"&id=" + ao["uid"], "&period=",
	"&week=" + ta[0],
	"&printer=0", "&mode=0", "&colors=32", "&head=1", "&clock=1", "&foot=1",
	"&day=" + ta[2],
	"&width=" + ao["wi"],
	"&height=" + ao["he"],
	"&maxwidth=" + ao["wi"],
	"&maxheight=" + ao["he"],
    ].join("");
    return link;
}

function grabCookie(cname) { //docs:grabCookie
    var cookies = document.cookie.replace(/\s+/g, "").split(";");
    for(var i = 0; i < cookies.length; i++) {
	if(cname === cookies[i].split("=")[0]) {
	    return cookies[i].split("=")[1];
	}
    }
    return false;
}

function getSchedule(uid) {
    if(grabCookie("json")) {
    	var cjson = JSON.parse(grabCookie("json"));
      var uid = cjson["uid"];
      var sid = 58700;
    }
    document.cookie = "json={\"uid\": \"" + uid + "\"};expires=Thu, 18 Dec 2026 12:00:00 UTC";
    var test = document.getElementById('schedule-img');
    return genSchedLink({"sc": test, "sid": sid, "uid": uid});
}
