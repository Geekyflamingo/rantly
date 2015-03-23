import Ember from "ember";

export default Ember.Controller.extend({
  needs: ['application'],

  actions: {
    newRant: function() {
      var controller = this;
      var title = controller.get('newTitle');
      var body = controller.get('newBody');
      var app = this.get('controllers.application');
      var user = app.currentUser;
      var input = document.getElementsByClassName("errors")[0];

      if ((!title) && ((!body) || (body.length < 143))) {
        var error = document.createTextNode("Your rant must have a title. \n");
        input.appendChild(error);
        var errorBody = document.createTextNode("Please say more! Your rant must be at least 144 characters.");
        input.appendChild(errorBody);
      } else if ((body == null) || (body.length < 143)) {
        var error = document.createTextNode("Please say more! Your rant must be at least 144 characters.");
        input.appendChild(error);
      } else if (title.length === 0) {
        var error = document.createTextNode("Your rant must have a title.");
        input.appendChild(error);
      }else {
          var rant = controller.store.createRecord('rant', { title: title, body: body, user: user });
          controller.set('newTitle', '');
          controller.set('newBody', '');
          rant.save().then(function(){
            controller.transitionToRoute('rants');
          });
        }
    },
    cancelRant: function() {
      this.transitionToRoute('rants');
    }
  }
});
