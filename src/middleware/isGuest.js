import store from '@/store';

export default async function isGuest({ next, router }) {
    if (store.getters['auth/isAuthenticated']) {
        return router.push({ name: 'home' });
    }

    return next();
}
