import { h, Component } from 'preact';
import { connect } from '../../lib/store';
import config from '../../config';
import style from './style';

@connect( ({ lang, url }) => ({ lang, url }) )
export default class Footer extends Component {
	setLang = e => {
		this.props.store.setState({ lang: e.target.value });
	};

	render({ lang, url = location.pathname }) {
		let path = url.replace(/\/$/,'') || '/index';
		if (lang) path = `/lang/${lang}${path}`;
		let editUrl = `https://github.com/lets-blade/lets-blade.github.io/tree/master/content${path}.md`;
		return (
			<footer class={style.footer}>
				<div class={style.inner}>
					<p>
						<a href={editUrl} target="_blank" rel="noopener">编辑该页面</a>
						<label class={style.lang}>
							切换语言:{' '}
							<select value={lang || ''} onChange={this.setLang}>
								{/*<option value="">English</option>*/}
								{ Object.keys(config.languages).map( id => (
									<option selected={id==lang} value={id}>{ config.languages[id] }</option>
								)) }
							</select>
						</label>
					</p>
					<p>
						© 2017 Blade. 站点由 ❤ <a href="https://github.com/biezhi" target="_blank" rel="noopener">biezhi</a>{' '} 构建，
						网站源码来自 <a href="https://github.com/developit/preact-www" target="_blank" rel="noopener">preact-www</a>。
					</p>
				</div>
			</footer>
		);
	}
}
