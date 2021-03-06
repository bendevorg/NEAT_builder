import Content from './components/Shared/Content.vue';
import Game from './components/game/Game.vue';

const routes = [
  {
    path: '/',
    name: 'Default',
    components: {
      // 'menu-top': Navmenu,
      default: Content
      // 'foot-compo': Footer
    }
  },
  {
    path: '/games/:gameName',
    name: 'Game',
    components: {
      default: Game
    }
  }
];

export default routes;
