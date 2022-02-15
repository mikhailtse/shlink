import { useState } from 'react';

import Container from '@mui/material/Container';

import { apiUrl, shorten } from '../../api/links';
import { ButtonedInput, PageTitle } from '../../components';

import ShortentLink from './ShortentLink';
import isUrl from '../../utils/isUrl';

interface IState {
  /**
   * Route for the stats.
   */
  statsRoute: string;
  /**
   * Link for the stats.
   */
  statsLink: string;
  /**
   * Shortent link.
   */
  shortLink: string;
}

function Main() {
  const [state, setState] = useState<IState>();

  const handleOnClick = async (originalLink: string) => {
    const result = await shorten(originalLink);

    const { origin } = window.location;

    setState({
      shortLink: `${apiUrl}/${result}`,
      statsLink: `${origin}/stats/${result}`,
      statsRoute: `/stats/${result}`,
    });
  }

  const handleValidate = (inputValue: string) => {
    return isUrl(inputValue)
      ? { isValid: true }
      : { isValid: false, message: 'Nice try but it is not a url' };
  }

  return (
    <Container disableGutters sx={{ pt: { xs: 10, md: 15 } }}>
      <PageTitle title="Let's make your links a bit shorter!" />
      <ButtonedInput
        buttonTitle='Shorten me'
        label='Original link'
        placeholder='https://google.com'
        onClick={handleOnClick}
        validate={handleValidate}
      />
      {!!state && (
        <ShortentLink {...state} />
      )}
    </Container>
  );
}

export default Main;
