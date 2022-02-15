import { SxProps } from '@mui/material';
import Typography from '@mui/material/Typography';

interface IPageTitleProps {
  /**
   * Title to de rendered.
   */
  title: string;
}

const sxProp: SxProps = {
  textAlign: 'center',
  fontSize: {
    xs: '2rem',
    md: '3rem',
  },
};

/**
 * Renders a heading.
 */
function PageTitle(props: IPageTitleProps) {
  const {
    title,
  } = props;

  return (
    <Typography
      sx={sxProp}
      variant="h3"
      component="div"
      role="heading"
      aria-level={1}
    >
      {title}
    </Typography>
  );
}

export default PageTitle;
