import fs from 'fs'
import readline from 'readline'

import { Room } from "colyseus";
import { Schema, type, MapSchema , ArraySchema } from "@colyseus/schema";

export class BrushStroke extends Schema {
    @type("string")
    playerId = "";
    @type("number")
    x = -1;
    @type("number")
    y = -1;
    @type("number")
    z = -1;
}

export class Round extends Schema {
    @type("string")
    current_word = 'game not started';

    @type("number")
    round_number = 0;

    @type("number")
    last_guesser_index = -1;
}

export class Player extends Schema {
    @type("string")
    sessionId = "";
    @type("boolean")
    connected = true;
    @type("string")
    state = 'init'; //draw, tilt, stop, guess, ready, host
    @type("number")
    score = 0;
    
    @type("number")
    canvas_pos_x = Math.random();
    @type("number")
    canvas_pos_y = Math.random();
    
    @type("number")
    device_width = 0;
    @type("number")
    device_height = 0;

    @type("number")
    x = -100;
    @type("number")
    y = -100;
    @type("number")
    z = -100;

    @type("string")
    color = '-1';
    @type("string")
    emoji = '-1';

    @type([BrushStroke])
    brush_strokes = new ArraySchema<BrushStroke>();

    createStroke (x: number, y: number, z: number) {
        var b = new BrushStroke();
        b.playerId = this.sessionId;
        b.x = x;
        b.y = y;
        b.z = z;
        this.brush_strokes.push(b);
    }

}

export class State extends Schema {

    colorNames: string[] = ['tomato', 'orange',    'gold',      'slateBlue',  'aquamarine' , 'forestgreen', 'hotpink', 'purple'];

    colors: string[] = ['255,99,71', '255,165,0', '255,215,0', '106,90,205', '127,255,212', '34,139,34', '255,105,180 ', '128,0,128'];

    //Not all emojis are included in the list because some icons can imply functionality that isnt there
    emojis: string[] = [
        '😄','😃','😀','😊','☺','😉','😍','😘','😚','😗','😙','😜','😝','😛','😳','😁','😔','😌','😒','😞','😣','😢','😂','😭','😪','😥','😰','😅','😓','😩','😫','😨','😱','😠','😡','😤','😖','😆','😋','😷','😎','😴','😵','😲','😟','😦','😧','😈','👿','😮','😬','😐','😕','😯','😶','😇','😏','😑','👲','👳','👮','👷','💂','👶','👦','👧','👨','👩','👴','👵','👱','👼','👸','😺','😸','😻','😽','😼','🙀','😿','😹','😾','👹','👺','🙈','🙉','🙊','💀','👽','💩','🔥','✨','🌟','💫','💥','💢','💦','💧','💤','💨','👂','👀','👃','👅','👄','👍','👎','👌','👊','✊','✌','👋','✋','👐','👆','👇','👉','👈','🙌','🙏','☝','👏','💪','🚶','🏃','💃','👫','👪','👬','👭','💏','💑','👯','🙆','🙅','💁','🙋','💆','💇','💅','👰','🙎','🙍','🙇','🎩','👑','👒','👟','👞','👡','👠','👢','👕','👔','👚','👗','🎽','👖','👘','👙','💼','👜','👝','👛','👓','🎀','🌂','💄','💛','💙','💜','💚','❤','💔','💗','💓','💕','💖','💞','💘','💌','💋','💍','💎','👤','👥','👣','💭','🐶','🐺','🐱','🐭','🐹','🐰','🐸','🐯','🐨','🐻','🐷','🐽','🐮','🐗','🐵','🐒','🐴','🐑','🐘','🐼','🐧','🐦','🐤','🐥','🐣','🐔','🐍','🐢','🐛','🐝','🐜','🐞','🐌','🐙','🐚','🐠','🐟','🐬','🐳','🐋','🐄','🐏','🐀','🐃','🐅','🐇','🐉','🐎','🐐','🐓','🐕','🐖','🐁','🐂','🐲','🐡','🐊','🐫','🐪','🐆','🐈','🐩','🐾','💐','🌸','🌷','🍀','🌹','🌻','🌺','🍁','🍃','🍂','🌿','🌾','🍄','🌵','🌴','🌲','🌳','🌰','🌱','🌼','🌐','🌞','🌝','🌚','🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘','🌜','🌛','🌙','🌍','🌎','🌏','🌋','🌌','🌠','⭐','☀','⛅','☁','⚡','☔','❄','⛄','🌀','🌁','🌈','🌊','🎍','💝','🎎','🎒','🎓','🎏','🎆','🎇','🎐','🎑','🎃','👻','🎅','🎄','🎁','🎋','🎉','🎊','🎈','🎌','🔮','🎥','📷','📹','📼','💿','📀','💽','💾','💻','📱','☎','📞','📟','📠','📡','📺','📻','🔓','🔒','🔏','🔐','🔑','💡','🔦','🔆','🔅','🔌','🔍','🛁','🛀','🚿','🚽','🔧','🔩','🔨','🚪','🚬','💣','🔫','🔪','💊','💉','💰','🎨','🎬','🎤','🎧','🎼','🎵','🎶','🎹','🎻','🎺','🎷','🎸','👾','🎮','🃏','🎴','🀄','🎲','🎯','🏈','🏀','⚽','⚾','🎾','🎱','🏉','🎳','⛳','🚵','🚴','🏁','🏇','🏆','🎿','🏂','🏊','🏄','🎣','☕','🍵','🍶','🍼','🍺','🍻','🍸','🍹','🍷','🍴','🍕','🍔','🍟','🍗','🍖','🍝','🍛','🍤','🍱','🍣','🍥','🍙','🍘','🍚','🍜','🍲','🍢','🍡','🍳','🍞','🍩','🍮','🍦','🍨','🍧','🎂','🍰','🍪','🍫','🍬','🍭','🍯','🍎','🍏','🍊','🍋','🍒','🍇','🍉','🍓','🍑','🍈','🍌','🍐','🍍','🍠','🍆','🍅','🌽','🌄','🌅','🌃','🗽','🌉','🎠','🎡','⛲','🎢','🚢','⛵','🚤','🚣','⚓','🚀','✈','💺','🚁','🚂','🚊','🚉','🚞','🚆','🚄','🚅','🚈','🚇','🚝','🚋','🚃','🚎','🚌','🚍','🚙','🚘','🚗','🚕','🚖','🚛','🚚','🚨','🚓','🚔','🚒','🚑','🚐','🚲','🚡','🚟','🚠','🚜','💈','🚏','🎰','♨','🗿','🎪','🎭','📍','🈁','🈯','🈳','🈵','🈴','🈲','🉐','🈹','🈺','🈶','🈚','🚻','🚹','🚺','🚼','🚾','🚰','🚮','🅿','♿','🚭','🈷','🈸','🈂','🛂','🛄','🛅','🛃','🉑','㊙','㊗','🆑','🆘','🆔','🚫','🔞','📵','🚯','🚱','🚳','🚷','🚸','⛔','✳','❇','❎','✅','✴','💟','🆚','📳','📴','🅰','🅱','🆎','🅾','💠','➿','♻','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎','🔯','🏧','💹','💲','💱','©','®','™','♠','♥','♣','♦',,'💯','✔','☑','🔘','🔗','➰','🔱'
    ];

