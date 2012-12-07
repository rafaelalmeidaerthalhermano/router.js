/* @class: Router
 *
 * @author: Rafael Almeida Erthal Hermano
 * @description: Roteador
 * 
 * @param callback: função a ser executada
 */
var Router = new Class(function (callback) {

    if (!callback || callback.constructor !== Function) {
        throw 'Callback must be a function';
    }

    var routes = [],
        match;

    /* @function match
     *
     * @author: Rafael Almeida Erthal Hermano
     * @description: Verifica se a url passada bate com a marcara
     * 
     * @param mask: mascara da url
     * @param url: url a ser checada
     */
    match = function (mask, url) {

        if (!mask || mask.constructor !== String) {
            throw 'Mask must be a string';
        }

        if (!url || url.constructor !== String) {
            throw 'Url must be a string';
        }

        var mask_slices = mask.split('/'),
            url_slices = url.split('/'),
            i;

        if (mask_slices.length !== url_slices.length) {
            return false;
        }

        for (i = 0; i < mask_slices.length; i = i + 1) {
            if (
                mask_slices[i] !== url_slices[i]     &&
                mask_slices[i] !== '*'               &&
                mask_slices[i].substring(0,1) !== ':'
            ) {
                return false;
            }
        }

        return true;
    };

    /* @function track
     *
     * @author: Rafael Almeida Erthal Hermano
     * @description: adiciona rota ao aplicativo
     * 
     * @param url: rota
     * @param callback: função a ser chamada quando app entrar na rota
     */
    this.track = function (url, callback) {

        if (!url || url.constructor !== String) {
            throw 'Url must be a string';
        }

        if (!callback || callback.constructor !== Function) {
            throw 'Callback must be a function';
        }

        routes.push({url : url, callback : callback});
    };

    /* @function dispatch
     *
     * @author: Rafael Almeida Erthal Hermano
     * @description: executa função que bate com a rota
     * 
     * @param url: rota
     */
    this.dispatch = function (url) {

        if (!url || url.constructor !== String) {
            throw 'Url must be a string';
        }

        var i;

        for (i = 0; i < routes.length; i = i + 1) {
            if (match(routes[i].url, url)) {
                routes[i].callback.apply({});
            }
        }
    };

    callback.apply(this);
});