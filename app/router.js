import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource("rants",  { path: '/' }, function() {
    this.route('new');
    this.resource('rant', { path:'/rants/:rant_id'}, function() {
      this.route('edit');
    });
  });
});

export default Router;
