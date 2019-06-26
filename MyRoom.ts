import { Room } from "colyseus";
import { Schema, type, MapSchema, ArraySchema } from "@colyseus/schema";

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
    canvas_pos_x = Math.random() ;
    @type("number")
    canvas_pos_y = Math.random() ;
    
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

    @type("number")
    alpha = Math.floor(Math.random() * 400);
    @type("number")
    beta = Math.floor(Math.random() * 400);
    @type("number")
    gamma = Math.floor(Math.random() * 400);

    @type("number")
    accel_x = Math.floor(Math.random() * 400);
    @type("number")
    accel_y = Math.floor(Math.random() * 400);
    @type("number")
    accel_z = Math.floor(Math.random() * 400);

    @type("string")
    color = '-1';
    @type("string")
    emoji = '-1';
}

export class State extends Schema {

    colorNames: string[] = ['tomato', 'orange',    'gold',      'slateBlue',  'aquamarine' , 'forestgreen', 'hotpink', 'purple'];

    colors: string[] = ['255,99,71', '255,165,0', '255,215,0', '106,90,205', '127,255,212', '34,139,34', '255,105,180 ', '128,0,128'];

    //Not all emojis are included in the list because some icons can imply functionality that isnt there
    emojis: string[] = [
        '😄','😃','😀','😊','☺','😉','😍','😘','😚','😗','😙','😜','😝','😛','😳','😁','😔','😌','😒','😞','😣','😢','😂','😭','😪','😥','😰','😅','😓','😩','😫','😨','😱','😠','😡','😤','😖','😆','😋','😷','😎','😴','😵','😲','😟','😦','😧','😈','👿','😮','😬','😐','😕','😯','😶','😇','😏','😑','👲','👳','👮','👷','💂','👶','👦','👧','👨','👩','👴','👵','👱','👼','👸','😺','😸','😻','😽','😼','🙀','😿','😹','😾','👹','👺','🙈','🙉','🙊','💀','👽','💩','🔥','✨','🌟','💫','💥','💢','💦','💧','💤','💨','👂','👀','👃','👅','👄','👍','👎','👌','👊','✊','✌','👋','✋','👐','👆','👇','👉','👈','🙌','🙏','☝','👏','💪','🚶','🏃','💃','👫','👪','👬','👭','💏','💑','👯','🙆','🙅','💁','🙋','💆','💇','💅','👰','🙎','🙍','🙇','🎩','👑','👒','👟','👞','👡','👠','👢','👕','👔','👚','👗','🎽','👖','👘','👙','💼','👜','👝','👛','👓','🎀','🌂','💄','💛','💙','💜','💚','❤','💔','💗','💓','💕','💖','💞','💘','💌','💋','💍','💎','👤','👥','👣','💭','🐶','🐺','🐱','🐭','🐹','🐰','🐸','🐯','🐨','🐻','🐷','🐽','🐮','🐗','🐵','🐒','🐴','🐑','🐘','🐼','🐧','🐦','🐤','🐥','🐣','🐔','🐍','🐢','🐛','🐝','🐜','🐞','🐌','🐙','🐚','🐠','🐟','🐬','🐳','🐋','🐄','🐏','🐀','🐃','🐅','🐇','🐉','🐎','🐐','🐓','🐕','🐖','🐁','🐂','🐲','🐡','🐊','🐫','🐪','🐆','🐈','🐩','🐾','💐','🌸','🌷','🍀','🌹','🌻','🌺','🍁','🍃','🍂','🌿','🌾','🍄','🌵','🌴','🌲','🌳','🌰','🌱','🌼','🌐','🌞','🌝','🌚','🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘','🌜','🌛','🌙','🌍','🌎','🌏','🌋','🌌','🌠','⭐','☀','⛅','☁','⚡','☔','❄','⛄','🌀','🌁','🌈','🌊','🎍','💝','🎎','🎒','🎓','🎏','🎆','🎇','🎐','🎑','🎃','👻','🎅','🎄','🎁','🎋','🎉','🎊','🎈','🎌','🔮','🎥','📷','📹','📼','💿','📀','💽','💾','💻','📱','☎','📞','📟','📠','📡','📺','📻','🔓','🔒','🔏','🔐','🔑','💡','🔦','🔆','🔅','🔌','🔍','🛁','🛀','🚿','🚽','🔧','🔩','🔨','🚪','🚬','💣','🔫','🔪','💊','💉','💰','🎨','🎬','🎤','🎧','🎼','🎵','🎶','🎹','🎻','🎺','🎷','🎸','👾','🎮','🃏','🎴','🀄','🎲','🎯','🏈','🏀','⚽','⚾','🎾','🎱','🏉','🎳','⛳','🚵','🚴','🏁','🏇','🏆','🎿','🏂','🏊','🏄','🎣','☕','🍵','🍶','🍼','🍺','🍻','🍸','🍹','🍷','🍴','🍕','🍔','🍟','🍗','🍖','🍝','🍛','🍤','🍱','🍣','🍥','🍙','🍘','🍚','🍜','🍲','🍢','🍡','🍳','🍞','🍩','🍮','🍦','🍨','🍧','🎂','🍰','🍪','🍫','🍬','🍭','🍯','🍎','🍏','🍊','🍋','🍒','🍇','🍉','🍓','🍑','🍈','🍌','🍐','🍍','🍠','🍆','🍅','🌽','🌄','🌅','🌃','🗽','🌉','🎠','🎡','⛲','🎢','🚢','⛵','🚤','🚣','⚓','🚀','✈','💺','🚁','🚂','🚊','🚉','🚞','🚆','🚄','🚅','🚈','🚇','🚝','🚋','🚃','🚎','🚌','🚍','🚙','🚘','🚗','🚕','🚖','🚛','🚚','🚨','🚓','🚔','🚒','🚑','🚐','🚲','🚡','🚟','🚠','🚜','💈','🚏','🎰','♨','🗿','🎪','🎭','📍','🈁','🈯','🈳','🈵','🈴','🈲','🉐','🈹','🈺','🈶','🈚','🚻','🚹','🚺','🚼','🚾','🚰','🚮','🅿','♿','🚭','🈷','🈸','🈂','🛂','🛄','🛅','🛃','🉑','㊙','㊗','🆑','🆘','🆔','🚫','🔞','📵','🚯','🚱','🚳','🚷','🚸','⛔','✳','❇','❎','✅','✴','💟','🆚','📳','📴','🅰','🅱','🆎','🅾','💠','➿','♻','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎','🔯','🏧','💹','💲','💱','©','®','™','♠','♥','♣','♦',,'💯','✔','☑','🔘','🔗','➰','🔱'
    ];

