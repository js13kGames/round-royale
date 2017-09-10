"use strict";function _toConsumableArray$1(e){if(Array.isArray(e)){for(var r=0,a=Array(e.length);e.length>r;r++)a[r]=e[r];return a}return Array.from(e)}function _toConsumableArray(e){if(Array.isArray(e)){for(var r=0,a=Array(e.length);e.length>r;r++)a[r]=e[r];return a}return Array.from(e)}var loop=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:30,a=Date.now(),n=setInterval(function(){var r=Date.now();e(r-a),a=r},r);return function(){return clearInterval(n)}},createPlayer=function(e,r,a){return{userId:e,x:r,y:a,vx:0,vy:0,ax:0,ay:0}},createWorld=function(e,r){return{width:e,height:r}},createGame=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.maxUsersCount,a=void 0===r?2:r,n=new Set,t=createWorld(2e3,2e3),o=function(e){n.forEach(function(r){var a=r.player,n=r.pointer;if(n){a.ax=n.x,a.ay=n.y;8>Math.abs(a.ax)?a.ax=0:(a.ax>0&&(a.ax-=8),0>a.ax&&(a.ax+=8)),8>Math.abs(a.ay)?a.ay=0:(a.ay>0&&(a.ay-=8),0>a.ay&&(a.ay+=8)),a.vx+=a.ax*e/1e3,a.vy+=a.ay*e/1e3;var t=Math.sqrt(a.vx*a.vx+a.vy*a.vy);if(t>30){var o=t/30;a.vx/=o,a.vy/=o}a.vx*=.98,a.vy*=.98,a.x+=a.vx*e/100,a.y+=a.vy*e/100}}),n.forEach(function(e){var r=e.player;0>r.x?(r.x=0,r.ax*=-1,r.vx*=-1):r.x>t.width&&(r.x=t.width,r.ax*=-1,r.vx*=-1),0>r.y?(r.y=0,r.ay*=-1,r.vy*=-1):r.y>t.height&&(r.y=t.height,r.ay*=-1,r.vy*=-1)})},u=function(){n.forEach(function(e){var r=[].concat(_toConsumableArray$1(n)).filter(function(r){return r!==e}).map(function(e){return{x:e.player.x,y:e.player.y,id:e.socket.id,username:e.username}}),a={x:e.player.x,y:e.player.y,id:e.socket.id,me:!0};e.socket.emit("s:players:update",{me:a,others:r}),e.socket.emit("s:world:update",t)})};loop(function(e){o(e),u()});return{maxUsersCount:a,addUser:function(e){n.add(e),e.player=createPlayer(e.socket.id,500,500)},removeUser:function(e){n.delete(e)},get usersCount(){return n.size},destroy:function(){clearInterval(interval)}}},createUser=function(e,r){return{socket:e,username:r,game:null,player:null,pointer:null}},users=new Set,games=new Set,userId=0,gameId=0,findOrCreateGame=function(){var e=[].concat(_toConsumableArray(games)).find(function(e){return e.maxUsersCount>e.usersCount});return e||(e=createGame({name:"Game "+gameId++}),games.add(e)),e},index=function(e){console.log("connect: "+e.id);var r=e.handshake.query.username,a=void 0===r?"Guest "+userId++:r;console.log(a);var n=createUser(e,a);users.add(n);var t=findOrCreateGame();n.game=t,t.addUser(n),e.on("disconnect",function(){console.log("disconnect: "+e.id),users.delete(n),n.game.removeUser(n)}),e.on("c:pointer",function(e){n.game&&(n.pointer=e)})};module.exports=index;
