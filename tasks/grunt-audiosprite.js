module.exports = function(grunt)
{
	var _ = grunt.util._,
		log = grunt.log,
		verbose = grunt.verbose,
		fs = require('fs'),
		f = require('util').format;

	grunt.registerMultiTask(
		'audiosprite',
		'Combine the uncompressed audio into an audiosprite',
		function() 
		{
			var data = this.data,
				output = data.output || "output",
				ogg_to_oga = data.ogg_to_oga || true,
				cwd = data.cwd || process.cwd(),
				callback = _.isFunction(data.callback) ? data.callback : function() {},
				files = data.files,
				cmd = [__dirname + '/../node_modules/.bin/audiosprite'];
				done = this.async();

			// These are the acceptable audiosprite arguemnts
			var validKeys = [
				'output',
				'priority',
				'export',
				'log',
				'autoplay',
				'silence',
				'samplerate',
				'channels',
				'rawparts',
				'bitrate'
			];

			// These are the valid other options for this task
			var otherKeys = [
				'cwd',
				'callback',
				'files',
				'ogg_to_oga'
			];

			// Convert the data input into arguments for audiosprite
			_.each(data, function (value, key, list) {
				if (_.contains(validKeys, key)) {
					cmd.push('--'+key, value);
				} else if (_.contains(otherKeys, key)) {
					// Ignore these	
				} else {
					log.error("The audiosprite task doesn't accept '" + key + "' argument");
				}
			});

			// Check for files, which is required!
			if (!files)
			{
				log.error("Source files audio must be defined for the audiosprite");
				return done(false);
			}

			// Convert files into an array
			files = _.isArray(files) ? files.join(' ') : files;

			var cp = require('child_process');
			child = cp.exec(
				cmd.join(' ') + ' ' + files, 
				{ cwd: cwd }, 
				callback
			);

			child.stdout.on('data', function (d) { log.write(d); });
			child.stderr.on('data', function (d) { log.error(d); });

			// Catches failing to execute the command at all (eg spawn ENOENT),
			// since in that case an 'exit' event will not be emitted.
			child.on('error', function (err) {
				log.error(f('Failed with: %s', err));
				done(false);
			});

			child.on('exit', function (code) {
				if (code) {
					log.error(f('Exited with code: %d.', code));
					return done(false);
				}
				verbose.ok(f('Exited with code: %d.', code));				
				
				if (ogg_to_oga || data.cwd)
				{
					var json = grunt.file.read(cwd + '/' + output + '.json');
					if (ogg_to_oga) 
					{
						fs.rename(cwd + '/' + output +'.ogg', cwd + '/' + output +'.oga');
						json = json.replace(/\.ogg/g, '.oga');
					}
					if (data.cwd) json = json.replace(/\.ogg/g, '.oga');
					grunt.file.write(cwd + '/' + output + '.json', json);
				}
				done();
			});
		}
	);
};