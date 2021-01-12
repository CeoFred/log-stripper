#!/usr/bin/env node

const boxen = require("boxen");
const yargs = require("yargs");

const stripper = require("./stripper");

const options = yargs
 .usage("Usage: -d <directory>")
 .option("-d", { alias: "directory", describe: "Directory To Search for javascript/typescript files", type: "string", demandOption: true })
 .option("-com", { alias: "comment", describe: "Comment Instead of removing log", type: "boolean", demandOption: false })

 .argv;


const greeting = `Stripping your javascript files off logs, searching in ${options.d} Directory`;

console.log(options)

const boxenOptions = {
 padding: 1,
 margin: 1,
 borderStyle: "round",
 borderColor: "green",
 backgroundColor: "#555555"
};
const msgBox = boxen( greeting, boxenOptions );

console.log(msgBox);

 stripper.strip(options.d,{commentInstead: options.com ? true : false},function(){
   console.log("Done Clearing log instances");
 })