    dict: string[] = ['Zeph', 'Leya', 'Garryth', 'Sora', 'Rip Caidrow', 'Ata', 'Serena', 'Epep', 'Finley', 'Three Quarters'];

    dictFromFile(filename: string){

        console.log("Reading Game Dictionary From: ", filename);

        const lineReader = readline.createInterface({
            input: fs.createReadStream('./'+filename),
            output: process.stdout
        });

        //because the 'this' changes when within following function
        let thisState = this;
        var stats = fs.stat(filename, function(err,stat){
           if (stat && stat.isFile() ) {
            thisState.dict = [];
            lineReader.on('line', function(line) {
                // console.log(line);
                thisState.dict.push(line)
            });
           }else{
                console.log(filename, " does not exist!")
           }
        });
    }

    @type("string")
    hostID = "no host in room"

    @type({ map: Player })
    players = new MapSchema<Player>();

    @type("number")
    num_players = 0;

    //stored again here for correct canvas redraw order
    @type([BrushStroke])
    brush_strokes = new ArraySchema<BrushStroke>();

    @type(Round)
    round = new Round();

    @type("number")
    host_canvas_width = -1;

    @type("number")
    host_canvas_height = -1;

    @type({ map: 'number' })
    canvas_state = new MapSchema<'number'>();

    createPlayer (id: string) {
        this.players[ id ] = new Player();
        this.players[ id ].sessionId = id;
        var emoji_index = Math.floor(Math.random() * this.emojis.length);
        var color_index = Math.floor(Math.random() * this.colors.length);
        this.players[ id ].emoji = this.emojis[emoji_index];
        this.players[ id ].color = this.colors[color_index];
        if (emoji_index > -1) {
            this.emojis.splice(emoji_index, 1);
        }
        if (color_index > -1) {
            this.colors.splice(color_index, 1);
        }
        this.num_players++;
    }

    removePlayer (id: string) {
        this.colors.push(this.players[ id ].color);
        this.emojis.push(this.players[ id ].emoji);
        this.num_players--;
        delete this.players[ id ];
    }

    setPlayerState(id: string, state: string){
        if(this.players[ id ].state != 'host'){
            this.players[ id ].state = state;
        }
    }

    setPlayerEmoji(id: string, data: any){
        if(data.emoji)
            this.players[ id ].emoji = data.emoji;
    }

    setPlayerColor(id: string, data: any){
        if(data.color)
            this.players[ id ].color = data.color;
    }

