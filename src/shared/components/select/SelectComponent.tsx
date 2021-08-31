import { TSelect } from '../../utils/ChileanRegions'
import ReactHtmlParser, { processNodes, convertNodeToElement } from 'react-html-parser'

type props = {
  data: any
  select?: any
}

function transform(node: any) {}

const SelectComponent = ({ data, select }: props) => {
  return (
    <div>
      <select onChange={(e: any) => select(e.target.value)}>{ReactHtmlParser(data, { transform })}</select>
    </div>
  )
}

export default SelectComponent
