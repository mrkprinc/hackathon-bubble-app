import { useRef, useEffect } from 'react'
import { runForceGraph } from './forceGraphGenerator'
import styles from './forceGraph.module.css'

export interface NetworkNode {
  id: string,
  name: string,
  image: string,
  isRoot?: boolean
}

export interface NetworkLink {
  source: string
  target: string
}

interface ForceGraphProps {
  linksData: NetworkLink[]
  nodesData: NetworkNode[]
}

export const ForceGraph: React.FC<ForceGraphProps> = ({ linksData, nodesData }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    let destroyFn

    if (containerRef.current) {
      const { destroy } = runForceGraph(containerRef.current, linksData, nodesData)
      destroyFn = destroy
    }

    return destroyFn
  }, [])

  return <div ref={containerRef} className={styles.container} />
}