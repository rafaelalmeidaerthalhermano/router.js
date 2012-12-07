/* @class: App
 *
 * @author: Rafael Almeida Erthal Hermano
 * @description: Um aplicativo
 * 
 * @param callback: função a ser executada
 */
var App = new Class(function (callback) {

    if (!callback || callback.constructor !== Function) {
        throw 'Callback must be a function';
    }

    var uses = [],
        routes = [],
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

    /* @function require
     *
     * @author: Rafael Almeida Erthal Hermano
     * @description: adiciona scripts
     * 
     * @param urls: vetor com os scripts a serem adicionados
     * @param callback: função a ser chamada após carregamento dos scripts
     */
    this.require = function (urls, callback) {

        if (!urls || urls.constructor !== Array) {
            throw 'Url must be a string';
        }

        if (!callback || callback.constructor !== Function) {
            throw 'Callback must be a function';
        }

        var i,
            handled = 0,
            that = this;

        function load (url) {
            var request = new XMLHttpRequest();

            request.open('GET', urls[i], false);

            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    var script = document.createElement("script");

                    handled += 1;

                    script.appendChild(document.createTextNode(request.responseText));
                    document.head.appendChild(script);

                    if (handled >= urls.length) {
                        callback.apply(that);
                    }
                }
            };

            req.send(null);
        }

        for (i = 0; i < urls.length; i = i + 1) {

            if (urls[i].constructor !== String) {
                throw 'Url must be a string';
            }

            load(urls[i])
        }
    };

    /* @function use
     *
     * @author: Rafael Almeida Erthal Hermano
     * @description: adiciona função ao conjunto de funções que montam contexto da action
     * 
     * @param callback: função a ser chamada para montar o contexto
     */
    this.use = function (callback) {

        if (!callback || callback.constructor !== Function) {
            throw 'Callback must be a function';
        }

        uses.push(callback);
    };

    /* @function route
     *
     * @author: Rafael Almeida Erthal Hermano
     * @description: adiciona rota ao aplicativo
     * 
     * @param url: rota
     * @param callback: função a ser chamada quando app entrar na rota
     */
    this.route = function (url, callback) {

        if (!url || url.constructor !== String) {
            throw 'Url must be a string';
        }

        if (!callback || callback.constructor !== Function) {
            throw 'Callback must be a function';
        }

        routes.push({url : url, callback : callback});
    };

    /* @function run
     *
     * @author: Rafael Almeida Erthal Hermano
     * @description: executa função que bate com a rota
     * 
     * @param url: rota
     */
    this.run = function (url) {

        if (!url || url.constructor !== String) {
            throw 'Url must be a string';
        }

        var i,
            j,
            context = {};

        for (i = 0; i < routes.length; i = i + 1) {
            if (match(routes[i].url, url)) {

                for (j = 0; j < uses.length; j = j + 1) {
                    uses[j].apply(this, [routes[i].url, url, context]);
                }

                routes[i].callback.apply(context);
            }
        }
    };

    callback.apply(this);
});
