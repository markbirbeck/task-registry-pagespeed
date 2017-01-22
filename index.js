'use strict';

/**
 * The Undertaker class.
 * @external Undertaker
 * @see https://www.npmjs.com/package/undertaker
 */

/** The Undertaker Registry class. */
const UndertakerRegistry = require('undertaker-registry');

/**
 * Class representing a task registry.
 * @extends UndertakerRegistry
 */
class TasksRegistry extends UndertakerRegistry {

  /**
   * Create a task registry.
   * @param {string} namespace - An optional namespace to prefix task names
   * with.
   * @param {object} opts - A set of options to pass to each registered task.
   */
  constructor(namespace, opts) {
    super();

    /**
     * These are the defaults in the Web Starter Kit:
     */

    let defaults = {
      url: 'example.com',
      strategy: 'mobile',
      // By default we use the PageSpeed Insights free (no API key) tier.
      // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
      // key: 'YOUR_API_KEY'
    };

    /**
     * The namespace is optional:
     */

    if (!opts) {
      opts = namespace || {};
      namespace = '';
    }

    /**
     * If the namespace was passed in as an option then it takes priority:
     */

    opts.namespace = opts.namespace || namespace;

    /**
     * If there's a namespace for this registry then create a prefix from it:
     */

    opts.prefix = (opts.namespace !== '') ? opts.namespace + ':' : '';

    /**
     * Make the options available to all tasks in this registry:
     */

    this.opts = Object.assign({}, defaults, opts);
  }

  /**
   * Initialise the task registry.
   * @param {external:Undertaker} taker - The Undertaker object that this
   * registry is being attached to.
   */
  init(taker) {
    const pagespeed = require('psi').output;

    /**
     * Get the original options:
     */

    let opts = this.opts;

    /**
     * Register the pagespeed task with the provided prefix:
     */

    taker.task(opts.prefix + 'pagespeed', (cb) =>
      pagespeed(opts.url, {
        strategy: opts.strategy,
      }, cb)
    );

    /**
     * Set a default task. This will be either the namespace or 'default':
     *
     */

    taker.task(
      opts.namespace || 'default',
      taker.series(opts.prefix + 'pagespeed')
    );
  }
}

module.exports = TasksRegistry;
