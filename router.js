/**
* Copyright (C) 2013 Rafael Almeida Erthal Hermano
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful, but
* WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
* General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see http://www.gnu.org/licenses/.
*/

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
        match,
        execute,
        that = this;

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

    /* @function execute
     *
     * @author: Rafael Almeida Erthal Hermano
     * @description: Executa uma rota em um contexto
     * 
     * @param route: tupla mascara callback
     * @param url: url
     */
    execute = function (route, url) {
        route.callback.apply(new that.Context(route.url, url));
    };

    /* @class Context
     *
     * @author: Rafael Almeida Erthal Hermano
     * @description: contexto em que os callback são executados
     */
    this.Context = new Class(function (mask, url) {
        /* @function mask
         *
         * @author: Rafael Almeida Erthal Hermano
         * @description: retorna a mascara da url
         *
         * @return mascara
         */
        this.mask = function () {
            return mask;
        };

        /* @function url
         *
         * @author: Rafael Almeida Erthal Hermano
         * @description: retorna a url atual
         *
         * @return url
         */
        this.url = function () {
            return url;
        }
    });

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

        if (match(url, document.location.pathname)) {
            execute({url : url, callback : callback}, document.location.pathname);
        }
    };

    /* Criando um listenner para as ancoras da pagina */
    document.addEventListener('click', function (evt) {
        var href = (evt && evt.target && evt.target.getAttribute) ? evt.target.getAttribute('href') : null,
            i;
        if (href) {
            for (i in routes) {
                if (match(routes[i].url, href)) {
                    evt.preventDefault();
                    execute(routes[i], href);
                    if (history && history.pushState) {
                        history.pushState(null, document.title, href);
                    }
                }
            }
        }
    });

    callback.apply(this);
});
