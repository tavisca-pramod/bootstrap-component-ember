App = Ember.Application.create({
	LOG_TRANSITIONS: true,
	
});

App.Router.map(function() {
});

App.IndexRoute = Ember.Route.extend({
	/**
	 * [model to maintain data to be passed to progress bar setup]
	 * @return {[object]} [contains maximum position, step value and 
	 * postition to be set of progress bar]
	 */
	model : function(){
		return { max : 100, step : 1, position : 0, currentProgresPosition : 0};
	}
});
App.IndexView = Ember.View.extend({
 	
 	/**
 	 * [didInsertElement initalizes the value progress bar,
 	 * 					 binds the currentProgressPosition value to the progress bar runtime value]
 	 */
	didInsertElement : function(){

		$('#progressbar').progressbar({
			warningMarker: 60,
		    dangerMarker: 80,
		    maximum: 100,
		    step: 1
		});	

		/**
		 * [setCurrentPogressBarPosition sets the currentProgresPosition attribute of the model on 
		 * event of progress bar position changed]
		 */
		setCurrentPogressBarPosition = function (e)
		{
			this.set('controller.currentProgresPosition',  e.position);
		}

		$('#progressbar').on("positionChanged", setCurrentPogressBarPosition.bind(this));		
	},

	/**
	 * [postionChanged binds model property change to the position of the progress bar]
	 */
	postionChanged : function()
	{
		/**
	 	* checks whether the position value is not a number
	 	*/
		if(0 === this.get('controller.position').length)
		{	
			this.set('controller.position',0);
		}

		$('#progressbar').progressbar('setPosition',this.get('controller.position'));		
			
	}.observes('controller.position')
});

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
	}
});