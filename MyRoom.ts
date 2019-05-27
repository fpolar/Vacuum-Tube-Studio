import { Room } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema";

var colorNames = ['tomato', 'orange',    'gold',      'slateBlue',  'aquamarine' , 'forestgreen', 'hotpink', 'purple']
var colors = ['255,99,71', '255,165,0', '255,215,0', '106,90,205', '127,255,212', '34,139,34', '255,105,180 ', '128,0,128'];

//Not all emojis are included in the list because some icons can imply functionality that isnt there
var emojis = [
    '😄','😃','😀','😊','☺','😉','😍','😘','😚','😗','😙','😜','😝','😛','😳','😁','😔','😌','😒','😞','😣','😢','😂','😭','😪','😥','😰','😅','😓','😩','😫','😨','😱','😠','😡','😤','😖','😆','😋','😷','😎','😴','😵','😲','😟','😦','😧','😈','👿','😮','😬','😐','😕','😯','😶','😇','😏','😑','👲','👳','👮','👷','💂','👶','👦','👧','👨','👩','👴','👵','👱','👼','👸','😺','😸','😻','😽','😼','🙀','😿','😹','😾','👹','👺','🙈','🙉','🙊','💀','👽','💩','🔥','✨','🌟','💫','💥','💢','💦','💧','💤','💨','👂','👀','👃','👅','👄','👍','👎','👌','👊','✊','✌','👋','✋','👐','👆','👇','👉','👈','🙌','🙏','☝','👏','💪','🚶','🏃','💃','👫','👪','👬','👭','💏','💑','👯','🙆','🙅','💁','🙋','💆','💇','💅','👰','🙎','🙍','🙇','🎩','👑','👒','👟','👞','👡','👠','👢','👕','👔','👚','👗','🎽','👖','👘','👙','💼','👜','👝','👛','👓','🎀','🌂','💄','💛','💙','💜','💚','❤','💔','💗','💓','💕','💖','💞','💘','💌','💋','💍','💎','👤','👥','👣','💭','🐶','🐺','🐱','🐭','🐹','🐰','🐸','🐯','🐨','🐻','🐷','🐽','🐮','🐗','🐵','🐒','🐴','🐑','🐘','🐼','🐧','🐦','🐤','🐥','🐣','🐔','🐍','🐢','🐛','🐝','🐜','🐞','🐌','🐙','🐚','🐠','🐟','🐬','🐳','🐋','🐄','🐏','🐀','🐃','🐅','🐇','🐉','🐎','🐐','🐓','🐕','🐖','🐁','🐂','🐲','🐡','🐊','🐫','🐪','🐆','🐈','🐩','🐾','💐','🌸','🌷','🍀','🌹','🌻','🌺','🍁','🍃','🍂','🌿','🌾','🍄','🌵','🌴','🌲','🌳','🌰','🌱','🌼','🌐','🌞','🌝','🌚','🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘','🌜','🌛','🌙','🌍','🌎','🌏','🌋','🌌','🌠','⭐','☀','⛅','☁','⚡','☔','❄','⛄','🌀','🌁','🌈','🌊','🎍','💝','🎎','🎒','🎓','🎏','🎆','🎇','🎐','🎑','🎃','👻','🎅','🎄','🎁','🎋','🎉','🎊','🎈','🎌','🔮','🎥','📷','📹','📼','💿','📀','💽','💾','💻','📱','☎','📞','📟','📠','📡','📺','📻','🔓','🔒','🔏','🔐','🔑','💡','🔦','🔆','🔅','🔌','🔍','🛁','🛀','🚿','🚽','🔧','🔩','🔨','🚪','🚬','💣','🔫','🔪','💊','💉','💰','🎨','🎬','🎤','🎧','🎼','🎵','🎶','🎹','🎻','🎺','🎷','🎸','👾','🎮','🃏','🎴','🀄','🎲','🎯','🏈','🏀','⚽','⚾','🎾','🎱','🏉','🎳','⛳','🚵','🚴','🏁','🏇','🏆','🎿','🏂','🏊','🏄','🎣','☕','🍵','🍶','🍼','🍺','🍻','🍸','🍹','🍷','🍴','🍕','🍔','🍟','🍗','🍖','🍝','🍛','🍤','🍱','🍣','🍥','🍙','🍘','🍚','🍜','🍲','🍢','🍡','🍳','🍞','🍩','🍮','🍦','🍨','🍧','🎂','🍰','🍪','🍫','🍬','🍭','🍯','🍎','🍏','🍊','🍋','🍒','🍇','🍉','🍓','🍑','🍈','🍌','🍐','🍍','🍠','🍆','🍅','🌽','🌄','🌅','🌃','🗽','🌉','🎠','🎡','⛲','🎢','🚢','⛵','🚤','🚣','⚓','🚀','✈','💺','🚁','🚂','🚊','🚉','🚞','🚆','🚄','🚅','🚈','🚇','🚝','🚋','🚃','🚎','🚌','🚍','🚙','🚘','🚗','🚕','🚖','🚛','🚚','🚨','🚓','🚔','🚒','🚑','🚐','🚲','🚡','🚟','🚠','🚜','💈','🚏','🎰','♨','🗿','🎪','🎭','📍','🈁','🈯','🈳','🈵','🈴','🈲','🉐','🈹','🈺','🈶','🈚','🚻','🚹','🚺','🚼','🚾','🚰','🚮','🅿','♿','🚭','🈷','🈸','🈂','🛂','🛄','🛅','🛃','🉑','㊙','㊗','🆑','🆘','🆔','🚫','🔞','📵','🚯','🚱','🚳','🚷','🚸','⛔','✳','❇','❎','✅','✴','💟','🆚','📳','📴','🅰','🅱','🆎','🅾','💠','➿','♻','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎','🔯','🏧','💹','💲','💱','©','®','™','♠','♥','♣','♦',,'💯','✔','☑','🔘','🔗','➰','🔱'
];

