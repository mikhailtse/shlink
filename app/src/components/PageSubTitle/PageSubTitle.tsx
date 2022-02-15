import { SxProps } from "@mui/material";
import Typography from '@mui/material/Typography';

interface IPageSubTitleProps {
  /**
   * Title to de rendered.
   */
  title: string;
}

const sxProp: SxProps = {
  textAlign: 'center',
  fontSize: {
    xs: '1.5rem',
    md: '2rem',
  },
};

function PageSubTitle(props: IPageSubTitleProps) {
  const {
    title,
  } = props;

  return (
    <Typography
      sx={sxProp}
      variant="h3"
      component="div"
      role="heading"
      aria-level={2}
    >
      {title}
    </Typography>
  );
}

export default PageSubTitle;
