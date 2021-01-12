#!/usr/bin/env node

const boxen = require("boxen");
const yargs = require("yargs");

const stripper = require("./stripper");
const logger = require("./logger");

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

logger.info(msgBox);
// console.log(msgBox);

 stripper.strip(options.d,function(){
   logger.info("Done Clearing log instances");
  //  console.log("Done Clearing log instances");
 })

