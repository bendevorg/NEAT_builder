import Gameover from './components/Shared/Gameover.vue';
import Navmenu from './components/Shared/Navmenu.vue';
import Gamebox from './components/game/Gamebox.vue';
import Leaderboard from './components/leaderboard/Leaderboard.vue';

export const routes = [
    {path: '/', name: 'Default', components:{
        'menu-top': Navmenu,
        default: Gamebox,
    }},
    {path: '/gameover', name: 'Gameover', components:{
        default: Gameover,
        'menu-top': Navmenu,
        'right-compo': Leaderboard
    }},

// { path: '/redirect-me', redirect: { name: 'home' } },
// { path: '*', redirect: '/signin' }
];
