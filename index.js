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
            
            this.confmng().add('src', { type:'string' });
            this.confmng().add('audio', { type:'object' });
            this.confmng().add('media', { type:'boolean', init:true });

	    let clk_evt = (c1,c2,c3) => {
                try {
                    c3.audio().play();
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
            this.confmng('src', prm);
            if ((true === this.media()) && (window.Media)) {
                this.confmng('audio', new Media(prm));
            } else {
	        this.confmng('audio', new Audio(prm));
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    audio (prm) {
        try {
	    if ('string' === typeof prm) {
	        this.src(prm);
                return;
	    }
            return this.confmng('audio', prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    volume (prm) {
        try {
            if ((true === this.media()) && (window.Media)) {
                this.audio().setVolume(prm);
            } else {
                this.audio().volume(prm);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    media (prm) {
        try {
            return this.confmng("media", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
