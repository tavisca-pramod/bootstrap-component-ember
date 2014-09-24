App = Ember.Application.create({
	LOG_TRANSITIONS: true,
	
});

App.Router.map(function() {
});

App.IndexRoute = Ember.Route.extend({

	model : function(){

		return { max : 100, step : 1, position : 0 };
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
	}
});

App.IndexController = Ember.ObjectController.extend({

	actions: {

		moveByStep : function(){
		// need to move the progress bar position by step value set as input
		},

		resetProgessBar : function(){
			// need to reset the progress bar position to '0'
		},

		runProgressBar : function(){
			//need to start the progress bar using interval or till the max position value specified in the input
		}
	}
});