export class Player extends Schema {
    @type("string")
    sessionId = "";
    @type("number")
    vote = 0;
    @type("number")
    score = 0;
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
    @type("string")
    color = colors[Math.floor(Math.random() * colors.length)];
    @type("string")
    emoji = emojis[Math.floor(Math.random() * emojis.length)];
}

export class State extends Schema {
    @type({ map: Player })
    players = new MapSchema<Player>();

    //possible values are path, dots, stop, and clear

    @type({ map: 'number' })
    canvas_state = new MapSchema<'number'>();

    createPlayer (id: string) {
        this.players[ id ] = new Player();
        this.players[ id ].sessionId = id;
        var emoji_index = emojis.indexOf(this.players[ id ].emoji);
        var color_index = colors.indexOf(this.players[ id ].color);
        if (emoji_index > -1) {
            emojis.splice(emoji_index, 1);
        }
        if (color_index > -1) {
            colors.splice(color_index, 1);
        }
    }

    removePlayer (id: string) {
        colors.push(this.players[ id ].color);
        emojis.push(this.players[ id ].emoji);
        delete this.players[ id ];
    }

    setPlayerEmoji(id: string, data: any){
        if(data.emoji)
            this.players[ id ].emoji = data.emoji;
    }

    setPlayerColor(id: string, data: any){
        if(data.color)
            this.players[ id ].color = data.color;
    }

    movePlayer (id: string, movement: any) {
        if(movement.x)
            this.players[ id ].x = movement.x
        if(movement.y)
            this.players[ id ].y = movement.y
        if(movement.z)
            this.players[ id ].z = movement.z
        /*
        the directions might not be necessary since the calculations are 
        done on the client side and I may introduce devicemovement(acceleration)
        */
        if(movement.alpha)
            this.players[ id ].alpha = movement.alpha;
        if(movement.beta)
            this.players[ id ].beta = movement.beta;
        if(movement.gamma)
            this.players[ id ].gamma = movement.gamma;
    }

    setCanvasStates(){
        this.canvas_state['path'] = 1;
        this.canvas_state['clear'] = 0;
        this.canvas_state['stop'] = 0;
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

    onLeave (client) {
        this.state.removePlayer(client.sessionId);
    }

    onMessage (client, data) {
        console.log("MyRoom received message from", client.sessionId, ":", data);
        if(data.emoji){
            this.state.setPlayerEmoji(client.sessionId, data);
        } else if(data.color){
            this.state.setPlayerColor(client.sessionId, data);
        }else{
            this.state.movePlayer(client.sessionId, data);
        }

        if(data.canvas_state){
            if(data.canvas_state == 'dots') {
                this.state.canvas_state['path'] = 0;
            }else{
                this.state.canvas_state[data.canvas_state] = 1;
                console.log("MyRoom canvas state change", data.canvas_state, ":", this.state.canvas_state[data.canvas_state]);
            }

            this.state.canvas_state['clear'] = 0;
            this.state.canvas_state['stop'] = 0;
        }
    }

    onError (client, data) {
        console.log("MyRoom error from", client.sessionId, ":", data);
    }

    onDispose () {
        console.log("Dispose MyRoom");
    }

}