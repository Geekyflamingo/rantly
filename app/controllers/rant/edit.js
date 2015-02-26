import Ember from 'ember';

export default Ember.ObjectController.extend({

  actions: {
    updateRant: function(rant) {
      var title = this.get('title');
      var body = this.get('body');
      if (body && title) {
        rant.set('title', title);
        rant.set('body', body);
        rant.save().then(function() {
          this.transitionToRoute('/');
        }.bind(this));
      }
    },


    deleteRant: function(rant) {
        rant.deleteRecord();
        rant.save().then(function() {
          this.transitionToRoute('/');
      }.bind(this));
    }
  }
});
