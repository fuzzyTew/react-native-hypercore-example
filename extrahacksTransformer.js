var child_process = require('child_process')
var transformer = require('metro-bundler/src/transformer')

module.exports.transform = function(opts) {

	// brfs any synchronous file reads
	if (opts.src.indexOf('readFileSync') !== -1) {
		console.log('brfs ' + opts.filename)
		opts.src = child_process.execFileSync('node_modules/brfs/bin/cmd.js', [opts.filename])
	}

	// expo needs all require statements to take a single literal string
	opts.src = opts.src.toString().replace(/require\('([^']*)'\s*\+\s*'([^']*)'\)/g, "require('$1$2')")

	return transformer.transform(opts)
}
