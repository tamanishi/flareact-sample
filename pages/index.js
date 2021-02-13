import Episode from '../components/Episode'
import Header from '../components/Header'
import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { escape, unescape } from 'html-escaper';

export const config = {
  amp: true,
}

async function getEpisodes() {
  const endpoint = `https://tamanishi.net/rebuildshownotesfilter3/shownotes-json`
  const res = await fetch(endpoint)
  const json = await res.json()
  return json.episodes
}

export async function getEdgeProps() {
  const episodes = await getEpisodes()
  return {
    props: {
      fullEpisodes: episodes,
    }
  }
}

export default function Index(props) {
  const [filteredEpisodes, setFilteredEpisodes] = useState(props.fullEpisodes)
  const [query, setQuery] = useState("")
  const intervalRef = useRef(null)

  useEffect(
    () => {
      intervalRef.current = setTimeout(() => {
        if (query) {
          const filtered = props.fullEpisodes.map(episode => ({
            ...episode,
            shownotes: episode.shownotes
              .filter(shownote => shownote.title.toLowerCase().includes(escape(query.toLowerCase())))
          }))
          .filter(episode => episode.shownotes.length > 0)
      
          setFilteredEpisodes(filtered)
        } else {
          setFilteredEpisodes(props.fullEpisodes)
        }
      },
      500)
      return () => clearTimeout(intervalRef.current)
    },
    [query]
  )

  return (
      <>
        <Container>
          <Header />
          <Row><Col xs="3"><Form.Control type='text' placeholder='query' onChange={ e => setQuery(e.target.value) } /></Col></Row>
            { filteredEpisodes.map((episode, i) => <Episode episode={ episode } query={ query } key={ i } />)}
        </Container>
      </>
  );
}
