import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    newRant: function () {
      var title = this.get('title');
      var body = this.get('body');

      if (body && title) {
        var rant = this.store.createRecord('rant', { title: title, body: body});
        rant.save().then(function(){
          this.set('title', '');
          this.set('body','');
          this.transitionToRoute('/');
        }.bind(this));
      }
    },
  }
});
