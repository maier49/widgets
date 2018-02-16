const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

import { Remote } from 'intern/lib/executors/Node';
import * as iconCss from '../../../theme/common/icons.m.css';

const DELAY = 300;

function getPage(remote: Remote) {
	return remote
		.get('http://localhost:9000/_build/common/example/?module=icon')
		.setFindTimeout(5000);
}

registerSuite('Icon', {
	'the icons should be visible'() {
		return getPage(this.remote)
			.findByCssSelector(`.${iconCss.icon}`)
				.getSize()
					.then(({ height, width }) => {
						assert.isAbove(height, 0);
						assert.isAbove(width, 0);
					})
				.end()
			.sleep(DELAY)
			.findByCssSelector(`.${iconCss.alertIcon}`)
				.getSize()
				.then(({ width, height }) => {
					assert.isAbove(height, 0);
					assert.isAbove(width, 0);
				});
	}
});
