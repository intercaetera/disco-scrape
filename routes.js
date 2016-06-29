const URL = "http://discoverygc.com/forums/serverinterface.php?action=players_online";

module.exports = function(app, request, cheerio) {
  app.get('/', function(req, res) {
    var playerlist = [];
    request(URL, function(error, response, html) {
      if(!error) {

        //DEBUG
        //console.log("Connected to the website.")

        var $ = cheerio.load(html);

        //DEBUG
        //console.log("HTML loaded to Cheerio.");

        $(".players-online-list").filter(function() {
          var data = $(this);

          //DEBUG:
          //console.log("Filter initialized.");

          var i = 0;

          do {
            playerlist[i] = {
              name: data.children().eq(3+i).children().eq(0).text(),
              system: data.children().eq(3+i).children().eq(1).text(),
              ping: data.children().eq(3+i).children().eq(3).text(),
              ta: data.children().eq(3+i).children().eq(6).text()
            }
            i++;
          }while(playerlist[i-1].name.trim() != "")

          //DEBUG:
          //console.log(playerlist);

          res.render("index.pug", {players: playerlist})
        })

      }
    })
  })
}
