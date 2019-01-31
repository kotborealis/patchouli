const {
	name,
	version,
	repository,
	author
} = require('../package.json');

module.exports = `${name} \t v.${version};

* npm: \t\t https://npmjs.org/package/${name}
* github: \t ${repository.url}
* readme: \t ${repository.url.split('.git')[0]}/blob/master/readme.md
* author: \t ${author}`;