# Grunt Audiosprite

grunt-audiosprite is a [Grunt](http://gruntjs.com) plugin which wraps our [audiosprite](http://github.com/CloudKidStudio/audiosprite) Node utility.

## Installation

To install, all this from your project folder:

```shell
npm install CloudKidStudio/grunt-audiosprite
```

## Usage

```shell
grunt.initConfig({
	audiosprite : {
		all : {
			output: "assets/audio/audio",
			files: "audio/*.wav",
			export: 'm4a,ogg,mp3',
			bitrate: 48,
			silence: 5
		}
	}
});
```