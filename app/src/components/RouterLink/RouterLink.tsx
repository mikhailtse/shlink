import { Link as ReactRouterLink } from 'react-router-dom';
import Link, { LinkProps } from '@mui/material/Link';

interface RouterLinkProps extends Omit<LinkProps, 'title' | 'href'> {
  /**
   * Route to navigate.
   */
  to: string;
  /**
   * Title of the link.
   */
  title: string;
}

/**
 * Renders a material-ui styled `react-router-dom` link.
 */
function RouterLink(props: RouterLinkProps) {
  const {
    title,
    to,
    ...restProps
  } = props;

  return (
    <Link
      {...restProps}
      component={ReactRouterLink}
      to={to}
    >
      {title}
    </Link>
  );
}

export default RouterLink;
