import { h, Component } from 'preact';
import { memoize } from 'decko';

const githubForks = memoize( repo => fetch('//api.github.com/repos/'+repo)
	.then( r => r.json() )
	.then( d => d.forks_count || d.watchers )
);

// make available to homepage REPL demo
if (typeof window!=='undefined') window.githubStars = githubForks;

export default class GithubForks extends Component {
	state = {
		forks: localStorage._forks || ''
	};

	setForks = forks => {
		if (forks && forks!=this.state.forks) {
			localStorage._stars = forks;
			this.setState({ forks });
		}
	};

	componentDidMount() {
		let { user, repo } = this.props;
		githubForks(user+'/'+repo).then(this.setForks);
	}

	render({ user, repo, simple, children }, { forks }) {
		let url = `//github.com/${user}/${repo}/`;
		if (simple) return (
			<a href={url} class="stars" target="_blank" rel="noopener">⭐️ {forks} Forks</a>
		);
		return (
			<span class="github-btn">
				<a class="gh-btn" href={url} target="_blank" rel="noopener" aria-label="Fork on GitHub">
					<span class="gh-ico" /> Fork
				</a>
				<a class="gh-count" href={url} target="_blank" rel="noopener">
					{forks ? Math.round(forks).toLocaleString() : children || '..'}
				</a>
			</span>
		);
	}
}