    setPlayerDeviceDim(id: string, data: any){
        if(data.device_width)
            this.players[ id ].device_width = data.device_width;
        if(data.device_height)
            this.players[ id ].device_height = data.device_height;
    }

    movePlayer (id: string, movement: any) {
        if(movement.x){
            this.players[ id ].x = movement.x;
        }
        if(movement.y){
            this.players[ id ].y = movement.y;
        }
        if(movement.z){
            this.players[ id ].z = movement.z;
        }

        if(movement.x && movement.y && movement.z){
            this.players[ id ].createStroke(movement.x, movement.y, movement.z);
        }
        
        if(movement.canvas_pos_x)
            this.players[ id ].canvas_pos_x = movement.canvas_pos_x;
        if(movement.canvas_pos_x)
            this.players[ id ].canvas_pos_y = movement.canvas_pos_y;
    }

    setCanvasStates(){
        this.canvas_state['path'] = 1;
        this.canvas_state['clear'] = 0;
    }

    setupRound(){

        //Setting Up the word for this round
        // console.log('new round', this.dict);
        console.log('new round');
        let new_word_index = Math.floor(Math.random() * this.dict.length);
        this.round.current_word = this.dict[new_word_index];
        console.log(new_word_index, this.dict[new_word_index], this.round.current_word);
        this.dict.splice(new_word_index, 1);

        let guesser_index = Math.floor(Math.random() * this.num_players);
        while(guesser_index == this.round.last_guesser_index){
            guesser_index = Math.floor(Math.random() * this.num_players);
        }

        this.round.last_guesser_index = guesser_index;

        let i = 0;
        for(let key in this.players) {
            if(guesser_index == i++) {
                this.setPlayerState(key, 'guess');
                console.log(key, ' is guessing ', this.players[key].state);
            }
        }
        this.round.round_number++;
    }

    incrementPlayerScore(id: string){
        this.players[ id ].score++;
    }

    clearPlayer(id: string, data: string){
        this.setPlayerState(id, 'clear');
        if(data == 'true'){
            this.players[ id ].strokes_x = [];
            this.players[ id ].strokes_y = [];
            this.players[ id ].strokes_z = [];
        }
    }
}

export class MyRoom extends Room<State> {
    @type("number")
    reconnect_timer = 12;

    onInit (options) {
        console.log("MyRoom created!", options);
        this.setState(new State());
        this.state.dictFromFile("dict.txt");
        this.state.setCanvasStates();
    }

    onJoin (client) {
        console.log("Joining MyRoom");

        //TODO allow for multiple hosts to view game
        if(this.state.hostID == "no host in room"){
            this.state.hostID = client.sessionId;
            console.log(client.sessionId + " is the host");
        }
        if(this.state.hostID != client.sessionId){
            this.state.createPlayer(client.sessionId);
            console.log(client.sessionId + " is a player");
        }
        console.log(client.sessionId + " Joined MyRoom");
    }

    // onLeave(client) {
    //     this.state.removePlayer(client.sessionId);
    //     console.log("client left for good! "+client.sessionId);
    // }

    async onLeave (client, consented: boolean) {
      // flag client as inactive for other users
      this.state.players[client.sessionId].connected = false;

      try {
        if (consented) {
            throw new Error("consented leave");
        }

        // allow disconnected client to rejoin into this room until reconnect_timer seconds
        await this.allowReconnection(client, this.reconnect_timer);

        // client returned! let's re-activate it.
        this.state.players[client.sessionId].connected = true;
        console.log("client reconnected! "+client.sessionId);

      } catch (e) {

        // reconnect_timer seconds expired. let's remove the client.
        this.state.removePlayer(client.sessionId);
        console.log("client left for good! "+client.sessionId);
      }
    }

    onMessage (client, data) {
        console.log("MyRoom received message from", client.sessionId, ":", data);
        if(data.emoji){
            this.state.setPlayerEmoji(client.sessionId, data);
        } 

        if(data.color){
            this.state.setPlayerColor(client.sessionId, data);
        }

        if(data.device_width){
            this.state.setPlayerDeviceDim(client.sessionId, data);
        }

        if (data.x || data.canvas_pos_x){
            this.state.movePlayer(client.sessionId, data);
        }

        if(data.state){
            this.state.setPlayerState(client.sessionId, data.state);
        }

        if(data.clear){
            this.state.clearPlayer(client.sessionId, data.clear);
        }

        if(data.host_canvas_width){
            this.state.host_canvas_width = data.host_canvas_width;
            this.state.host_canvas_height = data.host_canvas_height;
        }
        
        if(data.round_winner){
            // this.state.scores[data.round_winner]++;
            this.state.incrementPlayerScore(data.round_winner);
        }

        if(data.round_over){
            this.state.setupRound();
        }

        if(data.start){
            this.state.setupRound();
        }
    }

    onError (client, data) {
        console.log("MyRoom error from", client.sessionId, ":", data);
    }

    onDispose () {
        console.log("Dispose MyRoom");
    }

}