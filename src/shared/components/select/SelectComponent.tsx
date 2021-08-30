import { TSelect } from '../../utils/ChileanRegions'
type props = {
  data: TSelect[]
  select?: any
}
const SelectComponent = ({ data, select }: props) => {
  return (
    <div>
      <select onChange={(e: any) => select(e.target.value)}>
        {data.map((option: TSelect, index: number) => {
          return (
            <option value={option.id} key={index}>
              {option.region_name}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default SelectComponent
