import Content from './components/Shared/Content.vue';
import Game from './components/Game.vue';

export const routes = [
  {
    path: '/',
    name: 'Default',
    components: {
      // 'menu-top': Navmenu,
      default: Content,
      // 'foot-compo': Footer
    }
  },
  {
    path: '/games/:gameName',
    name: 'Game',
    components: {
      default: Game
    },
    props: {
      gameName: 'Aeaeaeaeaeae'
    }
  }
];