    tempDict: string[] = ['Zeph', 'Leya', 'Garryth', 'Sora', 'Rip Caidrow', 'Ata', 'Serena', 'Epep', 'Finley', 'Three Quarters'];
    // var dict = [] //on init make this dictionary out of a comma sepeated file
    // @type({ map: 'number' })
    // scores = new MapSchema<'number'>();

    @type({ map: Player })
    players = new MapSchema<Player>();

    @type("string")
    current_word = 'game not started';

    @type("number")
    last_guesser_index = -1;

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
    }

    removePlayer (id: string) {
        this.colors.push(this.players[ id ].color);
        this.emojis.push(this.players[ id ].emoji);
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
        if(movement.x)
            this.players[ id ].x = movement.x;
        if(movement.y)
            this.players[ id ].y = movement.y;
        if(movement.z)
            this.players[ id ].z = movement.z;
        
        if(movement.canvas_pos_x)
            this.players[ id ].canvas_pos_x = movement.canvas_pos_x;
        if(movement.canvas_pos_x)
            this.players[ id ].canvas_pos_y = movement.canvas_pos_y;
    }

    setCanvasStates(){
        this.canvas_state['path'] = 1;
        this.canvas_state['clear'] = 0;
    }

    //if its the first round, players should be ready to start the game, if not they should just draw
    //so player_state will either be 'ready' or 'draw'
    setupRound(player_state){
        console.log('new round', this.tempDict);
        let new_word_index = Math.floor(Math.random() * this.tempDict.length);
        this.current_word = this.tempDict[new_word_index];
        console.log(new_word_index, this.tempDict[new_word_index], this.current_word);
        this.tempDict.splice(new_word_index, 1);

        //this is a weird work around, take another try if it becomes frustrating in game
        let i = 0;
        let host_index = -1;
        for (let key in this.players) {
            if(this.players[key].state == 'host'){
                host_index = i;
                console.log(key, 'is host');
            }
            // this.setPlayerState(key, player_state);
            this.setPlayerState(key, 'ready');
            // console.log(key);
            i++;
        }

        let guesser_index = Math.floor(Math.random() * i);
        while(guesser_index == host_index || guesser_index == this.last_guesser_index){
            guesser_index = Math.floor(Math.random() * i);
        }
        this.last_guesser_index = guesser_index;
        console.log(guesser_index);

        i = 0;
        for(let key in this.players) {
            if(guesser_index == i++) {
                this.setPlayerState(key, 'guess');
                console.log(key, ' is guessing ', this.players[key].state);
            }
        }
    }

    incrementPlayerScore(id: string){
        this.players[ id ].score++;
    }
}

export class MyRoom extends Room<State> {
    onInit (options) {
        console.log("MyRoom created!", options);
        this.setState(new State());
        this.state.setCanvasStates();
    }

    onJoin (client) {
        console.log("Joining MyRoom");
        this.state.createPlayer(client.sessionId);
        console.log(client.sessionId + " Joined MyRoom");
    }

    onLeave(client) {
        this.state.removePlayer(client.sessionId);
        console.log("client left for good! "+client.sessionId);
    }

    // async onLeave (client, consented: boolean) {
    //   // flag client as inactive for other users
    //   this.state.players[client.sessionId].connected = false;

    //   try {
    //     if (consented) {
    //         throw new Error("consented leave");
    //     }

    //     // allow disconnected client to rejoin into this room until 20 seconds
    //     await this.allowReconnection(client, 10);

    //     // client returned! let's re-activate it.
    //     this.state.players[client.sessionId].connected = true;
    //     console.log("client reconnected! "+client.sessionId);

    //   } catch (e) {

    //     // 52 seconds expired. let's remove the client.
    //     this.state.removePlayer(client.sessionId);
    //     console.log("client left for good! "+client.sessionId);
    //   }
    // }

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

        if(data.host_canvas_width){
            this.state.host_canvas_width = data.host_canvas_width;
            this.state.host_canvas_height = data.host_canvas_height;
        }

        if(data.canvas_state){
            if(data.canvas_state == 'dots') {
                this.state.canvas_state['path'] = 0;
            }else if(data.canvas_state == 'path') {
                this.state.canvas_state['path'] = 1;
            }else if(data.canvas_state == 'clear'){
                this.state.canvas_state['clear'] = 1;
            }
        }

        if(data.start){
            // if(data.start == 'next_round'){
            //     this.state.setupRound('draw');
            // }else{
                this.state.setupRound('ready');
            // }
        }
        if(data.round_winner){
            // this.state.scores[data.round_winner]++;
            this.state.incrementPlayerScore(data.round_winner);
        }
    }

    onError (client, data) {
        console.log("MyRoom error from", client.sessionId, ":", data);
    }

    onDispose () {
        console.log("Dispose MyRoom");
    }

}