import { CopyableLink, PageSubTitle } from '../../components';

interface IShortenLinkProps {
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

/**
 * Renders a shortent link result.
 */
function ShortentLink(props: IShortenLinkProps) {
  const {
    shortLink,
    statsLink,
    statsRoute,
  } = props;

  return (
    <>
      <PageSubTitle title='Here we go!' /> 
      <CopyableLink
        linkProps={{ title: shortLink, to: shortLink }}
        buttonProps={{ name: 'copy-short-link' }}
        title="Look how short I am"
      />
      <CopyableLink
        buttonProps={{ name: 'copy-stats-link' }}
        linkProps={{ title: statsLink, to: statsRoute, type: 'inner' }}
        text={statsLink}
        title="And here my stats"
      />
    </>
  )
}

export default ShortentLink;
