import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onPlay = throttle(data => {
  localStorage.setItem(STORAGE_KEY, data.seconds);
}, 1000);

const onLoad = () => {
  player.setCurrentTime(localStorage.getItem(STORAGE_KEY) || 0);
};

player.on('timeupdate', onPlay);

player.on('loaded', onLoad);
