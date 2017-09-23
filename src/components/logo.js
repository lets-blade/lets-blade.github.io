import { h, Component } from 'preact';

export default class Logo extends Component {
	state = { i:0, flash:true, hover:false };

	hover = () => {
		this.setState({ hover: true });
	};

	hoverOut = () => {
		this.setState({ hover: false });
	};

	frame = () => {
		this.timer = null;
		if (!this.mounted) return;
		this.setState({ i: this.state.i+1 }, this.next);
	};

	next = () => {
		let { flash, hover } = this.state;
		if (!this.mounted || !(flash || hover) || this.timer) return;
		this.timer = (requestAnimationFrame || setTimeout)(this.frame, 15);
	};

	componentDidMount() {
		this.mounted = true;
		this.next();

		// every 10 seconds, spin for 1 second even if paused :)
		let c = 0;
		this.flashTimer = setInterval( () => {
			let i = c++%5;
			if (i===0) this.setState({ flash:true });
			if (i===1) this.setState({ flash:false });
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.flashTimer);
		(cancelAnimationFrame || clearTimeout)(this.timer);
		this.mounted = this.timer = false;
	}

	componentDidUpdate() {
		this.next();
	}

	renderEllipse(fg, deg, offset) {
		let gapLength = Math.sin(offset/500*Math.PI)*30+60;
		let lineLength = 894 / 2 - gapLength;
		return (
			<ellipse cx="0" cy="0" stroke-dasharray={`${lineLength} ${gapLength}`} stroke-dashoffset={offset*10 + Math.sin(offset/100*Math.PI)*200} stroke-width="16px" rx="75px" ry="196px" fill="none" stroke={fg} transform={`rotate(${deg})`} />
		);
	}

	render({ inverted=false, text=false, fg='white', bg='#673ab8', component, ...props }, { i }) {
		let Root = component || 'div',
			touch = typeof navigator!=='undefined' && navigator.maxTouchPoints>1;
		if (inverted) [bg, fg] = [fg, bg];

		return (
			<span></span>
		);
	}
}

export const InvertedLogo = props => {
	return (
		<Logo inverted {...props} />
	);
};
