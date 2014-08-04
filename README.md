# Grunt Audiosprite

An audio sprite is a single audio track with multiple audio files contained in it. For HTML5 games that require the use of `<audio>` on mobile browsers, audio sprites are a crude but reliable playback solution. **grunt-audiosprite** is a [Grunt](http://gruntjs.com) plugin which wraps our [audiosprite](http://github.com/CloudKidStudio/audiosprite) Node JS utility. For more information about audio sprites, visit the [plugin page](http://github.com/CloudKidStudio/audiosprite).

## Installation

To install, all this from your project folder:

```shell
npm install grunt-audiosprite
```

## Usage

Audiosprite is a multi-task which can be added to the Grunt configuration. See below for a basic example.

```js
grunt.initConfig({
	audiosprite : {
		all : {
			// The path to save the output files
			output: "assets/audio/audio",
			
			// The uncompressed audio input
			files: "audio/*.wav",
			
			// The export filetypes
			export: 'm4a,ogg,mp3',
			
			// The export bitrate
			bitrate: 48,
			
			// Include silence sprite of 5 seconds
			silence: 5
		}
	}
});
```

## Options

Here are all the grunt-audiosprite options. In most cases the default values are set by the audiosprite plugin itself and not this Grunt plugin.

Option | Type | Description | Default
---|---|---|---
**files** | _array,string_ | The list of files, supports wildcard (*) selection | (required)
**cwd** | _string_ | The current working directory to export from | process.cwd()
**callback** | _function_ | Callback function when the task is compelte | null
**ogg_to_oga** | _boolean_ | Boolean to convert .ogg filetype extension to .oga. Note: ogg must be added to **export** | true
**output** | _string_ | The base output path, without the extension, the sprite data and audio files will be nameed with this base path. | "output"
**export** | _string, array_ | Limit exported file types. Comma separated extension list. | ""
**priority** | _string_ | The JSON list of audio aliases by priority. | ""
**log** | _string_ | Log level (debug, info, notice, warning, error). | "info"
**loop** | _string_ | Comma separated list of aliases to allow looping. | ""
**autoplay** | _string_ | Autoplay sprite name | null
**silence** | _number_ | Add special "silence" track with specified duration. | 0
**samplerate** | _number_ | Sample rate. | 44100
**channels** | _number_ | Number of channels (1=mono, 2=stereo). | 1 
**rawparts** | _string_ | Include raw slices(for Web Audio API) in specified formats. | ""
**bitrate** | _number_ | The bitrate of the output file. e.g. 128 for 128 kbs. Note - works for m4a, ogg, and mp3 files. | 128


## License

Copyright (c) 2014 [CloudKid](http://github.com/cloudkidstudio)

Released under the MIT License.
