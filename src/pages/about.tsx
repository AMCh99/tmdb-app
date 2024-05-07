import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Copyright from '../components/Copyright';
import { useRouter } from 'next/navigation'
import { NavBar } from '../components/navbar';


export default function About() {

  const router = useRouter()

  return (
      <>
          <NavBar />
          <Container maxWidth="lg">
              <Box
                  sx={{
                      my: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                  }}
              >
                  <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                      About page
                  </Typography>
                  <Typography variant="body1">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Ducimus, veritatis repudiandae voluptatem eveniet illum
                      sapiente ipsam earum quidem dolor repellat nostrum quos
                      ipsa est dolore placeat maiores harum eius dolorum
                      consectetur blanditiis quasi voluptas accusantium dicta
                      alias! Hic saepe, ea consequuntur quidem cupiditate soluta
                      distinctio deleniti maxime suscipit, rerum facilis
                      voluptatum perspiciatis voluptatibus. Debitis animi porro,
                      quibusdam veritatis cupiditate numquam quo laborum sed
                      quasi aliquam commodi recusandae explicabo nihil neque
                      corporis ipsa iusto dignissimos est voluptatem odit.
                      Debitis dignissimos sequi sapiente eaque vel. Quasi saepe
                      natus libero! Possimus illum deserunt sapiente iusto ex ad
                      quasi! Sunt adipisci delectus ipsam non.
                  </Typography>
                  <Box sx={{ maxWidth: 'sm' }}>
                      <Button
                          variant="contained"
                          onClick={() => router.push('/')}
                      >
                          Go to the home page
                      </Button>
                  </Box>
                  <Copyright />
              </Box>
          </Container>
      </>
  );
}
