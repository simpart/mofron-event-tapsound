const Tap = require('mofron-event-tap');
const comutl = mofron.util.common;

/**
 * @file mofron-event-tapsound/index.js
 * @brief tap sound event for mofron
 * @license MIT
 */
module.exports = class extends Tap {
    /**
     * initialize event
     * 
     * @param (mixed) short-form parameter
     *                key-value: event config
     * @short
     * @type private
     */
    constructor (prm) {
        try {
            super();
            this.modname('TapSound');
            this.shortForm('src');

            this.confmng().add('src', { type:'object' });
            

	    let clk_evt = (c1,c2,c3) => {
                try {
                    c3.src().play();
		} catch (e) {
                    console.error(e.stack);
                    throw e;
		}
	    };
	    this.listener(clk_evt,this);

	    if (undefined !== prm) {
                this.config(prm);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    src (prm) {
        try {
            if (undefined === prm) {
                return this.confmng('src');
	    }
	    this.confmng('src', new Audio(prm));
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
}
/* end of file */
