import {Stack, styled, Typography} from '@mui/material'
import {useQuery} from '@tanstack/react-query'
import {medalGuideQuery} from './medalGuide.query'

const Caption = styled(Typography)(({theme}) => ({
  padding: theme.spacing(0.5, 1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.white,
  width: 'fit-content',
  borderRadius: theme.spacing(0.5),
}))

const Wrapper = styled(Stack)(({theme}) => ({
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  width: '100%',
  padding: theme.spacing(2, 1),
}))

const Bullet = styled('li')({
  listStyleType: 'disc',
})

export const MedalGuideSection = () => {
  const {data} = useQuery(['medal-guide'], medalGuideQuery)

  return (
    <Stack py={2}>
      {data &&
        data
          .map((x) => x.badge_type)
          .filter((item, index) => data.map((x) => x.badge_type).indexOf(item) === index)
          .map((_, i) => (
            <Stack key={i} paddingTop={2}>
              <Caption variant="caption">{_}</Caption>
              {data
                .filter((x) => x.badge_type === _)
                .map((t, index) => (
                  <Wrapper key={index}>
                    <Typography py={1} variant="h6" sx={{listStyleType: 'disc'}}>
                      <Bullet>{t.name_fa}</Bullet>
                    </Typography>
                    <Typography>{t.description}</Typography>
                  </Wrapper>
                ))}
            </Stack>
          ))}
    </Stack>
  )
}
