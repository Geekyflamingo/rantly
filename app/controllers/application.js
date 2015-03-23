import Ember from "ember";

export default Ember.ArrayController.extend({

  loggedIn: false,
  currentUser: null,

  needs: ['rant'],

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
      var email = this.get('login-name');
      var password = this.get('login-pass');

      controller.set('errorMessage', null);
      var session = controller.store.createRecord('session', {email: email, password: password});
      session.save().then(function(){
        localStorage.setItem('authToken', session._data.token);
        controller.set('currentUser', session._data.user);
        controller.set('loggedIn', true);
        controller.set('login-name', '');
        controller.set('login-pass', '');
        controller.transitionToRoute('rants');
      });
    },

    signOut: function() {
      localStorage.clear();
      this.set('loggedIn', false);
      this.set('currentUser', null);
      this.transitionToRoute('rants');
    }
  }
});
