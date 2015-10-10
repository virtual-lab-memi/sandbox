var spawn = require('child_process').spawn,
    fs = require('fs'),
    SANDBOX = '/home/dann/train-me/train-me-sandbox/output-data',
    ERROR_FILE = '/home/dann/train-me/train-me-sandbox/output-data/error',
    OUTPUT = '/home/dann/train-me/train-me-sandbox/output-data/output',
    PROBLEMS_REPO = 'repo';
//TODO: create configuration file for this values
exports.SANDBOX = SANDBOX;
exports.ERROR_FILE = ERROR_FILE;
exports.OUTPUT = OUTPUT,
exports.PROBLEMS_REPO = PROBLEMS_REPO;

var execute = function(data, command, args, callback, done, options) {
    var timeoutId,
        timeout,
        executionTime = new Date(),
        memoryUsage = 300,
        process = spawn('docker', ['start', '--attach=true', 'official-sandbox'],
            {
                cwd: SANDBOX,
                stdio: [
                    //(INPUT ? fs.openSync(INPUT, 'r') : 0),
                    'ignore',
                    (OUTPUT ? fs.openSync(OUTPUT, 'w') : 0),
                    fs.openSync(ERROR_FILE, 'w')
                ]
            });

    //Logger.info('ID: %s - Started process executor...', 'TEST');

    /*if (options) {
        timeoutId = setTimeout(function() {
            timeout = true;
            process.kill();
            Logger.info('ID: %s - Process killed because a timeout', 'TEST');
        }, options.timeout);
        Logger.info('ID: %s - Process timeout set for: %s', 'TEST', options.timeout);
    }*/

    process.on('close', function(code, signal) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        executionTime = Math.abs(new Date() - executionTime);
        var result = {
            time: executionTime,
            memory: memoryUsage
        };
        console.log(result);
        console.log(code);
        //Logger.debug('ID: %s - Process time: %s', 'TEST', executionTime);
        //Logger.info('ID: %s - Process executor finished with code: %s', 'TEST', code);
        //callback(data, code, done, timeout);
    });
}


execute();