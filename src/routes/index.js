import routes       from './routes';
import Router       from 'vue-router';
import Meta         from 'vue-meta';
import Vue          from "vue";
import firebase     from 'firebase';
import middlewares  from '@/middleware/index';

Vue.use(Router);
Vue.use(Meta);

const router = createRouter();


router.beforeEach(async (to, from, next) => {
    //execute middlewares
    await firebase.getCurrentUser()

    return await callMidlewares(to, from, next);
});


export default router

/**
 * Create a new router instance.
 *
 * @return {Router}
 */
function createRouter() {
    return new Router({
        mode: 'history',
        routes
    });
}

/**
 * Call all middlewares
 *
 * @param to
 * @param from
 * @param next
 * @returns {Promise<*>}
 */
async function callMidlewares(to, from, next) {
    let globalMiddlewares = [];
    let layout = to.meta.layout;

    if (to.meta.middleware) {
        const routeMiddlewares = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

        var context = {
            from,
            next,
            router,
            to
        };

        globalMiddlewares = [...globalMiddlewares, ...routeMiddlewares];

        var nextMiddleware = nextFactory(context, globalMiddlewares, 1);

        let result = await middlewares[globalMiddlewares[0]]({...context, next: nextMiddleware});
        let layout = to.meta.layout;

        if(result){
            layout =  result.meta.layout
        }

        router.app.$children[0].setLayout(layout || '');

        return result;
    }

    router.app.$children[0].setLayout(layout || '');
    return next();
}

/**
 * Execute middlewares subsequently
 *
 * @param context
 * @param middleware
 * @param index
 */
function nextFactory(context, middleware, index) {

    var subsequentMiddleware = middleware[index];
    // If no subsequent Middleware exists,
    // the default `next()` callback is returned.
    if (!subsequentMiddleware) return context.next;

    return async (...parameters) => {
        // Run the default Vue Router `next()` callback first.
        context.next(...parameters);
        // Then run the subsequent Middleware with a new
        // `nextMiddleware()` callback.
        var nextMiddleware = nextFactory(context, middleware, index + 1);

        await middlewares[subsequentMiddleware]({...context, next: nextMiddleware});
    };
}
