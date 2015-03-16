import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    newRant: function() {
      var title = this.get('newTitle');
      var body = this.get('newBody');
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
          var rant = this.store.createRecord('rant', { title: title, body: body });
          this.set('newTitle', '');
          this.set('newBody', '');
          rant.save().then(function(){
            this.transitionToRoute('rants');
          }.bind(this));
        }
    },
    cancelRant: function() {
      this.transitionToRoute('rants');
    }
  }
});
