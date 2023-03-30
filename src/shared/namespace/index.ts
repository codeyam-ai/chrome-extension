import * as format from './format';

/**
 * namespace, or ns, aims to be where _all_ pure js/ts functionality within our
 * application resides.
 *
 * All additions and modifications to this namespace should be TDD'd and embrace
 * the functional paradigm via pure executions and explicit parameterization.
 *
 * @example
 * // Usage
 * import ns from '_shared/namespace'
 * const x = ns.format.dollars(a, b)
 * const y = ns.otherSpace.otherFunction(c, d)
 *
 */
const namespace = {
    format,
};

export default namespace;
