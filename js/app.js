App = Ember.Application.create({
	LOG_TRANSITIONS: true,
	
});

App.Router.map(function() {
});

App.IndexRoute = Ember.Route.extend({
	model : function(){
		return { max : 100, step : 1, position : 10, currentProgresPosition : 0};
	}
});

App.IndexView = Ember.View.extend({

	didInsertElement : function(){

		$('#progressbar').progressbar({
			warningMarker: 60,
		    dangerMarker: 80,
    		maximum: 100,
    		step: 5
		});	
	},

	onPositionChanged : function() {
		$('#progressbar').progressbar('setPosition',position);
  		}.observes('indexcontroller.model.position'),

  		$('#progressbar').bind( 'positionChanged', function(positionValue, percentValue){
  				currentProgresPosition = positionValue;
  		 } );
	
});

App.IndexController = Ember.ObjectController.extend({

	actions: {
		moveByStep : function(){
			$('#progressbar').progressbar('stepIt');
		},

		resetProgessBar : function(){
			$('#progressbar').progressbar('reset');
		},

		runProgressBar : function(){
			// perform an loop operation to run the progress bar to max value
		}
	}
});