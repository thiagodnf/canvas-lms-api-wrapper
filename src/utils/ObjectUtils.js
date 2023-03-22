
export default class ObjectUtils {

    static deleteNullProperties(object) {

        Object.keys(object).forEach(key =>
            object[key] === undefined ? delete object[key] : {}
        );
    }

}
