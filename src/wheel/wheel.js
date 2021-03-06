
	_initWheel: function () {
		utils.addEvent(this.wrapper, 'mousewheel', this);
		utils.addEvent(this.wrapper, 'DOMMouseScroll', this);

		this.on('destroy', function () {
			utils.removeEvent(this.wrapper, 'mousewheel', this);
			utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
		});
	},

	_wheel: function (e) {
		var wheelDeltaX, wheelDeltaY,
			newX, newY,
			that = this;

		// Execute the scrollEnd event after 400ms the wheel stopped scrolling
		clearTimeout(this.wheelTimeout);
		this.wheelTimeout = setTimeout(function () {
			that._execEvent('scrollEnd');
		}, 400);

		e.preventDefault();

		if ( 'wheelDeltaX' in e ) {
			wheelDeltaX = e.wheelDeltaX / Math.abs(e.wheelDeltaX) || 0;
			wheelDeltaY = e.wheelDeltaY / Math.abs(e.wheelDeltaY) || 0;
		} else if ( 'wheelDelta' in e ) {
			wheelDeltaX = wheelDeltaY = e.wheelDelta / Math.abs(e.wheelDelta);
		} else if ( 'detail' in e ) {
			wheelDeltaX = wheelDeltaY = -(e.detail / Math.abs(e.detail));
		} else {
			return;
		}

		wheelDeltaX *= 12;
		wheelDeltaY *= 12;

		if ( !this.hasVerticalScroll ) {
			wheelDeltaX = wheelDeltaY;
		}

		newX = this.x + (this.hasHorizontalScroll ? wheelDeltaX * this.options.invertWheelDirection : 0);
		newY = this.y + (this.hasVerticalScroll ? wheelDeltaY * this.options.invertWheelDirection : 0);

		if ( newX > 0 ) {
			newX = 0;
		} else if ( newX < this.maxScrollX ) {
			newX = this.maxScrollX;
		}

		if ( newY > 0 ) {
			newY = 0;
		} else if ( newY < this.maxScrollY ) {
			newY = this.maxScrollY;
		}

		this.scrollTo(newX, newY, 0);

// INSERT POINT: _wheel
	},
