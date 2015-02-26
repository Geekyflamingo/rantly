import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    newRant: function() {
      var title = this.get('newTitle');
      var body = this.get('newBody');

      if (body && title && body.trim() && title.trim()) {
        var rant = this.store.createRecord('rant', { title: title, body: body });
        this.set('newTitle', '');
        this.set('newBody', '');
        rant.save().then(function(){
          this.transitionToRoute('rants');
        }.bind(this));
      }
    }
  }
});
