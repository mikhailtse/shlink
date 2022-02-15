import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import CopyButton, { ICopyButtonProps } from '../CopyButton';
import Link, { ILinkProps } from '../Link';

export interface ICopyableLinkProps {
  /**
   * Props of the link component.
   */
  linkProps: ILinkProps;
  /**
   * Title to be displayed.
   */
  title: string;
  /**
   * Props of the button component.
   */
  buttonProps?: Omit<ICopyButtonProps, 'text'>
  /**
   * Text to copy.
   * If it's not provided `linkProps.to` will be used.
   */
  text?: string;
}

/**
 * Renders a tile with a link and a button to copy the link.
 */
function CopyableLink(props: ICopyableLinkProps) {
  const {
    buttonProps = {},
    linkProps,
    text,
    title,
  } = props;

  return (
    <Paper variant='outlined' sx={{ p: 2, mt: 2, width: 400, mr: 'auto', ml: 'auto' }}>
      <Grid container wrap='nowrap'>
        <Grid item container>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              component="span"
            >
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Link {...linkProps} />
          </Grid>
        </Grid>
        <Grid item sx={{ textAlign: 'right' }}>
          <CopyButton {...buttonProps} text={text ?? linkProps.to} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CopyableLink;
