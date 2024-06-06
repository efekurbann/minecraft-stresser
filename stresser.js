const mineflayer = require('mineflayer') // load mineflayer library
const readline = require('readline-sync') // load mineflayer library

const host = process.argv[2] || readline.question('What IP should bots connect to? ');
const port = process.argv[3] || readline.question('What Port should bots connect to? ');
const count = process.argv[4] || readline.question('How many bots should we connect? ');
const joinDelay = readline.question('How often should bots join? (in milliseconds) ');

var command = null;

if (readline.keyInYN('Do you want bots to run any commands?')) {
  command = readline.question('What\'s the command you want to run? ');
}

var commandDelay = 0;

if (command != null) {
  commandDelay = readline.question('When should we execute the commands? (in milliseconds) ');

  if (!command.startsWith("/"))
    command = "/" + command;
}  

let i = 0;
var interval = setInterval(() => {
  if (i >= count) {
    clearInterval(interval)
    return
  }
  i++;

  initBot();
}, joinDelay);

function initBot() {
  const options = {
    host: host,
    port: port,
    username: createName(8),
    auth: 'offline'
  }

  const bot = mineflayer.createBot(options)

  bot.once('spawn', () => {
    var date = new Date()
    console.log(`[${date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()}] ${bot.username} joined the game.`)

    if (command != null)
      setInterval(() => bot.chat(command), commandDelay)
  })

  bot.on('kicked', console.log)
  bot.on('error', console.log)
}