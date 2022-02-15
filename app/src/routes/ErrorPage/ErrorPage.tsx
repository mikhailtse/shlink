import Container from '@mui/material/Container';
import { PageTitle } from '../../components';

interface IErrorProsp {
  /**
   * Message of the error.
   */
  message: string;
}

function ErrorPage(props: IErrorProsp) {
  const {
    message,
  } = props;

  return (
    <Container disableGutters sx={{ pt: { xs: 10, md: 15 } }}>
      <PageTitle title={message} />
    </Container>
  );
}

export default ErrorPage;
