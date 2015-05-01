'use strict';

var fs = require('fs');
var cheerio = require('cheerio');

module.exports = {
	// Write new file to index.html as <script>
	writeScript: function (path) {
		var index = fs.readFileSync('app/index.html', 'utf8');
		var $ = cheerio.load(index, {decodeEntities: false});
		var script = $('script').last();
		script.after('\n\t\t<script src="' + path + '"></script>');
		fs.writeFileSync('app/index.html', $.html(), 'utf8');
	}
};
