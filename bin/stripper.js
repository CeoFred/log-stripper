var fs = require('fs');

        var totalFiles = 0;
        const directorListing = [];

var walk = function (dir, opt ,done) {
    const commentInstead = opt.commentInstead
    fs.readdir(dir, function (error, list) {
        if (error) {
            return done(error);
        }

        var i = 0;

        (function next () {
            var file = list[i++];

            if (!file) {
                return done(null);
            }
            
            file = dir + '/' + file;
            
            fs.stat(file, function (error, stat) {
        
                if (stat && stat.isDirectory()) {
                    walk(file, commentInstead, function (error) {
                        next();
                    });
                } else {
                    // do stuff to file here
                    if(file.includes('.js') || file.includes('.ts') || file.includes('.jsx') || file.includes('.tsx') || file.includes('.vue') ) {
                    totalFiles++;
                    readAndStripFile(file,commentInstead)
                    }
                    next();
                }
            });
        })();
    });
};

function getData(srcPath,commentInstead) { 
fs.readFile(srcPath, 'utf8', function (err, data) {
        if (err) throw err;
        
        const fileContents = String(data);
        const regex = /console\.log\(([^)]+)\);?/igm;
        let formatted = '';
        
             console.log("Using comments instead of white space")

             formatted = fileContents.replace(regex,function(match) {
                    return commentInstead ? `//${match}` : "";
             });
             console.log(commentInstead);
        
        
            fs.writeFile (srcPath, formatted,function(err){
                if(err) console.log('Failed to write')
            });
          
          
        }
    );
}

async function readAndStripFile(path,commentInstead) {
     await getData(path,commentInstead);  
}

module.exports = { strip: walk }