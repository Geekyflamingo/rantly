import Ember from "ember";

export default Ember.ArrayController.extend({
  queryParams: ['term'],
  term: null,

  results: function() {
    return this.store.find('rant', { find: this.get('term') });
  }.property('term'),

  isEditing: false,

  actions: {

    editRant: function(rant) {
      this.set('isEditing', true);
    },
    cancelRant: function(rant) {
      this.set('isEditing', false);
      this.transitionToRoute('rants', rant.id);
    },
    saveRant: function(rant){
      var controller = this;
      var title = this.get('title');
      var body = this.get('body');

      rant.set('title', title);
      rant.set('body', body);
      rant.save().then(function(){
        this.set('isEditing', false);
        this.transitionToRoute('rants');
      }.bind(this));
    },

    deleteRant: function(rant) {
      var control = this;
      Ember.$('.button-warning').parents('article').addClass('fade-out');
      Ember.run.later(function(){
        rant.destroyRecord();
        control.transitionToRoute('rants');
      }, 400);
    }
  }

});
