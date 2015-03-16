import Ember from "ember";

export default Ember.ArrayController.extend({
  setupController: function(controller){
    controller.reset();
  },

  reset: function(){
    this.setProperties({
      email: '',
      password: '',
      errorMessage: ''
    });
  },

  actions: {

    queryRants: function() {
      var query = this.get('search');
      var controller = this;
      var input = document.getElementsByClassName("rant-search-field")[0];
      if ((typeof(query) === 'undefined') || (query === '')) {
        input.placeholder = "This can't be blank!";
      } else {
        controller.store.find('rant', {find: query}).then(function(result) {
          controller.set('model', result);
        });
        input.placeholder = "Search";
        controller.set('search', '');
        controller.transitionToRoute('rants.search', { queryParams: {term: query} });
      }
    },

    login: function(){
      var controller = this;
      var data = { email: this.get('login-name'), password:
      this.get('login-pass')};
      console.log(data);
      controller.set('errorMessage', null);
      var session = controller.store.createRecord('session', data);
      console.log(session);
      session.save().then(function(){
        localStorage.setItem('authToken', session._data.token);
        controller.transitionToRoute('rants');
      });

    }
  }
});
