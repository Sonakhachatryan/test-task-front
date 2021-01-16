/* Auth */
const Login = () => import('@/components/Auth/Login').then(m => m.default || m);
const Register = () => import('@/components/Auth/Register').then(m => m.default || m);
const Home = () => import('@/components/Home').then(m => m.default || m);
const NotFound = () => import('@/components/NotFound').then(m => m.default || m);

export default [
    {
        path: '/',
        name: 'home',
        props: true,
        component: Home,
        meta: {
            middleware: ['auth'],
            layout: 'main'
        },
    },
    {
        path: '/login',
        name: 'login',
        props: true,
        component: Login,
        meta: {
            middleware: ['isGuest'],
            layout: 'auth'
        },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        props: true,
        meta: {
            middleware: ['isGuest'],
            layout: 'auth'
        },
    },
    {
        path: '*',
        name: 'not-found',
        component: NotFound,
        meta: {
            layout: 'auth'
        },
    },
]
