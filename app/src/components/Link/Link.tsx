import MuiLink from '@mui/material/Link';

import RouterLink from '../RouterLink';

export interface ILinkProps {
  /**
   * A link to navigate.
   */
  to: string;
  /**
   * Title of the link.
   */
  title: string;
  /**
   * The type of the link.
   * 
   * `inner` - a router link  
   * `outer` - a normal link
   * 
   * @default 'outer'
   */
  type?: 'inner' | 'outer'
}

/**
 * Renders a link based on the `type` prop:
 * - 'inner' - for a router link
 * - 'outer' - for a normal link
 */
function Link(props: ILinkProps) {
  const {
    to,
    type = 'outer',
    title,
  } = props;

  if (type === 'outer') {
    return (
      <MuiLink
        href={to}
        rel="noopener"
        target="_blank"
        data-test-type='outer'
      >
        {title}
      </MuiLink>
    );
  }

  return (
    <RouterLink to={to} title={title} data-test-type='inner' />
  )
}

export default Link;
