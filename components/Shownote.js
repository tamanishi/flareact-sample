import Highlighter from  'react-highlight-words'
import { escape, unescape } from 'html-escaper';
import '../styles/global.css'

export default function Shownote({ shownote, query }) {
  return (
    <li><a href={ shownote.url } target='_blank' rel='noopner noreferrer'><Highlighter highlightClassName='highlight' searchWords={ [ query ] } textToHighlight={ unescape(shownote.title).replace(/&nbsp;/g, ' ') } /></a></li>
  );
}
