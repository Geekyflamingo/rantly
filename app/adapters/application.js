import DS from "ember-data";
import ENV from '../config/environment';
export default DS.ActiveModelAdapter.extend({
  host: ENV.adapterURL || ENV.ADAPTER_URL,

  headers: function(){
      return {
        "Authorization": "" + localStorage.getItem('authToken')
    };
  }.property().volatile()
});
