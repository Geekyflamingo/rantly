import DS from "ember-data";

export default DS.ActiveModelAdapter.extend({
  host: 'https://bv-rantly.herokuapp.com',

  headers: function(){
      return {
        "Authorization": "" + localStorage.getItem('authToken')
    };
  }.property().volatile()
});
