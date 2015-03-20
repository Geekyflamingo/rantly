import Ember from "ember";

export default Ember.Controller.extend({
  needs: ['application'],

  actions: {
    newRant: function() {
      var title = this.get('newTitle');
      var body = this.get('newBody');
      var input = document.getElementsByClassName("errors")[0];
      var controller = this;
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
          var rant = controller.store.createRecord('rant', { title: title, body: body });
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
