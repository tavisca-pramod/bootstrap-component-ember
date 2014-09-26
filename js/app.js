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
		return { 
			maximum : 100,
			step : 1,
			position : 0,
			currentProgresPosition : 0,
			percent: 0,
			dangerMarker: 80,
			warningMarker: 60
		};
	}
});

App.IndexView = Ember.View.extend({
 	
 	/**
 	 * [didInsertElement initalizes the value progress bar,
 	 * 					 binds the currentProgressPosition value to the progress bar runtime value]
 	 */
	didInsertElement : function(){

		$('#progressbar').progressbar({
			warningMarker: this.get('controller.warningMarker'),
		    dangerMarker: this.get('controller.dangerMarker'),
		    maximum: this.get('controller.maximum'),
		    step: this.get('controller.step')
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
			
	}.observes('controller.position'),

	maximumChanged : function()
	{
		/**
	 	* checks whether the maximum value is not a number
	 	*/
		if(0 === this.get('controller.maximum').length)
		{	
			this.set('controller.maximum',0);
		}

		$('#progressbar').progressbar('setMaximum',this.get('controller.maximum'));		
			
	}.observes('controller.maximum'),

	stepChanged : function()
	{
		/**
	 	* checks whether the position value is not a number
	 	*/
		if(0 === this.get('controller.step').length)
		{	
			this.set('controller.step',0);
		}

		$('#progressbar').progressbar('setStep',this.get('controller.step'));		
			
	}.observes('controller.step'),	

	percentChanged : function()
	{
		/**
	 	* checks whether the percent value is not a number
	 	*/
		if(0 === this.get('controller.percent').length)
		{	
			this.set('controller.percent',0);
		}

		$('#progressbar').progressbar('setPercent',this.get('controller.percent'));		
			
	}.observes('controller.percent'),

	dangerMarkerChanged : function()
	{
		/**
	 	* checks whether the dangerMarker value is not a number
	 	*/
		if(0 === this.get('controller.dangerMarker').length)
		{	
			this.set('controller.dangerMarker',0);
		}

		$('#progressbar').progressbar('setDangerMarker',this.get('controller.dangerMarker'));		
			
	}.observes('controller.dangerMarker'),

	warningMarkerChanged : function()
	{
		/**
	 	* checks whether the warningMarker value is not a number
	 	*/
		if(0 === this.get('controller.warningMarker').length)
		{	
			this.set('controller.warningMarker',0);
		}

		$('#progressbar').progressbar('setWarningMarker',this.get('controller.warningMarker'));		
			
	}.observes('controller.warningMarker')		

});

App.IndexController = Ember.ObjectController.extend({

	start : function ()
		{
			if (this.get('currentProgresPosition') < this.get('maximum')){
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
			$('#progressbar').progressbar('setMaximum', this.get('maximum'));
			
			$('#progressbar').progressbar('stepIt');
		},

		resetProgessBar : function(){
			$('#progressbar').progressbar('reset');
		},

		runProgressBar : function(){	
			$('#progressbar').progressbar('setStep', this.get('step'));
			$('#progressbar').progressbar('setMaximum', this.get('maximum'));

			timerId = window.setInterval(this.start.bind(this),100);
		}	
	}
});