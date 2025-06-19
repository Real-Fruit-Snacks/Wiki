// Script to help batch fix themes missing 8 variables
const fs = require('fs');
const path = require('path');

// Common missing variables for themes missing 8
const EIGHT_VAR_FIXES = {
  'hotdog-stand': {
    '--bg-modal': '#ffff00ee',
    '--bg-tooltip': '#ff0000',
    '--bg-input': '#ffffff',
    '--bg-highlight': '#ff00ff66',
    '--text-link': '#0000ff',
    '--text-code': '#ff0000',
    '--text-inverse': '#000000',
    '--button-text': '#000000'
  },
  'lucario': {
    '--bg-modal': '#1a1e29ee',
    '--bg-tooltip': '#323c4d',
    '--bg-input': '#1a1e29',
    '--bg-highlight': '#ff6541aa',
    '--text-link': '#72c1ff',
    '--text-code': '#ff6541',
    '--text-inverse': '#263e52',
    '--button-text': '#f8f8f2'
  },
  'luxury-gold': {
    '--bg-modal': '#0a0a0aee',
    '--bg-tooltip': '#1a1a1a',
    '--bg-input': '#0f0f0f',
    '--bg-highlight': '#ffd70066',
    '--text-link': '#ffd700',
    '--text-code': '#ffb86c',
    '--text-inverse': '#000000',
    '--button-text': '#ffd700'
  },
  'material-darker': {
    '--bg-modal': '#1e1e1eee',
    '--bg-tooltip': '#353535',
    '--bg-input': '#2e2e2e',
    '--bg-highlight': '#ffcc0066',
    '--text-link': '#82aaff',
    '--text-code': '#ffcb6b',
    '--text-inverse': '#212121',
    '--button-text': '#eeffff'
  },
  'material-ocean': {
    '--bg-modal': '#090b10ee',
    '--bg-tooltip': '#1a1c25',
    '--bg-input': '#12141c',
    '--bg-highlight': '#82aaffaa',
    '--text-link': '#82aaff',
    '--text-code': '#ffcb6b',
    '--text-inverse': '#090b10',
    '--button-text': '#eeffff'
  },
  'material-palenight': {
    '--bg-modal': '#1e1e2eee',
    '--bg-tooltip': '#32364c',
    '--bg-input': '#252638',
    '--bg-highlight': '#c792eaaa',
    '--text-link': '#82aaff',
    '--text-code': '#ffcb6b',
    '--text-inverse': '#292d3e',
    '--button-text': '#eeffff'
  },
  'neon-galaxy': {
    '--bg-modal': '#0a0514ee',
    '--bg-tooltip': '#1a0a2e',
    '--bg-input': '#0f0720',
    '--bg-highlight': '#ff00ff66',
    '--text-link': '#00ffff',
    '--text-code': '#ffff00',
    '--text-inverse': '#0a0514',
    '--button-text': '#00ffff'
  },
  'noctis': {
    '--bg-modal': '#011627ee',
    '--bg-tooltip': '#0e293f',
    '--bg-input': '#011627',
    '--bg-highlight': '#7fdbcaaa',
    '--text-link': '#82aaff',
    '--text-code': '#addb67',
    '--text-inverse': '#031a16',
    '--button-text': '#d6deeb'
  },
  'nord': {
    '--bg-modal': '#2e3440ee',
    '--bg-tooltip': '#4c566a',
    '--bg-input': '#3b4252',
    '--bg-highlight': '#88c0d066',
    '--text-link': '#88c0d0',
    '--text-code': '#d08770',
    '--text-inverse': '#2e3440',
    '--button-text': '#eceff4'
  },
  'nordic': {
    '--bg-modal': '#242933ee',
    '--bg-tooltip': '#3b4252',
    '--bg-input': '#2e3440',
    '--bg-highlight': '#88c0d066',
    '--text-link': '#88c0d0',
    '--text-code': '#d08770',
    '--text-inverse': '#242933',
    '--button-text': '#d8dee9'
  },
  'one-dark-pro': {
    '--bg-modal': '#21252bee',
    '--bg-tooltip': '#2c313c',
    '--bg-input': '#2c313c',
    '--bg-highlight': '#e5c07b66',
    '--text-link': '#61afef',
    '--text-code': '#e06c75',
    '--text-inverse': '#282c34',
    '--button-text': '#abb2bf'
  },
  'oxocarbon': {
    '--bg-modal': '#161616ee',
    '--bg-tooltip': '#262626',
    '--bg-input': '#262626',
    '--bg-highlight': '#be95ff66',
    '--text-link': '#78a9ff',
    '--text-code': '#ff7eb6',
    '--text-inverse': '#161616',
    '--button-text': '#f2f4f8'
  },
  'palenight': {
    '--bg-modal': '#1e1e2eee',
    '--bg-tooltip': '#32364c',
    '--bg-input': '#252638',
    '--bg-highlight': '#c792eaaa',
    '--text-link': '#82aaff',
    '--text-code': '#ffcb6b',
    '--text-inverse': '#292d3e',
    '--button-text': '#a6accd'
  }
};

// Export for use
module.exports = EIGHT_VAR_FIXES;