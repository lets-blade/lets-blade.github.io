import { h } from 'preact';
import { Link } from 'preact-router';
import cx from 'classnames';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/tomorrow-night-eighties.css';

const LANGUAGES = { java, javascript, json, xml };
Object.keys(LANGUAGES).forEach( key => hljs.registerLanguage(key, LANGUAGES[key]) );

export default ({ children, ...props }) => {
	let child = children && children[0],
		isHighlight = child && child.nodeName==='code';
	if (isHighlight) {
		let text = child.children[0].replace(/(^\s+|\s+$)/g, ''),
			lang = (child.attributes.class && child.attributes.class).match(/lang-([a-z]+)/)[1],
			highlighted = hljs.highlightAuto(text, lang ? [lang] : null),
			hLang = highlighted.language,
			repl = hLang==='js' && text.split('\n').length>2 && props.repl!=='false';
		return (
			<pre class={cx('highlight', `highlight-${hLang}`, props.class)}>
				<code class={`hljs lang-${hLang}`} dangerouslySetInnerHTML={{ __html:highlighted.value }} />
			</pre>
		);
	}
	return <pre {...props}>{ children }</pre>;
};
