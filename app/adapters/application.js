import DS from "ember-data";

export default DS.ActiveModelAdapter.extend({
  host: 'http://localhost:3000',

  headers: function(){
    var token = localStorage.getItem('authToken');
    console.log(token);
    if(token){
      return{
        "Authorization": "" + token
      };
    }
  }.property('signin.authToken')
});
