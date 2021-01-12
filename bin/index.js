#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");

const stripper = require("./stripper");

const options = yargs
 .usage("Usage: -d <directory>")
 .option("-d", { alias: "directory", describe: "Directory To Search for javascript/typescript files", type: "string", demandOption: true })
 .argv;

const greeting = `Stripping your javascript files off logs, searching in ${options.name} Directory`;


const boxenOptions = {
 padding: 1,
 margin: 1,
 borderStyle: "round",
 borderColor: "green",
 backgroundColor: "#555555"
};
const msgBox = boxen( greeting, boxenOptions );

console.log(msgBox);

 stripper.strip(options.d,function(){
   console.log("Done Clearing log instances");
 })

