import {t, Trans} from '@lingui/macro'
import {Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material'
import {mobileUI} from 'src/shared/constants'
import {toMoneyCurrency} from 'src/shared/utils/currency'

type TransactionType = {
  date: string
  description: string
  amount: number
}

const CustomTableContainer = styled(TableContainer)(({theme}) => ({
  backgroundColor: theme.palette.shades[2],
  boxShadow: 'none !important',
}))

const CustomTableCell = styled(TableCell)(({theme}) => ({
  borderBottom: 'none',
  borderLeft: `1px solid ${theme.palette.shades['3']} !important`,
}))

const CustomTableCellForHeader = styled(TableCell)(({theme}) => ({
  borderBottom: 'none',
  borderLeft: `1px solid ${theme.palette.shades['3']}`,
  color: theme.palette.shades['6.5'],
}))

const CustomTableCellForHeaderWithoutBorder = styled(TableCell)(({theme}) => ({
  borderBottom: 'none',
  color: theme.palette.shades['6.5'],
}))

const CustomTableCellWithoutBorder = styled(TableCell)(({theme}) => ({
  borderBottom: 'none',
}))
export const TransactionsList = () => {
  const rows: TransactionType[] = [
    {amount: 170000, description: t`First payment`, date: '1399/12/20'},
    {amount: 170000, description: t`First payment`, date: '1399/12/20'},
    {amount: 170000, description: t`First payment`, date: '1399/12/20'},
    {amount: 170000, description: t`First payment`, date: '1399/12/20'},
    {amount: 170000, description: t`First payment`, date: '1399/12/20'},
    {amount: 170000, description: t`First payment`, date: '1399/12/20'},
    {amount: 170000, description: t`First payment`, date: '1399/12/20'},
    {amount: 170000, description: t`First payment`, date: '1399/12/20'},
  ]
  return (
    <Stack>
      <Typography>
        <Trans>Transactions list</Trans>
      </Typography>
      <CustomTableContainer>
        <Table sx={{Width: mobileUI.shared.maxWidth}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CustomTableCellForHeaderWithoutBorder align="center">
                <Typography variant="caption" color="shades.6">
                  <Trans>Row number</Trans>
                </Typography>
              </CustomTableCellForHeaderWithoutBorder>
              <CustomTableCellForHeader align="center">
                <Typography variant="caption" color="shades.6">
                  <Trans>Date</Trans>
                </Typography>
              </CustomTableCellForHeader>
              <CustomTableCellForHeader align="center">
                <Typography variant="caption" color="shades.6">
                  <Trans>Descriptions</Trans>
                </Typography>
              </CustomTableCellForHeader>
              <CustomTableCellForHeader align="center">
                <Typography variant="caption" color="shades.6">
                  <Trans>Amount</Trans>
                </Typography>
              </CustomTableCellForHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <CustomTableCellWithoutBorder align="center" component="th" scope="row">
                  <Typography variant="subtitle1" color="shades.9">
                    {index + 1}
                  </Typography>
                </CustomTableCellWithoutBorder>
                <CustomTableCell align="center">
                  <Typography variant="subtitle1" color="shades.9">
                    {row.date}
                  </Typography>
                </CustomTableCell>
                <CustomTableCell align="center">
                  <Typography variant="subtitle1" color="shades.9">
                    {row.description}
                  </Typography>
                </CustomTableCell>
                <CustomTableCell align="center">
                  <Typography variant="subtitle1" color="shades.9">
                    {t`${toMoneyCurrency(row.amount)} Tooman`}
                  </Typography>
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomTableContainer>
    </Stack>
  )
}
