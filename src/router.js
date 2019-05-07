import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Hangar from '@/views/Hangar.vue';
import FlightDeck from '@/views/FlightDeck.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/flightdeck/:name?',
            name: 'flightdeck',
            component: FlightDeck,
            props: route => ({name: route.params.name})
        },
        {
            path: '/hangar',
            name: 'hangar',
            component: Hangar,
        },
    ],
    mode: 'history',
});