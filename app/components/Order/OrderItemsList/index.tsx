import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { IOrderItem } from '@/lib/interfaces'

const OrderItemsList = ({ items }: { items: IOrderItem[] }) => {
  const renderItems = () =>
    items?.map((item, index) => (
      <Box
        key={item.name + index}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#333'
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
          }}
        >
          {item.name}
        </Typography>
        <Divider sx={{ flex: 1, mt: 1, mx: 2, opacity: 0.5 }} />
        <Typography sx={{ fontWeight: 700 }}>{item.price}</Typography>
      </Box>
    ))

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        flex: 1,
        p: 1,
        maxHeight: 150,
        backgroundColor: '#d3e2eb',
        overflow: 'auto',
        scrollbarWidth: 'thin',
        ':hover': {
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc'
          }
        },
        '&::-webkit-scrollbar': {
          width: '0.4em'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'transparent'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#bbb'
        }
      }}
    >
      {renderItems()}
    </Box>
  )
}

export default OrderItemsList
