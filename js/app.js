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
		    dangerMarker: 80   		
		});	

		setCurrentPogressBarPosition = function (e)
		{
			this.set('controller.currentProgresPosition',  e.position);
		}

		$('#progressbar').on("positionChanged", setCurrentPogressBarPosition.bind(this));		
	}
});

// needs to be handled to stop the progress bar
var timerId;

App.IndexController = Ember.ObjectController.extend({	

	start : function ()
		{
			if (this.get('currentProgresPosition') < this.get('max')){
				$('#progressbar').progressbar('stepIt');
			}
			else
			{
				clearTimeout(timerId);
			}
		},
	
	actions: {
		moveByStep : function(){
			$('#progressbar').progressbar('setStep', this.get('step'));
			$('#progressbar').progressbar('setMaximum', this.get('max'));
			
			$('#progressbar').progressbar('stepIt');
		},

		resetProgessBar : function(){
			$('#progressbar').progressbar('reset');
		},

		runProgressBar : function(){	
			$('#progressbar').progressbar('setStep', this.get('step'));
			$('#progressbar').progressbar('setMaximum', this.get('max'));

			timerId = window.setInterval(this.start.bind(this),100);
		}	
	},


	postionChanged : function()
		{
			$('#progressbar').progressbar('setPosition',this.get('currentProgresPosition') );
		}.observes('postion')
});