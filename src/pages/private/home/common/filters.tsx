import { Button, Form, Input } from 'antd'


const Filters = ({
    filters,
    setFilters,
    onFilter,
}: {
    filters: any,
    setFilters: any,
    onFilter:(filters: any) => void
}) => {
    

  return (
    <Form 
    layout='vertical'
    className='grid grid-cols-3 gap-5 items-end'>
       <Form.Item label='Event Name'>
              <Input 
              onChange={(e) => setFilters({...filters, searchText: e.target.value})}
              />
       </Form.Item>

       <Form.Item label='Date'>
              <Input
              type='date'
              onChange={(e) => setFilters({...filters, date: e.target.value})}
              />
       </Form.Item>

       <div className="flex gap-5">
        <Button
        onClick={() => {
            setFilters({
                searchText: '',
                date: ''
            })
            onFilter({
                searchText: '',
                date: ''})
        }}
        
        >
            Clear Filters
        </Button>
        <Button type='primary'
        disabled={!filters.searchText&& !filters.date}
        onClick={() => onFilter(filters)}
        >
            Apply Filters
        </Button>
       </div>
    </Form>
  )
}

export default Filters