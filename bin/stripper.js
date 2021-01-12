var fs = require('fs');

var walkPath = './main';
        var totalFiles = 0;
        const directorListing = [];

var walk = function (dir, done) {
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
                    walk(file, function (error) {
                        next();
                    });
                } else {
                    // do stuff to file here
                    if(file.includes('.js') || file.includes('.ts') || file.includes('.jsx') || file.includes('.tsx') || file.includes('.vue') ) {
                    totalFiles++;
                    readAndStripFile(file)
                    }
                    next();
                }
            });
        })();
    });
};

function getData(srcPath) { 
fs.readFile(srcPath, 'utf8', function (err, data) {
        if (err) throw err;
            // console.log(`reading ${srcPath}`);
        
        const fileContents = String(data);
        const regex = /console\.log\(([^)]+)\);?/igm
        const formatted = fileContents.replace(regex,"");
        
          fs.writeFile (srcPath, formatted, function(err) {
        if (err) throw err;
            console.log(`stripped ${srcPath}`);
        }
    );
        }
    );
}

async function readAndStripFile(path) {
     await getData(path);  
}

module.exports = { strip: walk }

walk(walkPath, function(error) {
    if (error) {
        throw error;
    } else {
            console.log(totalFiles)
    }
});