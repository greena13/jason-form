// Type definitions for Jason Form
// Project: jason-form

/**
 * Module containing utility functions for converting from JavaScript objects to
 * an array of tuples consistent with the naming and formatting conventions of
 * Ruby on Rails
 */

export namespace FormData {
    /**
     * Converts an arbitrarily deep target object into a flat array of key-value
     * tuples with the key converted to a format that is consistent with the
     * naming and formatting conventions of Ruby on Rails.
     */
    function from(target: Object): Array<[string, any]>;
}

