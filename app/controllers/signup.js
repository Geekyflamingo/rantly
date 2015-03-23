import Ember from "ember";

export default Ember.ArrayController.extend({
  needs: ['application'],

  actions: {

    register: function() {
      var controller = this;
      var firstName = this.get('fnameCopy'),
          lastName  = this.get('lnameCopy'),
          email     = this.get('emailCopy').trim(),
          password  = this.get('passwordCopy'),
          passwordConfirm  = this.get('passwordConfirm');


      var user = controller.store.createRecord('user',
      { firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirm});
      user.save().then(function(){
        controller.set('fnameCopy', '');
        controller.set('lnameCopy', '');
        controller.set('emailCopy', '');
        controller.set('passwordCopy', '');
        controller.set('passwordConfirm', '');
        controller.transitionToRoute('rants');
      });
    }
  }
});
