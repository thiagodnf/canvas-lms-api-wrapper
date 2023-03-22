
/**
 * Utility class for Objects
 * @author Thiago Ferreira
 */
export default class ObjectUtils {

    static length(object) {
        return Object.keys(object).length;
    }

    static has(object, properties) {

        if (!Array.isArray(properties)) {
            properties = [properties];
        }

        for (const property of properties) {

            if (!object.hasOwnProperty(property)) {
                return false;
            }
        }

        return true;
    }

    static isObject(value) {
        return value && typeof value === 'object' && value.constructor === Object;
    }

    static deleteNullProperties(object) {

        Object.keys(object).forEach(key =>
            object[key] === undefined ? delete object[key] : {}
        );
    }
}
