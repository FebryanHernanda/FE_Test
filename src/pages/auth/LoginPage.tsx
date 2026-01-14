import { Box, Typography, Container } from '@mui/material'

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box className="flex min-h-screen flex-col items-center justify-center py-12">
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
      </Box>
    </Container>
  )
}
