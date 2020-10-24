import React from 'react'
import data from '../../data/data.json'
import { ForceGraph } from '../../components/force-graph'

const NetworkGraph: React.FC = () => <ForceGraph linksData={data.links as any} nodesData={data.nodes as any} />

export default NetworkGraph