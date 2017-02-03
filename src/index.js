var pcap = require('pcap');
var utils = require('./utils');
var player = require('play-sound')(opts = {});
var pcapSession = pcap.createSession('en4');
var moment = require('moment');
var axios = require('axios');

function timestamp() {
  return '[' + moment().format("DD/MM/YYYY HH:mm:ss") + ']';
}

listenForDashPress('ac:63:be:75:b9:01', function() {
  console.log(timestamp(), "Pressed");
//  axios.get("https://maker.ifttt.com/trigger/ariel-dash/with/key/b-J9EQ4GHD5v1VksU4Yu-T");
  player.play('doorbell.wav');
});


function listenForDashPress(dashbutton, handler) {
  pcapSession.on('packet', function(rawPacket) {
    try {
      var packet = pcap.decode.packet(rawPacket);
      var dadd = packet.payload.shost.addr;
      var mac = utils.dadd2hadd(dadd);

      if (mac === dashbutton && utils.throttled()) {
        handler();
      }
    } catch (e) {
      // ignore
    }
  });
}
