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

		setCurrentPogressBarPosition = function (e)
		{
			this.set('controller.currentProgresPosition',  e.position);
		}

		$('#progressbar').on("positionChanged", setCurrentPogressBarPosition.bind(this));

		
	}	


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
				
				while(this.get('currentProgresPosition') <= this.get('max'))
				{
					$('#progressbar').progressbar('stepIt');					
				}
		}
	}
});