import React from 'react'
import data from '../../data/data.json'
import { ForceGraph } from '../../components/force-graph'

function App() {
  const nodeHoverTooltip = React.useCallback((node) => {
    // TODO: Add more details about the connection
    return `<div>${node.id}<img src=${node.image} alt="profile picture"></div>`
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        Force Graph Example
      </header>
      <section className="Main">
        <ForceGraph linksData={data.links} nodesData={data.nodes} nodeHoverTooltip={nodeHoverTooltip} />
      </section>
    </div>
  )
}

export default App