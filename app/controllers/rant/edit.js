import Ember from 'ember';

export default Ember.ObjectController.extend({

  actions: {
    editRant: function(rant) {
      var title = this.get('title');
      var body = this.get('body');
      if (body && title) {
        rant.set('title', title);
        rant.set('body', body);
        rant.save().then(function() {
          this.transitionToRoute('rants');
        }.bind(this));
      }
    }
  }

});
